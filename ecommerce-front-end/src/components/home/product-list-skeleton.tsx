import { Skeleton } from "../ui/skeleton";

export const ProductListSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-56 h-8 rounded-lg" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((item, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="w-full h-80 rounded-xl bg-gray-400" />
            <Skeleton className="mt-2 w-full h-7 rounded-xl bg-gray-400" />
            <Skeleton className="mt-2 w-16 h-5 rounded-xl bg-gray-400" />
            <Skeleton className="mt-2 w-full h-9 rounded-xl bg-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
