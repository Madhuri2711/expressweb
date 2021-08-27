const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const hbs = require("hbs");
var nodemailer = require('nodemailer');

//public static path
const path_static = path.join(__dirname, "../public");
const path_templates = path.join(__dirname, "../templates/views");
const path_partials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", path_templates);
hbs.registerPartials(path_partials);

app.use(express.static(path_static));
app.use(express.urlencoded())
app.use(express.json())

//Routing
app.get("/", (req, res) => {
    res.render("index", { home: true });
});

app.get("/about", (req, res) => {
    res.render("about", { about: true });
});

app.get("/gallery", (req, res) => {

    res.render("gallery", { gallery: true });
});
app.get("/facility", (req, res) => {

    res.render("facility", { facility: true });
});
app.get("/contact", (req, res) => {

    res.render("contact", { contact: true });
});

app.post("/contact", (req, res) => {
    // Email Sending Setup
    var is_email_setup_is_done = false;

    // Set Admin Email id Who Receives the submissions
    var admin_email_id = "admin@gmail.com";
    
    // Make Sure the Option of Less Secure Access is Enable in This Demo Email id
    var demo_gmail_id = "mydemomail@gmail.com";
    var demo_gmail_id_password = "mydemomailpassword";

    // Once you Setup the Email Make this Variable true
    is_email_setup_is_done = false;

    if(is_email_setup_is_done == false){
        res.send("Email Sending Setup is not Done in index.js");
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: demo_gmail_id,
            pass: demo_gmail_id_password
        }
    });

    var mailOptions = {
        from: demo_gmail_id,
        to: admin_email_id,
        subject: 'Contact Form Submitted By ' + req.body.name,
        text: 'Name : ' + req.body.name + '\n' + 'Mobile : ' + req.body.mob + '\n' + 'Email : ' + req.body.email + '\n' + 'Message : ' + req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send("Sorry We Can't Process Your Request, Contact Admin for More Details");
        } else {
            res.send("success");
        }
    });
});

app.get("/login", (req, res) => {
    res.render("login", { login: true });
});

app.get("*", (req, res) => {
    res.send("404 PAGE NOT FOUND");
});

app.listen(port, () => {
    console.log(`listing a port of  ${port}`);
});