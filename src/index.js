const express=require("express");
const app=express();
const path=require("path");
const port=8000;
const hbs=require("hbs");

//public static path
const path_static=path.join(__dirname,"../public");
const path_templates=path.join(__dirname,"../templates/views");
const path_partials=path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",path_templates);
hbs.registerPartials(path_partials);

app.use(express.static(path_static));

//Routing
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/about",(req,res)=>{
      
    //res.redirect(about);
    res.render("about");
});
app.get("/gallery",(req,res)=>{

    res.render("gallery");
});
app.get("/facility",(req,res)=>{

    res.render("facility");
});
app.get("/contact",(req,res)=>{

    res.render("contact");
});
app.get("/login",(req,res)=>{

    res.render("login");
});

app.get("*",(req,res)=>{
res.send("404 PAGE NOT FOUND");
});

app.listen(port,()=>{

    console.log(`listing a port of  ${port}`);

});