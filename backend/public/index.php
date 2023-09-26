<?php
   require_once("../vendor/autoload.php");

   // Importação do namespace
   use src\Core\Router;

   header("Content-type: application/json");
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type, Authorization');

   // Instanciando classe Router
   new Router();
?>