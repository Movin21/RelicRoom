import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { CardHeader, CardTitle } from "@/components/ui/card";
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';

const BlogPostReadMore = () => {
    const { id } = useParams(); // Get the post ID from the URL params
    const [post, setPost] = useState<any>(null); // Specify the type as any initially
    const [deletionSuccess, setDeletionSuccess] = useState(false); // State for deletion success message
    const navigate = useNavigate(); 
    
    // Function to fetch a single blog post from the server based on ID
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/vintageexpert/blog/get/${id}`);
            setPost(response.data); // Set fetched post in state
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/vintageexpert/blog/delete/${post._id}`);
            setDeletionSuccess(true); // Set deletion success message
            setTimeout(() => {
                // Redirect to login page after 2 seconds
                navigate(`/blog/PostView`); // Replace with your login page URL
            }, 2000);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    
    // Fetch the post when the component mounts or when the ID changes
    useEffect(() => {
        fetchPost();
    }, [id]);


    // pdf css
    const BlogPDF = () => (
        <Document>
            <Page>
                <View style={{ border: '1px solid black', padding: 10, marginBottom: 20, textAlign: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15, color: 'dark brown' }}>Blog Post</Text>
                    <br></br>
                    <Text style={{ marginBottom: 10 }}> <Text style={{ fontSize: 20, color: 'red' }}>{post.blogtitle}</Text></Text>
                    <Text><Text style={{ fontSize: 14, color: 'black' }}>{post.blogcontent}</Text></Text>
                    <Text style={{ marginTop: 20, fontSize: 12, fontWeight: 'bold', color: 'green' }}>Contact Details:</Text>
                    <Text style={{ marginBottom: 5, fontSize: 12 }}>Email: relicroom@gmail.com</Text>
                    <Text style={{ marginBottom: 5 , fontSize: 12}}>Telephone: +1234567890</Text>
                    <Text style={{ marginBottom: 5 , fontSize: 12}}>Location: 123 Vintage Street, Retro City</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="flex">
            <div className="container mx-auto px-4 py-8">
                <CardHeader>
                    <CardTitle className="font-akshar text-secondary  text-center text-3xl mb-0">
                        Blog Post Details
                    </CardTitle>
                </CardHeader>
   
                {post ? (
                    <div className="bg-white rounded-lg shadow-md p-6  ">
                        <h2 className="text-2xl  font-bold font-serif text-amber-700  mb-4">{post.blogtitle}</h2>
                        <p className="text-gray-700 mb-4">{post.blogcontent}</p>

                        <div className="flex justify-start items-start space-x-20 mb-10 ml-96 ">
                            <PDFDownloadLink className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300" document={<BlogPDF />} fileName="blog_post.pdf">
                                {({ loading }) =>
                                    loading ? 'Loading document...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                        </div>
    
                        {/* Contact details */}
                        <div className="font-akshar text-red-950  text-start text-2xl mb-0">
                            <p>Contact Details:</p>
                            <p className="text-lg text-1xlfont-semibold">Email: relicroom@gmail.com</p>
                            <p className="text-lg text-1xlfont-semibold">Telephone: +1234567890</p>
                            <p className="text-lg text-1xlfont-semibold">Location: 123 Vintage Street, Retro City</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default BlogPostReadMore;
