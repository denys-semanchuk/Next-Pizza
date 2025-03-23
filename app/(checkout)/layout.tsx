import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
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
      <main className="min-h-screen bg-[#f4f1ee]">
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
}
