import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

interface Suggetions {
    _id: string; 
    Name: string;
    Suggestions: string;
  }

  interface Complaints {
    _id: string; 
    Name: string;
    Complaints: string;
  }

  interface Feedbacks {
    _id: string; 
    Name: string;
    Feedback: string;
  }

function FeedbackReview() {

    const [Sdata, setSData] = useState<Suggetions[]>([]);
    const [Cdata, setCData] = useState<Complaints[]>([]);
    const [Fdata, setFData] = useState<Feedbacks[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customerCare/suggestion/getAll")
      .then((response) => {
        console.log(response.data,"suggetions");
        setSData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Suggetions:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customerCare/complaints/getAll")
      .then((response) => {
        console.log(response.data,"complaints");
        setCData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Complaints:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customerCare/feedback/getAll")
      .then((response) => {
        console.log(response.data,"feedbacks");
        setFData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Feedbacks:", error);
      });
  }, []);

  return (
    <div>
     <Tabs defaultValue="suggestion">
     <TabsList className="flex justify-center text-xl">
       <TabsTrigger value="suggestion" className=" font-akshar text-yellow-950">Suggestions</TabsTrigger>
       <TabsTrigger value="complaints" className=" font-akshar text-yellow-950">Complaints</TabsTrigger>
       <TabsTrigger value="feedbacks" className=" font-akshar text-yellow-950">Feedbacks</TabsTrigger>
     </TabsList>

     <TabsContent value="suggestion">
        <Card className="m-10">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-akshar text-yellow-950">Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 divide-y">
                {Sdata.map((suggestion) => (
                    <div key={suggestion._id}>
                        <p>{suggestion.Name}</p>
                        <p>{suggestion.Suggestions}</p>  
                    </div>
                 ))}
          </CardContent>
        </Card>
     </TabsContent>
    
     <TabsContent value="complaints">
        <Card className="m-10">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-akshar text-yellow-950">Complaints</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 divide-y">
                {Cdata.map((complaint) => (
                    <div key={complaint._id}>
                        <p>{complaint.Name}</p>
                        <p>{complaint.Complaints}</p> 
                    </div>
                 ))}
          </CardContent>
        </Card>
     </TabsContent>

     <TabsContent value="feedbacks">
        <Card className="m-10">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-akshar text-yellow-950">Feedbacks</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 divide-y">
                {Fdata.map((feedback) => (
                    <div key={feedback._id}>
                        <p>{feedback.Name}</p>
                        <p>{feedback.Feedback}</p>  
                    </div>
                 ))}
          </CardContent>
        </Card>
     </TabsContent>
     </Tabs>

      
    </div>
  )
}

export default FeedbackReview
