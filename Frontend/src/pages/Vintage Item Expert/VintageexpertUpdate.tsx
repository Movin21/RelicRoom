'use client';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  firstname: z.string().min(4).max(50, {
    message: "Name should be at least four characters",
  }),
  secondname: z.string().min(4).max(50, {
    message: "Name should be at least four characters",
  }),
  expertisecategoryarea: z.string().min(1, {
    message: "Industry is required.",
  }),
  workingexperience: z.string().min(1, {
    message: "Industry is required.",
  }),
  email: z.string().min(10).max(50, {
    message: "email should be at least 10 characters",
  }),
  password: z.string().min(8).max(50, {
    message: "Password should be at least 8 characters",
  }),
});

const VintageexpertUpdate = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { id } = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVintageExpertData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/vintageexpert/get/${id}`);
        const data = response.data;
        form.reset(data);
      } catch (error) {
        console.error('Error fetching vintage expert data:', (error as Error).message);
      }
    };
    fetchVintageExpertData();
  }, [form, id]);

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
      const response = await axios.patch(`http://localhost:3000/vintageexpert/update/${id}`, vintageexpertData); // Changed from axios.put to axios.patch
      console.log('Vintage expert updated successfully:', response.data);
      setShowSuccessAlert(true);
      navigate(`/vintageexpert/Profile/${id}`);
    } catch (error) {
      console.error('Error updating vintage expert:', (error as Error).message);
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert>
          Vintage expert updated successfully!
        </Alert>
      )}

        <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-2xl mb-0">
            Update as an Vintage Expert
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
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second name</FormLabel>
                  <FormControl>
                    <Input placeholder="Second name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertisecategoryarea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expertise category area:</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select category area</option>
                      <option value="art">art</option>
                      <option value="clothing">clothing</option>
                      <option value="furniture">furniture</option>
                      <option value="jewelry">jewelry</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingexperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have work experience?</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Industry</option>
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
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
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <div className="flex items-center justify-center mb-5">
           
            <Button
                disabled={form.formState.isSubmitting} // Disable the button while submitting
                type="submit"
                className="font-akshar w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" 
                variant="outline"
              >Update</Button>
            </div>
        </form>
      </Form>
      </CardContent>
    </Card>
   </div> </>
  );
};

export default VintageexpertUpdate;
