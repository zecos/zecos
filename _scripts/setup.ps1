 $libs = @("field", "input", "input-basic", "input-mui", "input-picker", "validate");

cd $libs[0]

foreach ($lib in $libs) {
   cd "../$lib";
   echo "yarn installing $lib"
   yarn;
}
cd ..


$link_libs = @("input", "input-basic", "input-mui", "input-picker", "validate")
 
cd $link_libs[0]
foreach ($lib in $link_libs) {
   cd "../$lib";
   yarn link;
}
cd ../app
foreach ($lib in $link_libs) {
   cd "../$lib";
   yarn link "@zecos/$lib";
}
cd ..