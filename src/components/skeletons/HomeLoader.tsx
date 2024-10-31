import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoader() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]">
      <h2 className="py-10 flex justify-center mx-auto text-xl md:text-5xl font-bold font-sans">
        <Skeleton className="h-12 w-64 md:w-96" />
      </h2>

      <div className="max-w-5xl mx-auto md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-60 md:h-96 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}