import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    _id: "",
    title: "",
    excerpt: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    images: [],
    category: {
      _id: "",
      name: "",
      slug: "",
      parent: null,
      description: "",
      image: "",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    brand: "",
    SKU: "",
    variants: [],
    attributes: [],
    slug: "",
    createdAt: "",
    updatedAt: "",
  },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;