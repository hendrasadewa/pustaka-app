import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookScanner } from "./BookScanner";
import { toast } from "sonner";

interface Props {
  open?: boolean;
  onOpenChanged?(open: boolean): void;
  onBarcodeDetected?(result: string): void;
}

export function BookScannerDialog({
  open = false,
  onOpenChanged = () => {},
  onBarcodeDetected = () => {},
}: Props) {
  const handleBarcodeDetected = (result: string) => {
    toast.success("Barcode successfully scanned");
    onBarcodeDetected(result);
  }

  const handleClose = () => onOpenChanged(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan a Book</DialogTitle>
        </DialogHeader>
        {open && <BookScanner onBarcodeDetected={handleBarcodeDetected} onClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
}
