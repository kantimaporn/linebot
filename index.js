require("dotenv").config()

const express = require("express")
const line = require("@line/bot-sdk")

const app = express()

// LINE config
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

const client = new line.Client(config)

// test route
app.get("/", (req, res) => {
    res.send("LINE Bot Server Running 🚀")
})

// webhook
app.post("/webhook", line.middleware(config), async (req, res) => {
    const events = req.body.events

    try {
        await Promise.all(events.map(handleEvent))
        res.status(200).end()
    } catch (err) {
        console.error(err)
        res.status(500).end()
    }
})

function generateNumberFlex() {

    const bubbles = []
    let numbers = []

    // สร้างเลข 00-99
    for (let i = 0; i < 100; i++) {
        numbers.push(i.toString().padStart(2, "0"))
    }

    // แบ่ง 20 เลขต่อ bubble
    for (let i = 0; i < numbers.length; i += 20) {

        const slice = numbers.slice(i, i + 20)

        const rows = []

        // 5 เลขต่อแถว
        for (let j = 0; j < slice.length; j += 5) {

            const rowNumbers = slice.slice(j, j + 5)

            rows.push({
                type: "box",
                layout: "horizontal",
                spacing: "sm",
                contents: rowNumbers.map(num => ({
                    type: "button",
                    style: "secondary",
                    height: "sm",
                    action: {
                        type: "message",
                        label: num,
                        text: num
                    }
                }))
            })
        }

        bubbles.push({
            type: "bubble",
            size: "giga",
            body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                    {
                        type: "text",
                        text: `เลข ${slice[0]} - ${slice[slice.length-1]}`,
                        weight: "bold",
                        size: "lg"
                    },
                    ...rows
                ]
            }
        })
    }

    return {
        type: "flex",
        altText: "เลือกเลข 00-99",
        contents: {
            type: "carousel",
            contents: bubbles
        }
    }
}

// handle message
async function handleEvent(event) {

    // ignore event ที่ไม่ใช่ message
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null)
    }

    const text = event.message.text.trim()

    console.log("Message:", text)

    // เช็คว่ามาจาก group หรือ user
    if (event.source.type === "group") {
        console.log("Group ID:", event.source.groupId)
    }

    if (event.source.type === "user") {
        console.log("User ID:", event.source.userId)
    }

    // เรียก Flex เลือกเลข
    if (text === "เลข") {

        const flex = generateNumberFlex()

        return client.replyMessage(event.replyToken, flex)
    }

    // ถ้าเป็นเลข 00-99
    if (/^\d{2}$/.test(text)) {

        console.log("Selected number:", text)

        return client.replyMessage(event.replyToken, {
            type: "text",
            text: `✅ คุณเลือกเลข ${text}`
        })
    }

    // help
    if (text === "บอท") {
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: "พิมพ์ 'เลข' เพื่อเลือกหมายเลข"
        })
    }

    // default
    return client.replyMessage(event.replyToken, {
        type: "text",
        text: "พิมพ์ 'เลข' เพื่อเลือกหมายเลข"
    })
}
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})