import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoader() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-9 w-64 mb-6" />

      <Tabs defaultValue="invitations" className="space-y-4">
        <TabsContent value="invitations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
                  <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Skeleton className="h-10 w-48" />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videoGroups">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
                  <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex items-center justify-center">
              <Skeleton className="h-10 w-48" />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}