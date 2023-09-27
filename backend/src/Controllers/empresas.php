<?php
use src\Core\Controller;
use Firebase\JWT\JWT;

class Empresas extends Controller
{
    public function index()
    {
        if ($this->authorization()) {
            $empresaModel = $this->model("Empresa");
            $empresasCadastradas = $empresaModel->buscarTodos();

            foreach ($empresasCadastradas as $empresa) {
                $data = [
                    'empresas_id' => $empresa->empresas_id,
                    'nome' => $empresa->nome,
                    'cnpj' => $empresa->cnpj,
                    'endereco' => $empresa->endereco,
                    'telefone' => $empresa->telefone,
                    'email' => $empresa->email,
                    'site' => $empresa->site,
                    'proprietario' => $empresa->proprietario,
                    'data_registro' => $empresa->data_registro,
                ];
                $empresas[] = $data;
            }

            $response = [
                'data' => $empresas
            ];

            echo json_encode($response, JSON_UNESCAPED_UNICODE);
        }
    }

    public function find()
    {
        if ($this->authorization()) {
            $urlParts = explode("/", $_SERVER["REQUEST_URI"]);
            $empresaId = isset($urlParts[3]) ? $urlParts[5] : null;

            if (!is_numeric($empresaId)) {
                http_response_code(400);
                echo json_encode(["erro" => "ID da empresa inválido"]);
                exit;
            }

            $empresaModel = $this->model("Empresa");
            $empresa = $empresaModel->buscarPorId($empresaId);

            if ($empresa) {
                $data = [
                    'empresas_id' => $empresa->empresas_id,
                    'nome' => $empresa->nome,
                    'cnpj' => $empresa->cnpj,
                    'endereco' => $empresa->endereco,
                    'telefone' => $empresa->telefone,
                    'email' => $empresa->email,
                    'site' => $empresa->site,
                    'proprietario' => $empresa->proprietario,
                    'data_registro' => $empresa->data_registro,
                ];
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(["erro" => "Empresa não encontrada"]);
            }
        }
    }

    public function findPhoto()
    {
        if ($this->authorization()) {
            $urlParts = explode("/", $_SERVER["REQUEST_URI"]);
            $empresaId = isset($urlParts[3]) ? $urlParts[5] : null;

            if (!is_numeric($empresaId)) {
                http_response_code(400);
                echo json_encode(["erro" => "ID da empresa inválido"]);
                exit;
            }

            $empresaModel = $this->model("Empresa");
            $foto = $empresaModel->buscarFotoPorId($empresaId);

            if ($foto) {
                header('Content-Type: image/jpeg');
                echo $foto;
            } else {
                http_response_code(404);
                echo json_encode(["erro" => "Foto da empresa não encontrada"]);
            }
        }
    }

    public function store()
    {
        if ($this->authorization()) {
            $empresaModel = $this->model("Empresa");

            $nome = $_POST['nome'];
            $cnpj = $_POST['cnpj'];
            $endereco = $_POST['endereco'];
            $telefone = $_POST['telefone'];
            $email = $_POST['email'];
            $site = $_POST['site'];
            $proprietario = $_POST['proprietario'];


            if (isset($_FILES['foto'])) {
                $fotoTmpPath = $_FILES['foto']['tmp_name'];
                if (is_uploaded_file($fotoTmpPath)) {
                    $fotoData = file_get_contents($fotoTmpPath);
                    $empresaModel->foto = $fotoData;
                }
            }

            $empresaModel->nome = $nome;
            $empresaModel->cnpj = $cnpj;
            $empresaModel->endereco = $endereco;
            $empresaModel->telefone = $telefone;
            $empresaModel->email = $email;
            $empresaModel->site = $site;
            $empresaModel->proprietario = $proprietario;
            $empresaModel = $empresaModel->inserir();

            if ($empresaModel) {
                http_response_code(201);
                echo json_encode(["Sucesso" => "Empresa foi cadastrada com sucesso!"]);
            }
        }
    }


    public function update()
    {
        if ($this->authorization()) {
            $empresa = $this->getRequestBody();

            $urlParts = explode("/", $_SERVER["REQUEST_URI"]);
            $empresaId = isset($urlParts[3]) ? $urlParts[5] : null;

            if (!is_numeric($empresaId)) {
                http_response_code(400);
                echo json_encode(["erro" => "O ID da empresa inválido"]);
                exit;
            } else {
                $empresaModel = $this->model("Empresa");
                $empresaModel->empresas_id = $empresaId;

                if (isset($empresa->nome)) {
                    $empresaModel->nome = $empresa->nome;
                }
                if (isset($empresa->cnpj)) {
                    $empresaModel->cnpj = $empresa->cnpj;
                }
                if (isset($empresa->endereco)) {
                    $empresaModel->endereco = $empresa->endereco;
                }
                if (isset($empresa->telefone)) {
                    $empresaModel->telefone = $empresa->telefone;
                }
                if (isset($empresa->email)) {
                    $empresaModel->email = $empresa->email;
                }
                if (isset($empresa->site)) {
                    $empresaModel->site = $empresa->site;
                }
                if (isset($empresa->proprietario)) {
                    $empresaModel->proprietario = $empresa->proprietario;
                }

                if ($empresaModel->atualizar()) {
                    http_response_code(200);
                    echo json_encode(["Sucesso" => "Empresa foi atualizada com sucesso!"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["erro" => "Não foi possível atualizar a empresa"]);
                }
            }
        }
    }

    public function delete()
    {
        if ($this->authorization()) {
            $urlParts = explode("/", $_SERVER["REQUEST_URI"]);
            $empresaId = isset($urlParts[3]) ? $urlParts[5] : null;

            if (!is_numeric($empresaId)) {
                http_response_code(400);
                echo json_encode(["erro" => "O ID da empresa inválido"]);
                exit;
            } else {
                $empresaModel = $this->model("Empresa");
                $empresaModel->empresas_id = $empresaId;

                if ($empresaModel->deletar()) {
                    http_response_code(200);
                    echo json_encode(["Sucesso" => "Empresa foi deletada com sucesso"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["erro" => "Não foi possível excluir a empresa"]);
                }
            }
       }
    }

    private function authorization()
    {
        $headers = getallheaders();
        $jwt = 'MinhaChave123';
        $jwt_header = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
        $algorithm = 'HS256';

        if (empty($jwt_header)) {
            http_response_code(401);
            echo json_encode(["erro" => "Insira um token"]);
            exit;
        }

        $tokenParts = explode('.', $jwt_header);
        if (count($tokenParts) !== 3) {
            http_response_code(401);
            echo json_encode(["erro" => "Token JWT mal formatado"]);
            exit;
        }

        $decoded = JWT::jsonDecode(JWT::urlsafeB64Decode($tokenParts[1]));

        $email = $decoded->email ?? '';

        $usuarioModel = $this->model("Usuario");
        $usuario = $usuarioModel->buscarPorEmail($email);

        if (!$usuario) {
            http_response_code(403);
            echo json_encode(["erro" => "Acesso negado!"]);
        } else {
            return true;
        }
    }

}
?>