<?php
// Custom exception handler
set_exception_handler(function($e) {
  error_log($e->getMessage());
  exit('Something weird happened - '.$e->getMessage()); // Display a user-friendly error message
});

// Database connection
$dsn = "mysql:host=localhost;port=3306;dbname=travelagency;charset=utf8mb4";
$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // Turn off emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Turn on errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Make the default fetch be an associative array
];
$pdo = new PDO($dsn, "root", "", $options);//this is the connection

// User registration
if(isset($_POST['action']) && ($_POST['action']=="register")){
  // Check if the email already exists
 
  $stmt = $pdo->prepare("SELECT * FROM `client` WHERE `email`=?"); //we prepera a query and store it in stmt
  $stmt->execute([$_POST['email']]);//->this runs the function execute of the stmt object
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($rows){
    echo json_encode(array("Error","E-mail already exists"));
  }else{
    // Insert the user's information into the database
    $stmt = $pdo->prepare("INSERT INTO `client`(`firstname`, `lastname`, `email`, `password`, `address`, `city`, `postal_code`, `mobile_phone`) VALUES (:firstname,:lastname,:email,:password,:address,:city,:postal_code,:mobile_phone)");//prepares the insert
    if($stmt->execute([':firstname' => $_POST['firstname'], ':lastname' => $_POST['lastname'], ':email' => $_POST['email'],':password' => $_POST['password'], ':address' => $_POST['address'], ':city' => $_POST['city'], ':postal_code' => $_POST['postal-code'], ':mobile_phone' => $_POST['mobile-phone']])){
      echo json_encode(array("OK","Joined successfully"));//executes the insert
    }
  }
  $stmt = null; // Release the statement resources
}

// User login
if(isset($_POST['action']) && ($_POST['action']=="login")){
  // Check if the user exists and validate the password
  $stmt = $pdo->prepare("SELECT * FROM `client` WHERE `email`=?");
  $stmt->execute([$_POST['email']]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);//take all the sql results as assoc arrays 
  if($rows){
    if($rows[0]["password"] == $_POST['password']){
      echo json_encode(array("OK", $rows[0]["id"]));
    }else{
      echo json_encode(array("Error","Password is not correct"));
    }
  }else{
    echo json_encode(array("Error","No user with this email was found"));
  }
  $stmt = null; // Release the statement resources
}

// Retrieving travel packages
if(isset($_GET['action']) && ($_GET['action']=="getPackages")){
  // Fetch travel packages with available seats information
  $stmt = $pdo->prepare("SELECT travelpackage.packageid,`price`,`fromCity`,`toCity`,`fromDate`,`toDate`,`duration`,`photoURL`,`availableSeats`,`description`, travelpackage.availableSeats - COUNT(orders.packageid) as difference FROM travelpackage LEFT JOIN orders ON travelpackage.packageid=orders.packageid GROUP BY travelpackage.packageid HAVING COUNT(orders.packageid) < travelpackage.availableSeats;");
  $stmt->execute();
  $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($packages);
  $stmt = null; // Release the statement resources
}

// Retrieving user's purchased packages
if(isset($_GET['action']) && ($_GET['action']=="getMyPackages")){
  // Fetch travel packages purchased by a specific user
  $stmt = $pdo->prepare("SELECT travelpackage.packageid,`price`,`fromCity`,`toCity`,`fromDate`,`toDate`,`duration`,`photoURL`,`description` FROM travelpackage JOIN orders ON travelpackage.packageid=orders.packageid WHERE orders.userid = ?");
  $stmt->execute([$_GET['userid']]);
  $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($packages);
  $stmt = null; // Release the statement resources
}

// Purchasing a package
if(isset($_POST['action']) && ($_POST['action']=="purchase")){
  // Insert the order information into the database
  $packageid = $_POST["packageid"];
  $userid = $_POST["userid"];
  $stmt = $pdo->prepare("INSERT INTO `orders`(`packageid`, `userid`, `date`) VALUES (?,?,CURRENT_DATE)");
  if($stmt->execute([$packageid, $userid])){
    echo json_encode(array("OK","Order successful"));
  }else{
    echo json_encode(array("Error","Something went wrong. Order was not placed"));
  }
  $stmt = null; // Release the statement resources
}

// if(isset($_GET['action']) && ($_GET['action']=="contact")){
//   // Insert the order information into the database
//   $na = $_GET["name"];
//   $em = $_GET["email"];
//     $mess = $_GET["message"];
//   $stmt = $pdo->prepare("INSERT INTO `contact`(`name`, `email`, `message`, `date`) VALUES (?,?,?,CURRENT_DATE)");
//   if($stmt->execute([$na, $em, $mess])){
//     echo json_encode(array("OK","sent"));
//   }else{
//     echo json_encode(array("Error","Something went wrong."));
//   }
//   $stmt = null; // Release the statement resources
// }
?>