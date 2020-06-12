const express = require('express')
const { getTopWords } = require('./utils/tags')
const app = express()
const rootPostDir = '../assets/posts'

const clientURL = 'http://localhost:3000'

// add CORS support to the Blog server
 app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", clientURL);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

/**
 *  Returns the detail of an individual post in json, formatted as:
 * {
 *  post: {
 *    content: <article's markdown content>,
 *    tags: <array of 5 top tags for the post>
 *  }
 * }
 */
app.get('/post/:slug', function (req, res) {
  const filename = req.params.slug;
  const path = `${rootPostDir}/${filename}.md`;
  const fs = require('fs');
  // Check if file exists
  try {
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
          console.log(err);
        }
        // Removing the header from the content
        const body = data.substring(
          data.lastIndexOf("===") + 4);
    
        //TO DO - Implement the tags using getTopWords
        const tags = getTopWords(body);
    
        console.log(`GET /post/${filename} - ${new Date()}`)
        res.json({content: body, tags: tags})
    
      });
    }
    else {
      console.log(`ERROR - GET /post/${filename} - ${new Date()} - no such file or directory`)
      res.json({})
    }
  } catch(err) {
    console.error(err)
    res.json({})
  }


})

/**
 * Returns a json array of all posts, formatted as:
 * [
 *  {
 *    title: <article's title>,
 *    slug: <article's slug>
 *  },
 *  ...
 * ]
 */
app.get('/posts', function (req, res) {
  const fs = require('fs');

  // make Promise version of fs.readdir()
  fs.readdirAsync = function(dirname) {
      return new Promise(function(resolve, reject) {
          fs.readdir(dirname, function(err, filenames){
              if (err)
                  reject(err);
              else
                  resolve(filenames);
          });
      });
  };

  // make Promise version of fs.readFile()
  fs.readFileAsync = function(filename, enc) {
      return new Promise(function(resolve, reject) {
          fs.readFile(`${rootPostDir}/${filename}`, enc, function(err, data){
              if (err)
                  reject(err);
              else
                  resolve(data);
          });
      });
  };

  // utility function, return Promise
  function getFile(filename) {
      return fs.readFileAsync(filename, 'utf8');
  }

  // read all md files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed.
  fs.readdirAsync(rootPostDir).then(function (filenames){
      return Promise.all(filenames.map(getFile));
  }).then(function (files){
      const responseObject = [];
      files.forEach(function(data) {
        // Extract the Title from the file content
        const title = data.substring(
          data.lastIndexOf("Title:") + 7,
          data.lastIndexOf("Author:") -1);
        // Extract the Slug from the file content
        const slug = data.substring(
          data.lastIndexOf("Slug:") + 6,
          data.lastIndexOf("===") -1);

        responseObject.push({title: title, slug: slug});
      });
      console.log(`GET /posts - ${new Date()}`)
      res.json(responseObject)
  });
})

app.listen(3333, function () {
  console.log('Dev app listening on port 3333!')
})
