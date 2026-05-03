import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PlusIcon, ScanBarcodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBook, getBookByISBN, getBooks, updateBook } from "@/lib/api/book/api";
import { BookTable } from "@/components/BookTable";
import { BookDialog } from "@/components/BookDialog";
import { BookScannerDialog } from "@/components/BookScannerDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { BookCreatePayload, BookUpdatePayload } from "@/lib/api/book/dto";
import type { BookFormPayload } from "@/components/BookDialog";

export default function BookDirectoryPage() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [isbn, setISBN] = useState<string|undefined>();

  const [dialogConfig, setDialogConfig] = useState<{
    mode: "create" | "update";
    isOpen: boolean;
  }>({
    mode: "create",
    isOpen: false,
  });

  const [scannerOpen, setScannerOpen] = useState(false);

  const listQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const isbnBookQuery = useQuery({
    queryKey: ["books", isbn],
    queryFn: () => getBookByISBN(isbn ?? ""),
    enabled: Boolean(isbn)
  });

  const handleBarcodeDetected = (barcodeValue: string) => {
    setISBN(barcodeValue);
  }

  useEffect(() => {
    if (!isbnBookQuery.isFetched) return;

    queueMicrotask(() => {
      if (isbnBookQuery.data?.data) {
        setSelectedId(String(isbnBookQuery.data.data.id));
        setScannerOpen(false);
        setDialogConfig({ mode: "update", isOpen: true });
      } else {
        toast.error("Book not found", {
          description: `No book found with ISBN ${isbn}.`,
        });
      }
    });
  }, [isbnBookQuery.isFetched, isbnBookQuery.data, isbn]);

  const closeDialog = () =>
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));

  const createBookMutation = useMutation({
    mutationFn: (payload: BookCreatePayload) => createBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      closeDialog();
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: (payload: BookUpdatePayload) =>
      updateBook(payload, `${selectedId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      closeDialog();
    },
  });

  const handleSubmitBook = (
    mode: "create" | "update",
    payload: BookFormPayload,
  ) => {
    const dto = {
      title: payload.title,
      author: payload.author,
      isbn: payload.isbn || undefined,
      publisher: payload.publisher || undefined,
      language: payload.language || undefined,
      genre: payload.genre || undefined,
      description: payload.description || undefined,
      coverUrl: payload.coverUrl || undefined,
      shelfCode: payload.shelfCode || undefined,
      totalCopies: payload.totalCopies,
    };

    if (mode === "create") {
      createBookMutation.mutate(dto);
    } else {
      updateBookMutation.mutate(dto);
    }
  };

  const handleAddBookClick = () => {
    setDialogConfig({ mode: "create", isOpen: true });
  };

  const handleViewClick = (id: number) => {
    setSelectedId(String(id));
    setDialogConfig({ mode: "update", isOpen: true });
  };

  const handleDialogOpenChanged = (open: boolean) => {
    setDialogConfig({ mode: "create", isOpen: open });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Books</h1>
        </div>
        <div className="flex items-center gap-2">
          <Input type="search" placeholder="Search book" />
          <Button onClick={handleAddBookClick}>
            <PlusIcon /> Add Book
          </Button>
          <Button onClick={() => setScannerOpen(true)}>
            <ScanBarcodeIcon /> Scan
          </Button>
        </div>
      </div>
      {listQuery.isLoading && <LoaderIcon className="animate-spin" />}
      <BookTable list={listQuery.data?.data} onViewClicked={handleViewClick} />
      <BookScannerDialog
        open={scannerOpen}
        onOpenChanged={setScannerOpen}
        onBarcodeDetected={handleBarcodeDetected}
      />
      <BookDialog
        mode={dialogConfig.mode}
        open={dialogConfig.isOpen}
        onOpenChanged={handleDialogOpenChanged}
        onSubmitBook={handleSubmitBook}
        id={selectedId}
      />
    </div>
  );
}
