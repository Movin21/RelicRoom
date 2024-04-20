import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    Rate: number;
  }

  interface Complaints {
    _id: string; 
    Name: string;
    Complaints: string;
    Rate: number;
  }

  interface Feedbacks {
    _id: string; 
    Name: string;
    Feedback: string;
    Rate: number;
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
    
    <Tabs defaultValue="suggestion">
    <TabsList className="flex justify-center text-xl">
      <TabsTrigger value="suggestion" className=" font-akshar text-yellow-950">Suggestions</TabsTrigger>
      <TabsTrigger value="complaints" className=" font-akshar text-yellow-950">Complaints</TabsTrigger>
      <TabsTrigger value="feedbacks" className=" font-akshar text-yellow-950">Feedbacks</TabsTrigger>
    </TabsList>
    <TabsContent value="suggestion">
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
                    <CarouselContent>
                        {Sdata.map((suggestion) => (
                            <CarouselItem key={suggestion._id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex items-center justify-center p-6 aspect-square">
                                            <span className="text-3xl font-semibold">{suggestion.Name}</span>
                                            <br/><br/>
                                           
                                            <br/><span className="text-lg">{suggestion.Suggestions}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
     </TabsContent>

     <TabsContent value="compliants">
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
                    <CarouselContent>
                        {Cdata.map((compliant) => (
                            <CarouselItem key={compliant._id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex items-center justify-center p-6 aspect-square">
                                            <span className="text-3xl font-semibold">{compliant.Name}</span>
                                            <br/><br/>
                                           
                                            <br/><span className="text-lg">{compliant.Complaints}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
     </TabsContent>

     <TabsContent value="feedback">
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
                    <CarouselContent>
                        {Fdata.map((feedback) => (
                            <CarouselItem key={feedback._id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex items-center justify-center p-6 aspect-square">
                                            <span className="text-3xl font-semibold">{feedback.Name}</span>
                                            <br/><br/>
                                           
                                            <br/><span className="text-lg">{feedback.Feedback}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
     </TabsContent>

     </Tabs>
       
  )
}

export default FeedbackReview
