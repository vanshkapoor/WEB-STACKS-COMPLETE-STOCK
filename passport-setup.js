const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const key            = require('./key');
const user           = require('../model/user');

passport.serializeUser((user,done)=>{
	done(null,user.id);   //this will create a cookie , here we check for user and gets it id
});

passport.deserializeUser((id,done)=>{
	user.findById(id).then((user)=>{
		done(null,user);
	})
});

passport.use(
	new GoogleStrategy({
		//options for google strategy
		callbackURL:'/auth/google/redirect',
		clientID: key.google.clientID,
		clientSecret: key.google.clientSecret
	},(accessToken,refreshToken,profile,done)=>{
		//find user
		user.findOne({googleID:profile.id}).then((currentUser)=>{
			if(currentUser){
				console.log('user is',currentUser);
				done(null,currentUser);

			}else {
			    new user({
		   	        username:profile.displayName,
		            googleID:profile.id,
		            image:profile._json.image.url
		        }).save().then((newUser)=>{
	                console.log('new user created'+newUser);
	                done(null,newUser);
                  });
			}

		})

		console.log('passport callback fireeed');
		console.log(profile);


		
	})
);