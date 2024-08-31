const express = require('express');
const bodyParser=require('body-parser');
const path =require('path');
const authenticateJWT = require('./middleware/authenticateJWT');
const jwt = require('jsonwebtoken');
const secretKey = 'tomato'; 

const routes= require('./routes/shoproutes');

const app= express();
const PORT=3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})

// app.get('/admin', authenticateJWT, (req, res) => {
//     jwt.verify(req.token,secretKey,(err,auth)=>{
//         if(err){
//             res.send({error:"invalid token"});
//         }else{
//             res.sendFile(path.join(__dirname, 'public', 'admin.html'));
//         }
//     })   
// });

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
  
            res.sendFile(path.join(__dirname, 'public', 'admin.html'));
       
    });
