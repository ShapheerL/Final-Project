import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';

const Card = (props) =>  {

  const createdTime = new Date(props.createdtime);

  return (
    <div className="Card">
        <Link to={'edit/'+ props.id}></Link>
            <p> Likes: {props.likes}</p>
            <h2 className="title">{props.title}</h2>
            <p className="createdtime">
            Created {formatDistanceToNow(createdTime)} ago
            </p>
            {props.content && <h3 className="content">{props.content}</h3>}
    </div>
  );
};

export default Card;