<?php

namespace src\Core;

class Model{

    private static $conexao;

    public static function getConn(){
        if(!isset(self::$conexao)){
            self::$conexao = new \PDO("pgsql:host=localhost;port=5432;dbname=projetoEmpresas;", "postgres", "postgres");
        }
    
        return self::$conexao;
    }
}
?>