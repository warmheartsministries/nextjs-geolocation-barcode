import { BarcodeScanner } from "../ui/barcode-scanner";

export default async function Page({ query }: { query: string }) {
  return (
    <>
      {Object.values(query)[0] ? (
        <div>I got: {Object.values(query)[0]} to fetch...</div>
      ) : (
        <BarcodeScanner />
      )}
    </>
  );
}
