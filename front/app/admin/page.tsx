"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/api";
import { FoodMenu } from "./_components/foodMenu";
import { AdminOrders } from "./_components/orders";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"menu" | "orders">("menu");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== "ADMIN") {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white p-6 flex flex-col justify-between border-r">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 relative rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/images/NomnomLogo.png"
                alt="logo"
                className=" object-contain absolute "
              />
            </div>
            <div>
              <h1 className="font-bold text-gray-800 leading-none">NomNom</h1>
              <span className="text-[10px] text-gray-400">Swift delivery</span>
            </div>
          </Link>

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
}
