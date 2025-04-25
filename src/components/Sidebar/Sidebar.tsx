import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SquareKanban, StickyNote, MessageCircleMore } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
  className?: string;
}

const AppSidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const groupItems = [
    {
      group: "Workspace",
      items: [
        {
          id: "boards",
          label: "Boards",
          icon: SquareKanban,
          href: "/boards",
        },
        {
          id: "notes",
          label: "Notes",
          icon: StickyNote,
          href: "/notes",
        },
      ],
    },
  ];

  const menuItems = [
    {
      id: "chat",
      label: "Chat with Yukti",
      icon: MessageCircleMore,
      href: "/chat",
    },
    {
      id: "theme",
      label: "Toggle theme",
      icon: ThemeToggle,
    },
  ];

  return (
    <Sidebar variant="floating" className={`w-1/6 h-screen ${className}`}>
      <SidebarHeader className="text-xl font-bold font-">
        {/* युक्ति */}
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroupContent>
          <SidebarMenu className="ml-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton className="text-[0.68rem] font-[500] w-[90%]">
                  <a
                    className="flex items-center gap-2 w-full"
                    href={item.href}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        {groupItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="text-[0.65rem] font-[500]">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="ml-2">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton className="text-[0.68rem] font-[500] w-[90%]">
                      <a
                        className="flex items-center gap-2 w-full"
                        href={item.href}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
