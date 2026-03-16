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
        for (let j = 0; j < slice.length; j += 4) {

            const rowNumbers = slice.slice(j, j + 4)

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
                        text: `เลข ${slice[0]} - ${slice[slice.length - 1]}`,
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
