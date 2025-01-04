import { TableCell, TableRow } from "@/components/ui/table";
import DeleteConfirmModal from "@/components/shared/DeleteConfirmModal";
import { Trash } from "lucide-react";
import { TCoupon } from "@/types/TCoupon";
import { useDeleteCouponMutation } from "@/redux/features/coupon/couponApi";
import { formatDate } from "@/utils/formatDate";
import EditCouponModal from "./EditCouponModal";
import { toast } from "sonner";

const CouponsItem = ({ coupon }: { coupon: TCoupon }) => {
  // delete coupon
  const [deleteCoupon] = useDeleteCouponMutation();
  const handleDelete = async (id: string) => {
    toast.loading("Pending...", { id: "Edit_Coupon" });
    try {
      const res = await deleteCoupon(id).unwrap();
      if (res.success) {
        toast.success("Successfully deleted", { id: "Edit_Coupon" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: "Edit_Coupon",
      });
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <p>{coupon?.code}</p>
      </TableCell>
      <TableCell className="">
        <p className="">{coupon?.discountAmount}</p>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDate(new Date(coupon?.startTime))}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatDate(new Date(coupon?.endTime))}
      </TableCell>
      <TableCell className="">{coupon?.usageLimit}</TableCell>
      <TableCell className="hidden md:table-cell">
        {coupon?.totalUsageLimit || "Unlimited"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {coupon?.usedCount}
      </TableCell>
      <TableCell className="md:space-x-2">
        <EditCouponModal coupon={coupon} />
        {/* delete coupon button */}
        <DeleteConfirmModal
          children={<Trash />}
          deleteFunc={handleDelete}
          itemName="coupon"
          itemId={coupon?.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default CouponsItem;
