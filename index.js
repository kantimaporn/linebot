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
            type: "flex",
            altText: "เลือกหมายเลขที่ต้องการ",
            contents: {
                type: "bubble",
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "เลือกเลขที่ต้องการ",
                            weight: "bold",
                            size: "lg"
                        },
                        {
                            type: "box",
                            layout: "horizontal",
                            spacing: "sm",
                            margin: "md",
                            contents: [
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "00",
                                        text: "00"
                                    }
                                },
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "01",
                                        text: "01"
                                    }
                                },
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "02",
                                        text: "02"
                                    }
                                }
                            ]
                        },
                        {
                            type: "box",
                            layout: "horizontal",
                            spacing: "sm",
                            margin: "sm",
                            contents: [
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "03",
                                        text: "03"
                                    }
                                },
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "04",
                                        text: "04"
                                    }
                                },
                                {
                                    type: "button",
                                    style: "secondary",
                                    action: {
                                        type: "message",
                                        label: "05",
                                        text: "05"
                                    }
                                }
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
    return client.replyMessage(event.replyToken, {
        type: "text",
        text: "พิมพ์ 'เลข' เพื่อเลือกหมายเลข"
    })
}
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})