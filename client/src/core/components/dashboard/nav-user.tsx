import {
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/core/components/ui/sidebar";
import { useAuth } from "@/core/context/auth-context";
import { useNavigate } from "react-router"; 
import Loader from "@/core/components/loading-snipper";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user: authUser, logout } = useAuth(); 
  const navigate = useNavigate();

  
  const handleLogout = () => {
    logout(); 
    navigate("/users/login", { replace: true }); 
  };


  if (!authUser) {
    return <Loader />; 
  }
  const imageUrl = authUser.picture;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={imageUrl} alt={authUser.name} />
                <AvatarFallback className="rounded-lg">
                  {authUser.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{authUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {authUser.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout}> {/* Llama a la función handleLogout */}
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}