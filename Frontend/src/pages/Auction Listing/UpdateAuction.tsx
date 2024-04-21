import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { formatDuration, intervalToDuration, setHours } from "date-fns";

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

interface Auction {
  auctioneerId: string;
  _id: string;
  auctionTitle: string;
  auctionCategory: string;
  auctionDescription: string;
  auctionImages: string[];
  auctionStartingPrice: number;
  auctionDuration: Date;
  currentBid: number;
  isExpired: boolean;
  viewCount: number;
  createdAt: Date;
  leadingBidderName: string;
}

export default function UpdateAuction() {
  const auctioneer = useSelector((state: any) => state.auctioneer.auctioneer);
  const [auction, setAuction] = useState<Auction | null>(null);
  const { id } = useParams<{ id: string }>();

  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addImages: [],
    },
  });

  useEffect(() => {
    if (auction) {
      const interval = setInterval(() => {
        const now = new Date();
        const duration = intervalToDuration({
          start: now,
          end: new Date(auction.auctionDuration),
        });

        setDays(duration.days || 0);
        setHours(duration.hours || 0);
        setMinutes(duration.minutes || 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auction]);

  //Fetch the Selected Auction
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          auction: Auction;
        }>(`http://localhost:3000/auctions/${id}`);
        const duration = response.data.auction.auctionDuration;
        setAuction(response.data.auction);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };
    fetchAuction();
  }, [id]);

  const [files, setFiles] = useState<File[]>([]);

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

      // Convert auction duration to milliseconds
      const totalMilliseconds =
        values.auctionDuration.days * 24 * 60 * 60 * 1000 +
        values.auctionDuration.hours * 60 * 60 * 1000 +
        values.auctionDuration.minutes * 60 * 1000;

      // Create a Date object from current date + auction duration
      const auctionEndDate = new Date(Date.now() + totalMilliseconds);

      // Make a PUT request to backend API for updating auction
      const response = await axios.put(
        `http://localhost:3000/auctions/update/${id}`,
        {
          auctioneerId: auctioneer._id,
          auctionTitle: values.auctionTitle,
          auctionDescription: values.description,
          auctionCategory: values.category,
          auctionStartingPrice: values.startingPrice,
          auctionDuration: auctionEndDate,
        }
      );

      // Handle success or redirect if necessary
      console.log("Response:", response.data); // Assuming backend responds with the updated data
      if (response.status === 200) {
        toast("Auction has been updated successfully", {
          description: "You can view the updated auction in the Auctions page",
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="md:w-180 p-6 mt-10 mb-10">
        <CardHeader>
          <CardTitle className="text-secondary font-sourceSans3 text-center font-semibold text-3xl">
            Update Auction
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
                    <FormLabel className="font-sourceSans3 font-semibold text-center text-md">
                      Auction Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Auction Title"
                        {...field}
                        value={field.value || auction?.auctionTitle}
                      />
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
                    <FormLabel className="font-sourceSans3 font-semibold text-center text-md">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        className="h-40"
                        value={field.value || auction?.auctionDescription}
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
                    <FormLabel className="font-sourceSans3 font-semibold text-center text-md">
                      Category
                    </FormLabel>
                    <Select
                      value={field.value || auction?.auctionCategory}
                      onValueChange={field.onChange}
                    >
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
                    <FormLabel className="font-sourceSans3 font-semibold mt-2 text-center text-md">
                      Starting Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 2$"
                        type="number"
                        {...field}
                        value={field.value || auction?.auctionStartingPrice}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormLabel className="font-sourceSans3 font-semibold text-md">
                Auction Duration
              </FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="auctionDuration.days"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Days"
                          type="number"
                          {...field}
                          value={field.value || days}
                        />
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
                        <Input
                          placeholder="Hours"
                          type="number"
                          {...field}
                          value={field.value || hours}
                        />
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
                          value={field.value || minutes}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <FormLabel className="font-sourceSans3 font-semibold text-md mt-4">
                {`Add Images `}
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
              >
                Update Auction
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
