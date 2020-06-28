## @zecos/input - Overview

`@zecos/input` is the library for creating input UI libraries. I've you're just looking to use an out-of-the-box input UI library, checkout out [@zecos/input-mui](/ui-libraries/input-mui) for a [@material-ui](https://material-ui.com) library or [@zecos/input-basic](/ui-libraries/input-basic) for a basic UI library (very small).

However, if you're looking to create your own library, you've come to the right place!

`@zecos/input` consists of 3 main functions:

* [`createInput`](/input/create-input)
  * creates inputs of any type
  * can be radios, select fields, sliders, etc.
* [`createLayout`](/input/create-layout)
  * creates custom layout to display given inputs
  * can display other layouts
  * automatically parses and consolidates state of inputs
  * run error checking on entire group of inputs and display group errors
* [`createMulti`](/input/create-multi)
  * create an array of inputs or layouts
  * can add or delete sets of inputs/layouts
  
  These 3 functions should give you all the tools you need to create your own input UI library (or just general UI library).