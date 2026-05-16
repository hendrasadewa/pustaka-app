import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { ScanBarcode } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { AppHeader } from "@/components/AppHeader";
import { Book } from "@/components/Book";
import { getBooks } from "@/lib/api/book/api";
import { BookScannerDialog } from "@/components/BookScannerDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const listQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
    select(response) {
      toast.success("Book fetched successfully")
      return response
    },
  });

  const handleBarcodeDetected = (value: string) => {
    navigate(`/book/isbn/${value}`);
  };

  const handleOpenChanged = () => {
    setOpen((prev) => !prev);
  };

  const handleScanBarcodeClick = () => {
    handleOpenChanged();
  };

  return (
    <>
      <AppHeader />
      <header className="flex items-center justify-between p-4">
        <h3 className="font-heading text-xl">Available Books</h3>
        <div>
          <Button onClick={handleScanBarcodeClick}>
            <ScanBarcode />
          </Button>
        </div>
      </header>
      <div className="border-y border-emerald-800">
        <div
          id="book-grid"
          className={cx(
            "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
            "gap-6 p-4",
            "bg-linear-to-b from-emerald-700 to-emerald-800",
          )}
        >
          {!listQuery.data && (
            <div>
              <p>Empty data</p>
            </div>
          )}
          {listQuery.data?.data.map((book) => (
            <Link to={`/book/isbn/${book.isbn}`} key={book.isbn}>
              <Book book={book} />
            </Link>
          ))}
        </div>
      </div>
      <BookScannerDialog
        onBarcodeDetected={handleBarcodeDetected}
        open={open}
        onOpenChanged={handleOpenChanged}
      />
    </>
  );
}
