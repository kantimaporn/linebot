const generateNumberFlex = require("../flex/numberFlex")
const orderService = require("../services/orderService")

async function handleMessage(event, client) {

    if (event.type !== "message" || event.message.type !== "text") {
        return null
    }

    const text = event.message.text.trim()

    if (text === "เลข") {

       const numbers = await orderService.getNumbers()

    const flex = generateNumberFlex(numbers)

    return client.replyMessage(event.replyToken, flex)
    }
    if (/^\d{2}$/.test(text)) {

        console.log("Selected number:", text)
        const userId = event.source.userId

        const result = await orderService.reserve(text, userId)
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: `คุณเลือกเลข ${text}`
        })
    }
}

module.exports = handleMessage