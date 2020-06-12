import React, { useEffect, useState } from 'react';
import './Post.css'

import api from '../services/api';

export default function Post( { match } ) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function loadPost() {
      const response = await api.get(`/post/${match.params.slug}`)
      const postsResponse = response.data;
      setPost(postsResponse);
    }
    const initial = {
      tags: ["sssf", 'ee']
    }
    setPost(initial)
    loadPost(); 

  }, [match.params.slug])

  return (
    <div className="post-container">
        <ul>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.tags && <h3>Tags</h3>}
          {console.log(post.tags)}
          <strong>{post.tags && post.tags.join(", ")}</strong>
        </ul> 
    </div>
  )
}