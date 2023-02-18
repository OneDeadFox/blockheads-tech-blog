const express = require(`express`);
const router = express.Router();
const {User, Block, Bit} = require(`../models`);

router.get(`/`, async (req, res) => {
    try {
        const blockData = await Block.findAll({include: [{model :User}, {model: Bit}]});
        return res.json(blockData);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const blockDatum = await Block.findByPk(req.params.id, {include: [{model: User}, {model: Bit}]});
        return res.json(blockDatum);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.post(`/`, async (req, res) => {
    if(!req.session.userId){
        return res.status(403).json({msg:"login first to post a block"});
    }

    try {
        const newBlock = await Block.create({
            block_title: req.body.block_title,
            content: req.body.content,
            UserId: req.session.userId
        });
        return res.json(newBlock);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.put(`/:id`, async (req, res) => {
    if(!req.session.userId){
        return res.status(403).json({msg:"login first to update this block"});
    }

    try {
        const updateBlock = await Block.findByPk(req.params.id);
        if(!updateBlock) {
            return res.status(404).json({msg: "No such block in the building."});
        } else if(updateBlock.UserId !== req.session.userId) {
            return res.status(403).json("Hey! That block is not your's. Put it back.");
        }

        const update = await Block.update({ 
            block_title: req.body.block_title,
            content: req.body.content,
        },{
            where: {
                id: req.params.id}
        });
        res.json(update);

    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.delete(`/:id`, async (req, res) => {
    if(!req.session.userId){
        return res.status(403).json({msg:"login first delete this block"});
    }

    try {
        const getBlock = await Block.findByPk(req.params.id);
        if(!getBlock) {
            return res.status(404).json({msg: "No such block in the building."});
        } else if(getBlock.UserId !== req.session.userId) {
            return res.status(403).json("Hey! That block is not your's. Put it back.");
        }

        const deleteBlock = await Block.destroy({
            where: {
                id: req.params.id}
        });
        res.json(deleteBlock);

    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

module.exports = router;