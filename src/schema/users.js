const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UsersSchema = new mongoose.Schema({

  status: {
    type: String,
    required: true,
    default: "Pending",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Please Enter a valid email address");
    //   }
    // },
  },

  contactNo: {
    type: String,
    required: true,
    trim: true,
  },

  dateOfBirth: {
    type: String,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  businessType: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  state: {
    type: String,
  },

  city: {
    type: String,
  },

  address: {
    type: String,
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}]
});

UsersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UsersSchema.static('checkCredentials',async function (user, password) {
  const result = await model.findOne({ email:user });
  if (!result) {
    throw new Error("User ID not found");
  }
  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  return result;
}) 


UsersSchema.methods.toJSON = function () {
  const user = this;
  const obj = user.toObject();

  delete obj.password;
  return obj;
};

UsersSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()},'gopalGemsPrivateKey')
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token

}

const model = mongoose.model("users", UsersSchema);

module.exports = model;
