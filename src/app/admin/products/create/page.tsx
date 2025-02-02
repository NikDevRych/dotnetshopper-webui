"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ProductInput = {
  name: string;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
};

export default function AdminProductCreate() {
  const [imageFile, setImageFile] = useState<FileList | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();

  const onSubmit: SubmitHandler<ProductInput> = async (data) => {
    try {
      if (imageFile != null) {
        const formData = new FormData();
        formData.append("image", imageFile[0]);

        await fetch("/api/image", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => (data.imageUrl = res.imagePath));
      }

      await fetch("http://localhost:5063/api/product", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      // TODO: change to error message in UI
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-4xl font-bold text-gray-400">Create product</span>
      <span className="text-2xl font-bold text-gray-600">
        General Product information:
      </span>

      <form
        className="mt-4 flex flex-col gap-4 text-gray-600"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="text-xl" htmlFor="name">
              Product name <span className="text-red-800">*</span>
            </label>
            {errors.name && (
              <span className="text-red-800">The name field is required</span>
            )}
          </div>
          <input
            className="h-10 rounded-md border"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="text-xl" htmlFor="price">
              Product price <span className="text-red-800">*</span>
            </label>
            {errors.price && (
              <span className="text-red-800">The price field is required</span>
            )}
          </div>
          <input
            className="h-10 rounded-md border"
            type="text"
            id="price"
            {...register("price", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xl" htmlFor="picture">
            Product picture <span className="text-red-800">*</span>
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            accept="image/jpeg, image/png"
            onChange={(e) => setImageFile(e.target.files)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            className="h-10 rounded-md border"
            type="checkbox"
            id="isActive"
            {...register("isActive")}
          />
          <label className="text-xl" htmlFor="isActive">
            Product is active <span className="text-red-800">*</span>
          </label>
        </div>

        <button type="submit" className="rounded-md p-2 shadow-md">
          Save
        </button>
      </form>
    </div>
  );
}
