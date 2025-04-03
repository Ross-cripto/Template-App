import { Separator } from "@/core/components/ui/separator"
import { SidebarTrigger } from "@/core/components/ui/sidebar"
import { useLocation } from "react-router"
import { useMemo } from "react"
import { ModeToggle } from "@/core/themes/modle-toogle";


export function SiteHeader() {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== "");
    if (pathSegments.length > 0) {
      return pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1);
    } else {
      return "Dashboard"; 
    }
  }, [location.pathname]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2 px-4 lg:gap-2 lg:px-6">
      <ModeToggle />
      </div>
    </header>
  )
}