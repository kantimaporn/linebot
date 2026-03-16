const orderService = require("../services/orderService")
const generateNumberFlex = require("../flex/numberFlex")

async function handleMessage(event, client) {

    const text = event.message.text.trim()

    if (text === "เลข") {

        const flex = generateNumberFlex()

        return client.replyMessage(event.replyToken, flex)
    }

    if (/^\d{2}$/.test(text)) {

        const userId = event.source.userId

        const result = await orderService.reserve(text, userId)

        return client.replyMessage(event.replyToken,{
            type:"text",
            text: result.message
        })
    }

}

module.exports = handleMessage