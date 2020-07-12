var express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express(),
    bodyParser = require("body-parser"),
    passport   = require("passport"),
localStrategy  = require("passport-local"),
    flash      = require("connect-flash"),
    Campground = require("./models/campground"),
methodOverride = require("method-override"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

//requiring routes    
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

//mongoose.connect("mongodb://localhost/yelp_db_v7");

mongoose.connect("mongodb+srv://momo:Wowzamei@1@cluster0.h9qyz.mongodb.net/?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret:"This is best course",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use(function(req, res, next){     // used for showing signed in as and whether loggedin or loggedout
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp Server is running");
});