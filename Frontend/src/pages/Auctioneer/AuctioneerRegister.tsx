'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';

const FormSchema = z.object({
  email: z.string().min(1,{
      message: "Email is required.",
    }),
  password: z.string().min(6, {
      message: "Password must be at least 6 characters.",})
      .min(1, { message: "Password is Required.",
    }),
  companyname: z.string().min(1, {
      message: "Company name is required.",
    }),
  industry: z.string().min(1, {
      message: "Industry is required.",
    }),
  description: z.string().min(1, {
      message: "Description is required.",
    }),
  contactnumber: z.string().length(10, {
      message: "Mobile number must be 10 digits.",
    }),
  address: z.string().min(1, {
      message: "Address is required.",
    }),
  country: z.string().min(1, {
      message: "Country is required.",
    }),
  profileimage: z.string().min(1, {
      message: "Profile image is required.",
    })  
});
 
const AuctioneerRegister = () => {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password:"",
      companyname: "", 
      industry: "",
      description: "",
      contactnumber: "",
      address: "",
      country: "",
      profileimage: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
    const auctioneerData = {
      companyname: values.companyname,
      industry: values.industry,
      description: values.description,
      email: values.email,
      password: values.password,
      mobilenumber: values.contactnumber,
      address: values.address,
      country: values.country,
      termsconditions: true,
    };
    
    // Axios POST request to create a new auctioneer
    axios.post("http://localhost:3000/auctioneer/create", auctioneerData)
      .then(response => {
        console.log('Auctioneer created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating auctioneer:', error.response.data);
      });
  };
  

  return  (
     
    <Form {...form}>

    <div className=" ">
      <Tabs defaultValue="auctioneerR" className="w-[400px]">
      <TabsList>
      <TabsTrigger value="login">Login</TabsTrigger>
      <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      </Tabs>
    </div>
 
      <div className="text-center">Register as an Auctioneer</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

        <div className="space-y-2 items-center space-x-4 rounded-md border p-4">

        <FormField
        control={form.control}
        name="companyname"
        render={({ field }) => (
            <FormItem>
             <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your companyname" {...field} />
              </FormControl>
             <FormMessage/> 
            </FormItem>
        )}
      />
                <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
            <FormItem>
             <FormLabel>Industry</FormLabel>
              <FormControl>
                <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Industry</option>
                <option value="Arts">Arts</option>
                <option value="Furniture">Furniture</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Clothing">Clothing</option>
                </select>
              </FormControl>
             <FormMessage/> 
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
                <Input placeholder="Enter your Email" type='email'{...field} />
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
                <Input placeholder="Enter your Passsword" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
          <FormItem>
            <FormLabel>address</FormLabel>
            <FormControl>
              <Input placeholder="Enter your address" {...field} />
            </FormControl>
            <FormMessage/> 
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="contactnumber"
          render={({ field }) => (
          <FormItem>
            <FormLabel>contact number</FormLabel>
            <FormControl>
              <Input placeholder="Enter your contactnumber" {...field} />
            </FormControl>  
            <FormMessage/> 
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
          <FormItem>
            <FormLabel>country</FormLabel>
            <FormControl>
              <Input placeholder="Enter your country" {...field} />
            </FormControl>
            <FormMessage/> 
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
          <FormItem>
            <FormLabel>description</FormLabel>
            <FormControl>
              <Input placeholder="Enter your description" {...field} />
            </FormControl>
            <FormMessage/> 
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="profileimage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter your profileimage"{...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
        )}
        />
</div>  
<div className="flex items-center space-x-2">
      <Checkbox id="terms2" />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>

         <div>
         <Button className="w-full mt-6 mb-6" type="submit">Submit</Button>
         </div>
         
      </form>
    </Form>
  );
};

export default AuctioneerRegister;