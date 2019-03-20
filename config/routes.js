module.exports.routes = {


  'get /index': 'UserController.index',
  'post /todo/create': 'TodoController.create',
  'get /todos': 'TodoController.list',
  'patch /todos/update/:id': 'TodoController.update',
  'delete /todos/delete/:id': 'TodoController.delete',
  'post /register':'UserController.register',
  'post /login':'UserController.login'
};
