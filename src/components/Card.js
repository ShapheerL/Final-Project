import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { differenceInHours, differenceInDays , differenceInMinutes } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

const Card = (props) =>  {

  const createdTime = new Date(props.createdtime);
  const now = new Date();

  const utcCreatedTime = Date.UTC(createdTime.getUTCFullYear(), createdTime.getUTCMonth(), createdTime.getUTCDate(), createdTime.getUTCHours(), createdTime.getUTCMinutes(), createdTime.getUTCSeconds());
  const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

  const hoursDifference = differenceInHours(utcNow, utcCreatedTime);
  const daysDifference = differenceInDays(utcNow, utcCreatedTime);
  const minutesDifference = differenceInMinutes(utcNow, utcCreatedTime);

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