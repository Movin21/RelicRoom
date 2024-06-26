
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

              <li>
                <Link to="#" >
                <div onClick={handleMyBidsClick} className="flex items-center mb-2 hover:scale-110 transition duration-300 ease-in-out">
                  <span className="text-brownDark font-akshar text-l font-semibold  mr-4 ">My Bids</span>
                  <svg className="ml-auto" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.503 3.10381C12.5084 3.18572 12.4976 3.26791 12.4713 3.34566C12.445 3.42342 12.4036 3.49523 12.3495 3.55698C12.2954 3.61873 12.2297 3.66923 12.156 3.70557C12.0824 3.74192 12.0024 3.76341 11.9205 3.76881C10.2429 3.88032 8.63301 4.47277 7.28334 5.47527C5.93368 6.47778 4.9014 7.84789 4.31002 9.42169C3.71863 10.9955 3.59317 12.7064 3.94865 14.3496C4.30413 15.9929 5.12549 17.4989 6.31447 18.6876C7.50346 19.8762 9.00972 20.6972 10.6531 21.0522C12.2964 21.4073 14.0072 21.2813 15.5809 20.6895C17.1545 20.0977 18.5244 19.0651 19.5265 17.7151C20.5286 16.3652 21.1207 14.7551 21.2317 13.0776C21.237 12.9956 21.2585 12.9156 21.2947 12.842C21.331 12.7683 21.3814 12.7025 21.4431 12.6484C21.5048 12.5943 21.5766 12.5528 21.6543 12.5264C21.732 12.4999 21.8142 12.4891 21.8961 12.4944C21.978 12.4998 22.0581 12.5212 22.1317 12.5575C22.2053 12.5937 22.2711 12.6442 22.3252 12.7059C22.3794 12.7675 22.4209 12.8393 22.4473 12.917C22.4737 12.9947 22.4845 13.0769 22.4792 13.1588C22.3525 15.0762 21.6761 16.9164 20.5308 18.4594C19.3856 20.0024 17.82 21.1827 16.0215 21.8592C14.223 22.5357 12.2676 22.6797 10.3894 22.2739C8.51119 21.8682 6.78964 20.9299 5.43074 19.5713C4.07184 18.2127 3.13314 16.4914 2.72695 14.6133C2.32076 12.7351 2.46429 10.7798 3.14035 8.98107C3.81641 7.18238 4.99638 5.61656 6.53908 4.47095C8.08178 3.32535 9.92188 2.64847 11.8392 2.52131C12.0044 2.51068 12.1671 2.56605 12.2916 2.67526C12.416 2.78447 12.492 2.9386 12.503 3.10381ZM13.7592 3.18756C13.7755 3.107 13.8075 3.03045 13.8533 2.96227C13.8992 2.89409 13.9581 2.83563 14.0266 2.79023C14.0951 2.74483 14.1719 2.71339 14.2526 2.6977C14.3332 2.68202 14.4162 2.68239 14.4967 2.69881C15.1967 2.84006 15.8692 3.05506 16.5067 3.33506C16.5844 3.36618 16.6551 3.41259 16.7145 3.47153C16.7739 3.53047 16.8209 3.60074 16.8526 3.67818C16.8844 3.75562 16.9002 3.83865 16.8993 3.92233C16.8983 4.00602 16.8806 4.08866 16.8471 4.16536C16.8136 4.24206 16.765 4.31125 16.7043 4.36883C16.6436 4.42641 16.5719 4.4712 16.4935 4.50055C16.4151 4.5299 16.3316 4.54321 16.248 4.53969C16.1644 4.53617 16.0823 4.51589 16.0067 4.48006C15.4419 4.23269 14.8523 4.04622 14.248 3.92381C14.1675 3.90741 14.0911 3.87532 14.0231 3.82938C13.955 3.78344 13.8967 3.72454 13.8514 3.65605C13.8062 3.58757 13.7748 3.51083 13.7592 3.43023C13.7436 3.34963 13.744 3.26674 13.7605 3.18631M21.6717 8.50256C21.6389 8.4273 21.5915 8.35923 21.5324 8.30226C21.4733 8.24529 21.4035 8.20053 21.3271 8.17052C21.2506 8.14052 21.169 8.12586 21.0869 8.12739C21.0048 8.12892 20.9239 8.1466 20.8486 8.17943C20.7733 8.21226 20.7053 8.2596 20.6483 8.31873C20.5913 8.37786 20.5466 8.44764 20.5166 8.52408C20.4865 8.60051 20.4719 8.68211 20.4734 8.7642C20.4749 8.8463 20.4926 8.9273 20.5255 9.00256C20.768 9.55631 20.9542 10.1401 21.0767 10.7488C21.1099 10.9113 21.2062 11.0539 21.3445 11.1453C21.4828 11.2367 21.6518 11.2695 21.8142 11.2363C21.9767 11.2032 22.1193 11.1068 22.2107 10.9685C22.3021 10.8302 22.3349 10.6613 22.3017 10.4988C22.1626 9.81306 21.9514 9.14393 21.6717 8.50256ZM18.0205 4.89256C18.1268 4.76548 18.2792 4.6858 18.4442 4.67104C18.6092 4.65627 18.7733 4.70762 18.9005 4.81381C19.3855 5.21756 19.833 5.66756 20.2342 6.15631C20.2863 6.21975 20.3254 6.29284 20.3493 6.3714C20.3732 6.44996 20.3814 6.53246 20.3733 6.61417C20.3653 6.69589 20.3413 6.77523 20.3026 6.84766C20.264 6.92009 20.2114 6.98419 20.148 7.03631C20.0845 7.08843 20.0114 7.12754 19.9329 7.15141C19.8543 7.17528 19.7718 7.18345 19.6901 7.17544C19.6084 7.16743 19.529 7.1434 19.4566 7.10473C19.3842 7.06606 19.3201 7.0135 19.268 6.95006C18.9167 6.52212 18.5258 6.12829 18.1005 5.77381C18.0373 5.72125 17.9851 5.65675 17.9468 5.58399C17.9086 5.51122 17.8851 5.43164 17.8777 5.34978C17.8702 5.26792 17.879 5.1854 17.9035 5.10695C17.928 5.02849 17.9678 4.95564 18.0205 4.89256ZM12.5005 6.87506C12.5005 6.7093 12.4346 6.55033 12.3174 6.43312C12.2002 6.31591 12.0412 6.25006 11.8755 6.25006C11.7097 6.25006 11.5507 6.31591 11.4335 6.43312C11.3163 6.55033 11.2505 6.7093 11.2505 6.87506V13.1251C11.2505 13.2908 11.3163 13.4498 11.4335 13.567C11.5507 13.6842 11.7097 13.7501 11.8755 13.7501H15.6255C15.7912 13.7501 15.9502 13.6842 16.0674 13.567C16.1846 13.4498 16.2505 13.2908 16.2505 13.1251C16.2505 12.9593 16.1846 12.8003 16.0674 12.6831C15.9502 12.5659 15.7912 12.5001 15.6255 12.5001H12.5005V6.87506Z" fill="#635A3F"/></svg>
                  </div>  
                </Link>
                </li>

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
