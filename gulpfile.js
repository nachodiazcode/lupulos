const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
   


gulp.task('sass', async ()=>{
   await gulp.src('./public/styles/sass/styles.sass')
        .pipe(sass({
            sourceComments: true,
            outputStyle: 'expanded',
           
        }).on('error', sass.logError))     
       
        .pipe(autoprefixer({
            versions: ['last 3 browsers']
        })
        .pipe(gulp.dest('./public/styles/css/')))


})

gulp.task('watch',  async () =>{
  await  gulp.watch('./public/styles/sass/styles.sass', ['sass']);
});
  

gulp.task('default', function () {


    gulp.watch('./public/styles/sass/styles.sass')
    .on('change', gulp.series('sass'));
   });