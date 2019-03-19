class UserController {

    x = 1;

    async index(request: Request, response: Response) {
        response.send('I am working');
    }

}

module.exports = new UserController();