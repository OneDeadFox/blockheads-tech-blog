const express = require(`express`);
const session = require(`express-session`);
const exphbs = require(`express-handlebars`);
const sequelize = require(`./config/connection`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
const allRoutes = require(`./controllers`);


const app = express();
const PORT = process.env.PORT || 3030;
const {} = require(`./models`);

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(express.static("public"));

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = exphbs.create({});
app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(allRoutes);

app.get("/sessions",(req,res)=>{
    res.json(req.session)
})

sequelize.sync({force:false}).then(function() {
    app.listen(PORT, function() {
        if(PORT == 3030){
            console.log(`App is listening to some dope beats from Deltron${PORT}`);
        } else {
            console.log(`App is listening on PORT ${PORT}`);
        }
    });
});

