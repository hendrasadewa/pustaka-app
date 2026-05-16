import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, PlusIcon } from "lucide-react";

import { BookTable } from "@/components/BookTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBooks } from "@/lib/api/book/api";
import { useNavigate } from "react-router";

export default function AdminBooksPage() {
  const navigate = useNavigate();

  const listQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const handleAddBookClick = () => {
    navigate("/admin/books/create");
  };

  const handleViewClick = (id: number) => {
    navigate(`/admin/books/${id}/edit`);
  };

  const handleEditClick = (id: number) => {
    navigate(`/admin/books/${id}/edit`);
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-heading font-bold text-2xl">Books</h1>
      </header>
      <div className="flex items-center justify-between gap-4 w-full">
        <Input type="search" placeholder="Search book" />
        <Button onClick={handleAddBookClick}>
          <PlusIcon /> Add Book
        </Button>
      </div>
      {listQuery.isLoading && <LoaderIcon className="animate-spin" />}
      <BookTable
        list={listQuery.data?.data}
        onViewClicked={handleViewClick}
        onEditClicked={handleEditClick}
      />
    </div>
  );
}
