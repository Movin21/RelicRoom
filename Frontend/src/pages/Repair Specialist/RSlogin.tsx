import React from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/rsRedux"; // Import the login action creator
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  username: z.string().min(1, {
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

const RSlogin = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/repairSpecialist/log",
        {
          // Corrected endpoint
          username: values.username,
          password: values.password,
        }
      );

      console.log("Login successful:", response.data);

      localStorage.setItem("userData", JSON.stringify(response.data));
      // Dispatch the login action here
      dispatch(login(response.data));
      navigate("/repairSpacialist/rsprofile");

      console.log(response.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs
        defaultValue="account"
        className="w-[400px] flex item-center justify-center"
      >
        <TabsList>
          <TabsTrigger value="Register">
            <Link to="/repairSpacialist/saveRs">Register</Link>
          </TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="w-full md:w-1/3 lg:w-1/2 xl:w-1/3 mt-10 mb-10">
        <CardHeader>
          <CardTitle className="font-akshar text-center text-2x1 text-secondary">
            LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 text-primary font-akshar"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                onClick={() => {
                  if (form.formState.isValid) {
                    toast("", {});
                  }
                }}
              >
                LOGIN
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSlogin;
