#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var util = require('util');

var templateCache = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');
var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');

module.exports = function(args, callback) {
  var opts = {
    '_': [],
    module: 'app.templates',
    prefix: '/',
    output: null,
  };
  args = args || {};
  _.merge(opts, args);

  var tpl = [];
  opts._.forEach(function(file) {
    var fullpath = path.resolve(file);
    var data = fs.readFileSync(fullpath, 'utf-8');
    if (fullpath.indexOf('.jade') !== -1) {
      data = jade.render(data, { pretty: true });
    }

    data = data.replace(/\\/g, '\\\\');
    data = data.replace(/\n$/, '');
    data = data.replace(/'/g, '\\\'');
    data = data.replace(/\r?\n/g, '\\n\' +\n    \'');

    tpl.push(util.format(templateCache, opts.prefix + file, data));
  });

  var data = util.format(templateModule, opts.module, tpl.join(''));
  if (opts.output) {
    fs.writeFileSync(opts.output, data, 'utf8');
  } else {
    console.log(data);
  }

  if (callback) {
    callback();
  }
};
