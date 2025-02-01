"use client";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ProductInput = {
  name: string;
  price: number;
  imageUrl: string | null;
  isActive: boolean;
};

// TODO: remove from this file, create service and read from .env
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:9000",
  forcePathStyle: true,
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: {
    accessKeyId: "tLQFyEyn8BR7n0UhNJOG",
    secretAccessKey: "7SRa2PwmznTonElpmj6hNeJrR2jwhGz21MQ6owwn",
  },
});

export default function AdminProductCreate() {
  const [imageFile, setImageFile] = useState<FileList | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();
  const onSubmit: SubmitHandler<ProductInput> = async (data) => {
    try {
      let imagePath: string | null;
      if (imageFile != null) {
        const response = await s3.send(
          new PutObjectCommand({
            Bucket: "products",
            Key: `${imageFile[0].name.trim()}`,
            Body: imageFile[0],
          }),
        );

        if (response.$metadata.httpStatusCode != 200) {
          throw new Error("Image not uploaded!");
        }

        // TODO: send to server like imageUrl
        imagePath = `http://127.0.0.1:9000/products/${imageFile[0].name.trim()}`;
        data.imageUrl = imagePath;
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
