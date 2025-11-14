const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const registerUser = async (userData) => {
  try {
    const { nome, email, senha } = userData;

    if (!nome || !email || !senha) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (senha.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres");
    }

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });

    const { senha: _, ...safeUser } = user;
    console.log("Usuário registrado com sucessso", safeUser);
    return safeUser;
  } catch (error) {
    throw new Error(error.message || "Erro ao registrar usuário");
  }
};

const loginUser = async (loginData) => {
  try {
    const { email, senha } = loginData;

    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  } catch (error) {
    throw new Error(error.message || "Erro ao fazer login");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
