import { Footer, SidebarMenu, TopMenu } from "@/components/ui";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <SidebarMenu />
      <div className="px-0 sm:px-10">
        {children}
      </div>

      <Footer />
    </main>
  );
}
