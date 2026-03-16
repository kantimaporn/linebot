function generateNumberFlex(numbers) {

    const bubbles = []

    for (let i = 0; i < numbers.length; i += 20) {

        const slice = numbers.slice(i, i + 20)

        const rows = []

        for (let j = 0; j < slice.length; j += 4) {

            const rowNumbers = slice.slice(j, j + 4)

            rows.push({
                type: "box",
                layout: "horizontal",
                spacing: "sm",
                contents: rowNumbers.map(item => {

                    const isReserved = item.status === "reserved"

                    return {
                        type: "button",
                        style: isReserved ? "primary" : "secondary",
                        color: isReserved ? "#ff5555" : undefined,
                        height: "sm",
                        flex: 1,
                        action: {
                            type: "message",
                            label: isReserved ? `${item.number}❌` : item.number,
                            text: item.number
                        }
                    }
                })
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
                        text: `เลข ${slice[0].number} - ${slice[slice.length-1].number}`,
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
        altText: "เลือกเลข",
        contents: {
            type: "carousel",
            contents: bubbles
        }
    }
}

module.exports = generateNumberFlex