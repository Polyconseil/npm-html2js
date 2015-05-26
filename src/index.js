#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var async = require('async');
var CombinedStream = require('combined-stream');
var fs = require('fs');
var glob = require('glob');
var jade = require('jade');
var path = require('path');
var through = require('through2');
var util = require('util');

var templateCache = fs.readFileSync(path.join(__dirname, './../tmpl/templateCache.tmpl'), 'utf-8');
var templateModule = fs.readFileSync(path.join(__dirname, './../tmpl/templateModule.tmpl'), 'utf-8');

module.exports = function(args, callback) {
  var opts = {
    '_': ['**/*.{jade,html}'],
    module: 'app.templates',
    prefix: '/',
    output: null,
    exclude: '',
  };
  args = args || {};
  _.merge(opts, args);

  opts._.forEach(function(dir) {

    glob(dir, function (err, files) {
      if (err) {
        throw new Error(err);
      }

      var cs = CombinedStream.create();
      var tpl = [];
      var filtered = [];

      async.filterSeries(files, function (file, done) {
        if (file.indexOf(opts.exclude) !== -1) {
          return done();
        }

        filtered.push(file);
        done();
      }, function(results) {
      });

      async.eachSeries(
        filtered,
        function (file, done) {
          cs.append(fs.createReadStream(path.resolve(file)));
          done();
        },
        function (err) {
          if (err) {
            throw err;
          }

          var filesIndex = 0;
          cs.pipe(through(function(chunk, enc, cb) {
            var route = filtered[filesIndex];
            var html = chunk.toString();

            if (route.indexOf('.jade') !== -1) {
              html = jade.render(html, { pretty: true });
            }

            html = html.replace(/\\/g, '\\\\');
            html = html.replace(/'/g, '\\\'');
            html = html.replace(/\r?\n/g, '\\n\' +\n    \'');

            var tmpl = util.format(templateCache, opts.prefix + route, html);
            tpl.push(tmpl);

            filesIndex++;

            cb();
          }));
        }
      );

      cs.on('end', function() {
        var template = util.format(templateModule, opts.module, tpl.join(''));
        if (opts.output) {
          fs.writeFileSync(opts.output, template, 'utf8');
        } else {
          console.log(template);
        }

        if (callback)
          callback();
      });
    });

  });
};
