import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", imageurl: ""});


    useEffect(() => {
        const fetchPostDetails = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();
    
            setPost(data);
        }
    
        fetchPostDetails();
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({title: post.title, content: post.content, imageurl: post.imageurl})
            .eq('id', id)
            .select();
        
        window.location = "http://localhost:3000/";
    }

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="imageurl">Image Url (Optional)</label><br />
                <input type="text" id="imageurl" name="imageurl" value={post.imageurl} onChange={handleChange} /><br />
                <br/>

                <label for="Content">Content (Optional)</label><br />
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost} />
                
            </form>
        </div>
    )
}

export default EditPost