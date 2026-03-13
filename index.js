require("dotenv").config()

const express = require("express")
const line = require("@line/bot-sdk")
//const db = require("./config/db")

const app = express()

const config = {
 channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
 channelSecret: process.env.CHANNEL_SECRET
}

const client = new line.Client(config)

app.post("/webhook", line.middleware(config), async (req, res) => {

 const events = req.body.events

 for (let event of events) {

  if (event.type === "message") {

   const userId = event.source.userId

//   db.query(
 //   "INSERT INTO users (line_user_id) VALUES (?)",
 //   [userId],
  //  (err) => {
   //   if (err) console.error(err)
 //   }
//)

   await client.replyMessage(event.replyToken, {
    type: "text",
    text: "สวัสดีจาก bot ของฉัน 👋"
   })

  }

 }

 res.status(200).end()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})