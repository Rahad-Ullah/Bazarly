import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateNewsletterMutation } from "@/redux/features/newsletter/newsletterApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import mailImg from "../../../assets/images/sent.png";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});
const Newsletter = () => {
  const [subscribe, { data }] = useCreateNewsletterMutation();

  // 1. form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. submit handler.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Sending...", { id: "subscribe" });
    try {
      await subscribe(values);
      if (data?.success) {
        toast.success("Subscribed successfully", { id: "subscribe" });
        form.reset();
      } else {
        toast.error("Something went wrong", { id: "subscribe" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "subscribe" });
      console.log(error);
    }
  }

  return (
    <div>
      <Container>
        <div className="p-8 lg:p-16 bg-primary/10 rounded-xl flex flex-col md:flex-row-reverse justify-between items-center gap-10">
          <div>
            <img src={mailImg} alt="newsletter" className="max-w-40" />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-slate-900 text-2xl md:text-3xl font-extrabold mb-2">
                Subscribe to our newsletter
              </h1>
              <p className="text-slate-600 text-base md:text-lg font-medium">
                Get the latest news and updates from us.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:flex items-center gap-4 space-y-4 md:space-y-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="w-full md:w-72 max-w-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size={"lg"} className="">
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;
