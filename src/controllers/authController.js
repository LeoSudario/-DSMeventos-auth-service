const authService = require('../services/authService');

const register = async(req, res) => {
    try{
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: user
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {register}
