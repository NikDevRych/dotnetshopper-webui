export default function AdminSidebar({
  isOpen,
}: Readonly<{ isOpen: boolean }>) {
  return (
    <nav
      className={`h-screen w-36 bg-sky-600 p-2 ${isOpen ? "block" : "hidden"}`}
    >
      <ul className="mt-12 flex justify-center">
        <li>
          <button className="w-28 rounded-md bg-sky-100 p-1">Products</button>
        </li>
      </ul>
    </nav>
  );
}
