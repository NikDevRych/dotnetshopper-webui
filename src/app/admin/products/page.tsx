import ProductItem from "@/components/admin/product-item/product-item";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <ul className="flex items-center gap-5">
          <li className="w-20">Image</li>
          <li className="w-80">Name</li>
          <li className="w-40">Price</li>
          <li className="w-20">Edit</li>
          <li className="w-20">Remove</li>
        </ul>
        <div className="h-0.5 w-[51rem] rounded-xl bg-gray-200"></div>
        <ul className="flex flex-col items-center gap-5">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </ul>
        <Link href="/admin/products/create">
          <button className="w-40 rounded-md p-2 shadow-md">Create</button>
        </Link>
      </div>
    </>
  );
}
