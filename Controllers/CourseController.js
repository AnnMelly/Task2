const pool = require('../db')

class CourseController{

    async allClubs(req,res){
        const user = await pool.query(`
            SELECT 
            Club.id,
            club_name,
            (SELECT name from typeofclub) as type,
            (SELECT name from users WHERE id = id_creater) as creater,
            Club.description,
            materials
            FROM Club
            left join typeofclub ON Club.type = typeofclub.id
			left join users ON Club.id_creater = users.id
`)
        res.json(user.rows)
    }

    
    async newCourse(req,res){
        const {Club_name, login, password, description, type} = req.body
        try{
        const id_type = await(await pool.query(`SELECT id FROM typeOFClub WHERE name=$1`, [type])).rows[0].id

        const teacher = await(await pool.query(`SELECT teacher FROM users WHERE login=$1 AND password=$2`, [login, password])).rows[0].teacher
        const id = await(await pool.query(`SELECT id FROM users WHERE login=$1 AND password=$2`, [login, password])).rows[0].id
        if(teacher ==true){
            try{
                const c = await pool.query(`INSERT INTO Club(Club_name, id_creater, description, type) VALUES ($1,$2, $3, $4)`, [Club_name,id, description, id_type])
                res.json(`Всё прошло успешно`)
            }
            catch(e){
                res.json(`Error, ${e}`)
            }
        }
        else{
            res.json(`Пользователь не является учителем`)
        }
        }
        catch(e)
        {
            res.json(`Ошибка, ${e} , ${typeof(id_type)}`)
        }
        
    }
    async deleteClub(req,res){
        const {Club_name, login, password} = req.body

        try{
            const id = await(await pool.query(`SELECT id FROM users WHERE login=$1 AND password=$2`, [login, password])).rows[0].id
            try{
                const c = await pool.query(`DELETE FROM Club WHERE Club_name=$1 AND id_creater =$2`, [Club_name,id])
                res.json(`Всё прошло успешно`)
            }
            catch(e){
                res.json(`Error`)
        }
        }
        catch(e)
        {
            res.json('Ошибка в поиске пользователя')
        }
        
    }







    async allType(req,res){
        const type = await pool.query(`SELECT * FROM typeOFClub`)
        res.json(type.rows)
    }
    async newTypeOfClub(req,res){
        const {name, description} = req.body

        try{
            await pool.query(`INSERT INTO typeOFClub(name, description) VALUES ($1,$2)`, [name, description])
            res.json(`all's ok`)

        }
        catch(e){
            res.json(`Ошибка ${e}`)
        }
    }
    async deletetype(req, res){
        const {name} = req.body
        try{
            await pool.query(`DELETE FROM typeOFClub WHERE name=$1`, [name])
            res.json(`All's good`)
        }
        catch(e){
            res.json(`Error ${e}`)
        }
    }

}
module.exports = new CourseController()