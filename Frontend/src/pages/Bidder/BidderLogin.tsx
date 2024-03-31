'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FormSchema = z.object({
  email: z
  .string()
  .min(1,{
    message: "Email is required.",}),
  password: z
  .string()
  .min(6, {
    message: "Password must be at least 6 characters.",})
  .min(1, {
    message: "Password is Required.",
}),
});

const BidderLogin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  const onSubmit = (values:z.infer<typeof FormSchema>)=>{
    console.log(values);
  }

  return  (
     
    <Form {...form}>

    { <div className=" ">
      <Tabs defaultValue="bidderLogin" className="w-[400px]">
      <TabsList>
      <TabsTrigger value="login">Login</TabsTrigger>
      <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">Log to your account here.</TabsContent>
      <TabsContent value="register">Register to your account here.</TabsContent>
      </Tabs>
    </div> }
 
      <div className="text-center">Login To Your Profile</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

        <div className="space-y-2 items-center space-x-4 rounded-md border p-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" type='email'{...field} />
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
        </div>  
        <Button className="w-full mt-6 mb-6" type="submit">Log In</Button>
      </form>
    </Form>
  );
};

export default BidderLogin;