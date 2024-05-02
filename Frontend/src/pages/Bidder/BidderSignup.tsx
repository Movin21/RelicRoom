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
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  // area:z.boolean(),
  payment: z.string().min(1, {
      message: "Payemnt method is required.",
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
      payment: ""
    },
  })
  const navigate = useNavigate(); // Utilize useNavigate for redirection
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("Error");
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
        navigate('/bidderLogin');
      })
      .catch(error => {
        console.error('Error has been in bidder:', error.response.data);
        
      });
  };
  
  const handleLoginClick = () => {
    navigate('/bidderLogin');
  };

  return  (
    
     <> <Tabs defaultValue="bidderSign" className="flex items-center justify-center  h-ful">
        <TabsList className="hover:scale-110 transition duration-300 ease-in-out">
          <TabsTrigger className="font-akshar hover:bg-white hover:scale-110 transition duration-300 ease-in-out" value="login" onClick={handleLoginClick}>Login</TabsTrigger>
          <TabsTrigger className="font-akshar hover:bg-white hover:scale-110 transition duration-300 ease-in-out" value="register">Register</TabsTrigger>
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-primary  text-center text-2xl mb-0">
            REGISTER AS A BIDDER
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
                <FormItem style={{ marginBottom: '20px' }}>
                <FormLabel className="font-akshar">First Name :</FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter first name" {...field} style={{ fontSize: '14px' }}/>
                  </FormControl>
                <FormMessage className="text-red-500 font-akshar"/> 
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
                    <Input className="font-akshar" placeholder="Enter last name" {...field} style={{ fontSize: '14px' }}/>
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
                  <FormLabel className="font-akshar">Email :</FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter email" type='email'{...field} style={{ fontSize: '14px' }}/>
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
                  <FormLabel className="font-akshar">Passsword :</FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter passsword" type="password" {...field} style={{ fontSize: '14px' }}/>
                  </FormControl>       
                    <FormMessage className="text-red-500 font-akshar"/>
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
                  <Input className="font-akshar" placeholder="Enter address" {...field} style={{ fontSize: '14px' }}/>
                </FormControl>
                <FormMessage className="text-red-500 font-akshar"/> 
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
                  <Input className="font-akshar" placeholder="Enter contact number" {...field} style={{ fontSize: '14px' }}/>
                </FormControl>  
                <FormMessage className="text-red-500 font-akshar"/> 
              </FormItem>
            )}
          />
           <div >
           <FormLabel className="font-akshar">Area you are based :</FormLabel>
           </div>
            <div className="flex items-center">
              <Checkbox id="sweden"/>
              <label
                htmlFor="sweden"
                className="font-akshar ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Sweden
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="global" />
              <label
                htmlFor="global"
                className="font-akshar ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
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
                    <select {...field} className="font-akshar w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option className="font-akshar" value="">Select payment method</option>
                    <option className="font-akshar" value="Credit">Credit card payments</option>
                    <option className="font-akshar" value="Debit">Debit card payments</option>
                    </select>
                  </FormControl>
                <FormMessage className="text-red-500"/> 
                </FormItem>
            )}
            />
            
            <div className="flex items-center">
              <Checkbox id="termscondition" />
              <label
                htmlFor="termscondition"
                className="ml-2 text-xs font-akshar leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                Accept terms and conditions
              </label>
            </div>

            <div className="flex items-center justify-center mb-5">
            <Button
                disabled={form.formState.isSubmitting} // Disable the button while submitting
                type="submit"
                className="font-akshar w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4 hover:scale-110 transition duration-300"
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
 