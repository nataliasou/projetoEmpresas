<?php

namespace src\Core;

class Controller{

    public function model($model){
        require_once "../src/Models/".$model.".php";
        return new $model;
    }

    protected function getRequestBody(){
        $json = file_get_contents("php://input");
        $obj = json_decode($json);

        return $obj;
    }
}
?>