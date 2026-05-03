import type { Entity } from "../base/entity";

export type BookStatus = "active" | "archived";

export interface BookEntity extends Entity {
  title: string;
  author: string;
  isbn: string | null;
  publisher: string | null;
  language: string | null;
  genre: string | null;
  description: string | null;
  coverUrl: string | null;
  shelfCode: string | null;
  totalCopies: number;
  availableCopies: number;
  status: BookStatus;
}
