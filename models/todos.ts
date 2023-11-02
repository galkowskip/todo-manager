// use postgress to control todos


import { pool } from '../db';


const GetTodosModel = async () => {
    return await new Promise((resolve, reject) => {
        pool.query('SELECT * FROM todos', (err, res) => {
            if (err) {
                reject(err);
            }
            console.log(res)
            resolve(res);
        })
    })
}

export {
    GetTodosModel,
}