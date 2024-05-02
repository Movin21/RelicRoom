'use client';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
    blogtitle: z.string().min(4).max(50, {
        message: "Blog title should be at least four characters",
      }),
      blogcontent: z
        .string()
        .min(10, {
          message: "Blog must be at least 10 characters.",
        })
        .max(500, {
          message: "Blog must not be longer than 500 characters.",
        }),
 
});

const BlogPostUpdate = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { id } = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVintageExpertData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/vintageexpert/blog/get/${id}`);
        const data = response.data;
        form.reset(data);
      } catch (error) {
        console.error('Error fetching vintage expert data:', (error as Error).message);
      }
    };
    fetchVintageExpertData();
  }, [form, id]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const blogData = {
        blogtitle: values.blogtitle,
        blogcontent: values.blogcontent,
    };

    try {
      const response = await axios.patch(`http://localhost:3000/vintageexpert/blog/update/${id}`, blogData); // Changed from axios.put to axios.patch
      console.log('Vintage expert updated successfully:', response.data);
      setShowSuccessAlert(true);
      navigate(`/blog/PostReadMore/${id}`);
    } catch (error) {
      console.error('Error updating vintage expert:', (error as Error).message);
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert>
          Blog updated successfully!
        </Alert>
      )}

      <CardHeader>
            <CardTitle className="font-akshar text-secondary  text-center text-5xl mb-0">
            Update as an Blog Post
            </CardTitle>
          </CardHeader>
    
    <div className="flex items-center justify-center">
      <Card className=" w-full md:w-96 p-6 mt-0 mb-10 shadow-2xl" style={{ width: '700px' }}>
          <CardContent>
          <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="max-w-xl w-full flex flex-col gap-4">     <FormField
              control={form.control}
              name="blogtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blogcontent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <div className="flex items-center justify-center mb-5">
           
           <Button
               disabled={form.formState.isSubmitting} // Disable the button while submitting
               type="submit"
               className="font-akshar w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4" 
               variant="outline"
             >Update</Button>
           </div>
       </form>
     </Form>
     </CardContent>
   </Card>
  </div></>
  );
};

export default BlogPostUpdate;
