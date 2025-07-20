import * as XLSX from 'xlsx';
import { Task } from '@/types/project';

export interface ExcelTaskRow {
  tache?: string;
  titre?: string;
  nom?: string;
  description?: string;
  statut?: string;
  status?: string;
  priorite?: string;
  priority?: string;
  assignee?: string;
  responsable?: string;
  date_fin?: string;
  'date fin'?: string;
  due_date?: string;
  progres?: string | number;
  progress?: string | number;
  pourcentage?: string | number;
  avancement?: string | number;
}

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
        
        const tasks: Task[] = jsonData.map((row, index) => {
          // Extract task title (flexible column names)
          const title = row.tache || row.titre || row.nom || `Tâche ${index + 1}`;
          
          // Extract description
          const description = row.description || '';
          
          // Extract and normalize status
          const rawStatus = (row.statut || row.status || 'todo').toString().toLowerCase();
          let status: Task['status'] = 'todo';
          if (rawStatus.includes('progress') || rawStatus.includes('cours') || rawStatus.includes('en cours')) {
            status = 'in-progress';
          } else if (rawStatus.includes('review') || rawStatus.includes('revision') || rawStatus.includes('vérifié')) {
            status = 'review';
          } else if (rawStatus.includes('done') || rawStatus.includes('terminé') || rawStatus.includes('fini')) {
            status = 'done';
          }
          
          // Extract and normalize priority
          const rawPriority = (row.priorite || row.priority || 'medium').toString().toLowerCase();
          let priority: Task['priority'] = 'medium';
          if (rawPriority.includes('high') || rawPriority.includes('haute') || rawPriority.includes('urgent')) {
            priority = 'high';
          } else if (rawPriority.includes('low') || rawPriority.includes('faible') || rawPriority.includes('basse')) {
            priority = 'low';
          }
          
          // Extract assignee
          const assignee = row.assignee || row.responsable || 'Non assigné';
          
          // Extract due date
          const dueDate = row.date_fin || row['date fin'] || row.due_date || new Date().toISOString().split('T')[0];
          
          // Extract progress
          const rawProgress = row.progres || row.progress || row.pourcentage || row.avancement || 0;
          let progress = 0;
          if (typeof rawProgress === 'string') {
            // Remove % sign if present and convert to number
            progress = parseInt(rawProgress.replace('%', '')) || 0;
          } else {
            progress = Number(rawProgress) || 0;
          }
          
          // Ensure progress is between 0 and 100
          progress = Math.max(0, Math.min(100, progress));
          
          return {
            id: `excel-task-${Date.now()}-${index}`,
            title: title.toString(),
            description: description.toString(),
            status,
            priority,
            assignee: assignee.toString(),
            dueDate: typeof dueDate === 'string' ? dueDate : new Date().toISOString().split('T')[0],
            progress
          };
        });
        
        resolve(tasks);
      } catch (error) {
        reject(new Error('Erreur lors de la lecture du fichier Excel: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsBinaryString(file);
  });
};