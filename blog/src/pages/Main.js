import React, { useEffect, useState } from 'react';
import './Main.css'
import api from '../services/api';

export default function Main( { history } ) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts')
      setPosts(response.data);
    }
    loadPosts(); 
  }, [history])

  async function handleClick(slug, e) {   
    e.preventDefault();
    history.push(`/post/${slug}`);
  }

  return (
    <div className="main-container">
      <h1>Posts</h1>
      { posts.length > 0 ? (
        <ul>
            {posts.map(post => (
              <li key={post.slug}>
                <a href="" onClick={(e) => handleClick(post.slug, e)}>
                  <strong>{post.title}</strong>
                </a>              
              </li>
            ))}
        </ul> 
      ) : (
      <div className="empty">There is no Posts :(</div>
      )}   
    </div>
  );
}