import { Plus } from "lucide-react";
export const FoodList = () => {
  return (
    <div className="">
      <p className="mb-4 text-[13px] font-semibold text-white text-left mt-6">
        Appetizers
      </p>
      <div className="grid grid-cols-3 gap-4 max-sm: grid-cols-2 max-sm:gap-3 ">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col w-full shadow-sm">
        <div className="relative w-full h-36 bg-gray-100 ">
          <img
            src="/images/foodlist1.png"
            alt="list1"
            className="w-full h-full object-cover"
          />
          <button
          type="button"
          aria-label="Add item"
          className="absolute bottom-2 right-2  hover: bg-gray-50 text-red-500 rounded-full p-2 shadow-md transition-all active-scale-95 flex item-center justify-center"
          >
            <Plus className="w-4 h-4 text-red-500 "/>
          </button>
        </div>
        <div className="p-3 flex flex-col justify-between bg-white">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-red-500 text-xs truncate">Brie Crostini Appetizer</h3>
              <span className="font-bold text-gray-900 text-xs">$12.99</span>
            </div>
            <p className="text-[10px] text-gray-900 text-xs">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
        </div>
      </div>
          
      
    </div>
      <div className="grid grid-cols-3 gap-4 max-sm: grid-cols-2 max-sm:gap-3 ">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col w-full shadow-sm">
        <div className="relative w-full h-36 bg-gray-100 ">
          <img
            src="/images/foodlist1.png"
            alt="list1"
            className="w-full h-full object-cover"
          />
          <button
          type="button"
          aria-label="Add item"
          className="absolute bottom-2 right-2  hover: bg-gray-50 text-red-500 rounded-full p-2 shadow-md transition-all active-scale-95 flex item-center justify-center"
          >
            <Plus className="w-4 h-4 text-red-500 "/>
          </button>
        </div>
        <div className="p-3 flex flex-col justify-between bg-white">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-red-500 text-xs truncate">Brie Crostini Appetizer</h3>
              <span className="font-bold text-gray-900 text-xs">$12.99</span>
            </div>
            <p className="text-[10px] text-gray-900 text-xs">Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
        </div>
      </div>
          
      
    </div>
    
    </div>
  );
};
