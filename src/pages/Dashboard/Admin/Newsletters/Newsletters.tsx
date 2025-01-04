import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/shared/Pagination";
import { useState } from "react";
import NewsletterItem from "./NewsletterItem";
import { useGetAllNewslettersQuery } from "@/redux/features/newsletter/newsletterApi";
import { TNewsletter } from "@/types/TNewsletter";

const Newsletters = () => {
  const [page, setPage] = useState(1);

  // get newsletters data
  const { data, isFetching } = useGetAllNewslettersQuery(undefined);
  const newsletters = data?.data;

  const pages = Math.ceil(newsletters?.length / 10);

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <Card className="grid flex-1 h-full shadow-none">
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-2xl font-bold">Newsletters</CardTitle>
            <CardDescription>
              Manage newsletters and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Submit Date
                  </TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching
                  ? Array.from({ length: 5 })?.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                        <TableCell className="">
                          <Skeleton className="w-full h-5" />
                        </TableCell>
                      </TableRow>
                    ))
                  : // display date when fetching completed
                    newsletters?.map((item: TNewsletter, index: number) => (
                      <NewsletterItem key={index} newsletter={item} />
                    ))}
              </TableBody>
              {newsletters?.length < 1 && (
                <TableCaption>
                  {/* show no data found message if bookings is empty */}
                  <div className="text-center w-full mt-14">
                    <h3 className="text-2xl font-bold tracking-tight">
                      You have no newsletters
                    </h3>
                    {/* <p className="text-sm text-muted-foreground">
                        You can start enjoying as soon as you create a category.
                      </p>
                      <Link to={"/newsletters"}>
                        <Button className="mt-4">Go newsletters</Button>
                      </Link> */}
                  </div>
                </TableCaption>
              )}
            </Table>
          </CardContent>
          {/* showing range of pagination */}
          {newsletters?.length > 0 && (
            <CardFooter className="">
              <CustomPagination
                page={page}
                setPage={setPage}
                pages={pages}
                align="start"
              />
              <div className="hidden md:block text-xs text-muted-foreground">
                Showing <strong>1-{newsletters?.length}</strong> of{" "}
                <strong>{newsletters?.length}</strong> items
              </div>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Newsletters;
