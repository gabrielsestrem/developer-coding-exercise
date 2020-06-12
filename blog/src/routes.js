import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Post from './pages/Post';
import Main from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
    <Route path="/" exact component={Main} />
    <Route path="/post/:slug" component={Post} />
    </BrowserRouter>
  );
}