const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../utils/secretToken");

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    //Check emptyness of the incoming data
    if (!username || !email || !password) {
      return res.json({ message: "Please enter all the details" });
    }
    //Vérifier si l'utilisateur existe déjà ou non
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.json({ message: "User already exist with the given emailId" });
    }
    //Hash le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userModel({
      username: username,
      email: email,
      password: hashPassword,
    });
    await user.save();
    //Créer un token pour authentifier les utilisateurs
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
     res
       .status(201)
       .json({ message: "User signed in successfully", success: true, user });
     next();
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports.login = async (req, res, next) => {
    
    try{
        const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await userModel.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
};

module.exports.user = async (req, res) => {};
