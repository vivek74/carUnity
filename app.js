var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    usePushEach = true,
    ejs= require('ejs'),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    User        = require("./models/user"),
    session = require("express-session"),
    methodOverride = require("method-override"),
    MongoStore = require("connect-mongo")(session);
    

//requiring routes
var indexRoutes = require("./routes/index");
var homeRoutes = require("./routes/home");
var adminRoutes = require('./routes/admin');
var filterRoutes = require('./routes/filter');
var demoRoutes = require('./routes/demo');


mongoose.connect("mongodb://carUnity:carunity123@ds163044.mlab.com:63044/carunity",{ useMongoClient: true });    
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database conected!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/.well-known"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//require moment
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "carwale",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie:{ maxAge: 60 * 60 * 1000 * 24 * 30 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.session = req.session;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/index", indexRoutes);
app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/filter",filterRoutes);
app.use("/demo",demoRoutes);

app.listen(8000, function(){
   console.log("server started at 8000");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("server started");
// });
 
