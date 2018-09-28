const router = require('express').Router();

//middleware to check for logged in user
const authcheck=(req,res,next)=>{
	if(req.user){
		next();

	}else{
		res.redirect('/auth/login');

	}
};


router.get('/',authcheck,(req,res)=>{
	//res.send('helloo '+req.user.username);
	res.render('profile',{user:req.user});
})
module.exports = router;