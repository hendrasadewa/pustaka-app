import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BookStatus } from "@/lib/api/book/entity";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "@/lib/api/book/api";
import { BookScannerDialog } from "./BookScannerDialog";
import { ScanBarcodeIcon } from "lucide-react";

export interface BookFormPayload {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  language: string;
  genre: string;
  description: string;
  coverUrl: string;
  shelfCode: string;
  totalCopies: number;
  status: BookStatus;
}

interface Props {
  open?: boolean;
  mode?: "create" | "update";
  id?: string,
  onOpenChanged?(open: boolean): void;
  onSubmitBook?(mode: "create" | "update", payload: BookFormPayload): void;
}

export function BookDialog({
  open = false,
  mode = "create",
  id = "",
  onOpenChanged = () => {},
  onSubmitBook,
}: Props) {
   const selectedBookQuery = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(`${id}` || ""),
    enabled: Boolean(id) && id !== "",
    select: (response) => response.data,
  });

  const values = selectedBookQuery.data

  const [scannerOpen, setScannerOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<BookFormPayload>();

  const handleISBNScanned = (result: string) => {
    setValue("isbn", result);
    setScannerOpen(false);
  };

  useEffect(() => {
    reset({
      title: values?.title ?? "",
      author: values?.author ?? "",
      isbn: values?.isbn ?? "",
      publisher: values?.publisher ?? "",
      language: values?.language ?? "",
      genre: values?.genre ?? "",
      description: values?.description ?? "",
      coverUrl: values?.coverUrl ?? "",
      shelfCode: values?.shelfCode ?? "",
      totalCopies: values?.totalCopies ?? 1,
      status: values?.status ?? "active",
    });
  }, [values, reset]);

  const dialogTitle =
    mode === "create" ? "Create a book" : `Edit ${values?.title ?? "book"}`;

  const onSubmit = (payload: BookFormPayload) => {
    onSubmitBook?.(mode, payload);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2 grid grid-cols-2 gap-x-4 gap-y-2">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
            </Field>
            <Field>
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("author")} />
            </Field>
            <Field>
              <Label htmlFor="isbn">ISBN</Label>
              <div className="flex gap-2">
                <Input id="isbn" {...register("isbn")} />
                <Button type="button" variant="outline" size="icon" onClick={() => setScannerOpen(true)}>
                  <ScanBarcodeIcon />
                </Button>
              </div>
            </Field>
            <Field>
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" {...register("publisher")} />
            </Field>
            <Field>
              <Label htmlFor="language">Language</Label>
              <Input id="language" {...register("language")} />
            </Field>
            <Field>
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" {...register("genre")} />
            </Field>
            <Field>
              <Label htmlFor="shelfCode">Shelf Code</Label>
              <Input id="shelfCode" {...register("shelfCode")} />
            </Field>
            <Field>
              <Label htmlFor="totalCopies">Total Copies</Label>
              <Input
                id="totalCopies"
                type="number"
                min={1}
                {...register("totalCopies", { valueAsNumber: true })}
              />
            </Field>
            <Field className="col-span-2">
              <Label htmlFor="coverUrl">Cover URL</Label>
              <Input id="coverUrl" {...register("coverUrl")} />
            </Field>
            <Field className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
            </Field>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit">
              {mode === "create" ? "Create" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
      <BookScannerDialog
        open={scannerOpen}
        onOpenChanged={setScannerOpen}
        onBarcodeDetected={handleISBNScanned}
      />
    </Dialog>
  );
}
