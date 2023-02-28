const express = require(`express`);
const router = express.Router();
const {User, Block, Bit} = require(`../models`);

router.get(`/`, async (req, res) => {
    try {
        const bitData = await Bit.findAll({include: [{model :User}, {model: Block}]});
        return res.json(bitData);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.get(`/block/:id`, async (req, res) => {
    try{
        let blockData = await Block.findByPk(req.params.id,{include: [{model: Bit, include: [{model: User}]}, {model: User}]});
        blockData = blockData.toJSON()
        blockData.currentUser = req.session.userId;
        res.json(blockData);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});


router.get(`/:id`, async (req, res) => {
    try {
        const bitDatum = await Bit.findByPk(req.params.id, {include: [{model: User}, {model: Block}]});
        return res.json(bitDatum);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.post(`/`, async (req, res) => {
    if(!req.session.userId){
        return res.status(403).json({msg:"login first to add a bit to this block"});
    }

    try {
        const newBit = await Bit.create({
            bit_content: req.body.bit_content,
            UserId: req.session.userId,
            BlockId: req.body.BlockId
        });
        //console.log(json(newBit));
        return res.status(201).json(newBit);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

router.put(`/:id`, async (req, res) => {
    if(!req.session.userId){
        return res.status(403).json({msg:"login first to update this bit"});
    }

    try {
        const updateBit = await Bit.findByPk(req.params.id);
        if(!updateBit) {
            return res.status(404).json({msg: "No such bit in the building."});
        } else if(updateBit.UserId !== req.session.userId) {
            return res.status(403).json("Hey! That bit is not your's. Put it back.");
        }

        const update = await Bit.update({ 
            bit_content: req.body.bit_content
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
        return res.status(403).json({msg:"login first delete this Bit"});
    }

    try {
        const getBit = await Bit.findByPk(req.params.id, {include: [Block]});
        if(!getBit) {
            return res.status(404).json({msg: "No such bit in the building."});
        } else if(getBit.UserId === req.session.userId || getBit.Block.UserId === req.session.userId) {
            const deleteBit = await Bit.destroy({
                where: {
                    id: req.params.id}
            });
            return res.json(deleteBit);
        }
        return res.status(403).json("Hey! That bit is not your's. Put it back.");
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:`Uh-oh`, err});
    }
});

module.exports = router;