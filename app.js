const express       = require('express')
const authRoutes    = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose      = require('mongoose');
const keys          = require('./config/key');
const cookiesession = require('cookie-session');
const app           = express();
const passport      = require('passport');
const profileRoutes = require('./routes/profile-routes.js');

app.set('view engine','ejs');

app.use(cookiesession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookiekey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true },()=>{
	console.log('connected to database');
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//home route
app.get('/',(req,res)=>{
	res.render('home',{user:req.user});
});




app.listen(8000,()=>{
	console.log("server started");
});