type TransactionStatus = 
  | 'waiting_for_approval'
  | 'approved'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Transaction {
  id: string;
  jobId: string;
  employerId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  invoice: {
    number: string;
    date: string;
    dueDate: string;
    items: {
      description: string;
      quantity: number;
      price: number;
      total: number;
    }[];
  };
}