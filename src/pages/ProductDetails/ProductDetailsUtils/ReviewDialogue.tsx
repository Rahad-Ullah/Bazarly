import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import { useGetProductOrdersQuery } from "@/redux/features/order/orderApi";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/TProduct";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function ReviewDialogue({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview] = useCreateReviewMutation();

  const { data } = useGetProductOrdersQuery(product?.id);
  const orderData = data?.data;

  // verify that if user logged in
  const user = useAppSelector(selectCurrentUser);
  const handleVerifyUser = () => {
    if (!user) {
      navigate("/login");
    }
  };

  //   handle submit
  const hangleSubmit = async () => {
    toast.loading("Loading...", { id: "Review" });

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const res = await createReview({
      rating,
      comment,
      productId: product.id,
    }).unwrap();
    if (res.success) {
      toast.success("Successfully submitted", { id: "Review" });
    } else {
      toast.error("Something went wrong", { id: "Review" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleVerifyUser}
          variant={"outline"}
          className="border-primary border-2 font-bold text-primary hover:bg-primary hover:text-white"
        >
          Write a Review
        </Button>
      </DialogTrigger>
      {orderData?.length ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Rating
              value={rating}
              cancel={false}
              onChange={(e) => setRating(e.value as number)}
              className="flex gap-1 text-primary mb-4"
              style={{ fontSize: "40px" }}
            />
            <div className="grid items-center gap-4">
              <Textarea
                id="comment"
                placeholder="Write here..."
                className="col-span-3"
                onChange={(e) => setComment(e.target.value as string)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={hangleSubmit} type="submit">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Purchase Product First</DialogTitle>
            <DialogDescription>
              Please purchase this product first and then share your experience
              with this product.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button>Okay</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
