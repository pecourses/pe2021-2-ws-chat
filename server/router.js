const { Router } = require('express');
const messageRouter = require('./routes/messageRouter');

const router = Router();

router.use('/messages', messageRouter);

module.exports = router;
