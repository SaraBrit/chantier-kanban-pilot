
export interface Project {
  id: string;
  name: string;
  client: string;
  projectManager: string;
  monthlyBilling: number;
  address: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
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
