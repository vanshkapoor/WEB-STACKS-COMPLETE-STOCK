const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login',(req,res)=>{
	res.render('login');
});


//auth with google
router.get('/google',passport.authenticate('google',{
	scope:['profile']	

}));


//callback route
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	//res.send(req.user);
	res.redirect('/profile/');
})


//auth logout
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
})

module.exports = router