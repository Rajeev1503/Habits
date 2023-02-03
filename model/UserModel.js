import mongoose from 'mongoose' ;
import bcrypt from 'bcryptjs' ;

const User_Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: "user",
  },

  taskListCategory : [{
    taskListCategoryName: {
        type:String
    },

    taskList : [{
        type: mongoose.Types.ObjectId,
        ref: "taskList"
    }]
  }],

  assignedTaskListCategory: [{

    assignedTaskListCategoryName: {
        type:String
    },

    taskList: {
      type: mongoose.Types.ObjectId,
      ref: "taskList",
    }
}]
});

User_Schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

User_Schema.methods = {
  authenticate: async function (enteredPassword) {
    const verifyPassword = bcrypt.compare(enteredPassword, this.password);
    return verifyPassword;
  },
};

const UserModel = mongoose.models.User || mongoose.model("User", User_Schema);
module.exports = UserModel;
