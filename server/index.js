
const express = require('express');
const { mongoose} = require('mongoose');
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

//app.use(cors)
app.use(express.json({ extended: true }))
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute)

app.listen(port, () => {
    console.log(`server is live on port: ${port}`)
})

app.get('/', (req, res) => {
    res.json({msg:'really now'});
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connection established'))
.catch((error) => console.log('MongoDB connection failed:', error.message));
