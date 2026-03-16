const express = require("express")
const line = require("@line/bot-sdk")

const handleMessage = require("./handlers/messageHandler")

const app = express()

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

const client = new line.Client(config)

app.post("/webhook", line.middleware(config), async (req,res)=>{

    const events = req.body.events

    await Promise.all(
        events.map(event => handleMessage(event,client))
    )

    res.status(200).end()
})

app.listen(3000)