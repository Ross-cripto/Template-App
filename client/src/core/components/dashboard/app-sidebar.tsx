import * as React from "react"
import {
  IconFolder,
  IconInnerShadowTop,
  IconUsers,
} from "@tabler/icons-react"

import { NavTemplates } from "@/core/components/dashboard/nav-documents"
import { NavMain } from "@/core/components/dashboard/nav-main"
import { NavUser } from "@/core/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/components/ui/sidebar"
import { Link } from "react-router"

const data = {
  navMain: [
    {
      title: "Listado de usuarios",
      url: "/dashboard",
      icon: IconUsers
    },
  ],
  templates: [
    {
      name: "Listar templates",
      url: "/templates",
      icon: IconFolder
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Templates Space</span> {/* Just for fun. */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTemplates items={data.templates} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
