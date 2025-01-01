import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { useCreateNewsletterMutation } from "@/redux/features/newsletter/newsletterApi";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

const Footer = () => {
  const [subscribe, { data }] = useCreateNewsletterMutation();

  const currentYear = new Date().getFullYear();

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
    <footer className="pt-16 lg:pt-24 bg-slate-900 text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-start">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold">
              <span className="text-primary">Bazarly</span>
            </h1>
            <p className="">To simplify your shopping experience.</p>

            {/* app store links */}
            <div className="flex flex-col items-center md:items-start gap-3 my-4">
              <Link
                to={"https://play.google.com/store/apps"}
                className="border border-slate-800 hover:border-white rounded-md p-8 py-1 flex items-center justify-center gap-1 text-neutral-300 hover:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  className="size-6 fill-neutral-300 group-hover:fill-white"
                >
                  <path d="M 6.78125 2 C 6.769531 2.003906 6.761719 2.027344 6.75 2.03125 C 6.722656 2.035156 6.683594 2.023438 6.65625 2.03125 C 6.445313 2.054688 6.25 2.140625 6.09375 2.28125 C 5.421875 2.648438 5 3.402344 5 4.21875 L 5 46 C 5 46.621094 5.273438 47.273438 5.78125 47.65625 C 6.015625 47.917969 6.371094 48.035156 6.71875 47.96875 C 7.175781 47.992188 7.65625 47.890625 8.0625 47.65625 C 8.910156 47.164063 26.21875 37.15625 26.21875 37.15625 L 35.25 31.9375 C 35.269531 31.929688 35.292969 31.917969 35.3125 31.90625 L 35.4375 31.84375 C 35.4375 31.84375 35.558594 31.78125 35.5625 31.78125 C 35.574219 31.769531 35.582031 31.761719 35.59375 31.75 C 35.863281 31.59375 43.261719 27.335938 44.28125 26.75 C 44.984375 26.34375 45.542969 25.683594 45.53125 24.875 C 45.519531 24.066406 44.949219 23.4375 44.3125 23.09375 C 43.960938 22.90625 41.679688 21.601563 39.5625 20.375 C 37.445313 19.148438 35.4375 17.96875 35.4375 17.96875 L 26.21875 12.65625 C 26.21875 12.65625 9.457031 2.976563 8.46875 2.40625 C 8.121094 2.207031 7.726563 2.046875 7.34375 2 C 7.152344 1.976563 6.96875 1.96875 6.78125 2 Z M 7 4.6875 L 27.375 24.90625 L 7 45.125 Z M 11.75 6.59375 C 16.835938 9.53125 25.21875 14.375 25.21875 14.375 L 33.28125 19.03125 L 28.78125 23.5 Z M 35.0625 20.0625 C 35.542969 20.34375 36.765625 21.054688 38.5625 22.09375 C 40.679688 23.320313 42.851563 24.5625 43.375 24.84375 C 43.425781 24.871094 43.410156 24.886719 43.4375 24.90625 C 43.398438 24.933594 43.386719 24.941406 43.28125 25 C 42.320313 25.554688 36.089844 29.171875 35.09375 29.75 L 30.1875 24.90625 Z M 28.78125 26.28125 L 33.3125 30.78125 L 25.21875 35.4375 C 25.21875 35.4375 17.054688 40.148438 11.78125 43.1875 Z"></path>
                </svg>
                <div>
                  <span className="text-xs">Get app on</span>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </Link>
              <Link
                to={"https://www.apple.com/lae/app-store"}
                className="border border-slate-800 hover:border-white rounded-md p-8 py-1 flex items-center justify-center gap-1 text-neutral-300 hover:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                  className="size-6 fill-neutral-300 group-hover:fill-white"
                >
                  <path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653859 34.033906 14.630859 34.003906 L 14.625 34.003906 z"></path>
                </svg>
                <div>
                  <span className="text-xs">Get app on</span>
                  <p className="text-sm font-semibold">Apple Store</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Category */}
          <ul className="space-y-1 text-neutral-300">
            <li className="font-bold text-xl text-white py-1 mb-5">Category</li>
            <li>
              <Link to={"/products?category=Mouse"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Mouse
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/products?category=Keyboard"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Keyboard
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/products?category=Laptop"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Laptop
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/products?category=TV"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  TV
                </Button>
              </Link>
            </li>
          </ul>

          {/* Quick links */}
          <ul className="space-y-1 text-neutral-300">
            <li className="font-bold text-xl text-white py-1 mb-5">
              Quick Links
            </li>
            <li>
              <Link to={"/products"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Products
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/shops"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Shops
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"about-us"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  About Us
                </Button>
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                <Button
                  variant={"ghost"}
                  className="hover:bg-primary hover:text-white"
                >
                  Contact Us
                </Button>
              </Link>
            </li>
          </ul>

          {/* Contact Us */}
          <ul className="space-y-4 text-neutral-300">
            <li className="font-bold text-xl text-white py-1 mb-6">
              Contact Us
            </li>
            <li className="text-sm ">
              <span
                className="flex justify-center
              md:justify-start items-center gap-1 font-semibold"
              >
                <MapPin size={18} /> Address:
              </span>{" "}
              1st floor, Islamic Tower, Golshan, Dhaka-1200, Bangladesh.
            </li>
            <li className="text-sm ">
              <span
                className="flex justify-center
              md:justify-start items-center gap-1 font-semibold"
              >
                <Phone size={18} /> Phone:
              </span>{" "}
              +880 1234-567890
            </li>
            <li className="text-sm ">
              <span
                className="flex justify-center
              md:justify-start items-center gap-1 font-semibold"
              >
                <Mail size={18} /> Email:
              </span>{" "}
              <Button
                variant={"link"}
                className="text-base text-neutral-300 hover:text-white p-0 h-6"
              >
                sales@bazarly.com
              </Button>
            </li>
          </ul>

          {/* Newsletter */}
          <ul className="space-y-4">
            <li className="font-bold text-xl  py-1 mb-6">Newsletter</li>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="max-w-md bg-slate-900 border-slate-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4 bg-slate-800">Subscribe</Button>
              </form>
            </Form>
            {/* social links */}
            <div
              className="flex justify-center
              md:justify-start items-center gap-3 py-4 mt-4"
            >
              <Link
                to={"https://facebook.com"}
                className="bg-slate-800 rounded-full size-12 flex items-center justify-center hover:bg-primary hover:text-white"
              >
                <Facebook size={24} />
              </Link>
              <Link
                to={"https://x.com"}
                className="bg-slate-800 rounded-full size-12 flex items-center justify-center hover:bg-primary hover:text-white"
              >
                <Twitter size={24} />
              </Link>
              <Link
                to={"https://instagram.com"}
                className="bg-slate-800 rounded-full size-12 flex items-center justify-center hover:bg-primary hover:text-white"
              >
                <Instagram size={24} />
              </Link>
              <Link
                to={"https://youtube.com"}
                className="bg-slate-800 rounded-full size-12 flex items-center justify-center hover:bg-primary hover:text-white"
              >
                <Youtube size={24} />
              </Link>
            </div>
          </ul>
        </div>

        {/* copyright */}
        <div className="py-4 mt-16 border-t border-slate-800 text-center">
          <small>
            Copyright &copy; {currentYear} - All rights reserved by Bazarly
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
