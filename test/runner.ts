///<reference path="../typings/node/node.d.ts"/>

import * as fs from "fs";

module Runner {
  
  // Can be used to debug mocha tests in Visual Studio or other IDE's

  if (!(<any>global).describe) {
    var Mocha = require("mocha");
    var mocha = new Mocha({ timeout: 365 * 24 * 60 * 60 * 1000 }); // A debugging session should not last longer dan a year
    
    fs.readdirSync('build/js/test/to-hyperscript').filter(function(file){
      return file.substr(-3) === '.js';
    }).forEach(function(file){
      mocha.addFile('build/js/test/to-hyperscript/' + file);
    });
        
    mocha.run((failureCount:number) => {
      console.log("Press any key to exit");
      (<any>process.stdin).setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', () => {
        process.exit(failureCount === 0 ? 0 : 1);
      });
    });
  }
}

