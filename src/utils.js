import readline from "readline";

export function initProgressBar(apxTime) {

    return function (currentTime) {
        // ~~ stands for rounding down
        const starsQuantity = ~~((currentTime * 20) / apxTime)

        const emptyQuantity = 20 - starsQuantity

        const empty = " ".repeat(emptyQuantity < 0 ? 0 : emptyQuantity)

        const stars = "*".repeat(emptyQuantity < 0 ? starsQuantity + emptyQuantity : starsQuantity);

        const currTimeInSeconds = currentTime / 1000;
        const apxTimeInSeconds = apxTime / 1000;

        process.stdout.write(
            `\r[${stars}${empty}] (${currTimeInSeconds}sec from ${apxTimeInSeconds} estimated)`
        )
    }
}

export function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close()
            resolve(ans)
        })
    )
}

export function replaceUrlParams (url= "", params = {}) {
    let newUrl = url;

    Object.entries(params).forEach(([key, value = ""]) => {
        newUrl = url.replace(`:${key}`, value)
    })

    return newUrl
}
