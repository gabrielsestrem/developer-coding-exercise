# Blogging Platform
### Media Suite Coding Exercise

## Overview
Blog Application using Node.js and ReactJS

**Server - NodeJS** 
* Dependencies - express

**Client - ReactJS** 
* Dependencies - axios, react-router-dom

## The Server

### Running the WebAPI
* You must have node installed

1. Open the terminal
2. Navigate to the project directory
2. `cd express`
3. `yarn install` or `npm install`
4. `yarn dev` or `node index.js`

*Notes: Dev app listening on port 3333!

### Endpoints

GET `/posts` - Returns the list of all blog titles and slugs

```json
[
  {
    "title": "Title 1",
    "slug": "title-1"
  },
  {
    "title": "Title 2",
    "slug": "title-2"
  }
]
```

GET `/post/:slug` - Returns the blog content, including tags representing the most common 5 word in the article.

```json
{
  "title": "I’m betting on SPAs",
  "content": "article content available here...",
  "tags": [
    "article",
    "content",
    "available",
    "here"
  ]
}
```

* Directory
 `/assets/posts` folder contains text files with blog data in them.  The file name is the URL slug.


## The Client

### Running the WebApp

1. Open a second the terminal
2. Navigate to the project directory
3. `cd blog`
4. `yarn install` or `npm install`
5. `yarn start` or `npm start`

*Notes: Web app listening on port 3000!


## The Output

### The list of posts
![List of Posts](./posts.png)

### An individual post
![An individual post](./post.png) 