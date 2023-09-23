<?php
namespace src\Core;

class Router
{
    private $controller;
    private $method;
    private $controllerMethod;
    private $params = [];
    private $metodo;

    function __construct()
    {
        $url = $this->parseURL();

        if (file_exists("../src/Controllers/" . ucfirst($url[4]) . ".php")) {
            $this->controller = $url[4];
            $metodo = $url[4];
            unset($url[4]);
        } elseif (empty($url[4])) {
            echo "Bem-vindx a API";
            exit;
        } else {
            http_response_code(404);
            echo json_encode(["erro" => "Recurso nao encontrado"]);
            exit;
        }

        require_once "../src/Controllers/" . ucfirst($this->controller) . ".php";

        $this->controller = new $this->controller;

        $this->method = $_SERVER["REQUEST_METHOD"];

        switch ($this->method) {
            case "GET":
                if (isset($url[5])) {
                    if (isset($url[6]) && $url[6] === "foto") {
                        $this->controllerMethod = "findPhoto";
                        $this->params = [$url[5]];
                    } else {
                        $this->controllerMethod = "find";
                        $this->params = [$url[5]];
                    }
                } else {
                    $this->controllerMethod = "index";
                }

                break;

            case "POST":
                if ($metodo === "auth" && !isset($url[5])) {
                    $this->controllerMethod = "generateToken";
                } else if (isset($url[5]) && $url[5] === "usuario") {
                    $this->controllerMethod = "store";
                } else {
                    $this->controllerMethod = "store";
                }
                break;

            case "PUT":
                $this->controllerMethod = "update";
                if (isset($url[5]) && is_numeric($url[5])) {
                    $this->params = [$url[5]];
                } else {
                    http_response_code(400);
                    echo json_encode(["erro" => "É necessário informar um id"]);
                    exit;
                }

                break;
            case "DELETE":
                $this->controllerMethod = "delete";
                if (isset($url[5]) && is_numeric($url[5])) {
                    $this->params = [$url[5]];
                } else {
                    http_response_code(400);
                    echo json_encode(["erro" => "É necessário informar um id"]);
                    exit;
                }
                break;

            default:
                echo "Método não suportado";
                exit;

        }

        call_user_func_array([$this->controller, $this->controllerMethod], $this->params);
    }

    private function parseURL()
    {
        return explode("/", $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"]);
    }
}
?>