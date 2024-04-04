import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { LayoutDashboard, Sidebar } from 'lucide-react';
// import { SidebarItem } from './Sidebar';

const FormSchema = z.object({
    firstname: z.string().min(1,{
        message: "First name is required.",
      }),
    lastname: z.string().min(1,{
        message: "Last name is required.",
      }),
    email: z.string().min(1,{
        message: "Email is required.",
      }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",})
        .min(1, { message: "Password is Required.",
      }),
    address: z.string().min(1, {
        message: "Address is required.",
      }),
    contactnumber: z.string().length(10, {
        message: "Mobile number must be 10 digits.",
      })
    });

const BidderProfile = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          firstname: "",
          lastname: "",
          email: "",
          password:"",
          address: "",
          contactnumber: ""
        },
      })

      const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
        const bidderData = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          address: values.address,
          contactnumber: values.contactnumber,
        };
      }

  return (
    <>
    
    {/* <Sidebar>
        <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        alert/>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Statistics" active/>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Users" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Inventory" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Orders" alert />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Billings" />
        <hr className="my-3" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Settings"/>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Help" />
        </Sidebar> */}

    <CardHeader>
        <CardTitle className="font-akshar text-primary  text-center text-2xl">
            Welcome Abraham !
        </CardTitle>
      </CardHeader>
    
    <div className="flex items-center justify-center">
        <Card className=" md:w-180 p-6 mt-10 mb-10">
            <CardContent>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="max-w-xl w-full flex flex-col gap-4">

                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-akshar">First Name :</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter first name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-akshar">Last Name :</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/> 
                            </FormItem>
                        )}
                     />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-akshar">Email :</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" type='email'{...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-akshar">Passsword :</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter passsword" type="password" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-akshar">Address :</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter address" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/> 
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactnumber"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-akshar">Contact number :</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter contact number" {...field} />
                            </FormControl>  
                            <FormMessage className="text-red-500"/> 
                        </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-center mb-5">
                        {/* <Button className="w-96 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" type="submit">Submit</Button> */}
                        <Button
                            disabled={form.formState.isSubmitting} // Disable the button while submitting
                            type="submit"
                            className="w-full text-white bg-red-700 hover:bg-red-500 ease-in-out hover:text-white tw-50 mt-4"
                            variant="outline"
                        >Close Account</Button>

                        {/* <Button className="w-96 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" type="submit">Submit</Button> */}
                        <Button
                            disabled={form.formState.isSubmitting} // Disable the button while submitting
                            type="submit"
                            className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                            variant="outline"
                        >Edit Info</Button>
                    </div>

                </form>
             </Form>
          </CardContent>
        </Card>
    </div></>
  );
};

export default BidderProfile;

