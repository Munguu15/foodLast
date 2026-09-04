"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  quantity: number;
  food?: { foodName?: string; price?: number };
};

type OrderType = {
  _id: string;
  totalPrice: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createAt?: string;
  foodOrderItems?: OrderItem[];
  user?: { name?: string; email?: string };
};

const API = "http://localhost:8000";

export const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    const res = await fetch(`${API}/order`);
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
  };

  const updateStatus = async (id: string, status: OrderType["status"]) => {
    await fetch(`${API}/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Items</th>
                <th className="py-2 pr-3">Total</th>
                <th className="py-2 pr-3">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b last:border-0">
                  <td className="py-3 pr-3">{index + 1}</td>
                  <td className="py-3 pr-3">
                    {(order.foodOrderItems || [])
                      .map(
                        (item) =>
                          `${item.food?.foodName || "Food"} x${item.quantity}`,
                      )
                      .join(", ") || "—"}
                  </td>
                  <td className="py-3 pr-3 font-medium">${order.totalPrice}</td>
                  <td className="py-3 pr-3 text-gray-500">
                    {order.createAt
                      ? new Date(order.createAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="py-3">
                    <select
                      className="h-9 rounded-lg border px-2"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value as OrderType["status"],
                        )
                      }
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
