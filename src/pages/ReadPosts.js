import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import { Link } from "react-router-dom";
import './ReadPosts.css'
const ReadPosts = ({ searchTerm }) => {

    const [posts, setPosts] = useState([]);
    const [id, setId] = useState(null);
    const [sortByLikes, setSortByLikes] = useState(false);
    const [sortByTime, setSortByTime] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
          let { data: posts, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true });
    
          if (error) console.log('Error: ', error);
          else setPosts(posts);
        };
    
        fetchPosts();
      }, [id]);
    
      useEffect(() => {
        if (sortByLikes) {
            setPosts(posts => [...posts].sort((a, b) => b.likes - a.likes));
        } else if (sortByTime) {
            setPosts(posts => [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }
    }, [sortByLikes, sortByTime]);

    const handleSortByLikes = () => {
        setSortByLikes(true);
        setSortByTime(false);
    };

    const handleSortByTime = () => {
        setSortByLikes(false);
        setSortByTime(true);
    };

      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      return (
      <div className="MPage">
        <button onClick={handleSortByLikes}>Sort by Likes</button>
        <button onClick={handleSortByTime}>Sort by Time</button>
        <div className="ReadPosts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Link to={`/PostPage/${post.id}`} key={post.id}>
                <Card id={post.id}  likes={post.likes} title={post.title} createdtime={post.created_at} />
              </Link>
            ))
          ) : (
            <h2>No Posts has been created yet</h2>
          )}
        </div>
        </div>
      );
    }


export default ReadPosts;