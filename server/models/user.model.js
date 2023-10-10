const mongoose = require("mongoose");

//Création d'un schéma à l'aide de mongoose
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

//Création de modèles
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
