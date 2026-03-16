const generateNumberFlex = require("../flex/numberFlex")

async function handleMessage(event, client) {

    if (event.type !== "message" || event.message.type !== "text") {
        return null
    }

    const text = event.message.text.trim()

    if (text === "เลข") {

        const flex = generateNumberFlex()

        return client.replyMessage(event.replyToken, flex)
    }
}

module.exports = handleMessage