"use client";

import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export default function BarcodeScannerWrapper({ onScan }: BarcodeScannerProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <BarcodeScanner
        onUpdate={(err: unknown, result) => {
          if (result) {
            onScan(result.getText());
          }
          if (err instanceof Error) {
            setError(err.message);
          }
        }}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
