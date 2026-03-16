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

// handle message
async function handleEvent(event) {

    if (event.type !== "message" || event.message.type !== "text") {
        return null
    }

    const text = event.message.text

    // ถ้าพิมพ์คำว่า "เลข"
    if (text === "เลข") {

        const flexMessage = {
            "type": "flex",
            "altText": "เลือกหมายเลข 00-99",
            "contents": {
                "type": "bubble",
                "size": "giga",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "lg",
                    "contents": [
                        {
                            "type": "text",
                            "text": "เลือกหมายเลข",
                            "weight": "bold",
                            "size": "xl"
                        },

                        {
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "sm",
                            "contents": [
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "00", "text": "00" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "01", "text": "01" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "02", "text": "02" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "03", "text": "03" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "04", "text": "04" } }
                            ]
                        },

                        {
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "sm",
                            "contents": [
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "05", "text": "05" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "06", "text": "06" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "07", "text": "07" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "08", "text": "08" } },
                                { "type": "button", "style": "secondary", "action": { "type": "message", "label": "09", "text": "09" } }
                            ]
                        }

                    ]
                }
            }
        }

        return client.replyMessage(event.replyToken, flexMessage)
    }

    // ถ้ากดเลข
    if (/^\d{2}$/.test(text)) {
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: `คุณเลือกเลข ${text}`
        })
    }

    // default
    if (text === "บอท") {
        return client.replyMessage(event.replyToken, {
            type: "text",
            text: "พิมพ์ 'เลข' เพื่อเลือกหมายเลข"
        })
    }
}
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})