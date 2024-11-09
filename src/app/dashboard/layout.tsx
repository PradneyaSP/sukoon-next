import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers";

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMentor = cookies().get("isMentor")?.value === "true";
    return (
        <div>
            <SidebarProvider>
                <AppSidebar isMentor={isMentor}/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </div>
                    </header>
                    {children}  
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
