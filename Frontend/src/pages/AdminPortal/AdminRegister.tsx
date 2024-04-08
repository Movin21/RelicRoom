import React, { ChangeEvent, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "First Name is required.",
    }),
    lastName: z.string().min(3, {
      message: "Last Name is required.",
    }),
    username: z
      .string()
      .min(4, {
        message: "Username must be at least 4 characters.",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Username must contain at least one special character.",
      })
      .regex(/\d/, {
        message: "Username must contain at least one digit.",
      }),
    profilePicture: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one digit." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const AdminRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("https://github.com/shadcn.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      profilePicture: "",
    },
  });

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setIsLoading(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref("images");
      const fileRef = storageRef.child(selectedFile.name);
      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImgUrl(downloadURL);
          setIsLoading(false);
          form.setValue("profilePicture", downloadURL);
        });
      });
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    data.profilePicture = imgUrl;
    try {
      await axios.post("http://localhost:5000/admin/adminUser", data);
      console.log("Admin created successfully");
      form.reset();
      navigate("/adminLogin");
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  }

  return (
    <div>
      <div className="font-akshar text-2xl text-primary font-bold mb-6">
        Add New Admin
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 font-nunitoSans w-8/10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto space-y-6"
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <Avatar
                className="rounded-full w-20 h-20 object-cover cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <AvatarImage src={imgUrl} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-sm text-blue-500 mt-2 flex flex-col items-center justify-center">
                <Label htmlFor="picture" className="py-2">
                  Profile Picture
                </Label>
              </div>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jimmy" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Donaldson" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormDescription className="text-brownLight">
                          This is your login Id.
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="admin_01" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {isLoading ? (
                <Button className="font-nunitoSans bg-brownDark hover:bg-brownMedium text-white font-bold py-2 px-4 w-1/3 rounded focus:outline-none focus:shadow-outline">
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="font-nunitoSans bg-brownDark hover:bg-brownMedium text-white font-bold py-2 px-4 w-1/3 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Account
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminRegister;
