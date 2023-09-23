<?php

use src\Core\Model;

class Usuario {
    public $usuario_id;
    public $nome;
    public $email;
    public $senha;


    public function inserir(){
        $sql = "INSERT INTO usuario(nome, email, senha) VALUES (?,?,?)";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->nome);
        $stmt->bindValue(2, $this->email);
        $stmt->bindValue(3, $this->senha);

        if($stmt->execute()){
            $this->usuario_id = Model::getConn()->lastInsertId();    
            return $this;
        }else{
            print_r($stmt->errorInfo());
            http_response_code(500);
            echo json_encode(["erro" => "Nao foi possível inserir um novo usuario"]);
            return null;
        }
    }


    public function buscarPorEmail($email){
        $sql = "SELECT * FROM USUARIO WHERE email = ?";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $email);

        if($stmt->execute()){
            $result = $stmt->fetch(PDO::FETCH_OBJ);
            if($result){
                $this->usuario_id = $result->usuario_id;
                $this->nome = $result->nome;
                $this->email = $result->email;
                $this->senha = $result->senha;
                return $this;
            } else {
                return null;
            }
        }else{
            print_r($stmt->errorInfo());
            return null;
        }
    }


    public function atualizar(){
        $sql = "UPDATE USUARIO SET ";
        $params = [];
        
        if (!empty($this->nome)) {
            $sql .= "nome = ?, ";
            $params[] = $this->nome;
        }
        if (!empty($this->email)) {
            $sql .= "email = ?, ";
            $params[] = $this->email;
        }
        if (!empty($this->senha)) {
            $sql .= "senha = ?, ";
            $params[] = $this->senha;
        }
        
        $sql = rtrim($sql, ', ');
        
        $sql .= " WHERE usuario_id = ?";
        $params[] = $this->usuario_id;
        
        $stmt = Model::getConn()->prepare($sql);
        
        for ($i = 0; $i < count($params); $i++) {
            $stmt->bindValue($i + 1, $params[$i]);
        }
        
        return $stmt->execute();
    }

    public function deletar(){
        $sql = "DELETE FROM usuario WHERE usuario_id = ?";
    
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->usuario_id);
    
        return $stmt->execute();
    }
}
?>