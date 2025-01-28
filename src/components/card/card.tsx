import Image from "next/image";

export default function Card() {
  return (
    <li className="flex w-56 flex-col gap-2 rounded-md p-2 shadow-md">
      <div className="flex justify-center">
        <Image src="/test_img_01.jpg" alt="product" width={200} height={200} />
      </div>
      <span className="text-wrap">Product Name is best name of name</span>
      <div className="flex items-baseline gap-2">
        <div className="text-lg font-bold text-red-600">
          <span>$</span>
          <span>399</span>
        </div>
        <div className="line-through">
          <span>$</span>
          <span>500</span>
        </div>
      </div>
      <button className="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-1 text-blue-50">
        <svg
          className="fill-blue-50"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
        </svg>
        <span>Add to cart</span>
      </button>
    </li>
  );
}
