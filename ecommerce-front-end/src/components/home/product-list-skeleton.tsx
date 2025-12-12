import { Skeleton } from "../ui/skeleton";

export const ProductListSkeleton = () => {
  return (
    <div>
       <h1 className="text-2xl font-medium md:text-2xl flex justify-center md:justify-start">Produtos mais vistos</h1>  
       <p className="text-[#7F7F7F] md:text-lg flex justify-center md:justify-start ">Campeões de visualização da nossa loja.</p>   
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
