module.exports = function(grunt) {
    "use strict";
  
    grunt.initConfig({
      concurrent: {
        dev: {
          tasks: ['nodemon', 'watch'],
          options: {
            logConcurrentOutput: true
          }
        }
      },

      nodemon: {
        dev: {
          script: './bin/www'
        }
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
          tasks: ["ts", "tslint", "copy"]
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
    });
  
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-tslint");
  
    grunt.registerTask("default", [
      "nodemon"
    ]);

    grunt.registerTask("debug", [
      "concurrent"
    ]);

    grunt.registerTask("build", [
      "ts", "tslint", "copy"
    ]);
  
  };