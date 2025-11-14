const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 * - name: Auth
 * description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 * post:
 * summary: Register a new user
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nome
 * - email
 * - senha
 * properties:
 * nome:
 * type: string
 * example: "Usuario Teste"
 * email:
 * type: string
 * format: email
 * example: "usuario@dsm.com"
 * senha:
 * type: string
 * minLength: 6
 * example: "123456"
 * responses:
 * '201':
 * description: User registered successfully
 * '400':
 * description: Validation error
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Realiza o login do usuário e retorna um token JWT
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - senha
 * properties:
 * email:
 * type: string
 * format: email
 * description: Email do usuário
 * senha:
 * type: string
 * format: password
 * description: Senha do usuário
 * responses:
 * '200':
 * description: Login bem-sucedido, retorna o token
 * '401':
 * description: Credenciais inválidas
 */
router.post("/login", authController.login);

module.exports = router;
