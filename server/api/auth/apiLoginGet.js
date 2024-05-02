import { connection } from "../../db.js";

export async function apiLoginGet(req, res) {
    const loginTokenSize = 20;

    if (typeof req.cookies.loginToken !== 'string'
        && req.cookies.loginToken.length !== loginTokenSize) {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Login token is invalid',
            loggedIn: false,
        }));
    }

    try {
        const selectQuery = 'SELECT userId FROM login_token WHERE token = ?;';
        const dbResponse = await connection.execute(selectQuery, [req.cookies.loginToken]);

        console.log(dbResponse[0]);
    } catch (error) {
        console.error(error);
    }

    return res.send(JSON.stringify({
        type: 'error',
        message: 'API login get: ERROR',
        loggedIn: false,
    }));
}