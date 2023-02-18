const express = require(`express`);
const router = express.Router();
const {User, Block, Bit} = require(`../models`);

router.get(`/`,(req,res)=>{
    Block.findAll({
        include:[User]
    }).then(blockData=>{
        console.log(blockData)
        const hbsBlocks = blockData.map(block=>block.toJSON())
        console.log(`==============BLOCKS================`)
        console.log(hbsBlocks)
        res.render(`home`,{
            allBlocks:hbsBlocks
        })
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"login first post"})
    }
    
    res.render("dashbord")
})

module.exports = router;