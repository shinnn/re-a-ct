module.exports = (grunt)->
  devDep = grunt.file.readJSON('package.json').devDependencies
  
  for taskName, version of devDep
    if 'grunt-' is taskName.substring 0, 6
      grunt.loadNpmTasks(taskName)
        
  grunt.initConfig
    compass:
      dist:
        options:
          sassDir: 'scss'
          cssDir: 'css'
          environment: 'production'
          outputStyle: 'compressed'
        
    concat:
      main:
        src: ['jsdev/main/*.js']
        dest: 'js/re-a-ct.js'
          
      contrib:
        src: ['jsdev/contrib/*.js']
        dest: 'js/contrib.js' 
    
    watch:
      options:
        # http://feedback.livereload.com/knowledgebase/articles/86242
        # if you want to use it with local files, be sure to enable “Allow access to file URLs” checkbox in Tools > Extensions > LiveReload after installation.
        livereload: true
      compass:
        files: ['scss/*.scss']
        tasks: ['compass']
      js_main:
        files: ['jsdev/main/*.js']
        tasks: ['concat:main']
      js_contrib:
        files: ['jsdev/contrib/*.js']
        tasks: ['concat:contrib']
      html:
        files: ['*.html']
          
  grunt.task.registerTask 'box', ['shell:box']
  grunt.task.registerTask 'default', [
    'compass', 'concat', 'watch'
  ]
