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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./slice/auctioneerSlice";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .min(1, {
      message: "Password is Required.",
    }),
});

const AuctioneerLogin = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate(); // Utilize useNavigate for redirection
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:3000/auctioneer/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      // Handle successful login response, e.g., store token in local storage, redirect, etc.
      console.log("Login successful:", response.data);
      dispatch(login(response.data));
      console.log(response.data);
      navigate('/auctioneerDashboard');
    } catch (error) {
      // Handle login error, e.g., display error message to the user
      console.error("Login error:", error);
    }
  };

  return (
    <Form {...form}>
      <div className=" ">
        <Tabs defaultValue="auctioneerL" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">
              <Link to="/auctioneerRegister">Register</Link>{" "}
              {/* Link to the register page */}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="text-center">Login To Your Profile</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2 items-center space-x-4 rounded-md border p-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passsword</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your Passsword"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6 mb-6" type="submit">
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default AuctioneerLogin;
