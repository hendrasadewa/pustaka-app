import { ScanBarcodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookScannerDialog } from "@/components/BookScannerDialog";
import type { BookCreatePayload } from "@/lib/api/book/dto";
import type { BookEntity } from "@/lib/api/book/entity";
import { Textarea } from "./ui/textarea";


interface Props {
  mode: "create" | "edit";
  onSubmit(values: BookCreatePayload): void;
  values?: BookEntity | null;
  isLoading?: boolean;
}

export function BookForm({
  values = undefined,
  mode = "create",
  onSubmit = () => {},
  isLoading = false
}: Props) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } =
    useForm<BookCreatePayload>({ disabled: isLoading });
  
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
    });
  }, [values, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2 space-y-4">
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
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setScannerOpen(true)}
            >
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
       <div className="grid grid-cols-2 gap-4">
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
       </div>
        <Field className="col-span-2">
          <Label htmlFor="coverUrl">Cover URL</Label>
          <Input id="coverUrl" {...register("coverUrl")} />
        </Field>
        <Field className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </Field>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit">
          {mode === "create" ? "Create" : "Save changes"}
        </Button>
      </div>
      <BookScannerDialog
        open={scannerOpen}
        onOpenChanged={setScannerOpen}
        onBarcodeDetected={handleISBNScanned}
      />
    </form>
  );
}
