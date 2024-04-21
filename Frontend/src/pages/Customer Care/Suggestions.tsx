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
    Name: z.string().min(4).max(50, {
        message: "Name should be atleast 4 characters",
    }),
    Email: z.string().min(10).max(50, {
        message: "Email should be atleast 10 characters",
    }),
    Message: z.string().min(10).max(1000, {
        message: "Message should be atleast 10 characters",
    }),
    Recommend: z
    .string({
      required_error: "Choose this.",
    })
    
    
  })

 export default  function Suggestions() {
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {},
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
         try {
          
            const response = await axios.post(
             "http://localhost:3000/customerCare/suggestion/create",
              {
                Name: values.Name,
                Email: values.Email,
                Rate: values.Recommend,
                Suggestions: values.Message
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
    
    <Tabs defaultValue="suggestion" className="w-[400px] flex item-center justify-center">
     <TabsList>
      <TabsTrigger value="complaint"><Link to="/complaint">Complaint</Link></TabsTrigger>
      <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
      <TabsTrigger value="feedback"><Link to="/feedback">Feedback</Link></TabsTrigger>
      
     </TabsList>
     
    </Tabs>
    
    <div className="flex justify-center h-500 item-center w-500">
        <Card className="w-3/5 mt-5 mb-52">
          <CardHeader>
           <CardTitle className="text-center font-akshar text-yellow-950">Suggestion Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
                 <Card className="mx-5 mt-5 mb-5 ">
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
                                 <FormControl className='w-full'>
                                  <Input placeholder="Enter the your name.." {...field} />
                                 </FormControl>
              
                                 <FormMessage  className='text-red-500 font-akshar'/>
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
                                 <FormControl className='w-full'>
                                  <Input placeholder="Enter the your Email address.." {...field} />
                                 </FormControl>
              
                                 <FormMessage  className='text-red-500 font-akshar'/>
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
                                   <SelectTrigger className='w-full'>
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
                                 <FormMessage  className='text-red-500 font-akshar' />
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
                                    <Textarea placeholder="Type your message here.."{...field} />
                                 </FormControl>
              
                                 <FormMessage  className='text-red-500 font-akshar'/>
                                </FormItem>
                                    )}
                        />     
                       <Button type="submit" className='w-3/6 mx-36' >Submit</Button>
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

