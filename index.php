<?php
// MySQL connection
require('php/connect_to_mysql.php');
// Hashing framework
require('php/PasswordHash.php');

$check = true;
if(isset($_POST['username'])) {
	// New hash
	$hasher = new PasswordHash(8, false);
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	//$hash = $hasher->HashPassword($password);
	// Get user information from database
	try {
		$stmt = $db->query("SELECT * FROM user WHERE username='$username' LIMIT 1");
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$result = $stmt->fetchAll();
	}
	catch (PDOException $e) {
		echo $e->getMessage();
	}	
		
	/*
	if(strlen($hash) >= 20) {
	}
	else
	{
		echo "There was a problem with the encryption. Please contact your administrator for assistance.";
		exit;
	}
	*/
	if(count($result) > 0) {
		$result = $result[0]; // Only 1 element in array
		$check = $hasher->CheckPassword($password, $result['password']);
	}
	else {
		$check = false;
	}
	
	if($check) {
		echo 'Logged in';
	}
	else {
		//echo 'passwords do NOT match';
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Single Page Application Playground</title>
	<!-- CSS -->
	<link type="text/css" rel="stylesheet" href="Content/bootstrap.css" />
	<link type="text/css" rel="stylesheet" href="Content/bootstrap-responsive.css" />
	<link type="text/css" rel="stylesheet" href="css/login.css" />
	<!-- Javascript -->
	<script type="text/javascript" src="Scripts/jquery-1.9.1.js"></script> 
	<script type="text/javascript" src="Scripts/bootstrap.min.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="banner">
				<img src="Content/images/logo.png" />
			</div>
		</div>
		<div class="row-fluid">
			<form class="form-horizontal loginForm" action="" method="post">
				<div class="control-group">
					<label class="control-label" for-"user">User</label>
					<div class="controls">
						<input type="text" id="username" name="username" placeholder="Username" />
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for-"password">Password</label>
					<div class="controls">
						<input type="text" id="password" name="password" placeholder="Password" />
					</div>
				</div>
				<?php if(!$check): ?>
					<div class="loginValidation">Username and password combination is incorrect.</div>
				<?php endif; ?>
				<div class="control-group">
					<div class="controls">
						<button type="submit" class="btn btn-lightgreen">Login</button>
					</div>
				</div>
			</form>
		</div>
		<div class="loginSeparator"></div>
		<div class="row-fluid">
			<div class="formFooter"><a href="#" class="retrievePass">Forgot Password?</a></div>
		</div>
	</div>
</body>
</html>