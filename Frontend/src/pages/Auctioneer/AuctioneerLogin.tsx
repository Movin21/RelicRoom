import React from 'react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./slice/auctioneerSlice";
import { useNavigate } from "react-router-dom";
import { TabsContent } from '@radix-ui/react-tabs';
import { Card,CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 


const FormSchema = z.object({
  email: z.string().min(1,{
    message: "Email is required.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",})
    .min(1, { message: "Password is Required.",
  })
});

const AuctioneerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegisterClick = () => {
    navigate('/auctioneerRegister');
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("http://localhost:3000/auctioneer/login", {
        email: values.email,
        password: values.password,
      });
      // Handle successful login response, e.g., store token in local storage, redirect, etc.
      console.log("Login successful:", response.data);
      dispatch(login(response.data));
      console.log(response.data);

      navigate('/auctioneerPortal');
    } catch (error) {
      // display error message to the user
      console.error("Login error:", error);
    }
  };

  return (
    <>
    <Tabs defaultValue="bidderSign" className="flex items-center justify-center h-ful">
        <TabsList>
          <TabsTrigger className="font-akshar" value="login">Login</TabsTrigger>
          <TabsTrigger className="font-akshar" value="register">
            <Link to="/auctioneerRegister">Register</Link> 
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="mb-0 text-2xl text-center font-akshar text-secondary">
            Login To Your Profile
            </CardTitle>
          </CardHeader>
    
    <div className="flex items-center justify-center">
      <Card className="w-full p-6 mt-0 mb-10 shadow-2xl md:w-96" style={{ width: '700px' }}>
          <CardContent></CardContent>
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
       
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-akshar">Email :</FormLabel>
                <FormControl>
                  <Input className="font-akshar"
                    placeholder="example@email.com"
                    type="email"
                    {...field}
                    style={{ fontSize: '14px' }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-akshar"/>
              </FormItem>
            )}
          />

          <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-akshar">Passsword :</FormLabel>
                <FormControl>
                  <Input className="font-akshar"
                    placeholder="Enter your passsword"
                    type="password"
                    {...field}
                    style={{ fontSize: '14px' }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-akshar"/>
              </FormItem>
            )}
          /></div>
       
       <div className="flex justify-end mt-6">
      <Button className="w-full mt-4 ease-in-out font-akshar bg-primary hover:bg-secondary hover:text-white tw-50" type="submit" style={{ padding: '4px', margin: '0px', fontSize: '20px' }}>
          Log In
        </Button>
    </div>
      </form>
    </Form></Card>
    </div></>
  );
};

export default AuctioneerLogin;
