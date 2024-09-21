import { BarcodeScanner } from "../ui/barcode-scanner";

export default async function Page({ query }: { query: string }) {
  return (
    <>{query ? <div>I got: {query} to fetch...</div> : <BarcodeScanner />}</>
  );
}
