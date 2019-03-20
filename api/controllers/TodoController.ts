class TodoController {
    list = async (request: Request, response: Response) => {
        try {
            const todo = await Todo.findAll({});
            response.status(200).send(todo);
        } catch (error) {
            response.status(404).send(error);
        }

    }
    create = async (request: Request, response: Response) => {
            try {
                const todo = await Todo.create({
                    title: request.body.title,
                    createdAt: new Date(),
                });
                response.status(200).send(todo);
            } catch (error) {
                response.status(404).send(error);
            }
        
    }
    update = async (req: Request, res: Response) => {
        try {
            const data = await Todo.update({ done: true, doneAt: new Date() }, { where: { id: req.params.id } })
            res.status(200).send(data);
        } catch (error) {
            res.status(404).send(error);
        }

    }
    delete = async (req:Request,res:Response)=>{

        try {
            const data = await Todo.destroy({where:{id:req.params.id}});
            res.status(200).send(`delete todo with id ${req.params.id}`);
        } catch (error) {
            res.status(404).send(error);
        }
    }
}

module.exports = new TodoController();