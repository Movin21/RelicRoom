import React, { useEffect } from "react";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(4).max(50, {
    message: "Name should be at least four characters",
  }),
  address: z.string().min(4).max(50, {
    message: "Address should be at least four characters",
  }),
  specialization: z.enum(["art", "clothing", "furniture", "jewelry"]),
  username: z.string().min(4).max(50, {
    message: "Username should be at least four characters",
  }),
  certificates: z.string().min(4).max(50, {
    message: "Certifications should be at least four characters",
  }),
  contactNumber: z.string().min(10).max(10, {
    message: "Contact Number should be 10 characters",
  }),
  email: z.string().min(10).max(50, {
    message: "Email should be at least 10 characters",
  }),
  password: z.string().min(10).max(50, {
    message: "Password should be at least 10 characters",
  }),
});
enum Specialization {
  Art = "art",
  Clothing = "clothing",
  Furniture = "furniture",
  Jewelry = "jewelry",
}
interface RepairSpecialist {
  _id: string;
  name: string;
  address: string;
  specialization: Specialization;
  username: string;
  certificates: string;
  contactNumber: string;
  email: string;
  password: string;
  profilePicture: string;
}

export default function RSregister() {
  const [repairSpecialistData, setRepairSpecialistData] =
    useState<RepairSpecialist | null>(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Fetch repair specialist's data from local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      setRepairSpecialistData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (repairSpecialistData) {
      const {
        name,
        address,
        specialization,
        username,
        certificates,
        contactNumber,
        email,
        password,
      } = repairSpecialistData;
      console.log("Certification:", certificates);
      console.log("Specialization:", specialization);
      console.log("Contact:", contactNumber);
      form.setValue("name", name);
      form.setValue("address", address);
      form.setValue("specialization", specialization);
      form.setValue("username", username);
      form.setValue("certificates", certificates);
      form.setValue("contactNumber", contactNumber);
      form.setValue("email", email);
      form.setValue("password", password);
      setProfilePicture(profilePicture);
    }
  }, [repairSpecialistData]);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          // Use reader.result here
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!repairSpecialistData) {
        console.error("Repair specialist data is null.");
        return;
      }
      // Update repair specialist's profile data in the backend
      const response = await axios.put(
        `http://localhost:3000/repairSpecialist/update/${repairSpecialistData?._id}`,
        values // Send the form values directly as the request body
      );
      console.log("Response:", response.data);
      // Optionally, you can update the local state with the updated data
      setRepairSpecialistData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteProfile = async () => {
    try {
      if (!repairSpecialistData) {
        console.error("Repair specialist data is null.");
        return;
      }
      const response = await axios.delete(
        `http://localhost:3000/repairSpecialist/delete/${repairSpecialistData._id}`
      );
      console.log("Response:", response.data);
      // Optionally, you can clear the local storage or redirect the user to a different page after deletion
      // For now, let's log a message and clear the repairSpecialistData state
      console.log("Profile deleted successfully");
      setRepairSpecialistData(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full md:w-1/2 lg:w-2/3 xl:w-1/2 mt-10 mb-10">
        <CardHeader>
          <CardTitle className="font-akshar text-center text-2x1 text-secondary">
            USER PROFILE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 text-primary font-akshar"
            >
              {/* Add Profile Picture Section */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <img
                    src={
                      profilePicture
                        ? profilePicture
                        : "/default-profile-picture.jpg"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handlePictureChange}
                  />
                </div>
                <Button variant="outline" className="ml-4">
                  Change Picture
                </Button>
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...form.register("name")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        {...form.register("address")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Specialization"
                            {...form.register("specialization")}
                          />
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User name"
                        {...form.register("username")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Certification"
                        {...form.register("certificates")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contact Number"
                        {...form.register("contactNumber")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input placeholder="E-Mail" {...form.register("email")} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...form.register("password")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
  <Button type="submit">Update Profile</Button>
  <Button
    type="button"
    onClick={handleDeleteProfile}
    className="text-white bg-red-700 hover:bg-red-500 ease-in-out hover:text-white tw-50"
  >
    Delete Profile
  </Button>
</div>
              
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
