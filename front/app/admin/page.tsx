"use client";

import { useState } from "react";
import { LayoutGrid, ShoppingBag } from "lucide-react";
import { FoodMenu } from "./foodMenu";
import { AdminOrders } from "./orders";

export default function AdminPage() {
  const [tab, setTab] = useState<"menu" | "orders">("menu");

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white p-6 flex flex-col justify-between border-r">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center overflow-hidden">
              <img src="/images/NomnomLogo.png" alt="logo" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 leading-none">NomNom</h1>
              <span className="text-[10px] text-gray-400">Swift delivery</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => setTab("menu")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-full text-sm font-medium ${
                tab === "menu"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid size={18} />
              Food menu
            </button>
            <button
              type="button"
              onClick={() => setTab("orders")}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-full text-sm font-medium ${
                tab === "orders"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <ShoppingBag size={18} />
              Orders
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <div className="w-9 h-9 rounded-full bg-purple-500 overflow-hidden border-2 border-white shadow-sm">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
            />
          </div>
        </div>
        {tab === "menu" ? <FoodMenu /> : <AdminOrders />}
      </main>
    </div>
  );
};
