//this script get screenshot related to search and store it in png format

const puppeteer = require("puppeteer");
const path = require("path");
let page;

function myFunction(search,folderPath){

    let ssPath = path.join(folderPath,search+".png");

    (async function fn(){
        let browser = await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized"],
        }) 
        page = await browser.newPage();
        await page.goto("https://www.google.com/");
        await page.click("[data-pid='2']");
        await page.waitForSelector(".gLFyf.gsfi");
        await page.type(".gLFyf.gsfi",search);
        await page.keyboard.press("Enter", { delay: 100 });
        await page.waitFor(1000);
        await page.screenshot({path:ssPath});
        await page.waitFor(1000);
              //getting all images 
              const photos = await page.$$eval("img", imgs => {
                return imgs.map(x => x.src)
              })
              //showing top 10 images to user
              for (let i = 0 ; i < 10 ; i++) {
                await page.waitFor(1000);
                await page.goto(photos[i]);
              }
        await browser.close();
    })();
}

module.exports = {
    fxn : myFunction
}