import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  const pagesArray: number[] = [];
  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="flex items-center justify-center mt-2 mb-10 ">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?page=${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`${route}?page=${page}`}
          className={` ${
            pageNumber === page ? "bg-gray-400" : ""
          }  border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?page=${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
