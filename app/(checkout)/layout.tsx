import { Header } from "@/shared/components/shared";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Next Pizza | Cart",
  description: "Order your favorite pizza with Next Pizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header hasSearch={false} hasCart={false} />
      <main className="min-h-screen bg-[#f4f1ee]">{children}</main>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&language=en`}
        strategy="beforeInteractive"
      />
    </>
  );
}
