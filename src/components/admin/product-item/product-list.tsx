"use client";

import { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import ProductItem from "./product-item";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      // TODO: change to constant url
      const response = await fetch("http://localhost:5063/api/product");

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const products: Product[] = await response.json();
      setProducts(products);
    } catch (error) {
      // TODO: change to error message in UI
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );
}
