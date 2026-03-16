const orderRepo = require("../repositories/orderRepo")

// ดึงเลขทั้งหมดจาก DB
async function getNumbers() {

    const numbers = await orderRepo.getAllNumbers()

    return numbers
}

// จองเลข
async function reserve(number, userId){

    const success = await orderRepo.reserveNumber(number, userId)

    if(!success){
        return {
            ok:false,
            message:"❌ เลขนี้ถูกจองแล้ว"
        }
    }

    return {
        ok:true,
        message:`✅ จองเลข ${number} สำเร็จ`
    }
}

module.exports = {
    getNumbers,
    reserve
}