const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello, World!");
});

// Dynamic Routing
app.get("/products/:id", (req,res)=>{
    const requested_productId = parseInt(req.params.id);
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
    const get_single_product = product_list.find(product=>product.id === requested_productId);
    if(get_single_product){
        res.json(get_single_product);
    } else{
        res.status(404).send("Product not found!");
    }
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is runnin on port ${port}`);
});
