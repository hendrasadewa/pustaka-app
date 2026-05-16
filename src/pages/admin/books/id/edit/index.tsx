import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { BookForm } from "@/components/BookForm";
import type { BookCreatePayload, BookUpdatePayload } from "@/lib/api/book/dto";
import { getBookById, updateBook } from "@/lib/api/book/api";
import { toast } from "sonner";

export function EditBookPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id),
    enabled: Boolean(id),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: BookUpdatePayload) => updateBook(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["books", id] });
      navigate("/admin/books");
    },
    onError(error) {
      toast.error("Failed when updating the book", { description: error.message })
    },
  });

  const handleSubmit = (values: BookCreatePayload) => mutation.mutate(values);

  return (
    <div>
      <header className="py-2">
        <h1 className="font-heading text-3xl">Edit Book</h1>
      </header>
      <div className="py-4">
        <BookForm
          onSubmit={handleSubmit}
          mode="edit"
          values={query.data?.data}
          isLoading={query.isLoading || mutation.isPending}
        />
      </div>
    </div>
  );
}
