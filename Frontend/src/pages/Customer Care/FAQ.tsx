import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  _id: string; // Assuming the unique identifier is '_id', adjust accordingly if it's different
  Question: string;
  Answer: string;
}

function FAQ() {
  const [data, setData] = useState<Faq[]>([]);

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

  return (
    <div>
      
      <Accordion type="single" collapsible className="w-full">
        {data.map((faq) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger>{faq.Question}</AccordionTrigger>
            <AccordionContent>{faq.Answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQ;
