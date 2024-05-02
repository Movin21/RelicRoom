'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const BlogCreate = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blogtitle: "",
      blogcontent: "",
      
    },
  });
  
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
    const blogData = {
      blogtitle: values.blogtitle,
      blogcontent: values.blogcontent,
  
    };
    
    // Axios POST request to create a new vintageexpert
    axios.post("http://localhost:3000/vintageexpert/blog/create", blogData)
      .then(response => {
        console.log('Blog created successfully:', response.data);
        navigate('/blog/PostView');
      })
      .catch(error => {
        console.error('Error creating Blog:', error.response.data);
      });
  };
  


  return (
    

          <><CardHeader>
      <CardTitle className="font-akshar text-secondary  text-center text-2xl mb-0">
        Create Blog Post
      </CardTitle>
    </CardHeader><div className="flex items-center justify-center">
        <Card className=" w-full md:w-96 p-6 mt-0 mb-10 shadow-2xl" style={{ width: '700px' }}>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-xl w-full flex flex-col gap-4">

                <FormField
                  control={form.control}
                  name="blogtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Title :</FormLabel>
                      <FormControl>
                        <Input placeholder="Blog Title" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 font-akshar"/>
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="blogcontent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content :</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell your blog"
                          className="resize-none"
                          {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 font-akshar"/>
                    </FormItem>
                  )} />



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

export default BlogCreate;
