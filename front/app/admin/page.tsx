"use client";
import { Main } from "next/document";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type CategoryType = {
  categoryName: String;
  _id: String;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategory] = useState("");
  type CategoryType = {
    categoryName: string;
    _id: String;
  };

  const getCategory = async () => {
    const res = await fetch("http://localhost:3000/category");
    const data = await res.json();
    setCategories(data);
    console.log("category", data);
  };

  const createCategory = async () => {
    const res = await fetch("http://localhost:3000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: "gg",
      }),
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Get, create, and update food categories
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className="border border-gray-200 text-[14px] text-black rounded-full flex items-center gap-2 font-medium "
          >
            {category.categoryName}
            <div className="text-white bg-black rounded-full w-9 h-5 ">20</div>
          </button>
        ))}
        <button
          onClick={() => createCategory()}
          className="flex items-center justify-center h-8 w-8 bg-red-500 text-white text-2xl rounded-full"
        >
          +
        </button>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
