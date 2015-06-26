# npm-html2js

Use npm as a build tool to load all your jade/html templates into your $templateCache.

```shell
npm-html2js --prefix foo file.jade

angular.module('template.js', []);
  .run(['$templateCache', function($templateCache) {
    .$templateCache.put('foo/file.jade',
    '<div>\n' +
    '  <h1>Hello World from file1!</h1>\n' +
    '</div>')
  .$templateCache.put('files/file2.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from file2!</h1>\n' +
    '</div>')
  .$templateCache.put('files/subfolder/subfile1.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from subfile1!</h1>\n' +
    '</div>')
  .$templateCache.put('files/subfolder/subfile2.tpl.jade',
    '<div>\n' +
    '  <h1>Hello World from subfile2!</h1>\n' +
    '</div>')
  }]);
```
