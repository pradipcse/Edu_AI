// src/components/Layout.jsx
import Navbar from "../Header/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
