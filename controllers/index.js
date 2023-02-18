const express = require(`express`);
const router = express.Router();

const frontEndRoutes = require (`./frontEndController`);
router.use(`/`, frontEndRoutes);

const userRoutes = require(`./userController`);
router.use(`/api/users`,userRoutes);

const BlockRoutes = require(`./blockController`);
router.use(`/api/blocks`,BlockRoutes);

const BitRoutes = require(`./bitController`);
router.use(`/api/bits`,BitRoutes);

module.exports = router;