import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface Faq {
    _id: string;
    Question: string;
    Answer: string;
}

function FAQmanage() {

    
    const [data, setData] = useState<Faq[]>([]);
    const form = useForm(); // Define the form variable using useForm hook
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        axios
            .get("http://localhost:3000/customerCare/faq/getAll")
            .then((response) => {
                console.log(response.data, "Faqs");
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching FAQs:", error);
            });
    }, []);

    

    const handleDelete = (id: string) => {
        axios
            .delete("http://localhost:3000/customerCare/faq/delete/" + id)
            .then(res => {
                location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleUpdate = (id: string) => {
        // Navigate to the update page with the ID as a parameter
        navigate("/FAQUpdate/"+ id);
    }

    const columns = [
        {
            name: "ID",
            selector: (row:Faq,index:number) => index +1
        },
        {
            name: "Question",
            selector: (row: Faq) => row.Question
        },
        {
            name: "Answer",
            cell: (row: Faq) => row.Answer
        },
        {
            name: "Delete",
            cell: (row: Faq) => (
                <Button type="button" className='w-3/6 bg-red-950' onClick={() => handleDelete(row._id)}>Delete</Button>
            ),
        },
        {
            name: "Update",
            cell: (row: Faq) => (
                <Button type="button" className='w-3/6 bg-green-950' onClick={() => handleUpdate(row._id)}>Update</Button>
            ),
        },
    ];

    const handleSubmit = async (values: Record<string, any>) => {
        console.log(values);
        try {

            const response = await axios.post(
                "http://localhost:3000/customerCare/faq/create",
                {
                    Question: values.Question,
                    Answer: values.Answer,
                    
                }
            );
            console.log(response);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }

    };

    return (

        <>
            <Tabs defaultValue="faqManage" className="w-full">
                <TabsList className='flex justify-center mb-10 text-2xl font-bold h-500 item-center w-500 font-akshar text-yellow-950'>
                    <TabsTrigger value="feedbackManage" className='text-lg'><Link to="/feedbackManage">Feedback Manage</Link></TabsTrigger>
                    <TabsTrigger value="faqManage" className='text-lg'>FAQ Manage</TabsTrigger>
                </TabsList>
                <h1 className='flex justify-center text-2xl font-bold h-500 item-center w-500 font-akshar text-yellow-950'>FAQ Management </h1>
               <DataTable
                    columns={columns}
                    data={data}
                    //pagination
                    //fixedHeader
                    //fixedHeaderScrollHeight='450px'
                    //selectableRows
                    //selectableRowsHighlight
                    //highlightOnHover
    />
                <Card className='w-2/4 mx-auto mt-20 bg-gradient-to-tl from-orange-950 to-yellow-100'>
                    <CardContent className='mx-auto'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 text-yellow-950 font-akshar">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="Question"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question</FormLabel>
                                                <FormControl className='w-96'>
                                                    <Input placeholder="Enter the Question.." {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="Answer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Answer</FormLabel>
                                            <FormControl className='w-96'>
                                                <Input placeholder="Enter the answer.." {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className='w-1/6 mx-36'>Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

            </Tabs>


        </>

    )
}

export default FAQmanage;

