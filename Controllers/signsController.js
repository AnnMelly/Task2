const { query } = require('express')
const pool = require('../db')

class singsControler{
    
    async alljoins(req,res){
        const user = await pool.query(`
            SELECT
            signs.id,
            (SELECT name FROM users WHERE id = id_student) as student,
            (SELECT club_name FROM club WHERE id = id_club) as club
            FROM signs
            left join users ON id_student = users.id
            left join club ON id_club = club.id
`)
        res.json(user.rows)
    }

    async createSign(req,res){
        try{
            const {Club_name, login, password} = req.body
            try{
            const id = await(await pool.query(`SELECT id FROM users WHERE login=$1 AND password=$2`, [login, password])).rows[0].id

            const idClub = await(await pool.query(`SELECT id FROM club WHERE Club_name=$1`, [Club_name])).rows[0].id
            if(isNaN(idClub) == false){
            const s = await pool.query(`INSERT INTO signs(id_student, id_club) VALUES($1,$2)`, [id,idClub])
            res.json(`Всё прошло успешно`)
            }
            else{
                res.json('Клуб не найден')
            }
        }
        catch(e)
        {
            res.json(`Ошибка, ${e}`)
        }

    }
    catch(e)
    {res.json(`Ошибка`)}
    }

    async deleteSfromClub(req,res){
        const{login, password, Club_name} = req.body
        try{
            const id = await(await pool.query(`SELECT id FROM users WHERE login=$1 AND password=$2`, [login, password])).rows[0].id
            console.log(id)
            const idClub = await(await pool.query(`SELECT id FROM club WHERE Club_name=$1`, [Club_name])).rows[0].id
            console.log(idClub)
            if(isNaN(idClub) == false){
                const s = await pool.query(`DELETE FROM signs WHERE id_student=$1 AND id_club =$2`, [id, idClub])
                res.json(`Всё прошло успешно`)
                }
                else{
                    res.json('Клуб не найден')
                }
        }
        catch(e)
        {
            res.json(`Нет такого кружка или пользователя`)
        }
    }
}
module.exports = new singsControler()