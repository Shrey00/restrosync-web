'use client'

// import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// const SidebarButton = ({ icon, text, isExpanded }: { icon: React.ReactNode, text: string, isExpanded: boolean }) => (
//   <Button variant="ghost" className="w-full justify-start px-2">
//     <span className={cn("transition-all duration-300", 
//       isExpanded ? "mr-2" : "mr-0")}>
//       {icon}
//     </span>
//     <span className={cn("transition-all duration-300", 
//       isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0")}>
//       {text}
//     </span>
//   </Button>
// )

export default function Page() {
  return (
    <div className="relative h-screen overflow-hidden">
      <main className={cn(
        "h-full p-8 text-foreground",
        "transition-all duration-300 ease-in-out",
        "ml-12"
      )}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p>Select an option from the sidebar to get started.</p>
          <div className="mt-8 p-4 bg-secondary rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium">Total Orders</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium">Revenue</h3>
                <p className="text-2xl font-bold">$45,678</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium">New Customers</h3>
                <p className="text-2xl font-bold">56</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
