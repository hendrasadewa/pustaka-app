import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BookEntity } from "@/lib/api/book/entity";
import { EyeIcon, PencilIcon } from "lucide-react";

interface Props {
  list?: Array<BookEntity>;
  onViewClicked?(id: number): void;
  onEditClicked?(id: number): void;
}

export function BookTable({
  list = [],
  onEditClicked = () => {},
  onViewClicked = () => {},
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ISBN</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((book) => (
          <TableRow>
            <TableCell className="font-medium font-mono">{book.isbn}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.shelfCode}</TableCell>
            <TableCell>{book.totalCopies}</TableCell>
            <TableCell>
              <Switch defaultChecked={book.status === "active"} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Button variant="ghost" onClick={() => onViewClicked(book.id)}>
                  <EyeIcon />
                  View
                </Button>
                <Button variant="ghost" onClick={() => onEditClicked(book.id)}>
                  <PencilIcon />
                  Edit
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}