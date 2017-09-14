module.exports = function(grunt) {
    "use strict";
  
    grunt.initConfig({

      env : {
        dev : {
          src : "./environment/dev.json",
        },
        prod : {
          src : "./environment/prod.json",
        },
        test : {
          src : "./environment/test.json",
        },
      },

      concurrent: {
        dev: {
          tasks: ['nodemon:debug', 'watch'],
          options: {
            logConcurrentOutput: true
          }
        }
      },

      nodemon: {
        debug: {
          script: './bin/www',
          options: {
            nodeArgs: ['--debug'],
          }
        },
        run: {
          script: './bin/www',
          options: {
            nodeArgs: [],
          }
        },
      },
      
      ts: {
        app: {
          files: [{
            src: ["src/\*\*/\*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
            dest: "./dist"
          },],
          options: {
            rootDir: "src",
            module: "commonjs",
            noLib: false,
            target: "es6",
            moduleResolution: "node",
            sourceMap: true,
          }
        },

        test: {
          files: [{
            src: ["src/\*\*/\*.ts", 'test/**/*.ts'],
            dest: "./test/dist"
          },],
          
          options: {
            rootDir: "",
            module: 'commonjs',
            noLib: false,
            target: "es6",
            moduleResolution: "node",
            sourceMap: true
          }
        }
      },
      
      tslint: {
        options: {
          configuration: "tslint.json"
        },
        files: {
          src: ["src/\*\*/\*.ts"]
        }
      },

      watch: {
        ts: {
          files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts", "src/\*\*/\*.jade", "src/\*\*/\*.css"],
          tasks: ["ts:app", "tslint", "copy"]
        }
      },

      copy: {
        static: {
          expand: true,
          cwd: 'src/static',
          src: ['**'],
          dest: 'dist/static'
        },
      },

      mochaTest: {
        test: {
          options: {
            log: true,
            run: true
          },
          src: ['test/**/*.js']
        },
      },

      makeHistory:{
        static: {
          expand: true,
          cwd: 'src/static',
          src: ['**'],
          dest: 'dist/static'
        },
      },
    });
  
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadTasks('dist/tasks');
  
    grunt.registerTask("default", [
      "nodemon:run"
    ]);


    grunt.registerTask("debugVS", [
      "env:prod", "build", "nodemon:debug"
    ]);

    grunt.registerTask("debug", [
      "env:dev", "concurrent"
    ]);

    grunt.registerTask("release", [
      "env:prod", "concurrent"
    ]);

    grunt.registerTask("test", [
      "env:test", "ts:test",  "mochaTest"
    ]);

    grunt.registerTask("build", [
      "ts:app", "tslint", "copy"
    ]);

    grunt.registerTask("history", ["makeHistory"]);
  };