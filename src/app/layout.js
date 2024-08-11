import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "./Providers";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager App",
  description: "Task Manager App with role based",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
        <Providers>
          <Header/>
          <ToastContainer transition={Slide} newestOnTop />
          {children}
          <Footer/>
        </Providers>
        </div>
        </body>
    </html>
  );
}
