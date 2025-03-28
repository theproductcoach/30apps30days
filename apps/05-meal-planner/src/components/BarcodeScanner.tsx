"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";
import { Button } from "./Button";

interface BarcodeScannerProps {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

export default function BarcodeScanner({
  onScan,
  onError,
}: BarcodeScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScanning = useCallback(() => {
    setIsScanning(true);
    setError(null);
  }, []);

  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  const handlePermissionChange = useCallback(
    (permitted: boolean) => {
      setHasPermission(permitted);
      if (!permitted) {
        setError("Camera permission was denied. Please allow camera access.");
        if (onError) onError(new Error("Camera permission denied"));
      }
    },
    [onError]
  );

  useEffect(() => {
    if (!isScanning || !webcamRef.current || !hasPermission) return;

    const codeReader = new BrowserMultiFormatReader();
    let intervalId: NodeJS.Timeout | null = null;

    const scanBarcode = async () => {
      try {
        if (!webcamRef.current?.video) return;

        const result: Result = await codeReader.decodeFromVideoElement(
          webcamRef.current.video
        );
        if (result && result.getText()) {
          onScan(result.getText());
          stopScanning();
          if (intervalId) clearInterval(intervalId);
        }
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          console.error("Barcode scan error:", error);
          if (onError && error instanceof Error) onError(error);
        }
        // NotFoundException is expected when no barcode is found
      }
    };

    // Check permissions
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true);
        // Start scanning every 500ms
        intervalId = setInterval(scanBarcode, 500);
      })
      .catch((err) => {
        handlePermissionChange(false);
        console.error("Camera permission error:", err);
      });

    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
      codeReader.reset();
    };
  }, [
    isScanning,
    onScan,
    onError,
    hasPermission,
    handlePermissionChange,
    stopScanning,
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-gray-300 bg-black">
        {hasPermission !== false && (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment",
            }}
            className="w-full h-full aspect-[4/3]"
          />
        )}

        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-1/2 border-2 border-emerald-500 rounded-lg animate-pulse" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4 text-center">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        {!isScanning ? (
          <Button onClick={startScanning} variant="primary">
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="secondary">
            Stop Scanning
          </Button>
        )}
      </div>
    </div>
  );
}
