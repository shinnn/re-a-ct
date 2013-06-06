module.exports = (grunt)->
  devDeps = grunt.file.readJSON('package.json').devDependencies
  
  for taskName, version of devDeps
    if 'grunt-' is taskName.substring 0, 6
      grunt.loadNpmTasks(taskName)
  
  writeBeatTime = (err, stdout, stderr, cb)->
    beatArray = stdout.split '\n'
    beatArray.pop()
    
    beatArray.forEach (element, index)->
      beatArray[index] = parseFloat(element, 10);
    
    preBeat = beatArray[1] - beatArray[0]
    beatPoint = beatArray[1]
    
    while beatPoint >= 0
      beatArray.unshift(beatPoint)
      beatPoint -= preBeat
        
    beatTimes = {"beat_times": beatArray};
    json = JSON.stringify [beatTimes], null, 2;
    grunt.file.write 'json/beat.json', json
        
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
    
    shell:
      aubiotrack:
        command: 'aubiotrack -i audio/wav/background.wav -O complexdomain'
        options:
          callback: writeBeatTime
    
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
  
  grunt.task.registerTask 'beat', ->
    
    
  grunt.task.registerTask 'default', ['compass', 'concat', 'watch']
