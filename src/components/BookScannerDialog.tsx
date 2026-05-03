import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookScanner } from "./BookScanner";

interface Props {
  open?: boolean;
  onOpenChanged?(open: boolean): void;
  onBarcodeDetected?(result: string): void;
}

export function BookScannerDialog({
  open = false,
  onOpenChanged = () => {},
  onBarcodeDetected,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan a Book</DialogTitle>
        </DialogHeader>
        {open && <BookScanner onBarcodeDetected={onBarcodeDetected} />}
      </DialogContent>
    </Dialog>
  );
}
