
import { SiteHeader } from "@/core/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar"
import { AppSidebar } from "@/core/components/dashboard/app-sidebar"
import { Outlet } from "react-router";
import { ThemeProvider } from "@/core/themes/theme-provider";


const DashboardLayout = () => {

  /* 
    * Main layout for the dashboard.
  */

  return (
    <SidebarProvider>
    <AppSidebar variant="inset"  />
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <SidebarInset>
      <SiteHeader />
        <Outlet />
      </SidebarInset>
    </ThemeProvider>
      </SidebarProvider>
  );
};


export default DashboardLayout