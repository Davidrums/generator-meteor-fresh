'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var FreshGenerator = module.exports = function FreshGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: true });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FreshGenerator, yeoman.generators.Base);

FreshGenerator.prototype.askFor = function askFor() {
  // have Yeoman greet the user.
  console.log(this.yeoman);
};

FreshGenerator.prototype.app = function app() {
  this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true }).forEach(function (file) {
    if ([
      '.git'
    ].indexOf(file) !== -1) {
      return;
    }
    this.copy(file, file);
  }, this);
};

FreshGenerator.prototype.projectfiles = function projectfiles() {
};