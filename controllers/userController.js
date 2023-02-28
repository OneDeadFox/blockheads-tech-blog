const express = require(`express`);
const router = express.Router();
const {User, Block, Bit} = require(`../models`);
const bcrypt = require(`bcrypt`);

router.get(`/`, async (req, res) => {
    try{
        const userData = await User.findAll({include:[{model: Block}, {model: Bit}]});
        res.json(userData);
    } catch(err) {
        console.log(err);
        res.json({msg:`Oh snap, crackle, pop\nSorry, something went wrong.`, 
        err:err});
    }
});

//make a loggout alert in place of this for now
router.get("/logout", (req,res)=>{
    req.session.destroy();
    return res.redirect(`/`);
})

router.get(`/:id`, async (req, res) => {
    try {
        const userDatum = await User.findByPk(req.params.id, {include: [{model: Block}, {model: Bit}]});
        return res.json(userDatum);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.post(`/`, async (req, res) => {
    try {
        const newUser = await User.create({
            user_name: req.body.user_name,
            password:req.body.password
        });
        req.session.userId = newUser.id;
        req.session.userName = newUser.user_name;
        res.json(newUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.post(`/login`, async (req, res) => {
    try {
        const userLog = await User.findOne({where: {
            user_name: req.body.user_name,
        }})
        if(!userLog) {
            return res.status(401).json({msg:"incorrect email or password"});
        } else {
            if(bcrypt.compareSync(req.body.password, userLog.password)){
                req.session.userId = userLog.id;
                req.session.userName = userLog.user_name;
                res.json(userLog);
            } else {
                return res.status(401).json({msg:"incorrect email or password"});
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.post(`/signup`, async (req, res) => {
    try {
        const newUser = await User.create({
            user_name: req.body.user_name,
            password:req.body.password
        });
        req.session.userId = newUser.id;
        req.session.userName = newUser.user_name;
        res.status(201).json(newUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err:err});
    }
});

module.exports = router;