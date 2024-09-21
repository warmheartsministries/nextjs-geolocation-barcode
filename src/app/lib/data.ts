import { sql } from "@vercel/postgres";
import { Product } from "./definitions";

export async function fetchProductByUpc(upc: string) {
  try {
    const data = await sql<Product>`
          SELECT
            products.id,
            products.upc,
            products.brand,
            products.description,
            products.img_url,
            products.price
          FROM products
          WHERE products.upc = ${upc};
        `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}
