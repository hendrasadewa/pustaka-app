import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BookForm } from "@/components/BookForm";
import type { BookCreatePayload } from "@/lib/api/book/dto";
import { createBook } from "@/lib/api/book/api";
import { useNavigate } from "react-router";

export function CreateBookPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createBookMutation = useMutation({
    mutationFn: (payload: BookCreatePayload) => createBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/admin/books");
    },
  });

  const handleSubmit = (values: BookCreatePayload) => createBookMutation.mutate(values)

  return <BookForm onSubmit={handleSubmit} mode="create" />;
}
