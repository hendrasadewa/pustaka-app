import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { useCameraPermission } from "../hooks/useCameraPermission";
import { Button } from "./ui/button";

interface Props {
  onBarcodeDetected?(result: string): void;
}

export function BookScanner({ onBarcodeDetected = () => {} }: Props) {
  const { permission, requestCameraPermission } = useCameraPermission();

  if (permission === "idle" || permission === "requesting") {
    return <p>Requesting camera access…</p>;
  }

  if (permission === "denied") {
    return (
      <div>
        <p>Camera access was denied.</p>
        <p>
          To enable it, go to <strong>Settings → Safari → Camera</strong> and
          allow access, then reload the page.
        </p>
        <Button onClick={requestCameraPermission}>Try again</Button>
      </div>
    );
  }

  if (permission === "unavailable") {
    return <p>Camera is not available on this device or browser.</p>;
  }

  return (
    <div className="rounded-xl">
      <BarcodeScanner
        options={{
          formats: [
            "code_128",
            "code_39",
            "code_93",
            "codabar",
            "ean_13",
            "ean_8",
            "itf",
            "upc_a",
            "upc_e",
          ],
          delay: 500,
        }}
        onCapture={(barcodes) => {
          console.log(barcodes);
          const barcode = barcodes.at(0);
          onBarcodeDetected(barcode?.rawValue || "");
        }}
      />
    </div>
  );
}
