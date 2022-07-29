const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    body: {
      type: String,
      match: /^.*\S.*$/,
      minLength: 1,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
