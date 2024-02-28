const {UserController} =  require('../controllers/userController.js');
const {TaskController} =  require('../controllers/taskController');

const resolvers = {
 Query: {
  user: (_, {email}) => UserController.find(email),
  task: (_, { email }) => TaskController.find(email),
  allTasks: (_, { email }) => TaskController.findAll(),
  pendingTasks: (_, { email }) => TaskController.getPendingTasks(email),
  realizedTasks: (_, { email }) => TaskController.getRealizedTasks(email),
  freeTasks: (_, {}) => TaskController.findFree(),
  assignedTasks: (_, {}) => TaskController.findAssigned(),
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
  },

  addTask: (_, { name, description, difficulty }) => {
   const task = {
    name: name,
    description: description,
    difficulty: difficulty
   }

   return TaskController.save(task);
  },

  modifyTask: (_, { name, task }) => {
   return TaskController.modify(name, task);
  },

  deleteTask: (_, { name }) => {
   return TaskController.delete(name);
  },

  assignTask: (_, { taskName, userEmail }) => {
   return TaskController.assign(taskName, userEmail);
  },

  changeTaskProgress: (_, { progress, taskName }) => {
   return TaskController.changeProgress(progress, taskName);
  },
 }
};

module.exports = resolvers;