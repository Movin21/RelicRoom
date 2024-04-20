import React from 'react'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"




  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom";
  
  

const formSchema = z.object({
    Name: z.string().min(2).max(50, {
        message: "Name should be atleast four characters",
    }),
    Email: z.string().min(10).max(50, {
        message: "Email should be atleast 10 characters",
    }),
    Message: z.string().min(5).max(100, {
        message: "Message should be atleast 10 characters",
    }),
    Type: z
    .string({
      required_error: "Please select.",
    }),
    Recommend: z
    .string({
      required_error: "Please select.",
    })
  
    

  })

 export default  function Complaints() {
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
           
            const response = await axios.post(
             "http://localhost:3000/customerCare/complaints/create",
              {
                Name: values.Name,
                Email: values.Email,
                Type: values.Type,
                Recommend: values.Recommend,
                Message: values.Message  
              }
            );
            console.log(response);
            console.log("Response:", response.data);
          } catch (error) {
            console.error("Error:", error);
          }
      
      };
    

  return (
    <>
    <h1 className='flex justify-center text-2xl font-bold h-500 item-center w-500 font-akshar text-yellow-950'>Customer Care </h1>
    <Tabs defaultValue="account" className="w-[400px] flex item-center justify-center">
     <TabsList>
      <TabsTrigger value="complaint">Complaint</TabsTrigger>
      <TabsTrigger value="suggestion"><Link to="/suggestion">Suggestion</Link></TabsTrigger>
      <TabsTrigger value="feedback"><Link to="/feedback">Feedback</Link></TabsTrigger>
      
     </TabsList>
    
    </Tabs>
    
    <div className="flex justify-center h-500 item-center w-500">
        <Card className="w-3/5 mt-5 mb-52">
          <CardHeader>
           <CardTitle className="text-center font-akshar text-yellow-950">Complaint Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
                 <Card className="mx-5 mt-5 mb-5 bg-gradient-to-tl from-orange-950 to-yellow-100">
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 text-yellow-950 font-akshar">
                            <div>
                        <FormField
                              control={form.control}
                              name="Name"
                              render={({ field }) => (
                                <FormItem>
                                 <FormLabel>Name</FormLabel>
                                 <FormControl className='w-50'>
                                  <Input placeholder="Enter the your name.." {...field} />
                                 </FormControl>
              
                                 <FormMessage />
                                </FormItem>
                                    )}
                        />
                        </div>
                        
                        <FormField
                              control={form.control}
                              name="Email"
                              render={({ field }) => (
                                <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl className='w-50'>
                                  <Input placeholder="Enter the your Email address.." {...field} />
                                 </FormControl>
              
                                 <FormMessage />
                                </FormItem>
                                    )}
                        />
                        
                        <FormField
                              control={form.control}
                              name ="Type"
                              render={({ field }) => (
                                <FormItem>
                                 <FormLabel>Complaint Type</FormLabel>
                                 <Select onValueChange={field.onChange}>
                                 <FormControl>
                                   <SelectTrigger className='w-5/12'>
                                   <SelectValue placeholder="Select"/>
                                   </SelectTrigger>
                                 </FormControl>
                                 
                                 <SelectContent>
                                     <SelectItem value="Type1">Item Not as Described</SelectItem>
                                     <SelectItem value="Type2">Poor Quality Items</SelectItem> 
                                     <SelectItem value="Type3">Shipping Delays</SelectItem>
                                     <SelectItem value="Type4">Communication Issues</SelectItem>
                                     <SelectItem value="Type5">Website Technical Issues</SelectItem>   
                              </SelectContent>
                                 </Select>
                                 <FormMessage />
                                </FormItem>
                                    )}
                        />

                        <FormField
                              control={form.control}
                              name="Recommend"
                              render={({ field }) => (
                                <FormItem>
                                 <FormLabel>How would you like to recommend our site</FormLabel>
                                 <Select onValueChange={field.onChange}>
                                 <FormControl>
                                   <SelectTrigger className='w-5/12'>
                                   <SelectValue placeholder="Select" />
                                   </SelectTrigger>
                                 </FormControl>
                                 
                                <SelectContent>
                                     <SelectItem value="one">1</SelectItem>
                                     <SelectItem value="two">2</SelectItem>   
                                     <SelectItem value="three">3</SelectItem>  
                                     <SelectItem value="four">4</SelectItem>  
                                     <SelectItem value="five">5</SelectItem>   
                              </SelectContent>
                                 </Select>
                                 <FormMessage />
                                </FormItem>
                                    )}
                              />
                      
                        
                        <FormField
                              control={form.control}
                              name="Message"
                              render={({ field }) => (
                                <FormItem>
                                 <FormLabel> Your Message</FormLabel>
                                 <FormControl >
                                    <Textarea placeholder="Type your message here.."{...field }/>
                                 </FormControl>
              
                                 <FormMessage />
                                </FormItem>
                                    )}
                        />     
                       <Button type="submit" className='w-3/6 mx-36'>Submit</Button>
                       </form>
                    </Form>
                    </CardContent>
                 </Card>
            </div>
          </CardContent>
  
        </Card>

      
    </div>
    </>
  )
                              };


//export default Feedback
