var gulp= require('gulp');
var less= require('gulp-less');
var concat = require('gulp-concat');
var uglify=require('gulp-uglify');
var express = require('express');  
var watch = require('gulp-watch'); 
var path= require('path');

var app = express(); 
var nodePath='./node_modules/';
var bowerPath='./libs/';

//se hai bisogno di piu file metti in parentesi[]
gulp.task('scripts', function() {
 //prendo jquery
  gulp.src([bowerPath +'jquery/dist/jquery.js'], [bowerPath +'bootstrap/dist/js/bootstrap.js'] 
  )
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
    console.log("Js concated");
}); 

gulp.task('angular', function() {
  gulp.src( 
  [bowerPath +'angular/angular.js']
  )
    .pipe(concat('angular.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
    console.log("Js concated");
    
    //concat dei controller
     gulp.src( 
  ['source/controllers/*.js']
  )
    .pipe(concat('controllers.js')) 
    .pipe(gulp.dest('./public/js'));
    console.log("Js concated");  
}); 

// Compiles html 
gulp.task('template', function(){
     gulp.src('source/templates/*.htm')  
        .pipe(gulp.dest('./public')); 
         console.log("templates moved");
});

// Sposta tutte le risorse nelle cartelle , come immagini e altro 
gulp.task('resources', function(){
     gulp.src([bowerPath +'font-awesome/fonts/*'])  
        .pipe(gulp.dest('./public/resources/fonts')); 
         console.log("resources moved");
}); 
  

// Compiles LESS > CSS 
gulp.task('less', function(){
     gulp.src(['source/less/style.less'] ) 
        .pipe(less()) 
        .pipe(gulp.dest('./public/css')); 
});  


 gulp.task('watch', function() {
   // Watch less files
  watch('source/less/style.less', function() {
  	console.log("changed...Less");
    gulp.start('less');
    });
     watch('source/templates/*.htm', function() {
  	console.log("changed...html");
    gulp.start('template');
    });
    watch('source/controllers/*.js', function() {
  	console.log("changed...js controller");
    gulp.start('angular');
    });
 }); 

//Start 
gulp.task('start', function(){
	app.get('/', function (req, res) {
	//mandiamo la home page anche senza la digitazione di index.htm
	//per il resto, vale l'alberatura di public
	res.sendFile(path.join(__dirname, '/public', 'index.htm'));  
	});
	app.use(express.static('public'));
   	app.listen(5000, function () {
  	console.log('App started, port: 5000');
}); 
 
});

 

gulp.task('default', ['scripts', 'less', 'resources','angular','template', 'watch', 'start']);