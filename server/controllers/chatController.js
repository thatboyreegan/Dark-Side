const { chatModel } = require('../models/chatModel');

const createChat = async (req, res) => {
    const {senderId, recieverId} = req.body

    try {
        const chat = await chatModel.findOne({
            members: {$all: senderId, recieverId}
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [senderId, recieverId]
        })

        const response = await newChat.save()

        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const findUsersChat = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: {$in: userId}
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findChat = async (req, res) => {
    const {senderId, recieverId}= req.params;

    try {
        const chat = await chatModel.findOne({
            members: {$all: senderId, recieverId}
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createChat, findUsersChat, findChat}