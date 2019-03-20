import { LoDashStatic } from "lodash";

const _: LoDashStatic = require('lodash');
class UserController {

    x = 1;

    async index(request: Request, response: Response) {
        response.send('I am working');
    }

    register = async (req: Request, res: Response) => {
        let data = _.pick(req.body, ["first_name", "last_name", "email", "password"]);
       // data['apitoken'] = User.genrateToken();
        const resulat = await User.create(
            {
                first_name: data['first_name'],
                last_name: data['last_name'],
                email: data['email'],
                password: data["password"]
            });
        res.status(200).send(resulat);

    }

}

module.exports = new UserController();