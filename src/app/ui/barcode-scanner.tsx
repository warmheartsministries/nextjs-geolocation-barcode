"use client";

import { useState } from "react";
import { useZxing } from "react-zxing";
import Link from "next/link";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
      <p>
        <span>
          <Link
            href={{
              pathname: "/order",
              query: { upc: result },
            }}
          >
            Options
          </Link>
        </span>
      </p>
    </>
  );
};
