import express from "express";
import Messages from "../models/Message.js"


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = Messages.find({});
        const message = await query.exec();
        res.json(message);
    } catch(e) {
        res.json({message: 'Whoops, there was an error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const newMessageData = {
            username: req.body.username,
            message: req.body.message
        }
        const message = new Messages(newMessageData);
        const newMessage = await message.save();
        res.json(newMessage);
    } catch(e) {
        res.json({message: 'Whoops, there was an error'});
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = Messages.deleteOne({
            _id: id
        });
        await query.exec();
        
        res.json({success: true});
    } catch(e) {
        res.json({message: 'Whoops, there was an error'});
    }
});

export default router;