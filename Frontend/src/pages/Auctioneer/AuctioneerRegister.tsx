import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


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
    mobilenumber: z.string().length(10, {
      message: "Mobile number must be 10 digits.",
    }),
  address: z.string().min(1, {
      message: "Address is required.",
    }),
  country: z.string().min(1, {
      message: "Country is required.",
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
      mobilenumber: "",
      address: "",
      country: "",
   
    },
  })

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
    const auctioneerData = {
      companyname: values.companyname,
      industry: values.industry,
      description: values.description,
      email: values.email,
      password: values.password,
      mobilenumber: values.mobilenumber,
      address: values.address,
      country: values.country,
      termsconditions: true,
    };
    
    // Axios POST request to create a new auctioneer
    axios.post("http://localhost:3000/auctioneer/create", auctioneerData)
      .then(response => {
        console.log('Auctioneer created successfully:', response.data);
        navigate("/auctioneerLogin");
      })
      .catch(error => {
        console.error('Error creating auctioneer:', error.response.data);
      });
  };
  
 

  return  (
    <> <Tabs defaultValue="auctioneerRegister" className="flex items-center justify-center  h-ful">
        <TabsList>
        <TabsTrigger value="login" className="font-akshar">
              <Link to="/auctioneerLogin">Login</Link> {/* Link to the login page */}
            </TabsTrigger>
          <TabsTrigger className="font-akshar" value="register">Register</TabsTrigger>
        </TabsList>
      </Tabs>
      <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-2xl mb-0">
            Register as an Auctioneer
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
            name="companyname"
            render={({ field }) => (
                <FormItem style={{ marginBottom: '20px' }}>
                <FormLabel className="font-akshar">Company Name </FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter your company name" {...field} style={{ fontSize: '14px' }}/>
                  </FormControl>
                <FormMessage className="text-red-500 font-akshar"/> 
                </FormItem>
            )}
          />

         <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="font-akshar">Industry</FormLabel>
                  <FormControl>
                    <select {...field} className="font-akshar w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option className="font-akshar" value="">Select Industry</option>
                    <option className="font-akshar" value="Arts">Arts</option>
                    <option className="font-akshar" value="Furniture">Furniture</option>
                    <option className="font-akshar" value="Jewelery">Jewelery</option>
                    <option className="font-akshar" value="Clothing">Clothing</option>
                    </select>
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
                  <FormLabel className="font-akshar">Email </FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter your email" type='email'{...field} style={{ fontSize: '14px' }}/>
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
                  <FormLabel className="font-akshar">Passsword </FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter your passsword" type="password" {...field} style={{ fontSize: '14px' }}/>
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
                <FormLabel className="font-akshar">Address </FormLabel>
                <FormControl>
                  <Input className="font-akshar" placeholder="Enter your address" {...field} style={{ fontSize: '14px' }}/>
                </FormControl>
                <FormMessage className="text-red-500 font-akshar"/> 
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="mobilenumber"
              render={({ field }) => (
              <FormItem>
                <FormLabel className="font-akshar">Contact number </FormLabel>
                <FormControl>
                  <Input className="font-akshar" placeholder="Enter your contact number" {...field} style={{ fontSize: '14px' }}/>
                </FormControl>  
                <FormMessage className="text-red-500 font-akshar"/> 
              </FormItem>
            )}
          />

          <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
              <FormItem>
                <FormLabel className="font-akshar">Country </FormLabel>
                <FormControl>
                  <Input className="font-akshar" placeholder="Enter your country" {...field} style={{ fontSize: '14px' }}/>
                </FormControl>  
                <FormMessage className="text-red-500 font-akshar"/> 
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="font-akshar">Description </FormLabel>
                  <FormControl>
                    <Input className="font-akshar" placeholder="Enter your description" {...field} style={{ fontSize: '14px' }}/>
                  </FormControl>
                <FormMessage className="text-red-500 font-akshar"/> 
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

export default AuctioneerRegister;

// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Checkbox } from "@/components/ui/checkbox"
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const FormSchema = z.object({
//   email: z.string().min(1,{
//       message: "Email is required.",
//     }),
//   password: z.string().min(6, {
//       message: "Password must be at least 6 characters.",})
//       .min(1, { message: "Password is Required.",
//     }),
//   companyname: z.string().min(1, {
//       message: "Company name is required.",
//     }),
//   industry: z.string().min(1, {
//       message: "Industry is required.",
//     }),
//   description: z.string().min(1, {
//       message: "Description is required.",
//     }),
//     mobilenumber: z.string().length(10, {
//       message: "Mobile number must be 10 digits.",
//     }),
//   address: z.string().min(1, {
//       message: "Address is required.",
//     }),
//   country: z.string().min(1, {
//       message: "Country is required.",
//     }) 
// });
 
// const AuctioneerRegister = () => {


//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password:"",
//       companyname: "", 
//       industry: "",
//       description: "",
//       mobilenumber: "",
//       address: "",
//       country: ""
   
//     },
//   })

//   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
//     const auctioneerData = {
//       companyname: values.companyname,
//       industry: values.industry,
//       description: values.description,
//       email: values.email,
//       password: values.password,
//       mobilenumber: values.mobilenumber,
//       address: values.address,
//       country: values.country,
//       termsconditions: true,
//     };
    
//     // Axios POST request to create a new auctioneer
//     axios.post("http://localhost:3000/auctioneer/create", auctioneerData)
//       .then(response => {
//         console.log('Auctioneer created successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error creating auctioneer:', error.response.data);
//       });
//   };
  

//   return  (
 
//     <Form {...form} >

//     <div className="flex items-center justify-center " >
//       <Tabs defaultValue="auctioneerR" className="flex items-center justify-center mt-2 h-full">
//       <TabsList>
//       <TabsTrigger value="login" className="font-akshar">
//               <Link to="/auctioneerLogin">Login</Link> {/* Link to the login page */}
//             </TabsTrigger>
//             <TabsTrigger value="register" className="font-akshar">Register</TabsTrigger>
//       </TabsList>
//       </Tabs>
//     </div>
 
//       <div className=" font-akshar text-secondary  text-center text-2xl mt-2 mb-2">Register as an Auctioneer</div>
       
//       <div className="flex justify-center ">
        
//       <form onSubmit={form.handleSubmit(onSubmit)} >
//         <div className="space-y-2 items-center space-x-4 rounded-md border p-4 w-96 justify-center ml-6">

//         <FormField
//         control={form.control}
//         name="companyname"
//         render={({ field }) => (
//             <FormItem>
//              <FormLabel className="font-akshar">Company Name</FormLabel>
//               <FormControl>
//                 <Input className="font-akshar" placeholder="Enter your companyname" {...field} />
//               </FormControl>
//              <FormMessage/> 
//             </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="industry"
//         render={({ field }) => (
//             <FormItem>
//              <FormLabel className="font-akshar">Industry</FormLabel>
//               <FormControl>
//                 <select {...field} className="font-akshar w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="" className="font-akshar">Select Industry</option>
//                 <option value="Arts" className="font-akshar">Arts</option>
//                 <option value="Furniture" className="font-akshar">Furniture</option>
//                 <option value="Jewelery" className="font-akshar">Jewelery</option>
//                 <option value="Clothing" className="font-akshar">Clothing</option>
//                 </select>
//               </FormControl>
//              <FormMessage/> 
//             </FormItem>
//         )}
//         />
        
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="font-akshar">Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your Email" className="font-akshar" type='email'{...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="font-akshar">Passsword</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your Passsword" className="font-akshar" type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
 
//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//           <FormItem>
//             <FormLabel className="font-akshar">Address</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your address" className="font-akshar" {...field} />
//             </FormControl>
//             <FormMessage/> 
//           </FormItem>
//         )}
//       />
//         <FormField
//           control={form.control}
//           name="mobilenumber"
//           render={({ field }) => (
//           <FormItem>
//             <FormLabel className="font-akshar">Contact Number</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your contactnumber" className="font-akshar" {...field} />
//             </FormControl>  
//             <FormMessage/> 
//           </FormItem>
//         )}
//       />
//         <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//           <FormItem>
//             <FormLabel className="font-akshar">Country</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your country" className="font-akshar" {...field} />
//             </FormControl>
//             <FormMessage/> 
//           </FormItem>
//         )}
//       />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//           <FormItem>
//             <FormLabel className="font-akshar">Description</FormLabel>
//             <FormControl>
//               <Input placeholder="Enter your description" className="font-akshar" {...field} />
//             </FormControl>
//             <FormMessage/> 
//           </FormItem>
//         )}
//       />

// <div className="flex items-center justify-center mb-2 mt-2">
//       <Checkbox id="terms2" />
//       <label
//         htmlFor="terms2"
//         className="font-akshar text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//         Accept terms and conditions
//       </label>
//     </div>

//          <div className="flex items-center justify-center mb-5">
//          <Button className=" font-akshar w-96 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" type="submit">Submit</Button>
//          </div>    
 
// </div> 
 
// {/* <div className="flex items-center justify-center mb-2 mt-2">
//       <Checkbox id="terms2" />
//       <label
//         htmlFor="terms2"
//         className="font-akshar text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//         Accept terms and conditions
//       </label>
//     </div>

//          <div className="flex items-center justify-center mb-5">
//          <Button className=" font-akshar w-96 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" type="submit">Submit</Button>
//          </div>     */}
//       </form>
//       </div>
//     </Form>
     
//   );
// };

// export default AuctioneerRegister;
