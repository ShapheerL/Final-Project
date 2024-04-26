import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from '../client';
import './PostPage.css';

const PostPage = (props,id) => {
    const [postdetails, setPostDetails] = useState(null);
    const params = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", imageurl: "",likes: 0, comments: []});
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(postdetails ? postdetails.likes : 0);

    useEffect(() => {
        const fetchPostDetails = async () => {
            const { data: postData } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', params.id)
                .single();
    
                let { data: post, error } = await supabase
                .from('Posts')
                .select('id, title, content, imageurl, comments, likes')
                .eq('id', params.id)
                .single();
            
            if (error) {
                console.error('Error fetching post:', error);
                return;
            }
            
            // Set the post details and comments in your component's state
            setPostDetails(post);
            setComments(post.comments);
        }
    
        fetchPostDetails();
    }, [params.id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createComment = async (event) => {
        event.preventDefault();
        const newComment = { text: post.comment, author: post.author };
    
        // Fetch the existing post
        // Fetch the existing post
        let { data: existingPost, error } = await supabase
        .from('Posts')
        .select('comments')
        .eq('id', params.id)
        .single();

        if (error) {
        console.error('Error fetching post:', error);
        return;
        }

        // Check if existingPost.comments is an array, if not default to an empty array
        let existingComments = Array.isArray(existingPost.comments) ? existingPost.comments : [];

        // Append the new comment to the existing comments
        const updatedComments = [...existingComments, newComment];

        // Update the post with the new array of comments
        let { data: updatedPost, error: updateError } = await supabase
        .from('Posts')
        .update({ comments: updatedComments })
        .eq('id', params.id);

        if (updateError) {
        console.error('Error adding comment:', updateError);
        return;
        }
        console.log(postdetails.comments);
        setPostDetails(updatedPost);
    }

    const handleLike = async () => {
        // Fetch current likes count
        const { data: fetchData, error: fetchError } = await supabase
            .from('Posts')
            .select('likes')
            .eq('id', postdetails.id);
    
        if (fetchError) {
            console.error('Error fetching likes:', fetchError);
            return;
        }
    
        const currentLikes = fetchData[0].likes;
        const newLikes = currentLikes + 1;
    
        // Update likes count
        const { data: updateData, error: updateError } = await supabase
            .from('Posts')
            .update({ likes: newLikes })
            .eq('id', postdetails.id);
    
        if (updateError) {
            console.error('Error updating likes:', updateError);
        } else if (updateData && updateData[0]) {
            // Update postdetails object
            setPostDetails(prevDetails => ({
                ...prevDetails,
                likes: updateData[0].likes
            }));
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', params.id)
            .select();
            
        window.location = "/";
    }

    return (
        <div className="Page">
            {postdetails && (
                <div className="Details">
                    <div className="Mainpost">
                        <h1>{postdetails.title}</h1>
                        <p>{postdetails.content}</p>
                        <img src={postdetails.imageurl} alt="postimage"/>
                        {/* <button onClick={deletePost}>Delete</button>
                        <button onClick={updatePost}>Update</button> */}
                    </div>
                    <br></br>
                    <Link to={`/edit/${postdetails.id}`}><button> Edit </button></Link>
                    <button onClick={deletePost}>Delete</button>
                    <button onClick={handleLike}>Like</button>
                        <p>Likes: {postdetails.likes}</p>
                    <div className="comments">
                        <input type="text" id="comment" name="comment" placeholder="Leave a Comment Here"  onChange={handleChange} /><br />
                        <button onClick={createComment}>Comment</button>
                        <br/>
                    </div>
                    <div>
                        <h4>Comments: </h4>
                        {postdetails.comments && postdetails.comments.map((comment, index) => {
                            let commentObj = JSON.parse(comment);
                            return <p key={index}>{index + 1}. {commentObj.text}</p>
                        })}
                    </div>
                </div>
            )}
        </div>
    );


}

export default PostPage;