<h1 align="center">Projeto de gerenciamento de empresas</h1> 

<p align="center">Projeto desenvolvido para que tenha uma API feita em PHP para modificar a tabela empresas</p>
<h4 align="center"> 
	🚧  Em construção  🚧
</h4>

### Features Backend

- [x] Cadastro de usuário
- [x] Login de usuário com autenticação JWT
- [x] Cadastro de uma nova empresa
- [x] Atualização de cadastro da empresa
- [x] Deletar cadastro de uma empresa
- [x] Retornar dados de uma empresa específica
- [x] Retornar todas as empresas cadastradas


### Pré-requisitos

Para começar, você precisa ter instalado ou instalar na sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Xampp](https://www.apachefriends.org/pt_br/index.html), [Composer](https://getcomposer.org/download/),
[Postgresql](https://www.postgresql.org/download/). E um bom editor, utilizei o [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o Backend (servidor)

```bash
# Primeiro crie as tabelas que serão utilizadas pela API, os Scripts estão na pasta Script.
# O nome do banco é projetoEmpresas, caso queira alterar o nome ou a formar de logar no postgres
# é só configurar no arquivo src -> core -> Model.php
# Clone este repositório na pasta HTDOCS do XAMPP
$ git clone <https://github.com/nataliasou/projetoEmpresas.git>

# Pelo terminal (pode ser o do vscode), acesse a projetoEmpresas/backend e coloque os próximos comandos:
$ composer init
$ composer require firebase/php-jwt

# Pronto a API estará funcionando, basta acessar as rotas pelo navegador ou postman, por exemplo:
$ http://localhost/projetoEmpresas/backend/public/
```

A documentação da API está disponibilizada, assim como a collection para ser testada no postman, você vai encontrar isso na pasta APIDoc.


### Features Frontend

- [x] Login
- [ ] Cadastro de novo usuário
- [x] Cadastro de uma nova empresa
- [x] Atualização de cadastro da empresa
- [x] Deletar cadastro de uma empresa
- [x] Retornar dados de uma empresa específica
- [x] Retornar todas as empresas cadastradas
- [ ] Autenticação a cada rota pelo frontend


### Pré-requisitos

Para começar, com o backend já funcionando, você precisa ter instalado também na sua máquina as seguintes ferramentas:
[npm](https://www.npmjs.com/package/npx), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable), [node](https://nodejs.org/en),
[npx](https://www.npmjs.com/package/npx). 

### 🎲 Rodando o Frontend 

```bash
# Pode ser necessário instalar
$ yarn add react-router-dom@6
$ yarn add @mui/material @emotion/react @emotion/styled
$ yarn add @mui/icons-material
$ yarn add axios
$ yarn add @unform/web @unform/core
$ yarn add yup
$ yarn add js-cookie
$ yarn install

# Pronto o Frontend estará funcionando normalmente
$ yarn start
```

No backend foi comentado a parte de autorização pois o login do frontend não está completo.



### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [npm](https://www.npmjs.com/package/npx)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [node](https://nodejs.org/en)
- [npx](https://www.npmjs.com/package/npx)
- [MUI](https://mui.com/material-ui/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [PHP](https://www.php.net/)
- [Git](https://git-scm.com)
- [Composer](https://getcomposer.org/download/)
- [Postgresql](https://www.postgresql.org/download/)
- [VSCode](https://code.visualstudio.com/)


