/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const required = (message: string) => z.string().min(1, message);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const formSchema = z.object({
  name: required("Name is required").max(50, "Name is too long"),
  description: required("Description is required"),
  categoryId: required("Category is required"),
  price: required("Price is required"),
  stock: required("Stock is required"),
  discount: required("Discount is required"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
    .refine(
      (file) => file && file.size <= MAX_IMAGE_SIZE,
      "Image must be less than 5 MB"
    ),
});

const AddProductForm = () => {
  const [addProduct] = useCreateProductMutation();
  const { data } = useGetAllCategoriesQuery({});
  const categories = data?.data;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: "",
      stock: "",
      discount: "",
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Adding...", { id: "add-product" });

    const formData = new FormData();
    const data = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      price: Number(values.price),
      stock: Number(values.stock),
      discount: Number(values.discount),
    };

    // Append image file
    if (values.image) {
      formData.append("file", values.image);
    }
    formData.append("data", JSON.stringify(data));

    try {
      const { data } = await addProduct({
        payload: formData,
      });
      if (data?.success) {
        toast.success("Added successfully", { id: "add-product" });
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to create admin", {
        id: "add-product",
      });
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(
                      (category: { id: string; name: string }) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="hover:bg-gray-100 cursor-pointer"
                        >
                          {category.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter stock" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter discount"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddProductForm;
