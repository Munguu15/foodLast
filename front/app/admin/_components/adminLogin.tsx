"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function CreatePasswordPage() {
 const [showPassword, setShowPassword] = useState(false);
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const isFormValid = password.length > 0 && password === confirmPassword;
 return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
     
<div className="bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden p-6 md:p-8 gap-8">
       
<div className="flex flex-col justify-center max-w-sm mx-auto w-full">
<h1 className="text-xl font-bold text-gray-900 mb-2">
           Create new password
</h1>
<p className="text-xs text-gray-400 mb-6 leading-relaxed">
           Set a new password with a combination of letters and numbers for better security.
</p>
<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
           
<div>
<input
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
             />
</div>
           
<div>
<input
               type={showPassword ? "text" : "password"}
               placeholder="Confirm"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all"
             />
</div>
          
<div className="flex items-center gap-2 pt-1">
<input
               type="checkbox"
               id="showPassword"
               checked={showPassword}
               onChange={() => setShowPassword(!showPassword)}
               className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-0 cursor-pointer accent-red-500"
             />
<label
               htmlFor="showPassword"
               className="text-xs text-gray-500 cursor-pointer select-none"
>
               Show password
</label>
</div>
          
<button
             type="submit"
             disabled={!isFormValid}
             className={`w-full py-3 rounded-2xl text-xs font-medium transition-all ${
               isFormValid
                 ? "bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer"
                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
             }`}
>
             Create password
</button>
</form>
</div>
      
<div className="relative rounded-2xl overflow-hidden min-h-[400px] bg-gray-100 flex items-center justify-center">
<img
           src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop"
           alt="Delivery Person"
           className="absolute inset-0 w-full h-full object-cover"
         />
</div>
</div>
</div>
 );
}