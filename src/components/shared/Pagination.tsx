/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type props = {
  pages: number;
  page: number;
  setPage: (page: number) => void;
  align?: string;
};

const CustomPagination = ({ pages, page, setPage, align }: props) => {
  return (
    <Pagination className={`md:justify-${align} flex-1`}>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <Button
            onClick={() => setPage(page - 1)}
            variant={"ghost"}
            className="px-0 cursor-pointer"
            disabled={page <= 1}
          >
            <PaginationPrevious />
          </Button>
        </PaginationItem>
        {Array.from({ length: pages }).map((_: any, index: number) => (
          <PaginationItem key={index}>
            <Button
              onClick={() => {
                setPage(index + 1);
              }}
              variant={page === index + 1 ? "default" : "ghost"}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => setPage(page - 1)}
            variant={"ghost"}
            className="px-0 cursor-pointer"
            disabled={page >= pages}
          >
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
