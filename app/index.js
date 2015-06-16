'use strict';
var yosay = require('yosay');
var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);


	this.on('end', function () {
	  this.installDependencies({ 
	  	skipInstall: true,
	  	skipMessage: true
	  });
	});

    // This makes `appname` a required argument.
    this.argument('dirname', { type: String, required: false });
  },
  prompting: function(){
  	if(!this.dirname){
  		var done = this.async();
	    this.prompt({
	      type    : 'input',
	      name    : 'name',
	      message : 'Your project name',
	      default : this.appname // Default to current folder name
	    }, function (answers) {
	      this.dirname = answers.name;
	      done();
	    }.bind(this));
  	}
  },
  writing: function () {
	this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true }).forEach(function (file) {
	  if ([
	    '.git'
	  ].indexOf(file) !== -1) {
	    return;
	  }
	  this.copy(file, this.dirname+'/'+file);
	}, this);
  },
  end: function(){
  	this.log(yosay(
        chalk.red('Welcome!') + '\n' +
        chalk.yellow('Start your fresh meteor app by running:\n cd '+this.dirname+' && meteor')
      ));
  }


})