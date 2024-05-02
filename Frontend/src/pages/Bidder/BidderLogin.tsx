"use client";
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
import { useDispatch } from "react-redux";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { login } from "./slice/bidderSlice";
import { useNavigate } from "react-router-dom";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "antd";

//form validation using Zod
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

const BidderLogin = () => {
 
  const dispatch = useDispatch(); //a core concept in Redux, a state management library for JavaScript applications
  const navigate = useNavigate(); // Utilize useNavigate for redirection
  const form = useForm<z.infer<typeof FormSchema>>({ //manage form state and validation logic
    resolver: zodResolver(FormSchema), //indicating that the Zod schema defined by FormSchema will be used to validate the form data.
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const navigate = useNavigate(); 
  const onSubmit = async (values: z.infer<typeof FormSchema>) => { //an asynchronous function 
    try {
      const response = await axios.post("http://localhost:3000/bidder/login", {
        email: values.email,
        password: values.password,
      });

      // Handle successful login response, e.g., store token in local storage, redirect, etc.
      console.log("Login successful:", response.data);
      dispatch(login(response.data));
      console.log(response.data); //contains the data returned by the server
      navigate('/bidderDashboard');
    } catch (error) {
      // Handle login error, e.g., display error message to the user
      console.error("Login error:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/bidderSignup');
  };

  return (
    <>
    <Tabs defaultValue="bidderLogin" className="flex items-center justify-center  h-ful">
        <TabsList className="hover:scale-110 transition duration-300 ease-in-out">
        <TabsTrigger className="font-akshar hover:bg-white hover:scale-110 transition duration-300 ease-in-out" value="login" >Login</TabsTrigger>
        <TabsTrigger className="font-akshar hover:bg-white hover:scale-110 transition duration-300 ease-in-out" value="register" onClick={handleRegisterClick}>Register</TabsTrigger>
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-primary  text-center text-2xl mb-0">
            Login To Your Profile
            </CardTitle>
          </CardHeader>
    
    <div className="flex items-center justify-center ">
      <Card className="w-65 md:w-96 p-0 mt-0 mb-10 shadow-2xl" style={{height:'400px', width: '600px', padding: '30px' }}>
          <CardContent>
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
              <FormItem className="mb-16">
                <FormLabel className="font-akshar">Password :</FormLabel>
                <FormControl>
                  <Input className="font-akshar "
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
           <div className="flex items-center justify-between mb-2">
           <div className="flex">
              <label
                htmlFor="donthaveaccount"
                className=" ml-1 text-xs font-akshar leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Don't have an account ?
              </label>
              <label 
                onClick={handleRegisterClick} 
                htmlFor="donthaveaccount"
                className="hover:text-secondary ease-in-out underline ml-1 text-xs font-akshar leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 duration-100" >
                Register
              </label>
              </div>
       <div >
      <Button className="font-akshar bg-primary hover:bg-secondary ease-in-out hover:text-white w-24 tw-50 mt-4 hover:scale-110 transition duration-300" type="submit" style={{ padding: '4px', margin: '0px', fontSize: '20px' }}>
          Log In
        </Button>
    </div>
    </div>
      </form>
    </Form></CardContent></Card>
    </div></>
  );
};

export default BidderLogin;
 