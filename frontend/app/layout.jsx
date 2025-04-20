import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = {
  title: "Organizá todas tus tareas desde cualquier lado!",
  description: "App web para gestionar tur tareas",
  keywords: ["Tareas", "Organización"],
  authors: ["Brenda Giambelluca"],
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/x-icon"
    }
  }
};

export default function RootLayout({ children }) {

  const bodyStyle = "min-h-screen flex flex-col bg-gray-100";
  const mainStyle = "flex-1";
  return (
    <html lang="es-ar">
      <body className={bodyStyle}>
        <Header />
        <main className={mainStyle}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
