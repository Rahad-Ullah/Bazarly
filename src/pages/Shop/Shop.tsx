/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import { Separator } from "@/components/ui/separator";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { useGetShopReviewQuery } from "@/redux/features/review/reviewApi";
import { useGetSingleShopQuery } from "@/redux/features/shop/shopApi";
import { IProduct } from "@/types/TProduct";
import { IShop } from "@/types/TShop";
import { MapPin, Phone } from "lucide-react";
import { Rating } from "primereact/rating";
import { useLocation } from "react-router-dom";
import ProductCard from "../Products/ProductUtils/ProductCard";
import { Button } from "@/components/ui/button";
import {
  useFollowShopMutation,
  useGetShopFollowersQuery,
  useUnFollowMutation,
} from "@/redux/features/followedShop/followedShopApi";
import { IFollowedShop } from "@/types/TFollowedShop";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/AuthSlice";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Shop = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetSingleShopQuery(id);
  const shop = data?.data as IShop;

  const { data: reviewsData } = useGetShopReviewQuery(id);
  const rating = reviewsData?.data?.rating;

  const { data: productsData, isFetching } = useGetAllProductsQuery({
    shopId: id,
  });
  const products = productsData?.data || [];

  const { data: followesData } = useGetShopFollowersQuery(id);
  const followers = followesData?.data?.data;
  const isFollow = followers?.find(
    (item: IFollowedShop) => item?.customer?.email === user?.email
  );
  console.log(followesData);
  console.log(isFollow);

  const [follow] = useFollowShopMutation();
  const [unFollow] = useUnFollowMutation();

  const handleFollow = async () => {
    try {
      toast.loading("Pending...", { id: "Follow" });
      const { data } = await follow({ shopId: id });
      if (data?.success) {
        toast.success("Following", { id: "Follow" });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: "Follow" });
    }
  };

  const handleUnfollow = async () => {
    try {
      toast.loading("Pending...", { id: "Follow" });
      const { data } = await unFollow({ shopId: id });
      if (data?.success) {
        toast.success("Unfollowed", { id: "Follow" });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: "Follow" });
    }
  };

  return (
    <div className="bg-slate-50 py-6">
      {!isFetching && (
        <Container>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* left section - shop info */}
            <section className="bg-white border rounded-lg p-6 w-full lg:max-w-xs h-fit">
              <div className="space-y-3">
                <img src={shop?.logoUrl} className="max-w-48 p-2" alt="logo" />
                <h1 className="text-3xl font-bold">{shop?.name}</h1>
                <div className="flex items-center justify-between gap-2 font-semibold">
                  <p>{followers?.length} Followers</p>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="border-primary text-primary"
                    onClick={isFollow ? handleUnfollow : handleFollow}
                  >
                    {isFollow ? "Unfollow" : "Follow"}
                  </Button>
                </div>
                <p className="flex items-center gap-2 text-zinc-700">
                  <MapPin size={20} /> {shop?.shopAddress}
                </p>
                <p className="flex items-center gap-2 text-zinc-700">
                  <Phone size={20} /> {shop?.phoneNumber}
                </p>
              </div>
              <Separator className="my-4" />
              <div>
                <h2 className="text-lg font-bold mb-2">Store Reviews</h2>
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-bold">{rating} out of 5</p>
                  <Rating
                    value={rating}
                    cancel={false}
                    readOnly
                    className="flex gap-1 text-amber-500 mb-1"
                  />
                </div>
                <p className="text-sm">
                  {reviewsData?.data?.reviews?.length} reviews
                </p>
              </div>
              <Separator className="my-4" />
              <div>
                <h2 className="text-lg font-bold mb-2">About the Shop</h2>
                <p className="text-sm text-zinc-800">{shop?.description}</p>
              </div>
            </section>

            {/* right section - top products */}
            <section className="rounded-lg flex-1">
              <h1 className="text-xl font-bold mb-4">
                Top picks from {shop?.name}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products?.map((product: IProduct) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </Container>
      )}
      {isFetching && (
        <Container>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:max-w-xs h-[600px] bg-white rounded-lg p-6">
              <Skeleton className="w-full h-full" />
            </div>
            <section className="bg-white rounded-lg p-6 flex-1">
              <h1 className="text-xl font-bold mb-4">
                <Skeleton className="w-72 h-10" />
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 })?.map((_, idx: number) => (
                  <div key={idx} className="w-full space-y-2">
                    <Skeleton className="w-full h-56" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Shop;
