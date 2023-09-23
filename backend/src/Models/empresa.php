<?php

use src\Core\Model;

class Empresa {
    public $empresas_id;
    public $nome;
    public $cnpj;
    public $endereco;
    public $telefone;
    public $email;
    public $site;
    public $proprietario;
    public $data_registro;
    public $foto;


    public function inserir(){
        // Verifico antes de inserir se já existe essa empresa cadastrada pelo CNPJ

        $sql = "SELECT COUNT(*) FROM empresas WHERE cnpj = ?";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->cnpj);
        $stmt->execute();
        $cnpj = $stmt->fetchColumn();
    
        if ($cnpj > 0) {
            http_response_code(400);
            echo json_encode(["erro" => "Empresa já cadastrada"]);
            return null;
        }
    
        $sql = "INSERT INTO empresas(nome, cnpj, endereco, telefone, email, site, proprietario, foto) VALUES (?,?,?,?,?,?,?,?)";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->nome);
        $stmt->bindValue(2, $this->cnpj);
        $stmt->bindValue(3, $this->endereco);
        $stmt->bindValue(4, $this->telefone);
        $stmt->bindValue(5, $this->email);
        $stmt->bindValue(6, $this->site);
        $stmt->bindValue(7, $this->proprietario);
        $stmt->bindValue(8, $this->foto, PDO::PARAM_LOB);

        if($stmt->execute()){
            $this->empresas_id = Model::getConn()->lastInsertId();

            $this->data_registro = date('Y-m-d H:i:s'); 
            
            return $this;
        }else{
            print_r($stmt->errorInfo());
            http_response_code(500);
            echo json_encode(["erro" => "Nao foi possível inserir a nova empresa"]);
            return null;
        }
    }


    public function buscarPorId($empresas_id){
        $sql = "SELECT * FROM EMPRESAS WHERE EMPRESAS_ID = ?";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $empresas_id);

        if($stmt->execute()){
            $result = $stmt->fetch(PDO::FETCH_OBJ);
            if($result){
                $this->empresas_id = $result->empresas_id;
                $this->nome = $result->nome;
                $this->cnpj = $result->cnpj;
                $this->endereco = $result->endereco;
                $this->telefone = $result->telefone;
                $this->email = $result->email;
                $this->site = $result->site;
                $this->proprietario = $result->proprietario;
                $this->data_registro = $result->data_registro;
                $this->foto = $result->foto;

                return $this;
            } else {
                return null;
            }
        }else{
            print_r($stmt->errorInfo());
            return null;
        }
    }

    public function buscarFotoPorId($id){
        $sql = "SELECT * FROM empresas WHERE empresas_id = ?";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();
        
        if($stmt->rowCount() > 0){
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            header('Content-Type: image/jpeg');
            return $result['foto'];
        }
    }

    public function buscarTodos(){
        $sql = "SELECT * FROM EMPRESAS";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->execute();

        if($stmt->rowCount() > 0){
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            return $result;
        }else{
            return [];
        }
    }

    public function atualizar(){
        $sql = "UPDATE EMPRESAS SET ";
        $params = [];
        
        if (!empty($this->nome)) {
            $sql .= "nome = ?, ";
            $params[] = $this->nome;
        }
        if (!empty($this->cnpj)) {
            $sql .= "cnpj = ?, ";
            $params[] = $this->cnpj;
        }
        if (!empty($this->endereco)) {
            $sql .= "endereco = ?, ";
            $params[] = $this->endereco;
        }
        if (!empty($this->telefone)) {
            $sql .= "telefone = ?, ";
            $params[] = $this->telefone;
        }
        if (!empty($this->email)) {
            $sql .= "email = ?, ";
            $params[] = $this->email;
        }
        if (!empty($this->site)) {
            $sql .= "site = ?, ";
            $params[] = $this->site;
        }
        if (!empty($this->proprietario)) {
            $sql .= "proprietario = ?, ";
            $params[] = $this->proprietario;
        }
        if (!empty($this->foto)) {
            $sql .= "foto = ?, ";
            $params[] = $this->foto;
        }
        
        $sql = rtrim($sql, ', ');
        
        $sql .= " WHERE empresas_id = ?";
        $params[] = $this->empresas_id;
        
        $stmt = Model::getConn()->prepare($sql);
        
        for ($i = 0; $i < count($params); $i++) {
            $stmt->bindValue($i + 1, $params[$i]);
        }
        
        return $stmt->execute();
    }

    public function deletar(){
        $sql = "DELETE FROM empresas WHERE empresas_id = ?";
    
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->empresas_id);
    
        return $stmt->execute();
    }
}
?>