module.exports = function(grunt) {
    grunt.initConfig({
        name: 'rf',
        pkg: grunt.file.readJSON('package.json'),
        clean : ['dist/*', '<%= name %>.zip'],
        less: {
            release: {
                options: {
                    paths: ['src']
                },
                files: {
                    'dist/<%= name %>.css': 'src/<%= name %>.less'
                }
            }
        },
        copy: {
            // TODO: 过滤'-source'文件
            img: {
                files: [
                    {expand: true, cwd: 'src/img', src: '*', dest: 'dist/img/'}
                ]
            }
        },
        zip: {
            main: {
                router: function (filepath) {
                    return 'rf-css/' + filepath;
                },

                src: [
                    'package.json', 
                    'README.md', 
                    'dist/**'
                ],

                dest: '<%= pkg.name %>.zip'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('default', ['clean', 'less:release', 'copy:img']);
    grunt.registerTask('release', ['default', 'zip']);
}
