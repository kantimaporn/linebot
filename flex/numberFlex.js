function generateNumberFlex() {

    const bubbles = []
    let numbers = []

    for (let i = 0; i < 100; i++) {
        numbers.push(i.toString().padStart(2, "0"))
    }

    for (let i = 0; i < numbers.length; i += 20) {

        const slice = numbers.slice(i, i + 20)
        const rows = []

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
            body: {
                type: "box",
                layout: "vertical",
                contents: rows
            }
        })
    }

    return {
        type: "flex",
        altText: "เลือกเลข",
        contents: {
            type: "carousel",
            contents: bubbles
        }
    }
}

module.exports = generateNumberFlex