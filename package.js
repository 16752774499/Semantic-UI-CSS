var
  where = 'client' // Adds files only to the client
;

Package.describe({
  name    : 'semantic:ui-css',
  summary : 'Semantic UI - CSS Release of Semantic UI',
  version : '1.9.2',
  git     : 'git://github.com/Semantic-Org/Semantic-UI-CSS.git',
});

Package.onUse(function(api) {

  var
    fs   = require('fs'),
    path = require('path'),
    files,
    walk
  ;

  // recursive sync walk
  walk = function(dir) {
    var
      dir   = dir || __dirname,
      list  = fs.readdirSync(dir),
      files = []
    ;
    list.forEach(function(file) {
      var
        filePath = path.join(dir, file),
        stat     = fs.statSync(filePath)
      ;
      if(stat && stat.isDirectory() && file !== 'node_modules') {
        files = files.concat(walk(filePath));
      }
      else {
        files.push(filePath);
      }
    })
    return files
  }
  files = walk();

  api.versionsFrom('1.0');
  api.addFiles(files, 'clent');

});
