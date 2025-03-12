import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/utils/ModalContext";

export const metadata = {
  title: "Zenly | Complaint Management System",
  description:
    "This is a system that was built to handle complaints from students on courses they are taking for the semester",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,100..1000;1,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Toast Notifications */}
        <Toaster position="top-center" reverseOrder={false} />
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
