const express = require("express");
const app = express();

// Middleware
const RequestLogger = (req,res,next)=>{
    const TimeStamp = new Date();
    console.log(`${TimeStamp} with ${req.method} at ${req.url}`);
    next(); //Without "next" the webserver will never load; it will loop inside this block of middleware
};

app.use(RequestLogger);

app.get("/", (req,res)=>{
    res.send("Home Page");
});

app.get("/About", (req,res)=>{
    res.send(`
        <html>
            <head>
                <title>About Me</title>
            </head>
            <body>
                <h1>About Me :D</h1>
                <p>This is a test "About Me" page by sending html code into the response</p>
            </body>
        </html>`);
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
