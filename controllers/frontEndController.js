const express = require(`express`);
const router = express.Router();
const {User, Block, Bit} = require(`../models`);

router.get(`/`, async (req,res)=>{
    const blockData = await Block.findAll({
        include:[{model: User}, {model: Bit}]
    })

    const hbsBlocks = blockData.map(block=>block.toJSON())
    const username = await req.session.userName;
    const loggedOut = await req.session.loggout;
    const redirect = await req.session.redirect;
    console.log(`==============BLOCKS================`)
    console.log(hbsBlocks)
    res.render(`home`,{
        allBlocks:hbsBlocks,
        username: username,
        loggedOut: loggedOut,
        redirect: redirect
    });
});

router.get("/profile/", async (req, res)=>{
    if(!req.session.userId){
        return res.redirect(`/`);
    }

    const userBlockData = await Block.findAll({
        include: [
            User
        ],
        where: {
            UserId: req.session.userId
        }
    });

    const hbsBlocks = userBlockData.map(block => block.toJSON());
    const username = await req.session.userName;
    console.log(`==============BLOCKS================`)
    console.log(hbsBlocks)
    
    res.render(`dashboard`,{
        myBlocks:hbsBlocks,
        username: username
    });
})

module.exports = router;