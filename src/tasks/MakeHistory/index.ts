"use strict";

import {parseStruct} from "./structure_parser/tsStructureParser";
import {ArrayType, BasicType} from "./structure_parser/index";
import {ClassMetadata} from "./model/classmetadata";
import {FieldMetadata} from "./model/fieldmetadata";
import {FileMetadata} from "./model/filemetadata";
import {render, renderString, configure} from "nunjucks";



function makeHistory(grunt: any) {
  grunt.registerMultiTask("makeHistory", function(){
     var  metadata = createMetadatas(this.files, grunt, this);
      createFiles(metadata, grunt);
    }
);
}
module.exports = makeHistory;

function createMetadatas(files: any, grunt: any, obj: any) {
    var options = obj.options({
        encoding: grunt.file.defaultEncoding,
        processContent: false,
        processContentExclude: [],
        timestamp: false,
        mode: false
      });
    let generationFiles: FileMetadata[];
    generationFiles = new Array<FileMetadata>();
    var wasFiled = 0;
    var fileMet;
    var isOneFile = obj.data.oneFile;
    for (var file of files){
        if (isOneFile) {
            if (fileMet === undefined) {
            fileMet = new FileMetadata();
            }
            fileMet.filename = file.orig.dest + "/common.ts";
            if (fileMet.classes === undefined) {
            fileMet.classes = new Array<ClassMetadata>();
            }
        }
        if (!isOneFile) {
            fileMet = new FileMetadata();
            fileMet.filename = file.dest;
            fileMet.classes = new Array<ClassMetadata>();
        }
        var stringFile = grunt.file.read(file.src, options);
        var jsonStructure = parseStruct(stringFile, {}, file.src);
        jsonStructure.classes.forEach(cls => {
            let classMet = new ClassMetadata();
            classMet.name = cls.name;
            classMet.fields = new Array<FieldMetadata>();
            cls.decorators.forEach(dec => {
                if (dec.name === "GenerateHistory") {
                    classMet.generateHistory = true;
                }
            });
            if (classMet.generateHistory === false) {
                return;
            }
            cls.fields.forEach(fld => {
                let fldMetadata = new FieldMetadata();
                if ((<ArrayType>fld.type).base !== undefined) {
                    fldMetadata.name = fld.name;
                    var skobes = "[]";
                    fldMetadata.isArray = true;
                    fldMetadata.type = (<BasicType>(<ArrayType>fld.type).base).typeName;
                    var curBase = (<ArrayType>fld.type).base;
                    while ((<ArrayType>curBase).base !== undefined) {
                        curBase = (<ArrayType>curBase).base;
                        fldMetadata.type = (<BasicType>curBase).typeName;
                        skobes += "[]";
                    }
                    fldMetadata.type += skobes;
                }else {
                    fldMetadata.name = fld.name;
                    fldMetadata.type = (<BasicType>fld.type).typeName;
                }

                let isDbColumn = false, isIgnoredInHistory = false;
                fld.decorators.forEach(dec => {
                    if (dec.name === "IgnoredInHistory") {
                        isIgnoredInHistory = true;
                    }

                    if (dec.name === "Column") {
                        isDbColumn = true;
                    }

                    if (dec.name === "HistoryIndex") {
                        fldMetadata.generateIndex = true;
                    }
                });

                if (!isDbColumn || isIgnoredInHistory) {
                    fldMetadata.ignoredInHistory = true;
                }

                classMet.fields.push(fldMetadata);
            });
            fileMet.classes.push(classMet);
        });
        if (isOneFile && wasFiled === 0) {
            generationFiles.push(fileMet);
            wasFiled++;
        }
        if (!isOneFile) {
            generationFiles.push(fileMet);
        }
    }
    return generationFiles;
}
function  createFiles(metadata: FileMetadata[], grunt: any) {
    configure("./src/tasks/makeHistory/view", {autoescape: true, trimBlocks : true});
    for ( var i = 0; i < metadata.length; i++ ) {
        var mdata = metadata[i];
        mdata.classes = mdata.classes.filter((item) => item.generateHistory);
        var c = render("historyTemplateCommon.njk", {metafile: mdata});
        if (c && c.trim()) {
            grunt.file.write(metadata[i].filename, c);
        }
    }
}

