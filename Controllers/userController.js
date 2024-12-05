const pool = require('../db')

class UserController{
    async allUsers(req,res){
        const user = await pool.query(`SELECT * FROM users`)
        res.json(user.rows)
    }

    async createNewStudent(req,res){
        const {login, name, password} = req.body
        try{
        const user = await pool.query(`INSERT INTO users(login, name, password, teacher, admin) VALUES($1,$2, $3, $4,$5)`,[login, name, password, 0,0])
        res.json(`Всё прошло успешно`)
        }
        catch(e)
        {
            res.json('Ошибка в написании запроса или пользователь уже есть')
        }
    }

    async createNewWorker(req,res){
        const {login, name, password, admin, teacher} = req.body
        try{
        const user = await pool.query(`INSERT INTO users(login, name, password, teacher, admin) VALUES($1,$2, $3, $4,$5)`,[login, name, password, teacher,admin])
        res.json(`Всё прошло успешно`)
        }
        catch(e)
        {
            res.json('Ошибка в написании запроса или пользователь уже есть')
        }
    }

    async deleteUser(req,res){
        const {login, name} = req.body
        try{
        const user = await pool.query(`DELETE FROM users WHERE login =$1 and name = $2`, [login, name])
        res.json(`Всё прошло успешно`)
        }
        catch(e)
        {
            res.json('Ошибка в написании запроса')
        }
    }
}

module.exports = new UserController()

