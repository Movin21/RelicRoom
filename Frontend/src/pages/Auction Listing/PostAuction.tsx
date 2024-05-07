import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Dropzone from "./shared/DropZone";
import { Breadcrumb } from "antd";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

// Define the form schema
const formSchema = z.object({
  auctionTitle: z.string().nonempty().min(5, {
    message: "Auction Title must be at least 5 characters long",
  }),
  description: z.string().nonempty().min(20, {
    message: "Description must be at least 20 characters long",
  }),

  category: z.enum(["art", "clothing", "furniture", "jewelry"]),
  startingPrice: z.coerce
    .number({
      required_error: "REQUIRED",
      invalid_type_error: "Valid number required",
    })
    .nonnegative({
      message: "Starting price cannot be a negative value",
    })
    .min(2, {
      message: "Starting Price should be at least $2",
    }),
  auctionDuration: z.object({
    days: z.coerce
      .number({
        required_error: "REQUIRED",
        invalid_type_error: "Valid number required",
      })
      .nonnegative({
        message: "Days cannot be a negative value",
      }),
    hours: z.coerce
      .number({
        required_error: "REQUIRED",
        invalid_type_error: "Valid number required",
      })
      .nonnegative({
        message: "Hours cannot be a negative value",
      }),
    minutes: z.coerce
      .number({
        required_error: "REQUIRED",
        invalid_type_error: "Valid number required",
      })
      .nonnegative({
        message: "Minutes cannot be a negative value",
      }),
  }),
  addImages: z.array(z.string().url()).max(4, {
    message: "Maximum of 4 images allowed",
  }),
});

export default function PostForm({}) {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addImages: [],
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  console.log(files);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Upload files to Firebase Storage
      const storageRef = firebase.storage().ref();
      const uploadTasks = files.map((file) => {
        const fileRef = storageRef.child(file.name);
        return fileRef.put(file);
      });

      // Wait for all uploads to complete
      await Promise.all(uploadTasks);

      // Get download URLs of the uploaded files
      const downloadURLs = await Promise.all(
        uploadTasks.map((uploadTask) =>
          uploadTask.snapshot.ref.getDownloadURL()
        )
      );

      console.log("Download URLs:", downloadURLs);

      console.log(values);
      // Convert auction duration to milliseconds
      const totalMilliseconds =
        values.auctionDuration.days * 24 * 60 * 60 * 1000 +
        values.auctionDuration.hours * 60 * 60 * 1000 +
        values.auctionDuration.minutes * 60 * 1000;

      // Create a Date object from current date + auction duration
      const auctionEndDate = new Date(Date.now() + totalMilliseconds);

      console.log("Auction End Date:", auctionEndDate);

      // Make a POST request to backend API
      const response = await axios.post("http://localhost:3000/auctions/save", {
        auctioneerId: auctioneer._id,
        auctionTitle: values.auctionTitle,
        auctionDescription: values.description,
        auctionCategory: values.category,
        auctionStartingPrice: values.startingPrice,
        auctionDuration: auctionEndDate,
        auctionImages: downloadURLs,
      });
      console.log(response);
      console.log("Response:", response.data); // Assuming backend responds with the saved data

      // Handle success or redirect if necessary
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Breadcrumb className="hidden md:flex ml-7 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/auctionDashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/auction/postAuction">Post Auctions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-center h-full ">
        <Card className=" md:w-180 p-6 mt-10 mb-10 ">
          <CardHeader>
            <CardTitle className=" text-secondary font-sourceSans3 text-center font-semibold  text-3xl">
              Post Auction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-xl w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="auctionTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-sourceSans3 font-semibold  text-center text-md">
                        Auction Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Auction Title" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-sourceSans3 font-semibold  text-center text-md">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="h-40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-sourceSans3 font-semibold  text-center text-md">
                        Category
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="jewelry">Jewelry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-sourceSans3 font-semibold mt-2 text-center text-md">
                        Starting Price
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2$" type="number" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormLabel className=" font-sourceSans3 font-semibold mt-2  text-md">
                  Auction Duration
                </FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="auctionDuration.days"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Days" type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="auctionDuration.hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Hours" type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="auctionDuration.minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Minutes"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormLabel className=" font-sourceSans3 font-semibold   text-md mt-4">
                  Add Images
                </FormLabel>

                <Dropzone
                  className="flex flex-1 flex-col items-center p-10 border-2 border-gray-300 rounded-md border-dashed bg-gray-100 text-gray-500 outline-none transition duration-300 ease-in-out hover:border-secondary"
                  onFilesChange={handleFilesChange}
                />

                <Button
                  disabled={form.formState.isSubmitting} // Disable the button while submitting
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                  variant="outline"
                  onClick={() => {
                    if (form.formState.isValid) {
                      toast("Auction has been created successfully", {
                        description:
                          "You can view your auction in the Auctions page",

                        duration: 3000, // Set duration
                        position: "bottom-right", // Set toast position
                      });
                    }
                  }}
                >
                  Post Auction
                </Button>
                <Toaster
                  className="text-secondary"
                  toastOptions={{ style: { backgroundColor: "#302300" } }}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
