import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "ZAHRA",
  description: "Luxury perfumes & essentials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={spaceGrotesk.variable}>
      <body
        className="
          min-h-screen
          bg-white
          text-black
          antialiased
          font-sans
        "
      >
        {children}
      </body>
    </html>
  );
}