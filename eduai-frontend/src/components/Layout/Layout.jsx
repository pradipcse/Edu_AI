// src/components/Layout.jsx
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
