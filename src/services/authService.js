const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const registerUser = async (userData) => {
  try{
    const { nome, email, senha } = userData;

    if (!nome || !email || !senha) {
        throw new Error('Todos os campos são obrigatórios');
    }

    if (senha.length < 6) {
        throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    const emailExists = await prisma.user.findUnique({
        where: { email }
    });
    if (emailExists) {
        throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
        data: {
            nome,
            email,
            senha: hashedPassword
        },
    });

    const {senha: _, ...safeUser} = user;
    console.log('Usuário registrado com sucessso', safeUser);
    return safeUser;
} catch(error){
    console.error('Erro ao registrar usuário:', error);
    throw new Error('Erro ao registrar usuário');
}
}
module.exports = { registerUser }