import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UIProvider, useUIContext } from './UiContext';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
    <SidebarProvider>
      <AppSidebar />
      
      <main className="w-full">
      <SidebarTrigger className="sm:hidden"/>
        {children}
      </main>
    </SidebarProvider>
    </UIProvider>
  )
}
