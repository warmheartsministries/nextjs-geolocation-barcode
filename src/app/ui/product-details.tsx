import { fetchProductByUpc } from "../lib/data";
import { Product } from "../lib/definitions";

export default async function ProductDetails(props: { upc: string }) {
  const data = await fetchProductByUpc(props.upc);
  return (
    <div>
      <div>PRODUCT DETAILS FOR UPC: {props.upc}</div>
      <div>
        {data?.map((product: Product) => (
          <div>
            <div>{product.id}</div>
            <div>{product.upc}</div>
            <div>{product.brand}</div>
            <div>{product.description}</div>
            <div>{product.img_url}</div>
            <div>{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
