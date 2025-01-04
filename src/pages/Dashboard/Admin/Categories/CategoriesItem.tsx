import { TableCell, TableRow } from "@/components/ui/table";
import { TCategory } from "@/types/TCategory";
import EditcategoryModal from "./EditCategoryModal";

import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import { toast } from "sonner";
import DeleteConfirmModal from "@/components/shared/DeleteConfirmModal";
import { Trash } from "lucide-react";

const CategoriesItem = ({ category }: { category: TCategory }) => {
  // change category status
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    toast.loading("Pending...", { id: "Edit_Category" });
    try {
      const res = await deleteCategory(id).unwrap();
      if (res.success) {
        toast.success("Successfully deleted", { id: "Edit_Category" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Please delete all products under this category first!", {
        id: "Edit_Category",
      });
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <img
          src={category?.image as string}
          alt="product"
          className="w-full max-w-16"
        />
      </TableCell>
      <TableCell className="">
        <p className="font-semibold">{category.name}</p>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {category.description}
      </TableCell>
      <TableCell className="md:space-x-2">
        <EditcategoryModal category={category} />
        {/* delete category button */}
        <DeleteConfirmModal
          children={<Trash />}
          deleteFunc={handleDelete}
          itemName="category"
          itemId={category.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default CategoriesItem;
