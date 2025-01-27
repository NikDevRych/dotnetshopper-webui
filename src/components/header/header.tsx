import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-around bg-gray-900">
      <Link href="/" className="text-2xl font-bold text-gray-50">
        DotNet Shopper
      </Link>
      <div className="flex items-center gap-2">
        <button className="rounded-md bg-blue-500 p-1 text-lg font-bold text-gray-50">
          Catalog
        </button>
        <input
          className="rounded-md p-1 text-lg"
          type="text"
          placeholder="If find..."
        />
        <button className="rounded-md bg-green-700 p-1 text-lg font-bold text-gray-50">
          Find
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button>
          <Image
            src="/account_circle.svg"
            alt="account"
            width={40}
            height={40}
          />
        </button>
        <button>
          <Image
            src="/shopping_cart.svg"
            alt="account"
            width={40}
            height={40}
          />
        </button>
      </div>
    </header>
  );
}
