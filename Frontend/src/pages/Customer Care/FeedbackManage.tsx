import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {PDFDownloadLink} from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import PdfFile from './PdfFile';

interface Feedback {
  _id: string;
  Name: string;
  IsFeedback: string;
  Feedback: string;
}

interface Suggestion {
  _id: string;
  Name: string;
  IsSuggestion: string;
  Suggestions: string;
}

interface Complaints {
  _id: string;
  Name: string;
  IsComplaint: string;
  Complaints: string;
}

function FeedbackManage() {
  const [dataFeedback, setDataFeedback] = useState<(Feedback | Suggestion | Complaints)[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
;


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3000/customerCare/feedback/getAll"),
      axios.get("http://localhost:3000/customerCare/suggestion/getAll"),
      axios.get("http://localhost:3000/customerCare/complaints/getAll")
    ])
      .then(([feedbackResponse, suggestionResponse, complaintsResponse]) => {
        setDataFeedback([
          ...feedbackResponse.data,
          ...suggestionResponse.data,
          ...complaintsResponse.data
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columnsFeedback = [
    {
      name: "UserID",
      selector: (_row: Feedback | Suggestion | Complaints, index: number) => index + 1,
    },
    {
      name: "Name",
      selector: (row: Feedback | Suggestion | Complaints) => {
        if ('Name' in row) return row.Name;
        return ''; // Handle other types if necessary
      },
    },
    {
      name: "Label",
      cell: (row: Feedback | Suggestion | Complaints) => {
        let label;
        if ('IsFeedback' in row) label = <Badge className='bg-amber-700'>Feedback</Badge>;
        else if ('IsSuggestion' in row) label = <Badge className='bg-orange-950'>Suggestion</Badge>;
        else if ('IsComplaint' in row) label = <Badge className='bg-amber-900'>Complaint</Badge>;
        return label;
      },
    },
    {
      name: "Message",
      cell: (row: { _id: string, Feedback?: string, Suggestions?: string, Complaints?: string }, handleRowExpand: (id: string) => void) => (
        <div onClick={() => handleRowExpand(row._id)} style={{ cursor: 'pointer' }}>
          {row.Feedback ? row.Feedback : row.Suggestions ? row.Suggestions : row.Complaints}
        </div>
      ),
      
    },
    {
      name: "Action",
      cell: (row: Feedback | Suggestion | Complaints) => (
        <Button type="button" className='w-3/6 bg-red-950' onClick={() => handleDelete(row._id)}>Delete</Button>
      ),
    },
  ];

  const filteredData = dataFeedback.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: string) => {
    axios
      .delete("http://localhost:3000/customerCare/feedback/delete/" + id)
      .then(() => {
        console.log("Feedback deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting feedback:", error);
      });

    axios
      .delete("http://localhost:3000/customerCare/suggestion/delete/" + id)
      .then(() => {
        console.log("Suggestion deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting suggestion:", error);
      });

    axios
      .delete("http://localhost:3000/customerCare/complaints/delete/" + id)
      .then(() => {
        console.log("Complaint deleted successfully");
        location.reload();
      })
      .catch((error) => {
        console.error("Error deleting complaint:", error);
      });
  };


  
  const ComponentsRef = useRef<HTMLDivElement>(null);
  

  return (
    <div className="max-w-screen-lg px-4 mx-auto">
      <PDFDownloadLink document={<PdfFile/>} fileName="PdfFile">
        {({loading})=> (loading ? <Button>Loading Document...</Button> :  <Button className='btnfeed'>Details Download</Button>)}
      </PDFDownloadLink> 
      
      <Tabs defaultValue="feedbackManage" className="w-full">
        <TabsList className='flex justify-center text-2xl font-bold h-500 item-center w-500 font-akshar text-yellow-950'>
          <TabsTrigger value="feedbackManage" className='text-lg'>Feedback Manage</TabsTrigger>
          <TabsTrigger value="faqManage" className='text-lg'><Link to="/FAQManage">FAQ Manage</Link></TabsTrigger>
        </TabsList>

        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <div className='w-full' ref={ComponentsRef}>
            <DataTable
              columns={columnsFeedback}
              data={filteredData}
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default FeedbackManage;
