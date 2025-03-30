"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // Initialize scanner
    scannerRef.current = new Html5Qrcode("reader");

    // Start scanning
    const startScanning = async () => {
      try {
        await scannerRef.current?.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // On successful scan
            onScan(decodedText);
            // Stop scanning after successful detection
            scannerRef.current?.stop();
          },
          (errorMessage) => {
            // Ignore errors during scanning
            console.debug("QR scan error:", errorMessage);
          }
        );
      } catch (err) {
        console.error("Error starting scanner:", err);
      }
    };

    startScanning();

    // Cleanup function
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          ?.stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, [onScan]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        id="reader"
        className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
      ></div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        Position the barcode within the frame to scan
      </p>
    </div>
  );
}
