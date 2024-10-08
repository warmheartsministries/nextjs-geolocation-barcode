//import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
//import { customers, products, orders } from "../lib/placeholder-data";
import { orders } from "../lib/placeholder-data";

const client = await db.connect();

/*async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS customers (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL,
       img_url TEXT NOT NULL
     );
   `;

  const insertedUsers = await Promise.all(
    customers.map(async (customer) => {
      const hashedPassword = await bcrypt.hash(customer.password, 10);
      return client.sql`
         INSERT INTO customers (id, name, email, password, img_url)
         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${hashedPassword}, ${customer.img_url})
         ON CONFLICT (id) DO NOTHING;
       `;
    })
  );

  return insertedUsers;
}

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
       CREATE TABLE IF NOT EXISTS products (
         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
         upc TEXT NOT NULL,
         brand TEXT NOT NULL,
         decription TEXT NOT NULL,
         img_url TEXT NOT NULL,
         price TEXT NOT NULL
       );
     `;

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return client.sql`
           INSERT INTO products (id, upc, brand, description, img_url, price)
           VALUES (${product.id}, ${product.upc}, ${product.brand}, ${product.description}, ${product.img_url}, ${product.price})
           ON CONFLICT (id) DO NOTHING;
         `;
    })
  );

  return insertedProducts;
}*/

async function seedOrders() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
     CREATE TABLE IF NOT EXISTS orders (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       customer_id UUID NOT NULL,
       amount INT NOT NULL,
       status VARCHAR(255) NOT NULL,
       date DATE NOT NULL
     );
   `;

  const insertedOrders = await Promise.all(
    orders.map(
      (order) => client.sql`
         INSERT INTO orders (customer_id, amount, status, date)
         VALUES (${order.customer_id}, ${order.amount}, ${order.status}, ${order.date})
         ON CONFLICT (id) DO NOTHING;
       `
    )
  );

  return insertedOrders;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    //await seedCustomers();
    //await seedProducts();
    await seedOrders();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
