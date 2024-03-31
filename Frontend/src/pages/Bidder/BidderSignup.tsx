import React from "react";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"

const area = [
    {
      id: "recents",
      label: "Recents",
    },
    {
      id: "home",
      label: "Home",
    },] as const

const FormSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required." }).max(20),
  lastname: z.string().min(1, { message: "Lastname is required." }).max(20),
  email: z.string().min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .min(1, { message: "Password is Required." }),
  address: z.string().min(5, { message: "Address is required." }),
  contactnumber: z.string().min(1, { message: "Contact number is required." }),
  // area: z.boolean(),
  interests: z.boolean(),
  payment: z.string().min(1, { message: "Payment method is required." }),
  profileImage: z.string(),
  termscondition: z.boolean(),
  isActive: z.boolean(),
  area: z.array(z.string()).refine((value) => value.some((area) => area))
});

const BidderSignup = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      contactnumber: "",
      payment: "",
      profileImage: "",
      
    },
  });

  
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  const [position, setPosition] = React.useState("bottom");

  // const items = [
  //   {
  //     id: "sweden",
  //     label: "Sweden",
  //   },
  //   {
  //     id: "global",
  //     label: "Global",
  //   },] as const

   

  return (
    <>
      

      <Form {...form}>
        <div className=" ">
          <Tabs defaultValue="bidderLogin" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">Log to your account here.</TabsContent>
            <TabsContent value="register">
              Register to your account here.
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">Login To Your Profile</div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2 items-center space-x-4 rounded-md border p-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.firstname?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.lastname?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
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
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" type="text" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.address?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactnumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter contact number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.contactnumber?.message}
                  </FormMessage>
                </FormItem>
                
              )}
            />
            <div className="mb-4">
                <FormLabel className="text-base">Are you are based :</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sweden
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Global
              </label>
            </div>
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select payment method</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select payment method </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              Credit card payments
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Debit card payments
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Profile Image :</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload your picture here..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.contactnumber?.message}
                  </FormMessage>
                </FormItem>
                
              )}
            />
          </div>
          <Button className="w-full mt-6 mb-6" type="submit">
            Log In
          </Button>
        </form>
      </Form>
      <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
    </>
  );
};

export default BidderSignup;