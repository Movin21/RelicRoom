import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  _id: string;
  Question: string;
  Answer: string;
}

function FAQ() {
  const [data, setData] = useState<Faq[]>([]);
  const [filteredData, setFilteredData] = useState<Faq[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  useEffect(() => {
    const filtered = data.filter((faq) =>
      faq.Question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-10 text-2xl font-akshar text-yellow-950">
        Frequently Asked Questions
      </h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search FAQs"
        className="p-2 mt-5 border border-gray-300 rounded-md"
      />
      <Accordion type="single" collapsible className="m-16">
        {filteredData.map((faq) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger className="font-akshar">{faq.Question}</AccordionTrigger>
            <AccordionContent className='text-stone-700 font-akshar'>{faq.Answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQ;
