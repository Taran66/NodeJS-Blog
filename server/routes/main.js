const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with Nodejs, Express and MongoDb"
        };
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        console.log(error);
    }
});

// function insertPostData (){
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"
//         },
//         {
//                   title: "Deployment of Node.js applications",
//                   body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//                 },
//                 {
//                   title: "Authentication and Authorization in Node.js",
//                   body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//                 },
//                 {
//                   title: "Understand how to work with MongoDB and Mongoose",
//                   body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//                 },
//                 {
//                   title: "build real-time, event-driven applications in Node.js",
//                   body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//                 },
//                 {
//                   title: "Discover how to use Express.js",
//                   body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//                 },
//                 {
//                   title: "Asynchronous Programming with Node.js",
//                   body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//                 },
//                 {
//                   title: "Learn the basics of Node.js and its architecture",
//                   body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//                 },
//                 {
//                   title: "NodeJs Limiting Network Traffic",
//                   body: "Learn how to limit netowrk traffic."
//                 },
//                 {
//                   title: "Learn Morgan - HTTP Request logger for NodeJs",
//                   body: "Learn Morgan."
//                 },
//     ])
// }
// insertPostData();

router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;