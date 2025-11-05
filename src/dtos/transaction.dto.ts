export interface TopUpDTO {
  top_up_amount: number;
}

export interface TransactionDTO {
  service_code: string;
}

export interface BalanceResponseDTO {
  balance: number;
}

export interface TransactionResponseDTO {
  invoice_number: string;
  service_code?: string;
  service_name?: string;
  transaction_type: string;
  description?: string;
  total_amount: number;
  created_on: Date;
}

export interface TransactionHistoryResponseDTO {
  offset: number;
  limit: number;
  records: {
    invoice_number: string;
    transaction_type: string;
    description: string;
    total_amount: number;
    created_on: Date;
  }[];
}
