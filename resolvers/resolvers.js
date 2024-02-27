const {UserController} =  require('../controllers/userController.js');

const resolvers = {
 Query: {
  user: (_, {email}) => UserController.find(email)
 },
 Mutation: {
  addUser: (_, { email, password, name, surname, secondSurname }) => {
   const user = {
    email: email,
    password: password,
    name: name,
    surname: surname,
    secondSurname: secondSurname
   }

   return UserController.save(user);
  },

  modifyUser: (_, { email, user }) => {
   return UserController.modify(email, user);
  },

  deleteUser: (_, { email }) => {
   return UserController.delete(email);
  }
 }
};

module.exports = resolvers;