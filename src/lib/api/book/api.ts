import api from "@/lib/configs/api";
import { type APIListResponse, type APIResponse, type PaginationParams } from "../base/dto";
import {
  type BookCreatePayload,
  type BookUpdatePayload,
  type UploadKey,
  type UploadToken,
} from "./dto";
import type { BookEntity, BookStatus } from "./entity";

export const generateCoverImageUploadToken = () =>
  api.post<APIResponse<UploadToken | null>>("/books/covers/upload-token");

export const uploadCoverImage = (token: string, file: File) => {
  const formData = new FormData();
  formData.set("token", token);
  formData.set("file", file);

  return api.post<APIResponse<UploadKey | null>>("/books/covers/upload", {
    body: formData,
  });
};

export const commitUpload = (isbn: string, coverKey: string) =>
  api.post<APIResponse<BookEntity | null>>("/books/covers/commit", {
    json: { isbn, coverKey },
  });

export const getBookByISBN = (isbn: string) =>
  api.get<APIResponse<BookEntity | null>>(`/books/isbn/${isbn}`).json();

export const getBookById = (id: string) =>
  api.get<APIResponse<BookEntity | null>>(`/books/${id}`).json();

export const getBooks = (
  pagination: PaginationParams = { limit: 10, page: 1 },
) =>
  api
    .get<APIListResponse<BookEntity>>("/books", {
      searchParams: {
        page: pagination.page,
        limit: pagination.limit,
      },
    })
    .json();

export const createBook = (payload: BookCreatePayload) =>
  api.post<APIResponse<BookEntity | null>>("/books", { json: payload });

export const updateBook = (payload: BookUpdatePayload, id: string) =>
  api.put<APIResponse<BookEntity | null>>(`/books/${id}`, { json: payload });

export const deleteBook = (id: string) =>
  api.delete<APIResponse<BookEntity | null>>(`/books/${id}`);

export const patchStatus = (id: string, status: BookStatus) =>
  api.patch<APIResponse<BookEntity | null>>(`/books/${id}/status`, {
    json: { status },
  });
