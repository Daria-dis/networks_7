import fetch from 'node-fetch';//завантажили бібліотеку для виконання реквестів

import {initProgressBar, askQuestion, replaceUrlParams} from "./utils.js";//завантажили (наші) утиліти прогресс бару, задавання  питань в консолі і заміні id в url
import {GET_COIN_URL, GET_TICKERS_URL} from "./const.js";//завантажили константи (url andpoint)

const APX_LOADING_TIME = 3000;// приблизний час завантаження

const cryptoInfoCheck = async () => {//основна програма
    console.log("Welcome to Crypto Info Check!");
    console.log("Please wait. Crypto Info is downloading...");

    const bar = initProgressBar(APX_LOADING_TIME);
    let loading = 0

    const firstLoading = setInterval(() => {
        bar(loading);
        loading+=1000;
    }, 1000)

    const tickers = await fetch(GET_TICKERS_URL)
    const tickersJson = await tickers.json();

    clearTimeout(firstLoading);

    const tickersFirst100Options = tickersJson.map(({id, name}) => ({id, name}));

    console.table(tickersFirst100Options.slice(0, 101))

    let coinName = ""

    while (!tickersFirst100Options.find(({name}) => name === coinName)) {
        coinName = await askQuestion("Enter Coin name: ")
    }

    console.log(`Coin name: ${coinName}`)

    const coinId = tickersFirst100Options.find(({name}) => name === coinName).id;

    const getCoinUrlWithId = replaceUrlParams(GET_COIN_URL, {id: coinId});

    const coin = await fetch(getCoinUrlWithId);
    const coinJson = await coin.json();

    console.table(
        {
            "Name": coinJson.name,
            "Symbol": coinJson.symbol,
            "Algorithm": coinJson.hash_algorithm,
            "Proof Type": coinJson.proof_type,
            "Organization Structure": coinJson.org_structure,
        })
}

cryptoInfoCheck()
