#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var html2js = require('./../src/index.js');

var argv = require('minimist')(process.argv.slice(2));

if (argv.help) {
  var usage = fs.readFileSync(path.join(__dirname, './../tmpl/usage.md')).toString();
  console.error(usage);
  process.exit(0);
}

html2js(argv);
