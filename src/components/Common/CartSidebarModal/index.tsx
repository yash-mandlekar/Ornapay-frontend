"use client";
import React, { useEffect } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeItemFromCart,
  selectTotalPrice,
} from "@/redux/features/cart/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { X, ShoppingBag, Eye, CreditCard } from "lucide-react";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, closeCartModal]);

  return (
    <div
      className={`fixed top-0 left-0 z-99999 overflow-y-auto no-scrollbar w-full h-screen ease-linear duration-300 ${
        isCartModalOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-end">
        <div
          className="w-full max-w-[500px] bg-white px-4 sm:px-7.5 lg:px-11 relative modal-content"
          style={{
            boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <div
            className="sticky top-0 bg-white flex items-center justify-between pb-6 pt-4 sm:pt-7.5 lg:pt-11 border-b-2 mb-7.5"
            style={{ borderColor: "#e5d9d0" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  backgroundColor: "#f5f1ed",
                  border: "2px solid #e5d9d0",
                }}
              >
                <ShoppingBag className="w-5 h-5" style={{ color: "#832729" }} />
              </div>
              <h2
                className="font-bold text-xl sm:text-2xl"
                style={{ color: "#4F1719" }}
              >
                Your Cart
              </h2>
            </div>
            <button
              onClick={() => closeCartModal()}
              aria-label="button for close modal"
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ease-out hover:scale-110"
              style={{
                backgroundColor: "#f5f1ed",
                color: "#832729",
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="h-[66vh] overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-6">
              {cartItems.length > 0 ? (
                cartItems.map((item, key) => (
                  <SingleItem
                    key={key}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className="border-t-2 bg-white pt-6 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0"
            style={{ borderColor: "#e5d9d0" }}
          >
            {/* Subtotal */}
            <div
              className="flex items-center justify-between gap-5 mb-6 p-4 rounded-xl"
              style={{
                backgroundColor: "#f5f1ed",
                border: "2px solid #e5d9d0",
              }}
            >
              <p className="font-semibold text-lg" style={{ color: "#4F1719" }}>
                Subtotal:
              </p>
              <p className="font-bold text-2xl" style={{ color: "#832729" }}>
                ₹{totalPrice}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                onClick={() => closeCartModal()}
                href="/cart"
                className="w-full flex items-center justify-center gap-2 font-semibold text-white py-3.5 px-6 rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: "#832729",
                  boxShadow: "0 4px 15px rgba(131, 39, 41, 0.3)",
                }}
              >
                <Eye className="w-5 h-5" />
                View Cart
              </Link>

              <Link
                onClick={() => closeCartModal()}
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 font-semibold text-white py-3.5 px-6 rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: "#4F1719",
                  boxShadow: "0 4px 15px rgba(79, 23, 25, 0.3)",
                }}
              >
                <CreditCard className="w-5 h-5" />
                Checkout
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-4 text-center">
              <p className="text-xs font-medium" style={{ color: "#666666" }}>
                🔒 Secure Checkout · Free Shipping on Orders Over ₹5000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;
