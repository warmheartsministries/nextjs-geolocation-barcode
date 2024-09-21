"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
//import { useState } from "react";
import { useZxing } from "react-zxing";
//import Link from "next/link";

export const BarcodeScanner = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      //setResult(result.getText());
      handleSearch(result);
    },
  });

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <video ref={ref} />
      {/*<p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
      <input
        type="hidden"
        value={result}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />*/}
      {/*<p>
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
      </p>*/}
    </>
  );
};
