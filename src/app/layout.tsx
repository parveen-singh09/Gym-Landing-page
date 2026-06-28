import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../../public/font/satoshi/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/font/satoshi/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/font/satoshi/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/font/satoshi/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/font/satoshi/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/font/satoshi/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/font/satoshi/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/font/satoshi/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/font/satoshi/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../../public/font/satoshi/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--satoshi-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Titan Gym",
  description: "Titan gym landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
