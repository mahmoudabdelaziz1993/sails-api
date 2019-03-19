/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');

var glob = require('glob');
var fs = require('fs');


var global_declaration_path = 'global.d.ts';

require('ts-node/register');


/**
 * sails-generate-declarations
 *
 * Usage:
 * `sails generate declarations`
 *
 * @description Generates a declarations
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
    // $ sails generate declarations user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    // if (!scope.args[0]) {
    //   return cb( new Error('Please provide a name for this declarations.') );
    // }

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

    // Decide the output filename for use in targets below:
    scope.filename = scope.args[0];

    generateDeclarations();


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
    // './:filename': { template: 'example.template.js' },

    // Creates a folder at a static path
    // './hey_look_a_folder': { folder: {} }
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
    'Issue encountered in generator "declarations":\n' +
    'Missing required scope variable: `%s`"\n' +
    'If you are the author of `sails-generate-declarations`, please resolve this ' +
    'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n' + details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}


function generateDeclarations() {
  generateService();
  generateModels();
}

function generateModels() {
  glob('api/models/**/*.ts', (err, matches) => {

    for (let path of matches) {
      let cleanPath = path.slice(0, path.length - 3);
      let splitter = cleanPath.split('/');
      let modelName = splitter[splitter.length - 1];

      let interfaceString = `var ${modelName}: SequelizeModel;
    //<models here>`;

      addToGlobalDeclarationFile(interfaceString, '//<models here>', `var ${modelName}`);
    }

  });
}


function generateService() {
  glob('api/services/**/*.ts', (err, matches) => {
    if (err) return console.log(err);

    for (path of matches) {
      path = path.slice(0, path.length - 3);
      console.log(path);
      let service = require('../../' + path);

      let model_name_array = path.split('/');
      let service_name = model_name_array[model_name_array.length - 1];

      // slicing service word
      service_short_name = service_name.slice(0, service_name.length - 7);

      service_short_name = service_short_name + 'service';

      let model_interface = `var ${service_name}: ${service_short_name};
      //<services here>`;

      // let model_import = `import { ${service_name} } from "./api/services/${service_name}";`;

      // let model_import_with_comment = `import { ${service_name} } from "./api/services/${service_name}";
      //<imports here>`;

      addToGlobalDeclarationFile(model_interface, '//<services here>', `var ${service_name}: ${service_short_name}`);
      // addToGlobalDeclarationFile(model_import_with_comment, '//<imports here>', model_import);
    }

  });
}


function addToGlobalDeclarationFile(interface_string, replacer_string, declaration_name) {

  let data = fs.readFileSync(global_declaration_path, 'utf-8');

  if (!declarationExists(declaration_name)) {
    return;
  }

  fs.writeFileSync(global_declaration_path, data.replace(replacer_string, interface_string));
}

function addToModelsService(interface_string, replacer_string, declaration_name) {
  let servicePath = 'api/services/ModelsService.ts';
  let data = fs.readFileSync(servicePath, 'utf-8');

  if (!declarationExists(declaration_name, servicePath)) {
    return;
  }

  fs.writeFileSync(servicePath, data.replace(replacer_string, interface_string));
}

function declarationExists(declaration_name, path) {
  let exist = 0;
  path = path || global_declaration_path;
  let data = fs.readFileSync(path, 'utf-8');

  exist = data.indexOf(declaration_name);

  console.log(declaration_name);

  if (exist > 0) {
    console.log(`Already Exists`);
    console.log();
  } else {
    console.log(`Declared Successfully!!`);
    console.log();
  }

  return exist <= 0;
}