import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
// import PaginationBar from "@/components/PaginationBar";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Aven888Shop`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
//   const currentPage = parseInt(page);

//   const pageSize = 6;

//   const totalItemCount = await prisma.product.count({
//     where: {
//       name: { contains: query, mode: "insensitive" },
//     },
//   });

//   const totalPages = Math.ceil(totalItemCount / pageSize);

  const products = await prisma.product.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    orderBy: { id: "desc" },
    // skip: (currentPage - 1) * pageSize,
    // take: pageSize,
  });

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPage={totalPages} />
      )} */}
    </div>
  );
}
