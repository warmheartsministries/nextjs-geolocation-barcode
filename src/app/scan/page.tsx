import { Suspense } from "react";
import { BarcodeScanner } from "../ui/barcode-scanner";
import ProductDetails from "../ui/product-details";

export default async function Page({ searchParams }: { searchParams: string }) {
  const query = searchParams || "";
  console.log("PAGE query: ", query);
  const qKey = Object.keys(query)[0];
  const qValue = Object.values(query)[0];
  return (
    <>
      {qKey && qValue ? (
        <Suspense>
          <ProductDetails upc={qValue} />
        </Suspense>
      ) : (
        <BarcodeScanner />
      )}
    </>
  );
}
