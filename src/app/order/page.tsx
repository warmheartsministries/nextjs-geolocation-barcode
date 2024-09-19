import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: string }) {
  const query = searchParams || "";
  const qKey = Object.keys(query)[0];
  const qValue = Object.values(query)[0];
  return (
    <div>
      <h1>The Product</h1>
      <Suspense>
        {qKey && qValue ? (
          <div>
            Something to fetch {qKey}={qValue}
          </div>
        ) : (
          <div>Nothing to query</div>
        )}
      </Suspense>
    </div>
  );
}
