class TodoController {
    async list (request:Request,response:Response){
        const todo = await Todo.findAll({});
        response.send(todo);
    }
    async create (request:Request,response:Response){
        //const {title} = request.body;
        const todo =  await Todo.create({
            title: request.body.title,
            createdAt:new Date(),
        });
        response.send(todo);
    }
}

module.exports = new TodoController();