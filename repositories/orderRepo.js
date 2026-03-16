const db = require("../config/db")

async function getAllNumbers(){

    const result = await db.query(
        "SELECT number, status FROM orders ORDER BY number"
    )

    return result.rows
}

async function reserveNumber(number, userId){

    const result = await db.query(
        `UPDATE orders
        SET status='reserved',
            line_user_id=$1,
            reserved_at=NOW()
        WHERE number=$2
        AND status='available'
        RETURNING *`,
        [userId, number]
    )

    return result.rowCount > 0
}

module.exports = {
    getAllNumbers,
    reserveNumber
}