export default function AdminProductCreate() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-4xl font-bold text-gray-400">Create product</span>
        <span className="text-2xl font-bold text-gray-600">
          General Product information:
        </span>
        <form className="mt-4 flex flex-col gap-4 text-gray-600" action="#">
          <div className="flex flex-col gap-1">
            <label className="text-xl" htmlFor="name">
              Product name <span className="text-red-800">*</span>
            </label>
            <input
              className="h-10 rounded-md border"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xl" htmlFor="price">
              Product price <span className="text-red-800">*</span>
            </label>
            <input
              className="h-10 rounded-md border"
              type="text"
              name="price"
              id="price"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xl" htmlFor="salePrice">
              Product sale price
            </label>
            <input
              className="h-10 rounded-md border"
              type="text"
              name="salePrice"
              id="salePrice"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xl" htmlFor="picture">
              Product picture <span className="text-red-800">*</span>
            </label>
            <input type="file" name="picture" id="picture" />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="h-10 rounded-md border"
              type="checkbox"
              name="isActive"
              id="isActive"
            />
            <label className="text-xl" htmlFor="isActive">
              Product is active <span className="text-red-800">*</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="h-10 rounded-md border"
              type="checkbox"
              name="inSale"
              id="inSale"
            />
            <label className="text-xl" htmlFor="inSale">
              Product in sale
            </label>
          </div>
          <button className="rounded-md p-2 shadow-md">Save</button>
        </form>
      </div>
    </>
  );
}
