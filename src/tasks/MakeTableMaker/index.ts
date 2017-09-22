import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import {render, renderString, configure} from "nunjucks";
import {DbOptions} from "./model/options";

//import * as m from "C:/Users/KSK/Downloads/nodejs/nodejs-express-typescript-masterc/environment/prod.json";
//import * as m from "../environment/prod.json";

function makeTableMaker(grunt: any) {
    grunt.registerMultiTask("makeTableMaker", function() {
        let dbOptions = new DbOptions();
        var options = this.options({
            encoding: grunt.file.defaultEncoding,
            processContent: false,
            processContentExclude: [],
            timestamp: false,
            mode: false
          });
        var env =  grunt.file.read("./environment/prod.json");
        var m = JSON.parse(env);
        dbOptions.type = m.dbtype;
        dbOptions.host = m.dbhost;
        dbOptions.port = m.dbport;
        dbOptions.username = m.dbusername;
        dbOptions.password = m.dbpassword;
        dbOptions.database = m.dbdatabase;
        dbOptions.reCreate = this.data.reCreate;
        dbOptions.declarationPath = this.data.pathToDeclaration;
        var declar = grunt.file.read(this.data.pathToDeclaration);
        var j = JSON.parse(declar);
        console.log("-----------");
        console.log(this.data.pathToHistory);
        console.log(this.data.pathToDeclaration);
        console.log("-----------");
        CreateFiles(j, dbOptions, grunt, this.files[0].orig.dest + "/c.ts", this.data.pathToHistory);
    });
}
module.exports = makeTableMaker;

function CreateFiles(datas: any, dboptions : any, grunt: any, pathToCreate: string, _historypath: string) {
    configure("./src/tasks/makeTableMaker/view", {autoescape: true, trimBlocks: true});
    var c = render("createBaseTemplate.njk", {data: datas, options: dboptions, historyPath: _historypath});
    if (c && c.trim()) {
        grunt.file.write(pathToCreate, c);
    }
}



