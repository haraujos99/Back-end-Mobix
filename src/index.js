require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes.js');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();


app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/BackendMobix',  
  async(err)=>{
    if(err) throw err;
    console.log("Conected to MongoDB")
    app.listen(3334, ()=>{
      console.log("Server on!");
      });
})
