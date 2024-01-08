const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

function createToken(_id) {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({_id}, jwtkey, { expiresIn: '3d' });
}

async function registerUser(req, res) {

    try {
    const { name, email, password} = req.body;

    let user = await userModel.findOne({ email });

    if (user)  return res.status(400).json('user already exists');

    if (!name || !email || !password) return res.status(400).json('Complete user information is needed for registration');

    if (!validator.isEmail(email)) return res.status(400).json('valid email is required')

    if(!validator.isStrongPassword(password)) return res.status(400).json('password needs to be strong')

    user = new userModel({ name, email, password })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save()

    const token = createToken(user._id)

    res.status(200).json({_id: user._id, name, email, token})
} catch(err) {
    console.log(err);
    res.status(500).json(err)
}
    
}

async function loginUser(req, res) {
    

    try{

    const { email , password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json('User not registered');

    if (!email || !password ) return res.status(400).json('All user details are required');

    const isValidpassword = await bcrypt.compare(password, user.password);

    if(!isValidpassword) return res.status(400).json('invalid password');

    const token = createToken(user._id)

    res.status(200).json({_id: user._id, name: user.name, email, token})


    }catch(err) {
    console.log(err);
    res.status(500).json(err)
}
}

async function findAUser(req, res) {
   

    try{ 
        const userId = req.params.userId;
        const user = await userModel.findById({ userId})

        res.status(200).json(user);

    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
}

async function findAllUsers(req, res) {
    try{
        const users = await userModel.find();

        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
}
module.exports = { registerUser, loginUser, findAUser, findAllUsers }