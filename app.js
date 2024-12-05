const express = require('express')
const createTables = require('./db/setup')
const pool = require('./db/index')

const userRouter = require('./Routes/Router')

const users = [
    { name: 'Ива', email: 'ivan.ivanov@example.com', age:12, address:'gfghhj'},
    { name: 'Анна Петрова', email: 'anna.petrova@example.com', age:12, address:'gfghhj' },
  ];

const app = express()

app.use(express.static('public'), express.json(), express.urlencoded({ extended: true }));

/*Варипнт3 пр2*/
app.use('/api', userRouter)

const PORT = 5001
async function initializeApp() {
    try{
        await createTables(pool)
        
        
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

    }
    catch(e){
        console.log('Ошибка')
    }
}

initializeApp()


{
/*ЗАДАЧА 1*/
app.get('/greet/:name', (req,res) => {

    res.send(`Hello, ${req.params.name}`)
})


/*ЗАДАЧА 2*/
app.get('/user', (req,res) =>{    
      res.json(users);

})

/*Вариант 1*/
app.post('/users/add/', (req,res)=>{
    const { name, email } = req.body;
    users.push({name: name, email: email})
    res.json(users)
})


/*Вариант 2*/
app.post('/users/add2', (req,res)=>{
    const {name, age, email, address} = req.body
    users.push({name: name, age: age, address: address, email: email })
    res.json(users)
})

}