import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import * as z from "zod";
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

export default function PostForm() {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addImages: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
        auctionImages: [
          "https://img.freepik.com/free-photo/arrangement-with-old-travel-items_23-2148666278.jpg?w=1060",
          "https://img.freepik.com/free-photo/view-vintage-objects-arrangement_23-2150348541.jpg?w=1060",
          "https://img.freepik.com/free-photo/vintage-objects-arrangement-still-life_23-2150348578.jpg?w=1060",
          "https://img.freepik.com/free-photo/view-vintage-camera_23-2150315215.jpg?w=1060",
        ],
      });
      console.log(response);
      console.log("Response:", response.data); // Assuming backend responds with the saved data

      // Handle success or redirect if necessary
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center   h-full ">
      <Card className=" md:w-180 p-6 mt-10 mb-10">
        <CardHeader>
          <CardTitle className="font-akshar text-secondary  text-center text-2xl">
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
                    <FormLabel>Auction Title</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                    <FormLabel>Category</FormLabel>
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
                    <FormLabel>Starting Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2$" type="number" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormLabel>Auction Duration</FormLabel>
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
                        <Input placeholder="Minutes" type="number" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <FormLabel>Add Images</FormLabel>

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
  );
}
