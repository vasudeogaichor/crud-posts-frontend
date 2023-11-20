import { useState, useEffect } from 'react';
import BlogListItem from "./BlogListItem"

const API_URL = 'http://localhost:5000/blogs';

const listBlogs = async () => {
    const res = await fetch(API_URL)
    const blogs = await res.json()
    return blogs.message
}

const BlogList = ({searchResults}) => {

    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        if (searchResults.length > 0) {
          setAllBlogs(searchResults);
        }
      }, [searchResults]);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogs = await listBlogs();
                setAllBlogs(blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            {allBlogs.map((blog) => <BlogListItem key={blog.id} id={blog.id} title={blog?.title} content={blog.content} createdAt={blog.created_at} />)}
        </>
    )
}

export default BlogList