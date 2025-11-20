import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ornapay",
  description: "Jwellery Store"
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
