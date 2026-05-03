import type { Entity } from "../base/entity";

export interface BookLoanEntity extends Entity{
  bookId: number;
  userId: number;
  borrowedAt: number;
  returnedAt: number | null;
}
