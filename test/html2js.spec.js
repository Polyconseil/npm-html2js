#!/usr/bin/env node

/* globals describe, it */

'use strict';

var chaiExpect = require('chai').expect;
var fs = require('fs');

var html2js = require('../src/index.js');
var path = require('path');
var model = fs.readFileSync(path.join(__dirname, 'output/model.js'));

describe('html2js', function() {
  it('should produce the expected js', function(done) {
    var opts ={
      '_': [
        'example/files/file1.tpl.jade',
        'example/files/file2.tpl.jade',
        'example/files/subfolder/subfile1.tpl.jade',
        'example/files/subfolder/subfile2.tpl.jade',
      ],
      prefix: '/foo/',
      module: 'template.js',
      output: path.join(__dirname, 'output/template.js')
    };
    html2js(opts, function() {
      var output = fs.readFileSync(opts.output);
      chaiExpect(output.toString()).to.equal(model.toString());
      done();
    });
  });
});
