'use client';
import { useState } from 'react';
import { To, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the interface for login response
interface LoginResponse {
  message: string;
  user?: any; // Define the structure of user object if needed
}

// Define the schema for login form validation
const LoginFormSchema = z.object({
  email: z.string().min(10).max(50).email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8).max(50, {
    message: "Password should be at least 8 characters",
  }),
});

// Component for VintageexpertLogin
const VintageexpertLogin = () => {
 const [error, setError] = useState<string | null>(null);
const [previousResponse, setPreviousResponse] = useState<string | null>(null);   
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate(); // Initialize useHistory
  const handleTabClick = (value: To) => {
    // Navigate to the specified page when a tab is clicked
    navigate(value);
};
  // Function to handle form submission
  const onSubmit = async (values: { email: string; password: string; }) => {
    try {
      const response = await axios.post<LoginResponse>("http://localhost:3000/vintageexpert/login", values);
      console.log('Login successful:', response.data.message);
      // Redirect to profile page upon successful login
      navigate(`/vintageexpert/Profile/${response.data.user._id}`);// Redirect to the profile page
    } catch (error) {
      // Handle login error
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginResponse>;
        console.error('Error logging in:', axiosError.response?.data.message);
        setPreviousResponse(axiosError.response?.data.message || "Internal server error");
        setError(axiosError.response?.data.message || "Internal server error");
        setTimeout(() => setError(null), 5000);
      } else {
        console.error('Non-Axios error occurred:', error);
        setPreviousResponse("Internal server error");
        setError("Internal server error");
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  return (
    <> 
    <Tabs defaultValue="VintageexpertRegister" className="flex items-center justify-center  h-ful">
        <TabsList>
          <TabsTrigger value="/vintageexpert/Login" className="font-akshar" onClick={() => handleTabClick("/vintageexpert/Login")}>Login</TabsTrigger>
          <TabsTrigger value="/vintageexpert/Register" className="font-akshar" onClick={() => handleTabClick("/vintageexpert/Register")}>Register</TabsTrigger>
           
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-2xl mb-0">
            Login  As  A  Vintage  Expert
            </CardTitle>
          </CardHeader>
    
    <div className="flex items-center justify-center">
      <Card className=" w-full md:w-96 p-6 mt-0 mb-10 shadow-2xl" style={{ width: '700px' }}>
          <CardContent>
          <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="max-w-xl w-full flex flex-col gap-4">

          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email :</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 font-akshar" />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-akshar" />
              </FormItem>
            )}
          />
   
        <div className="flex items-center justify-center mb-5">
           
           <Button
               disabled={form.formState.isSubmitting} // Disable the button while submitting
               type="submit"
               className="font-akshar w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" 
               variant="outline"
             >Login</Button>
           </div>
       {/* {error && <div className="text-red-500">{error}</div>}
        { <div className="text-red-500">Previous Response:user not define {previousResponse}</div>} */}
      </form>
 
      <div className="text-center ">
        Don't have an account? <a href="/vintageexpert/Register text-secondary">Register</a>
      </div>
      </Form>
    </CardContent>
    </Card>
    </div></>
  );
};

export default VintageexpertLogin;
