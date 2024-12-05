const pool = require('./index')
async function createTables(pool) {
    try{
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    teacher BOOLEAN NOT NULL,
    admin BOOLEAN NOT NULL
    )
`;
    const createCourseTable = `
    CREATE TABLE IF NOT EXISTS Club(
    id SERIAL PRIMARY KEY,
    Club_name VARCHAR(50) NOT NULL UNIQUE,
    type int REFERENCES typeOFClub(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    id_creater int REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    description VARCHAR(50) NOT NULL,
    materials VARCHAR(50)
	)
    `;
    const createSingTable = `
    CREATE TABLE IF NOT EXISTS signs(
    id SERIAL PRIMARY KEY,
    id_student int REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_Club int REFERENCES club(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL
    )
`;   
    const createCATALOGTable = `
    CREATE TABLE IF NOT EXISTS typeOFClub(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(50)
    ) 
    `
    

await pool.query(createUsersTable)
console.log('createUsersTable done')

await pool.query(createCATALOGTable)
console.log('createCATALOGTable done')

await pool.query(createCourseTable)
console.log('createCourseTable done')

await pool.query(createSingTable)
console.log('createSingTable done')

    }
    catch(e){
        console.log('Ошибка при создании таблиц')
    }
    
}

module.exports = createTables;