import { MapPin, ShoppingCart, User, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
   
    <header className="w-full bg-[#18181B] text-white py-3 px-6 md:px-12 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-red-500 p-2 rounded-full flex items-center justify-center">
          <img src="/images/NomnomLogo.png"
                alt="Nomnom"
                className="w-8 h-8 object-contain"/>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg tracking-tight">NomNom</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">
              Swift delivery
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-red-500 hover:bg-gray-100 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Delivery address</span>
          </button>

          <button
            aria-label="Shopping Cart"
            className="bg-white text-zinc-800 hover:bg-gray-100 p-2 rounded-full shadow-sm transition flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>

          <button
            aria-label="User Profile"
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-sm transition flex items-center justify-center"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
      
    </header>
    
  );
};
