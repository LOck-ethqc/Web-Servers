const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello, World!");
});

app.get("/products", (req,res)=>{
    const product_list = [
        {
        "id":1,
        "product_name":"Shampoo"
        },
        {
        "id":2,
        "product_name":"Air Conditioner"
        },
        {
        "id":3,
        "product_name":"Sunscreen"
        }
    ];
    res.json(product_list);
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is runnin on port ${port}`);
});
