import Link from "next/link";

export default function AdminSidebar({
  isOpen,
}: Readonly<{ isOpen: boolean }>) {
  return (
    <nav
      className={`h-screen w-36 bg-sky-600 p-2 ${isOpen ? "block" : "hidden"}`}
    >
      <ul className="mt-12 flex flex-col justify-center gap-4">
        <li>
          <Link href="/admin">
            <button className="w-28 rounded-md bg-sky-100 p-1">Main</button>
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            <button className="w-28 rounded-md bg-sky-100 p-1">Products</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
