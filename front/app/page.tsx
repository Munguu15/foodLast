"use client";
import Image from "next/image";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { FoodList } from "./_components/foodList";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#404040] text-white items-center px-4 ">
      <div className="flex flex-col w-[1669px] mx-auto">
        <Header />
       
      </div>
      <div>
         <Hero />
        <FoodList/>
      </div>
      
    </div>
  );
}
