import { BarcodeScanner, type DetectedBarcode } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { useCameraPermission } from "../hooks/use-camera-permission";
import { Button } from "./ui/button";
import { useState } from "react";
import { CameraOff, ScanBarcodeIcon } from "lucide-react";

interface Props {
  formats?: string[];
  delay?: number;
  onBarcodeDetected?(result: string): void;
  onClose?(): void;
}

export function BookScanner({
  delay = 500,
  formats = [
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
  onBarcodeDetected = () => {},
  onClose = () => {},
}: Props) {
  const { permission, requestCameraPermission } = useCameraPermission();
  const [isOpen, setOpen] = useState(false);

  const handleCaptured = (captured: DetectedBarcode[]) => {
    const sample = captured.at(0);
    if (!sample) {
      return;
    }

    if (!formats.includes(sample.format)) {
      return;
    }

    onBarcodeDetected(sample.rawValue);
    setOpen(false);
  };

  const handleOpenScanner = () => {
    requestCameraPermission();
    setOpen(true);
  };

  const handleAcknowledgeClick = () => {
    onClose();
  };

  return (
    <div className="rounded-xl">
      {permission === "denied" && (
        <div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center h-full">
              <CameraOff size={120} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-center">Camera access was denied.</p>
              <p className="text-center">
                To enable it, go to <strong>Settings → Safari → Camera</strong>{" "}
                and allow access, then reload the page.
              </p>
            </div>
            <Button onClick={requestCameraPermission}>Try again</Button>
          </div>
        </div>
      )}

      {permission === "unavailable" && (
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center h-full">
            <CameraOff size={120} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-center">
              Camera is not available on this device or browser.
            </p>
            <Button onClick={handleAcknowledgeClick}>Acknowledge</Button>
          </div>
        </div>
      )}

      {isOpen && permission === "granted" && (
        <BarcodeScanner
          className="rounded-xl"
          options={{ formats, delay }}
          onCapture={handleCaptured}
        />
      )}

      {!isOpen && (
        <div className="flex flex-col items-center justify-center gap-6 min-h-64">
          <div className="flex items-center h-full">
            <ScanBarcodeIcon size={120} />
          </div>
          {permission === "idle" || permission === "requesting" ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-center">
                Camera permission is required to open the barcode scanner
              </p>
              <Button onClick={handleOpenScanner}>Request camera access</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-center">
                Camera permission is required to open the barcode scanner
              </p>
              <Button onClick={handleOpenScanner}>Open Scanncer</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
