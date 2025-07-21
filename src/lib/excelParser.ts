
import * as XLSX from 'xlsx';
import { Task } from '@/types/project';

export interface ExcelTaskRow {
  [key: string]: any; // Allow any column name
}

// Mapping functions to find columns by various possible names
const findColumn = (row: ExcelTaskRow, possibleNames: string[]): any => {
  for (const name of possibleNames) {
    const lowerName = name.toLowerCase();
    for (const [key, value] of Object.entries(row)) {
      if (key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())) {
        return value;
      }
    }
  }
  return null;
};

export const parseExcelTasks = async (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as ExcelTaskRow[];
        
        console.log('Excel data parsed:', jsonData);
        console.log('Available columns:', jsonData.length > 0 ? Object.keys(jsonData[0]) : []);
        
        const tasks: Task[] = jsonData.map((row, index) => {
          console.log(`Processing row ${index}:`, row);
          
          // Extract task title with more flexible column detection
          const title = findColumn(row, ['tache', 'tâche', 'titre', 'nom', 'task', 'title', 'name']) || `Tâche ${index + 1}`;
          
          // Extract description
          const description = findColumn(row, ['description', 'desc', 'details', 'detail']) || '';
          
          // Extract and normalize status
          const rawStatus = findColumn(row, ['statut', 'status', 'etat', 'état']) || 'todo';
          let status: Task['status'] = 'todo';
          const statusStr = rawStatus.toString().toLowerCase();
          if (statusStr.includes('progress') || statusStr.includes('cours') || statusStr.includes('en cours') || statusStr.includes('encours')) {
            status = 'in-progress';
          } else if (statusStr.includes('review') || statusStr.includes('revision') || statusStr.includes('vérifié') || statusStr.includes('verifie')) {
            status = 'review';
          } else if (statusStr.includes('done') || statusStr.includes('terminé') || statusStr.includes('termine') || statusStr.includes('fini') || statusStr.includes('complete')) {
            status = 'done';
          }
          
          // Extract and normalize priority
          const rawPriority = findColumn(row, ['priorite', 'priorité', 'priority', 'importance']) || 'medium';
          let priority: Task['priority'] = 'medium';
          const priorityStr = rawPriority.toString().toLowerCase();
          if (priorityStr.includes('high') || priorityStr.includes('haute') || priorityStr.includes('urgent') || priorityStr.includes('elevé') || priorityStr.includes('eleve')) {
            priority = 'high';
          } else if (priorityStr.includes('low') || priorityStr.includes('faible') || priorityStr.includes('basse') || priorityStr.includes('bas')) {
            priority = 'low';
          }
          
          // Extract assignee
          const assignee = findColumn(row, ['assignee', 'responsable', 'assigne', 'assigné', 'personne', 'user', 'utilisateur']) || 'Non assigné';
          
          // Extract due date
          const dueDate = findColumn(row, ['date_fin', 'date fin', 'due_date', 'echeance', 'échéance', 'deadline', 'fin']);
          let formattedDueDate = new Date().toISOString().split('T')[0];
          
          if (dueDate) {
            try {
              // Try to parse the date
              const parsedDate = new Date(dueDate);
              if (!isNaN(parsedDate.getTime())) {
                formattedDueDate = parsedDate.toISOString().split('T')[0];
              }
            } catch (e) {
              console.warn('Could not parse date:', dueDate);
            }
          }
          
          // Extract progress
          const rawProgress = findColumn(row, ['progres', 'progrès', 'progress', 'pourcentage', 'avancement', 'completion', '%']);
          let progress = 0;
          if (rawProgress !== null && rawProgress !== undefined) {
            if (typeof rawProgress === 'string') {
              // Remove % sign if present and convert to number
              const cleanProgress = rawProgress.replace('%', '').replace(',', '.');
              progress = parseFloat(cleanProgress) || 0;
            } else {
              progress = Number(rawProgress) || 0;
            }
          }
          
          // Ensure progress is between 0 and 100
          progress = Math.max(0, Math.min(100, progress));
          
          const task = {
            id: `excel-task-${Date.now()}-${index}`,
            title: title.toString(),
            description: description.toString(),
            status,
            priority,
            assignee: assignee.toString(),
            dueDate: formattedDueDate,
            progress
          };
          
          console.log(`Created task ${index}:`, task);
          return task;
        });
        
        console.log('Final parsed tasks:', tasks);
        resolve(tasks);
      } catch (error) {
        console.error('Excel parsing error:', error);
        reject(new Error('Erreur lors de la lecture du fichier Excel: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsBinaryString(file);
  });
};
