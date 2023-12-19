
const express = require('express')
const cors = require('cors');
const { mongoose} = require('mongoose');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.use(cors)
app.use(express.json())



app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connection established'))
.catch((error) => console.log('MongoDB connection failed:', error.message));
