<?php
use src\Core\Controller;
use Firebase\JWT\JWT;


class Auth extends Controller
{
    private $jwt = 'MinhaChave123';
    public function generateToken()
    {
        $login = $this->getRequestBody();

        if (!isset($login->email) or !isset($login->senha)) {
            http_response_code(400);
            echo json_encode(["erro" => "É preciso de um email ou senha."]);
            exit;
        }
        $usuarioModel = $this->model("Usuario");
        $usuario = $usuarioModel->buscarPorEmail($login->email);

        if ($usuario) {
            if ($usuario->senha === $login->senha) {
                $payload = [
                    'email' => $usuario->email
                ];

                $result = [
                    'accessToken' => JWT::encode($payload, $this->jwt, 'HS256')
                ];

                echo json_encode($result);

            } else {
                http_response_code(400);
                echo json_encode(["erro" => "Senha inválida!"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["erro" => "Usuário não encontrado"]);
        }
    }
    public function store()
    {
        $usuario = $this->getRequestBody();
        $usuarioModel = $this->model("Usuario");

        $usuarioModel->nome = $usuario->nome;
        $usuarioModel->email = $usuario->email;
        $usuarioModel->senha = $usuario->senha;
 
        $usuarioModel = $usuarioModel->inserir();

        if ($usuarioModel) {
            http_response_code(201);
            echo json_encode(["Sucesso" => "usuario foi cadastrado com sucesso!"]);
        }
    }

}