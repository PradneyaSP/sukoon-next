"use client"

import * as React from "react"
import {
  LifeBuoy,
  Send,
  BookOpenCheck,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Assessments",
      url: "#",
      icon: BookOpenCheck,
      isActive: true,
      items: [
        { title: "Depression", url: "assmt/depression" },
        { title: "Anxiety", url: "assmt/anxiety" },
        { title: "Bipolar", url: "assmt/bipolar-disorder" },
        // { title: "OCD", url: "assmt/ocd" },
        // { title: "PTSD", url: "assmt/ptsd" },
        // { title: "Schizophrenia", url: "assmt/schizophrenia" },
        { title: "ADHD", url: "assmt/adhd" },
        // { title: "Eating Disorders", url: "assmt/eating-disorders" },
        // { title: "Substance Use", url: "assmt/substance-use-disorders" },
        // { title: "Personality Disorders", url: "assmt/personality-disorders" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src="/bigLogo.png" alt="Sukoon" width={50} height={50} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Sukoon</span>
                  <span className="truncate text-xs"></span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
