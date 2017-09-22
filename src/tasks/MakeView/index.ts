"use strict";

import {parseStruct} from "./structure_parser/tsStructureParser";
import {ClassMetadata} from "./model/classmetadata";
import {FieldMetadata} from "./model/fieldmetadata";
import {FileMetadata} from "./model/filemetadata";
import {render, renderString, configure} from "nunjucks";


function makeView(grunt: any) {
  grunt.registerMultiTask("makeView", function() {
    var  metadata = createMetadatas(this.files, grunt, this);
    CreateFiles(metadata, grunt);
});
}

module.exports = makeView;



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
                if (dec.name === "GenerateView") {
                    classMet.generateView = true;
                    classMet.name = dec.arguments[0].toString();
                }
            });
            if (classMet.generateView === false) {
                return;
            }
            cls.fields.forEach(fld => {
                let fldMetadata = new FieldMetadata();
                if (fld.type.base !== undefined) {
                    fldMetadata.name = fld.name;
                    fldMetadata.baseModelName = fld.name;
                    var skobes = "[]";
                    fldMetadata.isArray = true;
                    fldMetadata.type = fld.type.base.typeName;
                    var curBase = fld.type.base;
                    while (curBase.base !== undefined) {
                        curBase = curBase.base;
                        fldMetadata.type = curBase.typeName;
                        skobes += "[]";
                    }
                    fldMetadata.type += skobes;
                }else {
                    fldMetadata.name = fld.name;
                    fldMetadata.baseModelName = fld.name;
                    fldMetadata.type = fld.type.typeName;
                    var typeName = fld.type.typeName;
                    if (typeName !== "string" && typeName !== "number" && typeName !== "boolean" && typeName !== "undefined"
                && typeName !== "null") {
                        fldMetadata.isComplexObj = true;
                    }
                }

                fld.decorators.forEach(dec => {
                    if (dec.name === "IgnoreViewModel") {
                        fldMetadata.ignoredInView = true;
                    }
                    if (dec.name === "ViewModelName") {
                        fldMetadata.name = dec.arguments[0].toString();
                    }

                });
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

function  CreateFiles(metadata: FileMetadata[], grunt: any) {
    configure("./src/tasks/makeView/view", {autoescape: true, trimBlocks : true});
    for ( var i = 0; i < metadata.length; i++ ) {
        var mdata = metadata[i];
        mdata.classes = mdata.classes.filter((item) => item.generateView);
        var c = render("viewTemplateCommon.njk", {metafile: mdata});
        if (c && c.trim()) {
            grunt.file.write(metadata[i].filename, c);
        }
    }
}

