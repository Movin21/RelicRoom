import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
  import { Link } from "react-router-dom";
  import { SetStateAction, useEffect, useState } from 'react';
  import axios from 'axios';
  import { buttonVariants } from "@/components/ui/button"
  import { CardHeader, CardTitle } from "@/components/ui/card";
  
  const BlogPostView = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/vintageexpert/blog/getAll`);
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
        <div className="ml-4">
          <div className="flex justify-center mb-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                style={{ width: "calc(100% - 8rem)" }}
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
          {renderPosts.length > 0 ? (
            renderPosts.map(post => (
              <div key={post._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-xl font-bold font-serif text-amber-700  mb-2">Title: {post.blogtitle}</h3>
                <p className="text-gray-700 mb-4">Content: {post.blogcontent}</p>
                <Link className={buttonVariants({ variant: "outline" }) + " text-blue-500 hover:text-blue-700"} to={`/blog/ReadMore/${post._id}`}>Read More</Link>
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
  