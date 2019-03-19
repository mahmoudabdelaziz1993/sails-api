/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');
var fs = require('fs');


/**
 * sails-generate-sails-controller-ts
 *
 * Usage:
 * `sails generate sails-controller-ts`
 *
 * @description Generates a sails-controller-ts
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate sails-controller-ts user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    if (!scope.args[0]) {
      return cb(new Error('Please provide a name for this sails-controller-ts.'));
    }

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb(INVALID_SCOPE_VARIABLE('rootPath'));
    }


    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    let fileName = scope.args[0];
    let controller_name = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    // Decide the output filename for use in targets below:
    scope.filename = controller_name + 'Controller';
    // scope.filename = UtilsService.captilizeFirstLetter(scope.args[0]) + 'Controller';

    this.createController(scope);

    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'an example file created at ' + scope.createdAt;

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    // './': { template: 'ts-controller.stub' },

    // Creates a folder at a static path
    // './hey_look_a_folder': { folder: {} }

  },

  /**
   * function to create controllers dynamically 
   */
  createController: (scope) => {

    let templates = require('path').resolve(__dirname, './templates');

    fs.readFile(`${templates}/ts-controller.stub`, 'utf-8', (err, data) => {
      if (err) return console.log(err);

      fs.writeFile(`api/controllers/${scope.filename}.ts`, data.replace(/dummy_controller/g, scope.filename), (err) => {
        if (err)
          return console.log(err);

        console.log(`controller ${scope.filename} created successfully`);
      });

    });
  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE(varname, details, message) {
  var DEFAULT_MESSAGE =
    'Issue encountered in generator "sails-controller-ts":\n' +
    'Missing required scope variable: `%s`"\n' +
    'If you are the author of `sails-generate-sails-controller-ts`, please resolve this ' +
    'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n' + details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
