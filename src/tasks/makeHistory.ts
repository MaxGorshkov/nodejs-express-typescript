"use strict";

import {parseStruct} from "./structureParser/tsStructureParser";
const fs = require("fs");

function makeHistory(grunt: any) {
        grunt.registerMultiTask("makeHistory", function() {
            console.log("makeHistory!");
            var filePath = "src/models/heroes/hero.ts";
            var decls = fs.readFileSync(filePath).toString();
            var jsonStructure = parseStruct(decls, {}, filePath);

            console.log(jsonStructure);
        });
    }

module.exports = makeHistory;