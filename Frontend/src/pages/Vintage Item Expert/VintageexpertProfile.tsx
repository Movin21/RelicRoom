'use client';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { CardHeader, CardTitle } from "@/components/ui/card";


const VintageexpertProfile = () => {
    const { id } = useParams(); // Get the post ID from the URL params
    const [post, setPost] = useState<any>(null); // Specify the type as any initially
    const [deletionSuccess, setDeletionSuccess] = useState(false); // State for deletion success message
    const navigate = useNavigate();
    // Function to fetch a single blog post from the server based on ID
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/vintageexpert/get/${id}`);
            setPost(response.data); // Set fetched post in state
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/vintageexpert/delete/${post._id}`);
            setDeletionSuccess(true); // Set deletion success message
            setTimeout(() => {
                // Redirect to login page after 2 seconds
                navigate(`/vintageexpert/Login`); // Replace with your login page URL
            }, 2000);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    // Fetch the post when the component mounts or when the ID changes
    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <div className="flex">
            {/* Side Navigation */}
    <nav className="flex flex-col items-center gap-4 px-2 py-5 bg-white shadow-lg mt-4 mb-4 w-64">
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/auctioneerPortal">
          <div className="flex items-center mb-2">
          
          <span className="text-brownDark font-akshar text-2xl font-bold  ml-2">Vintage Expert Dashboard</span> 
          </div>
          </Link>
        </li>
        <li>
          <Link to="#"> 
          <div className="flex items-center mb-2">
          
          <span className=" text-black font-akshar text-1xl font-semibold  ml-2"> Profile Details</span>  
          </div> 
          </Link>
        </li>
        <li>
          <Link to="/blog/PostView"> 
          <div className="flex items-center mb-2">
          
          <span className=" text-black font-akshar text-1xl font-semibold  ml-2">My Blogs</span>  
          </div> 
          </Link>
        </li>
        <li></li>
        
          <Link to="/AuctioneerReportG" >
          <div className="flex items-center mb-2">
          
            <span className="text-brownDark font-akshar text-1xl font-semibold  ml-2">Generate Report</span> 
            </div>
          </Link>
          <Link to="/AuctioneerReportG" >
          <div className="flex items-center mb-2">
          
            <span className="text-brownDark font-akshar text-1xl font-semibold  ml-2">Log Out</span> 
            </div>
          </Link>
          
      
        <hr className="border-gray-600 my-4 " />
        
      </ul>
    </nav>
        

            <div className="container mx-auto px-4 py-8">

                <CardHeader>
                    <CardTitle className="font-akshar text-secondary    text-center text-2xl mb-0">
                        Profile Details
                    </CardTitle>
                </CardHeader>
                {post ? (
                    <div className="flex items-center justify-center">
                        <div className="w-full md:w-96 p-6 mt-0 mb-10 shadow-2xl" style={{ width: '700px' }}>

                            <p className="text-stone-950 font-akshar mb-2">First Name: </p>
                            <p style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>{post.firstname}</p>
                            <br></br>
                            <p className="text-stone-950 mb-2">Last Name: </p>
                            <p style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>{post.secondname}</p>
                            <br></br>
                            <p className="text-stone-950 mb-2">Expertise Area: </p>
                            <p style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>{post.expertisecategoryarea}</p>
                            <br></br>
                            <p className="text-stone-950 mb-2">Working Experience:</p>
                            <p style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>{post.workingexperience}</p>
                            <br></br>
                            <p className="text-stone-950 mb-2">Email: </p>
                            <p style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>{post.email}</p>


                            {/* Additional post details can be displayed here */}
                            <div className="flex justify-center items-start space-x-20 mt-20">
                                <Link to={`/vintageexpert/Update/${post._id}`} className="w-40 text-white bg-primary hover:bg-secondary ease-in-out hover:text-white font-bold py-2 px-4 rounded transition duration-700">Update Profile</Link>
                                <button onClick={deletePost} className="bg-red-800 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300">Delete Profile</button>
                                {deletionSuccess && <p className="text-green-500">Profile deleted successfully. Redirecting to login page...</p>}
                            </div>
                        </div>
                    </div>

                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>


        </div>
    );
};

export default VintageexpertProfile;

