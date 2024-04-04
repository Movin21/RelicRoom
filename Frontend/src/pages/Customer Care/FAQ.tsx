import React from 'react'
import axios from "axios"
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"  
  

function FAQ() {

    const [data,setData] = useState([]);
   useEffect(()=>{
    fetch('http://localhost:3000/customerCare/faq/getAll',{
      method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,"faqs");
      setData(data.data);
    })
   },[]);
    
  return (
    <div>
        {data.map(user => {
            return(
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{user.Question}</AccordionTrigger>
        <AccordionContent>
          {user.Answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    )})
            }</div>
  )
}

export default FAQ