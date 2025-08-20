import AppBar from "@/components/sidebar/AppBar";
import { AppSidebar } from "@/components/sidebar/appside-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <section className="w-full">
        <AppBar title="Dashboard" />
        <main className="max-w-8xl mx-4">{children}</main>
      </section>
    </SidebarProvider>
  );
}
