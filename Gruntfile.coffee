'use strict'

module.exports = (grunt) ->
  devDeps = grunt.file.readJSON('package.json').devDependencies
  
  for taskName of devDeps
    if 'grunt-' is taskName.substring 0, 6
      grunt.loadNpmTasks taskName
  
  BIN = "#{ process.cwd() }/node_modules/.bin/"
  
  DEST_ROOT = 'site/'
  
  rawAudioCwd = 'audio/raw/'
  
  # alias
  cfg = grunt.config
  
  # トラック解析結果を格納するオブジェクト
  analysis =
    cwd: 'audio/raw/tracks'
    tracks: {}
  
  _aubiotrackCallback = (err, stdout, stderr, cb) ->
    beatArray = stdout.split '\n'
    beatArray.pop()
    
    for beat, i in beatArray
      beatArray[i] = parseFloat beat, 10
    
    # aubio が最初の方のビートを検知しない不具合への対処
    preBeat = beatArray[1] - beatArray[0]
    beatPoint = beatArray[1]
    
    while beatPoint >= 0
      beatArray.unshift beatPoint
      beatPoint -= preBeat
    
    analysis.tracks[cfg 'trackPath'] = { beat_times: beatArray }
    cb()

  grunt.task.registerTask '_writeAnalysis', ->
    json = JSON.stringify analysis, null, 2
    grunt.file.write 'audio/data-json/_analysis.json', json
    grunt.task.run 'copy:data'
    console.log "All Tracks Analysed."
    
  grunt.task.registerTask 'analysis', 'Analysing audio', ->
    opt = { cwd: analysis.cwd }
    tracks = grunt.file.expand opt, '**/*.wav'
    
    for track in tracks
      grunt.task.run 'aubiotrack:' + track
    grunt.task.run '_writeAnalysis'
  
  grunt.task.registerTask 'aubiotrack', (path) ->
    cfg 'trackPath', path.replace '.wav', ''
    console.log "Analysing #{ cfg('trackPath') }.wav..."
    grunt.task.run 'shell:aubiotrack'
  
  grunt.task.registerTask 'playlist', ->
    #tmp
  
  grunt.task.registerTask 'encode', ->
    grunt.task.run 'copy:audio'
    opt = { cwd: 'audio/raw/' }
    tracks = grunt.file.expand opt, '**/*.wav'
    for track in tracks
      grunt.task.run 'ffmpeg:' + track

  grunt.task.registerTask 'ffmpeg', (path) ->
    cfg 'ffmpegPath', path.replace '.wav', ''
    console.log "Encoding " + cfg('ffmpegPath') + ".wav..."
    grunt.task.run 'shell:ffmpeg'
  
  # grut-contrib-copy の際のオプション
  # destType 引数はオーディオファイルフォーマット
  copyOpt = (destType) ->
    expand: true
    cwd: 'audio/raw/'
    src: ['**']
    dest: "#{ DEST_ROOT }audio/compressed/#{ destType }/"
    filter: 'isDirectory'
  
  grunt.initConfig
    # オーディオ解析のためのファイルパスの設定
    trackPath: ''
    ffmpegPath: ''
    
    # オーディオ関連の処理
    shell:
      aubiotrack:
        command: "aubiotrack -i
                   #{ rawAudioCwd }tracks/<%= trackPath %>.wav -O complexdomain"
        options:
          callback: _aubiotrackCallback
      ffmpeg:
        # -y: Overwrite output files.
        command: [
            # M4A
            "afconvert #{ rawAudioCwd }<%= ffmpegPath %>.wav
              -d aac -f m4af -u pgcm 2 -b 256000 -q 127 -s 2
              #{ DEST_ROOT }audio/compressed/m4a/<%= ffmpegPath %>.m4a"
            # WebM
            "ffmpeg -y -i #{ rawAudioCwd }<%= ffmpegPath %>.wav
              -vn -codec:a libvorbis -aq 1M
              #{ DEST_ROOT }audio/compressed/webm/<%= ffmpegPath %>.webm"
            # Ogg
            "ffmpeg -y -i #{ rawAudioCwd }<%= ffmpegPath %>.wav
              -vn -codec:a libvorbis -qscale:a 10
              #{ DEST_ROOT }audio/compressed/ogg/<%= ffmpegPath %>.ogg"
          ].join '&&'
        options:
          callback: (err, stdout, stderr, cb) ->
            if stderr
              console.log stderr
            if stdout
              console.log stdout
            cb()
      
      coffeelint:
        command:
          "#{ BIN }coffeelint Gruntfile.coffee"
        options:
          stdout: true
    
    copy:
      audio:
        files: [
          copyOpt 'webm'
          copyOpt 'm4a'
          copyOpt 'ogg'
          {
            expand: true
            cwd: "audio/raw/"
            src: ['**']
            dest: "#{ DEST_ROOT }audio/raw/"
          }
        ]
      data:
        files: [
          expand: true
          cwd: "audio/data-json/"
          src: ['**']
          dest: "#{ DEST_ROOT }audio/data-json/"
        ]
      public:
        files: [
          expand: true
          cwd: "public/"
          src: ['**']
          dest: DEST_ROOT
          dot: true
        ]

        
    compass:
      dist:
        options:
          sassDir: 'scss'
          cssDir: "#{ DEST_ROOT }css"
          environment: 'production'
          outputStyle: 'compressed'
      dev:
        options:
          sassDir: 'scss'
          cssDir: "#{ DEST_ROOT }css"
          environment: 'development'
          outputStyle: 'expand'
      
    concat:
      main:
        src: ['js/main/*.js']
        dest: "#{ DEST_ROOT }js/re-a-ct.js"
        
      contrib:
        src: ['js/contrib/*.js']
        dest: "#{ DEST_ROOT }js/contrib.js"
    
    jade:
      dist:
        files:
          "site/index.html": ['jade/index.jade']
    
    connect:
      server:
        options:
          base: DEST_ROOT

    watch:
      options:
        livereload: true
      compass:
        files: ['scss/*.scss']
        tasks: ['compass']
      js_main:
        files: ['js/main/*.js']
        tasks: ['concat:main']
      js_contrib:
        files: ['js/contrib/*.js']
        tasks: ['concat:contrib']
      coffeelint:
        files: ['Gruntfile.coffee']
        tasks: ['shell:coffeelint']
      jade:
        files: ['jade/**/*.jade']
        tasks: ['jade']
      html:
        files: ["#{ DEST_ROOT }*.html"]
    
    'gh-pages':
      site:
        options:
          base: DEST_ROOT
          branch: 'gh-pages'
          message: 'auto commit by grunt-gh-pages'
          user:
            name: 'shinnn'
            email: 'snnskwtnb@gmail.com'
        src: '**/*'
    
  grunt.task.registerTask 'default', [
    'analysis',
    'compass',
    'concat','shell:coffeelint',
    'jade',
    'copy:public'
    'connect', 'watch'
  ]
