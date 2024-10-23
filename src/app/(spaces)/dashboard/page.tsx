import Dashboard from "@/components/dashboard/dashboard";
import DashboardLoader from "@/components/skeletons/dashboard-loader";
import { Suspense } from "react";

export default function DashboardLayout(){

  return (
    <Suspense fallback={<DashboardLoader/>}>
      <Dashboard/>
    </Suspense>
  )
}