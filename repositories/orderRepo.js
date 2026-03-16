const db = require("../config/db")

async function getOrder(number) {

    const result = await db.query(
        "SELECT * FROM orders WHERE number=$1",
        [number]
    )

    return result.rows[0]
}

async function reserveNumber(number, userId) {

    const result = await db.query(
        `UPDATE orders
        SET status='reserved',
        line_user_id=$1
        WHERE number=$2
        AND status='available'
        RETURNING *`,
        [userId, number]
    )

    return result.rowCount > 0
}
async function getAllNumbers(){

    const result = await db.query(
        "SELECT number,status FROM orders ORDER BY number"
    )

    return result.rows
}
module.exports = {
    getOrder,
    reserveNumber,
    getAllNumbers
}