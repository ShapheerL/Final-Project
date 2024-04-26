import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client';

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content: "", imageurl: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .insert([
                {title: post.title, content: post.content, imageurl: post.imageurl}
            ])
            .select();
        window.location = "/new";
        }

    return (
        <div classname="Field">
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="imageurl">Image Url (Optional)</label><br />
                <input type="text" id="imageurl" name="imageurl" onChange={handleChange} /><br />
                <br/>

                <label for="Content">Content (Optional)</label><br />
                <textarea rows="5" cols="50" id="content" name="content" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost;