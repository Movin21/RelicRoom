
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState,ChangeEvent,useRef } from 'react'

// import { Form } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./slice/bidderSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from '@/components/ui/label';


const FormSchema = z.object({
  _id: z.string(), // Add ID field to the schema
    firstname: z.string().min(1,{
        message: "First name is required.",
      }),
    lastname: z.string().min(1,{
        message: "Last name is required.",
      }),
    email: z.string().min(1,{
        message: "Email is required.",
      }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",})
        .min(1, { message: "Password is Required.",
      }),
    address: z.string().min(1, {
        message: "Address is required.",
      }),
    contactnumber: z.string().length(10, {
        message: "Mobile number must be 10 digits.",
      }),
      profilePicture: z.string(),
    });

const BidderProfile = () => {
  
    const bidder = useSelector((state: any) => state.bidder.bidder);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  const [ImgUrl, setImgUrl] = useState(bidder.profilePicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          _id: bidder._id, // Assign ID to defaultValues
          firstname: bidder.firstname,
          lastname: bidder.lastname,
          email: bidder.email,
          password: bidder.password,
          address: bidder.address,
          contactnumber: bidder.contactnumber,
          profilePicture: bidder.profilePicture,
        },
      })

      const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
        const bidderData = {
          _id: values._id,  
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          address: values.address,
          contactnumber: values.contactnumber,
          profilePicture: values.profilePicture,
        };

        try {
            await axios.patch(`http://localhost:3000/bidder/update/${bidder._id}`,values);
            console.log("Bidder has been updated successfully", values);
            dispatch(login(values));
          } catch (error) {
            console.error("Error has been occured in updating", error);
          }
      }
      
      async function onDelete() {
        try {
          await axios.delete(`http://localhost:3000/bidder/delete/${bidder._id}`);
          console.log("Bidder has been deleted successfully");
          navigate("/bidderLogin");
        } catch (error) {
          console.error("Error has been occured in deletion", error);
        }
      }

      const handleDashboard = () => {
        navigate('/bidderDashboard');
      };

      const handleMyBidsClick = () => {
        navigate('/bidderMybids');
      };

      const handleWishlistlick = () => {
        navigate('/wishList');
      };

      const Logout = () => {
        dispatch(logout());
      };

      function handleFileUpload(event: ChangeEvent<HTMLInputElement>) { //when a file input element's value changes, indicating that a file has been selected.
        const selectedFile = event.target.files?.[0];
        if (selectedFile) { //checks if a file has been selected
          const storageRef = firebase.storage().ref("images"); //proceeds to upload the file to Firebase Storage
          const fileRef = storageRef.child(selectedFile.name); //creates a reference to the specific file
          fileRef.put(selectedFile).then((snapshot) => {  //uploads the selected file
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              setImgUrl(downloadURL); // Update ImgUrl with the download URL
              form.setValue("profilePicture", downloadURL); // Set the download URL in the form data
            });
          }).catch(error => {
            console.error("Error uploading profile picture", error);
          });
        }
      }
      



  
  return (

  <>
   <div className="ml-20 flex flex-1 items-center justify-between,center gap-4">
    <Card className="flex flex-col items-center gap-4 px-2 py-5 bg-white shadow-2xl h-96 w-64 mb-52 mt-22 ">

          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <Link to="#">
                <div className="flex items-center mb-2 gap-16 hover:scale-110 transition duration-300 ease-in-out">

                  <span onClick={handleDashboard} className=" text-brownDark font-akshar text-l font-semibold mr-6"> Dashboard</span> 
                  <svg onClick={handleDashboard} className="ml-auto " width="24" height="24" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg ">
                    <path d="M6.625 2.75C6.11613 2.75 5.61224 2.85023 5.1421 3.04497C4.67197 3.2397 4.24479 3.52513 3.88496 3.88496C3.52513 4.24479 3.2397 4.67197 3.04497 5.1421C2.85023 5.61224 2.75 6.11613 2.75 6.625C2.75 7.13387 2.85023 7.63776 3.04497 8.1079C3.2397 8.57804 3.52513 9.00521 3.88496 9.36504C4.24479 9.72487 4.67197 10.0103 5.1421 10.205C5.61224 10.3998 6.11613 10.5 6.625 10.5C7.65271 10.5 8.63834 10.0917 9.36504 9.36504C10.0917 8.63834 10.5 7.65271 10.5 6.625C10.5 5.59729 10.0917 4.61166 9.36504 3.88496C8.63834 3.15826 7.65271 2.75 6.625 2.75ZM17.375 2.75C16.8661 2.75 16.3622 2.85023 15.8921 3.04497C15.422 3.2397 14.9948 3.52513 14.635 3.88496C14.2751 4.24479 13.9897 4.67197 13.795 5.1421C13.6002 5.61224 13.5 6.11613 13.5 6.625C13.5 7.13387 13.6002 7.63776 13.795 8.1079C13.9897 8.57804 14.2751 9.00521 14.635 9.36504C14.9948 9.72487 15.422 10.0103 15.8921 10.205C16.3622 10.3998 16.8661 10.5 17.375 10.5C18.4027 10.5 19.3883 10.0917 20.115 9.36504C20.8417 8.63834 21.25 7.65271 21.25 6.625C21.25 5.59729 20.8417 4.61166 20.115 3.88496C19.3883 3.15826 18.4027 2.75 17.375 2.75ZM6.625 13.5C6.11613 13.5 5.61224 13.6002 5.1421 13.795C4.67197 13.9897 4.24479 14.2751 3.88496 14.635C3.52513 14.9948 3.2397 15.422 3.04497 15.8921C2.85023 16.3622 2.75 16.8661 2.75 17.375C2.75 17.8839 2.85023 18.3878 3.04497 18.8579C3.2397 19.328 3.52513 19.7552 3.88496 20.115C4.24479 20.4749 4.67197 20.7603 5.1421 20.955C5.61224 21.1498 6.11613 21.25 6.625 21.25C7.65271 21.25 8.63834 20.8417 9.36504 20.115C10.0917 19.3883 10.5 18.4027 10.5 17.375C10.5 16.3473 10.0917 15.3617 9.36504 14.635C8.63834 13.9083 7.65271 13.5 6.625 13.5ZM17.375 13.5C16.8661 13.5 16.3622 13.6002 15.8921 13.795C15.422 13.9897 14.9948 14.2751 14.635 14.635C14.2751 14.9948 13.9897 15.422 13.795 15.8921C13.6002 16.3622 13.5 16.8661 13.5 17.375C13.5 17.8839 13.6002 18.3878 13.795 18.8579C13.9897 19.328 14.2751 19.7552 14.635 20.115C14.9948 20.4749 15.422 20.7603 15.8921 20.955C16.3622 21.1498 16.8661 21.25 17.375 21.25C18.4027 21.25 19.3883 20.8417 20.115 20.115C20.8417 19.3883 21.25 18.4027 21.25 17.375C21.25 16.3473 20.8417 15.3617 20.115 14.635C19.3883 13.9083 18.4027 13.5 17.375 13.5Z" stroke="#635A3F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>

                </div>
              </Link>
            </li>

            <li>
              <Link to="/bidderProfile">
                <div className="flex items-center mb-2 hover:scale-110 transition duration-300 ease-in-out">
                  <span className="text-brownDark font-akshar text-l font-semibold  mr-4">
                    My Profile
                  </span>
                  <svg
                    className="ml-auto "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <path
                      fill="currentColor"
                      d="M17.438 21.937H6.562a2.5 2.5 0 0 1-2.5-2.5v-.827c0-3.969 3.561-7.2 7.938-7.2s7.938 3.229 7.938 7.2v.827a2.5 2.5 0 0 1-2.5 2.5M12 12.412c-3.826 0-6.938 2.78-6.938 6.2v.827a1.5 1.5 0 0 0 1.5 1.5h10.876a1.5 1.5 0 0 0 1.5-1.5v-.829c0-3.418-3.112-6.198-6.938-6.198m0-2.501a3.924 3.924 0 1 1 3.923-3.924A3.927 3.927 0 0 1 12 9.911m0-6.847a2.924 2.924 0 1 0 2.923 2.923A2.926 2.926 0 0 0 12 3.064"
                    />
                  </svg>
                </div>
              </Link>
            </li>

            <li>
              <Link to="#">
                <div className="flex items-center mb-2 hover:scale-110 transition duration-300 ease-in-out">

                  <span onClick={handleWishlistlick} className="text-brownDark font-akshar text-l font-semibold  mr-4">Wishlist</span>
                  <svg onClick={handleWishlistlick} className="ml-auto" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9886 7.18033C11.8401 5.05591 12.267 3.99316 12.9993 3.99316C13.7316 3.99316 14.1585 5.05483 15.01 7.18033L15.05 7.27783C15.531 8.47925 15.7715 9.07941 16.2634 9.4445C16.753 9.8085 17.3976 9.867 18.6857 9.98183L18.9175 10.0024C21.0257 10.1909 22.0809 10.2852 22.3051 10.9557C22.5315 11.6274 21.7483 12.3392 20.1818 13.7627L19.6607 14.2393C18.8677 14.9597 18.4712 15.3205 18.287 15.7928C18.2523 15.8811 18.2233 15.9716 18.2004 16.0637C18.0801 16.5555 18.196 17.0787 18.4279 18.1242L18.5005 18.4492C18.9262 20.3721 19.1396 21.333 18.768 21.7479C18.6288 21.9027 18.4479 22.014 18.247 22.0686C17.7096 22.2159 16.947 21.5941 15.4195 20.3504C14.4174 19.5336 13.9158 19.1252 13.3405 19.0331C13.1145 18.997 12.8841 18.997 12.658 19.0331C12.0817 19.1252 11.5812 19.5336 10.578 20.3504C9.05271 21.5941 8.28896 22.2159 7.75163 22.0686C7.55112 22.0138 7.37061 21.9025 7.23163 21.7479C6.85896 21.333 7.07238 20.3721 7.49813 18.4502L7.57071 18.1242C7.80254 17.0777 7.91846 16.5555 7.79821 16.0626C7.77528 15.9705 7.74633 15.88 7.71154 15.7917C7.52738 15.3205 7.13088 14.9597 6.33788 14.2382L5.81571 13.7627C4.25029 12.3392 3.46704 11.6263 3.69238 10.9568C3.91879 10.2852 4.97288 10.1909 7.08104 10.0024L7.31288 9.98075C8.60204 9.86591 9.24554 9.8085 9.73629 9.44341C10.227 9.07941 10.4675 8.47925 10.9496 7.27891L10.9886 7.18033Z" stroke="#635A3F"/></svg>
                </div>  
                </Link>
              </li>

              {/* <li className='mb-12'>
                <Link to="#" >
                <div className="flex items-center mb-2 hover:scale-110 transition duration-300 ease-in-out">
                  <span className="text-brownDark font-akshar text-l font-semibold  mr-4">Generate Reports</span> 
                  <svg className="ml-auto" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2422 13.2812V19.5312C23.2422 19.8939 23.0981 20.2416 22.8417 20.498C22.5854 20.7544 22.2376 20.8984 21.875 20.8984H3.125C2.7624 20.8984 2.41465 20.7544 2.15825 20.498C1.90186 20.2416 1.75781 19.8939 1.75781 19.5312V13.2812C1.75781 12.9186 1.90186 12.5709 2.15825 12.3145C2.41465 12.0581 2.7624 11.9141 3.125 11.9141H7.03125C7.18665 11.9141 7.33569 11.9758 7.44557 12.0857C7.55545 12.1956 7.61719 12.3446 7.61719 12.5C7.61719 12.6554 7.55545 12.8044 7.44557 12.9143C7.33569 13.0242 7.18665 13.0859 7.03125 13.0859H3.125C3.0732 13.0859 3.02352 13.1065 2.98689 13.1431C2.95027 13.1798 2.92969 13.2295 2.92969 13.2812V19.5312C2.92969 19.583 2.95027 19.6327 2.98689 19.6694C3.02352 19.706 3.0732 19.7266 3.125 19.7266H21.875C21.9268 19.7266 21.9765 19.706 22.0131 19.6694C22.0497 19.6327 22.0703 19.583 22.0703 19.5312V13.2812C22.0703 13.2295 22.0497 13.1798 22.0131 13.1431C21.9765 13.1065 21.9268 13.0859 21.875 13.0859H17.9688C17.8133 13.0859 17.6643 13.0242 17.5544 12.9143C17.4445 12.8044 17.3828 12.6554 17.3828 12.5C17.3828 12.3446 17.4445 12.1956 17.5544 12.0857C17.6643 11.9758 17.8133 11.9141 17.9688 11.9141H21.875C22.2376 11.9141 22.5854 12.0581 22.8417 12.3145C23.0981 12.5709 23.2422 12.9186 23.2422 13.2812ZM12.0859 12.9141C12.1958 13.0238 12.3447 13.0854 12.5 13.0854C12.6553 13.0854 12.8042 13.0238 12.9141 12.9141L17.6016 8.22656C17.7051 8.11549 17.7614 7.96858 17.7587 7.81678C17.7561 7.66498 17.6946 7.52015 17.5872 7.4128C17.4799 7.30544 17.335 7.24395 17.1832 7.24127C17.0314 7.23859 16.8845 7.29494 16.7734 7.39844L13.0859 11.085V2.34375C13.0859 2.18835 13.0242 2.03931 12.9143 1.92943C12.8044 1.81954 12.6554 1.75781 12.5 1.75781C12.3446 1.75781 12.1956 1.81954 12.0857 1.92943C11.9758 2.03931 11.9141 2.18835 11.9141 2.34375V11.085L8.22656 7.39844C8.11549 7.29494 7.96858 7.23859 7.81678 7.24127C7.66498 7.24395 7.52015 7.30544 7.4128 7.4128C7.30544 7.52015 7.24395 7.66498 7.24127 7.81678C7.23859 7.96858 7.29494 8.11549 7.39844 8.22656L12.0859 12.9141ZM19.3359 16.4062C19.3359 16.2131 19.2787 16.0243 19.1714 15.8637C19.0641 15.7031 18.9115 15.5779 18.7331 15.504C18.5546 15.4301 18.3583 15.4108 18.1689 15.4485C17.9794 15.4861 17.8054 15.5791 17.6688 15.7157C17.5323 15.8523 17.4393 16.0263 17.4016 16.2157C17.3639 16.4052 17.3832 16.6015 17.4571 16.78C17.5311 16.9584 17.6562 17.1109 17.8168 17.2182C17.9774 17.3255 18.1662 17.3828 18.3594 17.3828C18.6184 17.3828 18.8668 17.2799 19.0499 17.0968C19.2331 16.9136 19.3359 16.6653 19.3359 16.4062Z" fill="#635A3F"/></svg>
                  </div>
                </Link>
              </li> */}

              <li className='gap-12 mb-14'>
                <Link to="/bidderLogin"> 
                <div className="flex items-center mb-2 hover:scale-110 transition duration-300 ease-in-out">
                  <svg onClick={Logout} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#9A0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="#9A0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12H9" stroke="#9A0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span onClick={Logout} className="text-red-800 font-akshar text-l font-semibold  ml-2">Logout</span> 
                  </div>
                </Link>
              </li>
            </ul>
          </Card>
    
    

    <CardHeader className='gap-10 mt-11'>
        <CardTitle className="font-akshar text-primary  text-center mr-0 text-2xl">
            Welcome { bidder.firstname} !
        </CardTitle>
      
        
        <Card className="w-full md:w-96 p-6 mt-0 mb-10 shadow-2xl gap-4" style={{ width: '700px' }}>
            <CardContent>
             
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="max-w-xl w-full flex flex-col gap-4">
           <div className="flex m-8 items-start ml-0">
              <Avatar
                className="rounded-full w-30 h-28 object-cover cursor-pointer"
              >
                <AvatarImage src={ImgUrl} alt="@shadcn" />
                <AvatarFallback>Pic</AvatarFallback>
              </Avatar>

              <Button className="font-akshar bg-primary hover:bg-secondary ease-in-out hover:text-white w-32 tw-50 mt-4 hover:scale-110 transition duration-300" type="submit" style={{ margin: '38px', fontSize: '20px' }}>
              <Label htmlFor="picture" className="py-2">
                  Upload Profile Picture
                </Label> 
                </Button>
                {/* <Label htmlFor="picture" className="py-2">
                  Upload Profile Picture
                </Label> */}

              
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

                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">
                            First Name :
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter first name"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">
                            Last Name :
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter last name"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">Email :</FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter email"
                              type="email"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">
                            Passsword :
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter passsword"
                              type="password"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">
                            Address :
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter address"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactnumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-akshar">
                            Contact number :
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="font-akshar"
                              placeholder="Enter contact number"
                              {...field}
                              style={{ fontSize: "14px" }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-akshar" />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between mb-5">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="hover:scale-110 hover:shadow-xl transition duration-300 font-akshar w-40 text-white bg-red-700 hover:bg-red-500 ease-in-out hover:text-white tw-50 mt-4">
                            Close Account
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-akshar text-2xl text-brownMedium">
                              This will erase your data from our platform
                              permanently. Do you want to continue ?
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-akshar">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction className="bg-red-700 hover:bg-red-500">
                              <Button
                                onClick={onDelete}
                                className="font-akshar w-full bg-red-700 hover:bg-red-500"
                              >
                                Continue{" "}
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <div>
                        <Button
                          className="hover:scale-110 hover:shadow-xl transition duration-300 font-akshar w-40 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white tw-50 mt-4"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>


                </form>
             </Form>
          </CardContent>
        </Card> </CardHeader>
        
    </div></>
  );
};

export default BidderProfile;
