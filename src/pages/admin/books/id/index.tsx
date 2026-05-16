import { getBookById } from "@/lib/api/book/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function BookDetailPage() {
  const { id = "" } = useParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id),
    enabled: Boolean(id),
  });

  return <div>{query.data?.data?.title}</div>;
}
