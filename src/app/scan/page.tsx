import { BarcodeScanner } from "../ui/barcode-scanner";

export default async function Page({ searchParams }: { searchParams: string }) {
  const query = searchParams || "";
  console.log("PAGE query: ", query);
  const qKey = Object.keys(query)[0];
  const qValue = Object.values(query)[0];
  return (
    <>
      {qKey && qValue ? (
        <div>I got: {qValue} to fetch...</div>
      ) : (
        <BarcodeScanner />
      )}
    </>
  );
}
