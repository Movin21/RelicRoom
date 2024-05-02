import React from "react";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Value } from "@radix-ui/react-select";

const formSchema = z.object({
  name: z.string().min(4).max(50, {
    message: "Name should be atleast four characters",
  }),
  address: z.string().min(4).max(50, {
    message: "Address should be atleast four characters",
  }),
  specialization: z.enum(["art", "clothing", "furniture", "jewelry"]),
  username: z.string().min(4).max(50, {
    
  }),
  certification: z.string().min(4).max(50, {
    message: "Ceritfications should be atleast four characters",
  }),
  contact: z.string().min(10).max(10, {
    message: "Contact Number should be 10",
  }),
  password: z.string().min(10).max(50, {
    message: "Password should be atleast 10 characters",
  }),
  email: z.string().min(10).max(50, {
    message: "E mail should be atleast 10 characters",
  })
  /*addImages: z.array(z.string().url()).max(1, {
    message: "Only one photo can upload",
  }),*/
});
export default function RSregister() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
    defaultValues: {},
  });



  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const response = await axios.post(
        "http://localhost:3000/repairSpecialist/save",
        {
          name: values.name,
          address: values.address,
          username: values.username,
          specialization: values.specialization,
          certificates: values.certification,
          contactNumber: values.contact,
          email: values.email,
          password: values.password,
          /*picture: values.addImages,*/
        }
      );
      console.log(response);
      navigate('/repairSpacialist/logRS');
      toast("Repair Specialist has been created successfully", {});
     /* history("/userProfile"); // Use push method from useHistory*/
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <Tabs defaultValue="account" className="w-[400px] flex item-center justify-center">
            <TabsList>
                <TabsTrigger value="Register">Register</TabsTrigger>
                <TabsTrigger value="Login"><Link to="/repairSpacialist/logRS">Login</Link> </TabsTrigger>
            </TabsList>
        </Tabs>

      <Card className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 mt-10 mb-10">
        <CardHeader>
          <CardTitle className="font-akshar text-center text-2x1 text-secondary">
            REGISTER AS A REPAIR SPECIALIST
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 text-primary font-akshar"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 font-akshar" />
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
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 font-akshar"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 font-akshar" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 font-akshar"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications/Experiences</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Certifications/Experiences"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-akshar"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contact Number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-akshar"/>
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
                    <FormMessage className="text-red-500 font-akshar"/>
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
                    <FormMessage className="text-red-500 font-akshar"/>
                  </FormItem>
                )}
              />
            
              <Button
                type="submit"
                variant="outline"
                onClick={() => {
                  if (form.formState.isValid) {
                    toast(
                      "Repair Specialist has been created successfully",
                      {}
                    );
                  }
                }}
              >
                Submit
               
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
