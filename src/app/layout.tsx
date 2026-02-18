import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { company } from "@/content/company";
import { ProfitbaseFloatingWidget } from "@/components/ProfitbaseFloatingWidget";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.companyName} — застройщик в Якутске`,
    template: `%s | ${company.companyName}`,
  },
  description:
    `Застройщик ${company.companyName}: жильё и городская среда в Якутске. Проекты ЖК Крепость, ЖК Гастелло. Опыт, качество, прозрачность.`,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ProfitbaseFloatingWidget />
      </body>
    </html>
  );
}
