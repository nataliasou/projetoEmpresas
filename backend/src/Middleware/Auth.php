<?php
namespace src\Middleware;

use src\Models\Usuario;

class Auth{
    private function authorization($request){
        $headers = $request->getHeaders();

        $jwt = isset($headers['Authorization']) ? str_replace('Bearer ','', $headers['Authorization']) : '';
        $decode = (array)JWT::decode($jwt, getenv('JWT_KEY'), ['HS256']);

        $email = $decode['email'] ?? '';

        $usuarioModel = $this->model("Usuario");
        $usuario = $usuarioModel->buscarPorEmail($email);

        if (!$usuario) {
            http_response_code(403); 
            echo json_encode(["erro" => "Acesso negado!"]); 
        }
    }

}
?>