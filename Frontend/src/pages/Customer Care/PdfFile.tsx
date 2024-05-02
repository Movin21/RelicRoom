import React, { useEffect, useState } from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';
import axios from 'axios';

// Define interfaces for data types
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

// Styles for the PDF document
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    minHeight: 40,
  },
  tableCell: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
  },
});

const PdfFile: React.FC = () => {
  // State for storing data and counts
  const [dataFeedback, setDataFeedback] = useState<(Feedback | Suggestion | Complaints)[]>([]);
  const [feedbackCount, setFeedbackCount] = useState<number>(0);
  const [suggestionCount, setSuggestionCount] = useState<number>(0);
  const [complaintCount, setComplaintCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          feedbackResponse,
          suggestionResponse,
          complaintsResponse,
        ] = await Promise.all([
          axios.get<Feedback[]>('http://localhost:3000/customerCare/feedback/getAll'),
          axios.get<Suggestion[]>('http://localhost:3000/customerCare/suggestion/getAll'),
          axios.get<Complaints[]>('http://localhost:3000/customerCare/complaints/getAll'),
        ]);
        // Combine data from all responses
        setDataFeedback([
          ...feedbackResponse.data,
          ...suggestionResponse.data,
          ...complaintsResponse.data,
        ]);
        // Set counts
        setFeedbackCount(feedbackResponse.data.length);
        setSuggestionCount(suggestionResponse.data.length);
        setComplaintCount(complaintsResponse.data.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Document>
      <Page size="A4">
        <Text style={styles.title}>Feedback Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Type</Text>
            <Text style={styles.tableCell}>Message</Text>
          </View>
          {dataFeedback.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.Name}</Text>
              <Text style={styles.tableCell}>
                {item.IsFeedback ? 'Feedback' : item.IsSuggestion ? 'Suggestion' : 'Complaint'}
              </Text>
              <Text style={styles.tableCell}>
                {item.Feedback || item.Suggestions || item.Complaints}
              </Text>
            </View>
          ))}
        </View>
        <Text>Total Feedbacks: {feedbackCount}</Text>
        <Text>Total Suggestions: {suggestionCount}</Text>
        <Text>Total Complaints: {complaintCount}</Text>
      </Page>
    </Document>
  );
}

export default PdfFile;
