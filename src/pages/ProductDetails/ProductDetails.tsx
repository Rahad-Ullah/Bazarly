/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";
import { IProduct } from "@/types/TProduct";
import {
  HandCoins,
  MinusIcon,
  PlusIcon,
  ShieldOff,
  ShoppingCart,
  Store,
  Truck,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RelatedProductCard from "./ProductDetailsUtils/RelatedProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import ReviewCard from "./ProductDetailsUtils/ReviewCard";
import { Rating } from "primereact/rating";
import { useGetProductReviewQuery } from "@/redux/features/review/reviewApi";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ReviewDialogue } from "./ProductDetailsUtils/ReviewDialogue";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const user = useAppSelector(selectCurrentUser);

  const { data, isFetching } = useGetSingleProductQuery({
    id,
    userEmail: user?.email,
  });
  const product = data?.data;
  const { data: reviewData } = useGetProductReviewQuery({ productId: id });

  const { data: relatedProductsData } = useGetAllProductsQuery({
    category: product?.category?.name,
    limit: 6,
  });

  const relatedProducts = relatedProductsData?.data as IProduct[];

  const price = product?.price;
  const totalPrice = price + product?.discount;
  const discountParcent = (product?.discount / totalPrice) * 100;

  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        price,
      })
    );
  };

  return (
    <div>
      {isFetching ? (
        <Container>
          {/* skeleton for loading */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
            <div className="w-full">
              <Skeleton className="w-full md:w-64 lg:w-80 h-72" />
            </div>
            <div className="w-full space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-48 h-12" />
              <Skeleton className="w-60 h-16" />
            </div>
            <div className="w-full">
              <Skeleton className="w-full max-w-xs h-80" />
            </div>
          </div>
        </Container>
      ) : (
        <div>
          {/* product and delivery section */}
          <Container>
            <section className="flex flex-col lg:flex-row justify-between gap-10 my-12">
              <div className="flex flex-col md:flex-row gap-10">
                {/* image */}
                <div className="w-full md:w-64 lg:w-80 max-w-sm">
                  <img
                    src={product?.image}
                    alt="product-image"
                    className="rounded w-full"
                  />
                </div>
                {/* product info */}
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-bold mb-2">
                    {product?.name}
                  </h1>
                  {/* category */}
                  <h3 className="md:text-lg font-semibold mb-2">
                    <span className="font-bold">Category:</span>{" "}
                    {product?.category?.name}
                  </h3>
                  {/* rating */}
                  <div>
                    <Rating
                      value={reviewData?.data?.rating}
                      cancel={false}
                      readOnly
                      className="flex gap-1 text-amber-500 mb-4"
                    />
                  </div>
                  {/* stock status */}
                  <div
                    className={`w-fit p-2 px-4 ${
                      product?.stock > 0 ? "bg-green-500" : "bg-red-500"
                    } bg-opacity-10 rounded-full`}
                  >
                    <h1>
                      Status:{" "}
                      <span
                        className={`font-bold ${
                          product?.stock < 1 && "text-red-500"
                        }`}
                      >
                        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </h1>
                  </div>
                  {/* Price */}
                  <h2 className="py-6 text-base">
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      ৳{price}
                    </span>
                    <p className="space-x-2">
                      <span className="line-through text-zinc-700">
                        ৳{totalPrice}
                      </span>
                      <span>{`-${discountParcent}%`}</span>
                    </p>
                  </h2>

                  <div className="flex flex-wrap md:flex-row items-center gap-2 md:gap-6">
                    {/* item counter */}
                    <div className="inline-flex items-center gap-2 p-2 py-1 md:p-3 md:py-2 my-2 bg-gray-200 rounded-full">
                      <Button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className="rounded-full p-1.5 h-8"
                      >
                        <MinusIcon size={20} />
                      </Button>
                      <Input
                        value={quantity}
                        readOnly
                        className="px-1 w-10 text-center bg-transparent border-none focus-visible:ring-0 focus-visible:ring-white text-xl"
                      />
                      <Button
                        onClick={() =>
                          quantity < product?.stock && setQuantity(quantity + 1)
                        }
                        className="rounded-full p-1.5 h-8"
                      >
                        <PlusIcon size={20} />
                      </Button>
                    </div>
                    {/* Add To cart button */}
                    <Button
                      disabled={product?.quantity < 1}
                      onClick={handleAddToCart}
                      className="text-base flex items-center gap-2 py-6 md:p-7 rounded-full"
                    >
                      <ShoppingCart className="size-6" /> Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
              {/* delivery information */}
              <div className="max-h-fit border p-4 w-full lg:w-fit rounded-lg">
                <div>
                  <h3 className="text-sm font-bold">Delivery Options</h3>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <Truck className="text-zinc-500" />
                      <div>
                        <p>Standard Delivery</p>
                        <p className="text-sm text-zinc-500">
                          Guaranteed within 3-5 days
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">৳ 60</p>
                  </div>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <HandCoins className="text-zinc-500" />
                      <div>
                        <p>Cash on Delivery Available</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div>
                  <h3 className="text-sm font-bold">Return & Warranty </h3>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <Undo2 className="text-zinc-500" />
                      <div>
                        <p>7 Days Returns</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-12 py-3">
                    <div className="flex gap-3 items-center">
                      <ShieldOff className="text-zinc-500" />
                      <div>
                        <p>Warranty Not Available</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div>
                  <h3 className="text-sm font-bold">Sold By</h3>
                  <div className="flex justify-between items-center gap-12 py-4">
                    <div className="flex gap-3 items-center">
                      <Store className="text-zinc-500" />
                      <div>
                        <Link
                          to={`/shops/${product?.shop?.id}`}
                          className="font-bold hover:text-primary"
                        >
                          {product?.shop?.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Container>
          {/* description and reviews section */}
          <section className="bg-[#F2F4F8]">
            <Container>
              <div className="flex py-8 gap-6 flex-col lg:flex-row">
                <div className="flex-1 space-y-6">
                  {/* description */}
                  <div className="bg-white p-6 rounded-lg">
                    <div className="mb-4">
                      <h1 className="text-xl font-bold">Description</h1>
                    </div>
                    <article className="prose ">{product?.description}</article>
                  </div>
                  {/* reviews */}
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                      <div>
                        <h1 className="text-xl font-bold">
                          Reviews ({reviewData?.data?.reviews?.length})
                        </h1>
                        <p className="text-zinc-700">
                          Get specific details about this product from customers
                          who own it.
                        </p>
                      </div>
                      <ReviewDialogue product={product} />
                    </div>
                    <div>
                      {reviewData?.data?.reviews?.length > 0 ? (
                        reviewData?.data?.reviews?.map((review: any) => (
                          <ReviewCard review={review} key={review?.id} />
                        ))
                      ) : (
                        <p className="text-center text-zinc-600 py-4">
                          No Review Found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* related products */}
                {relatedProducts?.length > 0 && (
                  <div className="bg-white p-6 rounded-lg w-full lg:max-w-[420px]">
                    <h1 className="text-xl font-semibold text-center text-primary pb-4">
                      Related Products
                    </h1>
                    <div>
                      {relatedProducts.map((item: IProduct) => (
                        <RelatedProductCard key={item.id} product={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
