import React from "react";

interface SearchPaginationProps {
  setSearchParams: (params: { [key: string]: string }) => void;
  setCurrentPage: (page: number) => void;
  pages: number;
  currentPage: number;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  setSearchParams,
  setCurrentPage,
  pages,
  currentPage,
}) => {
  return (
    <div className="py-6 flex justify-center items-center gap-3">
      {currentPage > 1 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setSearchParams({ page: (currentPage - 1).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {"<"}
        </div>
      )}

      {currentPage > 3 && (
        <div
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ page: "1" });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          1
        </div>
      )}

      {currentPage > 4 && <div className="ellipsis">...</div>}

      {currentPage == pages && currentPage > 3 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage - 2);
            setSearchParams({ page: (currentPage - 2).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage - 3}
        </div>
      )}
      {currentPage > 2 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage - 2);
            setSearchParams({ page: (currentPage - 2).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage - 2}
        </div>
      )}
      {currentPage > 1 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setSearchParams({ page: (currentPage - 1).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage - 1}
        </div>
      )}

      <div className="h-10 aspect-square flex justify-center items-center bg-main text-textHead cursor-pointer">
        {currentPage}
      </div>

      {currentPage < pages - 1 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setSearchParams({ page: (currentPage + 1).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage + 1}
        </div>
      )}

      {currentPage < pages - 2 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage + 2);
            setSearchParams({ page: (currentPage + 2).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage + 2}
        </div>
      )}
      {currentPage == 1 && currentPage < pages - 1 && (
        <div
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setSearchParams({ page: (currentPage + 1).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {currentPage + 3}
        </div>
      )}
      {currentPage < pages - 3 && <div className="ellipsis">...</div>}

      {currentPage < pages && (
        <div
          onClick={() => {
            setCurrentPage(pages);
            setSearchParams({ page: pages.toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {pages}
        </div>
      )}

      {/* Next page button */}
      {currentPage < pages && (
        <div
          onClick={() => {
            setCurrentPage(currentPage + 1);
            setSearchParams({ page: (currentPage + 1).toString() });
          }}
          className="h-10 aspect-square flex justify-center items-center bg-white/5 hover:bg-white/10 text-textHead cursor-pointer"
        >
          {">"}
        </div>
      )}
    </div>
  );
};

export default SearchPagination;
