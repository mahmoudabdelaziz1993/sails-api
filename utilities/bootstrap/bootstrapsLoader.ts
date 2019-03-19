import * as glob from 'glob';
import * as bluebird from 'bluebird';

export class bootstrapsLoader {

    static async loadBootsrappers() {
        let self = new this();
        return await self.runBootstrap();
    }

    async runBootstrap(): Promise<any> {
        try {
            let globAsync = bluebird.promisify(glob);
            let files: any = await globAsync("utilities/bootstrap/*.ts");

            let returnObject = {};
            for (let boostrapperPath of files) {
                let path = boostrapperPath.split('/');
                let bootstrapperName = (path[path.length - 1]).slice(0, (path[path.length - 1].length - 3));
                if (bootstrapperName == 'bootstrapsLoader')
                    continue;

                // running the loadBoostrap function in each bootstrapper
                let bootstrapperModule = require(`./${bootstrapperName}`);
                // putting the returned value inside an object with the key as the moduleName
                returnObject[bootstrapperName] = await bootstrapperModule[bootstrapperName].loadBootsrappers();
            }
            return returnObject;
        } catch (err) {
            console.log(err);
        }
    }
}