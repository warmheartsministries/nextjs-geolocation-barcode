"use client";

// @ts-ignore
import Quagga from "quagga";
import { useState } from "react";

export default function BarcodeScanner() {
  const [scannedCode, setScannedCode] = useState(null);
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["code_128_reader"],
        },
      },
      (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data: any) => {
      setScannedCode(data.codeResult.code);
      Quagga.stop();
    });
  };
  return (
    <div>
      <button onClick={startScanner}>Start Barcode Scanner</button>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
}
