import * as express from 'express';
import { EventEmitter } from 'events';
import { Stream } from 'stream';
import { Model } from 'sequelize';
declare global {

    var sails: sails;
    var next: Function;

    export interface sails extends EventEmitter {
        config: config;

        /**
                 * @description There are mulitple available events that are already registered by sails
                 * event name | emitted when
                 * ready      |  The app has been loaded and the bootstrap has run, but it is not yet listening for requests
                 *
                 * lifted     |  The app has been lifted and is listening for requests.
                 *
                 * lower      |  The app has is lowering and will stop listening for requests.
                 *
                 *
                 * hook:<hook identity>:loaded | The hook with the specified identity loaded and ran its initialize() method successfully.
                 */
        on(event: string | symbol, listener: (...args: any[]) => void): this;

        /**
                 * @description Look up the first route pointing at the specified target (e.g. MeController.login) and return a dictionary containing its method and URL
                 *
                 * target : The route target string; e.g. MeController.login
                 */
        getRouteFor(target: string): dynamicObjects;

        /**
                 * @description Look up the first route pointing at the specified target (e.g. MeController.login) and return its URL.
                 */
        getUrlFor(target: string): string;

        /**
                 * @description
                 * configOverrides: A dictionary of config that will override any conflicting options present on the command line, in environment variables, or in configuration files. If provided, this will be merged on top of sails.config.
                 *
                 * This does exactly what you might be used to seeing by now when you run sails lift.
                 * It loads the app, runs its bootstrap, then starts listening for HTTP requests and WebSocket connections.
                 * Useful for building top-to-bottom integration tests that rely on HTTP requests,
                 * and for building higher-level tooling on top of Sails.
                 */
        lift(configOverrides: dynamicObjects, err: errorCallback): void;

        /**
                 * @description
                 * This does exactly what you might be used to seeing by now when you run sails lift.
                 * It loads the app, runs its bootstrap, then starts listening for HTTP requests and WebSocket connections.
                 * Useful for building top-to-bottom integration tests that rely on HTTP requests,
                 * and for building higher-level tooling on top of Sails.
                 */
        lift(err: errorCallback): void;

        load(): void;

        log(message: string | any): void;

        lower(callback: Function): void;

        /**
                 * @description Make a virtual request to a running Sails instance.
                 */
        request(request: object): Stream;
        request(url: string, callback: Function): Stream;
        request(url: string, body: dynamicObjects): Stream;
        request(url: string, body: dynamicObjects, callback: Function): Stream;

        getBaseUrl(): string;

        [key: string]: any;
    }

    // ------------- small interfaces just for typing needs ----------------
    interface dynamicObjects {
        [key: string]: any;
    }

    interface errorCallback {
        (err: Error): void;
    }

    // -------------- sails.config Declarations  ------------------

    interface config {
        blueprints: blueprints;
        bootstrap: Function;
        connections: dynamicObjects;
        cors: cors;
        csrf: csrf;
        globals: dynamicObjects;
        http: dynamicObjects;
        i18n: dynamicObjects;
        log: logTypes | logSettings;
        models: dynamicObjects;
        polices: dynamicObjects;
        routes: dynamicObjects;
        session: dynamicObjects;
        sockets: dynamicObjects;
        views: dynamicObjects;
        port: number;
        ssl: boolean | dynamicObjects;
        keepResponseErrors: number;
        environment: string;
        proxyHost: string;
        proxyPort: number;
        explicitHost: string;
        [key: string]: any;
    }

    interface blueprints {
        actions: boolean;
        rest: boolean;
        shortcuts: boolean;
        prefix: string;
        restPrefix: string;
        pluralize: boolean;
        populate: boolean;
        defaultLimit: number;
        autoWatch: boolean;
        jsonp: boolean;
        [key: string]: any;
    }

    interface cors {
        allRoutes: boolean;
        origin: string;
        methods: string;
        headers: string;
        exposeHeaders: string;
        credentials: boolean;
        securityLevel: number;
        [key: string]: any;
    }

    interface csrf {
        csrf:
        | boolean
        | {
            grantTokenViaAjax: boolean;
            origin: string;
            routesDisabled: string | string[];
        };
        [key: string]: any;
    }

    interface logTypes {
        error(message: string): void;
        debug(message: string): void;
        warn(message: string): void;
        info(message: string): void;
        verbose(message: string): void;
        silly(message: string): void;
        [key: string]: any;
    }

    interface logSettings {
        level: string;
        inspect: boolean;
        custom: any;
        [key: string]: any;
    }

    // ----------------------- Request Declarations ------------------

    interface Request extends express.Request {
        isSocket: boolean;
        options: dynamicObjects;
        session: any;
        wantsJSON: boolean;
        allParams(): dynamicObjects;
        file(field: string): dynamicObjects;
        [key: string]: any;
    }

    interface Response extends express.Response {
        badRequest(data: string | object): any;
        badRequest(data: string | object, pathToView: string): any;

        created(data: string | object): any;
        created(data: string | object, pathToView: string): any;

        forbidden(data: string | object): any;
        forbidden(data: string | object, pathToView: string): any;

        negotiate(err: Error): any;

        notFound(data: string | object): any;
        notFound(data: string | object, pathToView: string): any;

        serverError(data: string | object): any;
        serverError(data: string | object, pathToView: string): any;

        view(pathToView: string): any;
        view(locals: object): any;

        json(): any;
        json(object: dynamicObjects): any;
        json(status: number, object: dynamicObjects): any;

        /**
                     * @description With no pathToView argument, res.view() will decide the path by combining the identity of the controller (user) and the name of the action (show):
                     */
        view(): any;
        [key: string]: any;
    }

    interface SequelizeModel<T, Y> extends Model<T, Y> {
        [key: string]: any;
    }


    export interface User {
        first_name?: string,
        last_name?: string,
        email?: string,
        password?: string,
        apItoken?:string,
        createdAt?: string,
        updatedAt?: string
    }
    export interface Todo {
        title:string,
        createdAt?:Date,
        done?: boolean,
        doneAt?:Date,
    }
    var User: SequelizeModel<User, User>;
    var Todo: SequelizeModel<Todo, Todo>;
    //<models here>

    var ExampleService: Exampleservice;
    //<services here>
}
