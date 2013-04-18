﻿<?php
// Continue Session
session_start();
session_regenerate_id(TRUE);

if(!isset($_SESSION['practiceId']))
	header('location: index.php');

// Create array of session variables to pass to Durandal
$vars = array(
	'practiceId' => $_SESSION['practiceId'],
	'userId'	 => $_SESSION['userId']
);

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Durandal</title>

        <link rel="apple-touch-startup-image" href="Content/images/ios-startup-image-landscape.png" media="(orientation:landscape)" />
        <link rel="apple-touch-startup-image" href="Content/images/ios-startup-image-portrait.png" media="(orientation:portrait)" />
        <link rel="apple-touch-icon" href="Content/images/icon.png"/>
        
        <!--Durandal does not require Bootstrap. It's used to make the samples look nice.-->
        <link rel="stylesheet" href="css/flick/jquery-ui-1.10.1.custom.min.css" type="text/css"/>
        <link rel="stylesheet" href="Content/bootstrap.min.css" type="text/css"/>
        <link rel="stylesheet" href="Content/bootstrap-responsive.min.css" type="text/css"/>
        <link rel="stylesheet" href="Content/durandal.css" type="text/css"/>
        <link rel="stylesheet" href="css/shell.css" type="text/css" />
        <link rel="stylesheet" href="css/patient.css" type="text/css" />
        <link rel="stylesheet" href="Content/bootstrap-timepicker.min.css" /> 
        <link rel="stylesheet" href="Content/bootstrap-fileupload.css" /> 
         <link rel="stylesheet" href="Content/fineuploader-3.4.1.css" /> 
		 
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no"/>
      
        <meta name="viewport" content="width=device-width" />
    </head>          
    <body>            
        <div id="applicationHost"></div>
        <!-- Pass PHP Variables to Durandal -->
        <script type="text/javascript">var global = <?php echo json_encode($vars) ?>;</script>
        <script type="text/javascript" src="Scripts/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="Scripts/bootstrap.js"></script>
        <script type="text/javascript" src="Scripts/jquery-ui.js"></script>
        <script type="text/javascript" src="Scripts/underscore.js"></script>
        <script type="text/javascript" src="Scripts/knockout-2.2.1.js"></script>
        <script type="text/javascript" src="Scripts/validation.js"></script>
        <script type="text/javascript" src="Scripts/bootstrap-timepicker.min.js"></script>
        <script type="text/javascript" src="Scripts/bootstrap-typeahead.js"></script>
        <script type="text/javascript" src="Scripts/bootstrap-fileupload.js"></script>
        <script type="text/javascript" src="Scripts/iframe.xss.response-3.4.1.js"></script>
		 <script type="text/javascript" src="Scripts/jquery.fineuploader-3.4.1.min.js"></script>
        <!--Durandal's core does not require SammyJS. The router plugin uses it.-->
        <script type="text/javascript" src="Scripts/sammy-0.7.4.js"></script>

        <script type="text/javascript" src="App/durandal/amd/require.js" data-main="App/main"></script>
    </body>
</html>