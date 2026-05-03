import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { BookOpenIcon } from "lucide-react"
import { useLocation } from "react-router";

interface NavigationItem {
  title: string;
  url: string;
  items?: NavigationItem[]
  isActive?: boolean;
}

const data: Array<NavigationItem> = [
    {
      title: "Manage Books",
      url: "#",
      items: [
        {
          title: "Directory",
          url: "/admin/books",
        },
        {
          title: "Loan Book",
          url: "/admin/books/loan",
        },
        {
          title: "Return Book",
          url: "/admin/books/return",
        },
      ],
    },
    {
      title: "Members",
      url: "#",
      items: [
        {
          title: "Directory",
          url: "/admin/members",
        },
        {
          title: "Register Member",
          url: "/admin/members/regiter",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "User",
          url: "/settings/user",
        },
        {
          title: "Logout",
          url: "/settings/logout",
        },
      ],
    },
  ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BookOpenIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Pustaka</span>
                <span className="">Personal Library</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<a href={item.url} className="font-medium" />}
                >
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={item.url === location.pathname}
                          render={<a href={item.url} />}
                        >
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
