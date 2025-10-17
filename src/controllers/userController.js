const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });

    if(!user){
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar perfil do usuário",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const updateData = {};

    if(nome){
      updateData.nome = nome;
    }

    if(email){
      const emailExists = await prisma.user.findFirst({
        where: {
          email: email,
          NOT: {
            id: req.userId,
          },
        },
      });

      if(emailExists){
        return res.status(400).json({
          success: false,
          message: "Este email já está em uso",
        });
      }

      updateData.email = email;
    }

    if(senha){
      if (senha.length < 6) {
        return res.status(400).json({
          success: false,
          message: "A senha deve ter no mínimo 6 caracteres",
        });
      }
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    if(Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo para atualizar foi fornecido",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar perfil do usuário",
    });
  }
};

module.exports = { getProfile, updateProfile };