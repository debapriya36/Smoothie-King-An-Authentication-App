const express = require('express');
const mongoose = require('mongoose');
const port=process.env.PORT || 5000;
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const app = express();
const cookieParser=require('cookie-parser');
const {URI}=require('./keys');
const {requireAuth , checkUser }=require('./middleware/authMiddleware');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then((result)=>{
  app.listen(port,()=>{
    console.log("Backen server is running and successfully connected to DB");
  })
}).catch((err)=>{
  console.log(err);
});

app.use(cookieParser());

app.get('*',checkUser);

app.use(authRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
