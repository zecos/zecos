 $libs = @("field", "input", "input-basic", "input-mui", "input-picker", "validate");

 cd $libs[0]

 foreach ($lib in $libs) {
   cd "../$lib";
   echo "publishing $lib"
   npm version patch; npm publish;
 }