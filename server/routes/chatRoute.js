const express = require('express');

const {createChat, findUsersChat, findChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', createChat)
router.get('/userId', findUsersChat)
router.get('/find/:senderId/:receiverId', findChat);


module.exports = router;