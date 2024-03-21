import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { Label } from "@/components/ui/label";
const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    firstname: z.string().min(1, {
      message: "First Name is required.",
    }),
    lastname: z.string().min(1, {
      message: "Last Name is required.",
    }),
    picture: z
      .instanceof(File)
      .refine(
        (file) => file && ["image/jpeg", "image/png"].includes(file.type),
        {
          message: "Please upload a valid image file (JPEG or PNG).",
          path: ["picture"], // Specify the path for the error message
        }
      ),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one digit." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const UserForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      picture: "https://github.com/shadcn.png",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Hello", data);
  }

  return (
    <div>
      <div className="font-akshar text-2xl text-primary font-bold mb-6">
        Add New Admin
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 font-nunitoSans w-8/10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto space-y-6"
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <Avatar className="rounded-full w-20 h-20 object-cover">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-sm text-blue-500 mt-2 flex flex-col items-center justify-center">
                <Label htmlFor="picture" className="py-2">
                  Edit Photo
                </Label>

                <FormField
                  control={form.control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="picture">Edit Photo</FormLabel>
                      <FormControl>
                        <Input type="" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jimmy" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Donaldson" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormDescription className="text-brownLight">
                          This is your login Id.
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conform Password</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="font-nunitoSans bg-brownDark hover:bg-brownMedium text-white font-bold py-2 px-4 w-1/3 rounded focus:outline-none focus:shadow-outline"
              >
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default UserForm;
