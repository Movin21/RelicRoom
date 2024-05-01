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
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
    }),
  payment: z.string().min(1, {
      message: "Payemnt method is required.",
    }),
  profileImage: z.string().min(1, {
      message: "Profile image is required.",
    })
});
 
const BidderSignup = () => {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password:"",
      address: "",
      contactnumber: "",
      payment: "",
      profileImage: ""
    },
  })


  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
    const bidderData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      address: values.address,
      payment: values.payment,
      contactnumber: values.contactnumber,
      area:true,
      interests:true,
      termsconditions: true,
    };
    
    // Axios POST request to create a new auctioneer
    axios.post("http://localhost:3000/bidder/create", bidderData)
     
      .then(response => {
        console.log('Bidder has been created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error has been in bidder:', error.response.data);
        
      });
  };
  

  return  (
    
     <> <Tabs defaultValue="bidderSign" className="flex items-center justify-center  h-ful">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-primary  text-center text-2xl">
            REGISTER AS A BIDDER
            </CardTitle>
          </CardHeader>
    
    <div className="flex items-center justify-center">
      <Card className=" md:w-180 p-6 mt-10 mb-10">
      {/* <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-2xl">
            REGISTER AS A BIDDER
            </CardTitle>
          </CardHeader> */}
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
           <div >
           <FormLabel className="font-akshar">Area you are based :</FormLabel>
           </div>
            <div>
              <Checkbox id="sweden" />
              <label
                htmlFor="sweden"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Sweden
              </label>
            </div>
            <div>
              <Checkbox id="global" />
              <label
                htmlFor="global"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Global
              </label>
            </div>

            <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="font-akshar">Payment method :</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select payment method</option>
                    <option value="Credit">Credit card payments</option>
                    <option value="Debit">Debit card payments</option>
                    </select>
                  </FormControl>
                <FormMessage className="text-red-500"/> 
                </FormItem>
            )}
            />
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture" className="font-akshar">Add Profile Image :</Label>
              <Input id="picture" type="file" className="h-10"/>
            </div>

            {/* <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image :</FormLabel>
                  <FormControl>
                    <Input placeholder="Upload your profile image"{...field} />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
            )}
            /> */}
            <div>
              <Checkbox id="termscondition" />
              <label
                htmlFor="termscondition"
                className="ml-2 text-sm font-akshar leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Accept terms and conditions
              </label>
            </div>
      
    {/* <div className="flex items-center space-x-2 ml-6">
          <Checkbox id="termscondition" />
          <label
            htmlFor="termscondition"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
            Accept terms and conditions
          </label>
        </div> */}

            <div className="flex items-center justify-center mb-5">
            {/* <Button className="w-96 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" type="submit">Submit</Button> */}
            <Button
                disabled={form.formState.isSubmitting} // Disable the button while submitting
                type="submit"
                className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
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

export default BidderSignup;