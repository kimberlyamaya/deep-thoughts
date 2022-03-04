const {User, Thought} = require('../models')

const resolvers = {
    Query: {
      // passing parent, {username} as the parameter
      thoughts: async (parent, { username }) => {
        // ternary operator to see if username exists , if true set params to an object containing the username, otherwise set params to an empty object
        const params = username ? { username } : {};
        return Thought.find(params).sort({ createdAt: -1 });
      },

      // place this inside of the `Query` nested object right after `thoughts` 
      thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
      },

      // get all users
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
      },

      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
      },
  }
    };
  
module.exports = resolvers;