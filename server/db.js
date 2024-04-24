import mysql from 'mysql2/promise';

let connection = null;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    await connection.query('USE grupe48');

    // const sql = 'SELECT * FROM users WHERE id = 22;';
    // const ats = await connection.execute(sql);

    // console.log(ats[0]);

} catch (error) {
    throw error;
}

export { connection };