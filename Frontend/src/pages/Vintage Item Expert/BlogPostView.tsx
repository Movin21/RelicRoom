'use client';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { buttonVariants } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card";

//initializes a state variable posts using the useState hook. It stores an array of blog posts fetched from the server. Initially, it's an empty array. 
const BlogPostView = () => {
    const [posts, setPosts] = useState<any[]>([]); // Specify any[] as the type
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchPosts(); // Fetch all posts initially
  }, []);

    // Function to fetch all blog posts from the server

    const fetchPosts = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/vintageexpert/blog/getAll`, {
              
          });
          setPosts(response.data);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };
  

  
  const handleSearchInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/vintageexpert/blog/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const renderPosts = searchResults.length > 0 ? searchResults : posts;
  
  
  
    return( 
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
          <Link to="/vintageexpert/Profile/:id"> 
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
        
          <Link to="/blog/PostView" >
          <div className="flex items-center mb-2">
          
            <span className="text-brownDark font-akshar text-1xl font-semibold  ml-2">Generate Report</span> 
            </div>
          </Link>
          <Link to="/vintageexpert/Login" >
          <div className="flex items-center mb-2">
          
            <span className="text-brownDark font-akshar text-1xl font-semibold  ml-2">Log Out</span> 
            </div>
          </Link>
          
      
        <hr className="border-gray-600 my-4 " />
        
      </ul>
    </nav>
        
        
  
        <div className="ml-4">

   {/* Search bar */}
<div className="flex justify-center mb-4"> {/* Add flex and justify-center to center its children horizontally */}
  <form onSubmit={handleSearchSubmit} className="flex items-center">
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={handleSearchInputChange}
      className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
      style={{ width: "calc(100% - 8rem)" }} // Adjust width as needed
      required
    />
    <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      Search
    </button>
  </form>
</div>


                <CardHeader>
                    <CardTitle className="font-akshar text-secondary text-center text-2xl mb-0">
                        My Blog Posts
                    </CardTitle>
                </CardHeader>

                <div className="flex justify-start mb-4">
                    <Link to="/blog/Post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block mb-4">+</Link>
                </div>

                {/* Display posts or message if no posts */}
                {renderPosts.length > 0 ? (
                    renderPosts.map(post => (
                        <div key={post._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h3 className="text-xl font-bold font-serif text-amber-700  mb-2">Title: {post.blogtitle}</h3>
                            <p className="text-gray-700 mb-4">Content: {post.blogcontent}</p>
                            <Link className={buttonVariants({ variant: "outline" }) + " text-blue-500 hover:text-blue-700"} to={`/blog/PostReadMore/${post._id}`}>Read More</Link>
                        </div>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
};

export default BlogPostView;
