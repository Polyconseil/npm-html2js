angular.module('template.js', [])
.run(['$templateCache', function($templateCache) {
    $templateCache.put('/foo/example/files/file1.tpl.jade', '\n' +
    '<div>\n' +
    '  <h1>Hello World from file1!</h1>\n' +
    '</div>');
  $templateCache.put('/foo/example/files/file2.tpl.jade', '\n' +
    '<div>\n' +
    '  <h1>Hello World from file2!</h1>\n' +
    '</div>');
  $templateCache.put('/foo/example/files/subfolder/subfile1.tpl.jade', '\n' +
    '<div>\n' +
    '  <h1>Hello World from subfile1!</h1>\n' +
    '</div>');
  $templateCache.put('/foo/example/files/subfolder/subfile2.tpl.jade', '\n' +
    '<div>\n' +
    '  <h1>Hello World from subfile2!</h1>\n' +
    '</div>');

}]);
