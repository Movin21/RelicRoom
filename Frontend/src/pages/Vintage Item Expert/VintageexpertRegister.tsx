'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios';
import { To, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";


const FormSchema = z.object({
  firstname: z.string().min(4).max(50, {
    message: "first name should be at least four characters",
  }),
  secondname: z.string().min(4).max(50, {
    message: "second name should be at least four characters",
  }),
  expertisecategoryarea: z.string().min(1, {
    message: "choose the categoryarea.",
  }),
  workingexperience: z.string().min(1, {
    message: "choose the option.",
  }),
  email: z.string().min(10).max(50, {
    message: "email should be at least 10 characters",
  }).email({
    message:"Invalid email format",
  }),
  password: z.string().min(8).max(50, {
    message: "Password should be at least 8 characters",
  }),
  
});
 
const VintageexpertRegister = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State variable for controlling the success alert
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      secondname: "",
      expertisecategoryarea: "",
      workingexperience: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleTabClick = (value: To) => {
    // Navigate to the specified page when a tab is clicked
    navigate(value);
};


  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const vintageexpertData = {
      firstname: values.firstname,
      secondname: values.secondname,
      expertisecategoryarea: values.expertisecategoryarea,
      workingexperience: values.workingexperience,
      email: values.email,
      password: values.password,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/vintageexpert/create", vintageexpertData);
      console.log('Vintage expert registration created successfully:', response.data);

      setShowSuccessAlert(true); // Show the success alert after successful form submission
      navigate(`/vintageexpert/Login`);

    } catch (error) {
      console.error('Error creating vintage expert:', (error as Error).message);
      // Handle other errors, such as network errors or server errors
      // You can display an error message or handle the error as needed
    }
    
  };
  
 

  return  (

    
    <>  {/* Success Alert */}
    {showSuccessAlert && (
      <Alert>
        Vintage expert registration done successfully!
      </Alert>
    )}
    
    <Tabs defaultValue="VintageexpertRegister" className="flex items-center justify-center  h-ful">
        <TabsList>
          <TabsTrigger value="/vintageexpert/Login" className="font-akshar" onClick={() => handleTabClick("/vintageexpert/Login")}>Login</TabsTrigger>
          <TabsTrigger value="/vintageexpert/Register" className="font-akshar" onClick={() => handleTabClick("/vintageexpert/Register")}>Register</TabsTrigger>
           
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-2xl mb-0">
            Register As A Vintage Expert
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
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name :</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 font-akshar" />
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="secondname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second name :</FormLabel>
                  <FormControl>
                    <Input placeholder="Second name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 font-akshar"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertisecategoryarea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expertise category area :</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select</option>
                      <option value="art">art</option>
                      <option value="clothing">clothing</option>
                      <option value="furniture">furniture</option>
                      <option value="jewelry">jewellery</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 font-akshar"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingexperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have work experience ?</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select </option>
                      <option value="yes">yes</option>
                      <option value="no">no</option>

                    </select>
                  </FormControl>
                  <FormMessage className="text-red-500 font-akshar" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail :</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
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
                      placeholder="password"
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
              >Submit</Button>
            </div>
            </form>
          </Form>
    </CardContent>
    </Card>
    </div></>
     
  );
};

export default VintageexpertRegister;

 