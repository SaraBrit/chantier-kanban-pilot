export interface Project {
  id: string;
  name: string;
  client: string;
  projectManager: string;
  monthlyBilling: number;
  address: string;
  phone: string;
  email: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  category: 'Equipements' | 'VRD' | 'Bon de commande';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  progress: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}

export interface MaterialRequest {
  id: string;
  projectId: string;
  materialName: string;
  quantity: number;
  unit: string;
  urgency: 'low' | 'medium' | 'high';
  requestDate: string;
  status: 'pending' | 'approved' | 'ordered' | 'delivered';
}

export interface Alert {
  id: string;
  projectId: string;
  type: 'budget-overrun' | 'deadline-delay' | 'material-shortage';
  message: string;
  severity: 'info' | 'warning' | 'error';
  date: string;
  isRead: boolean;
}

export interface ContractComplement {
  id: string;
  projectId: string;
  contractNumber: string;
  description: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'executed' | 'completed';
  signatureDate: string;
  startDate: string;
  endDate: string;
  client: string;
  type: 'modification' | 'extension' | 'additional-work' | 'budget-increase';
}
