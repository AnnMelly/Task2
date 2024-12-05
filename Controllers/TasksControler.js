const pool = require('../db')

class TasksControler{

    async addTask(req,res){
        try{
        const {name_Course, log_user, material, date, done} = req.body
            const u = await pool.query(`INSERT INTO TASKS(name_Course,log_user, material, date, done) VALUES($1,$2,$3,$4,$5)`,[name_Course, log_user, material, date, done])
            res.json(`Всё прошло успешно`)
        }
        catch(e){
            res.json('Ошибка')
        }
    }
    
    async seeTask(req,res){
        const {name_Course, log_user, date} = req.body
        try{
        const user = await pool.query(`SELECT * FROM TASKS WHERE name_Course=$1 AND log_user=$2 AND date=$3`, [name_Course, log_user, date])
        res.json(user.rows)
        }
        catch(e){
            console.log('HEY', e)
            res.json('Ошибка')
        }
    
}

async createClasses(req,res){
    const{date,Clas, name_Course} = req.body
    try{
    const i = await pool.query(`INSERT INTO Timetable (date, Clas, name_Course) VALUES ($1,$2,$3)`, [date,Clas,name_Course])
    res.json(`Всё прошло успешно`)
    }
    catch(e){
        res.json(`Ошибка`)
        console.log(e)
    }
}

}

module.exports = new TasksControler()