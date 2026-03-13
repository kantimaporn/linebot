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

  const userId = event.source.userId
  console.log("User:", userId)

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "สวัสดีจาก bot ของฉัน 👋"
  })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})