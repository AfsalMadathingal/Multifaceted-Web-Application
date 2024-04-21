const axios = require('axios');
const cheerio = require('cheerio');
const pageData = require('../public/json/pagetitles.json');



const scrapeIPOData = async (req, res) => {

    async function scrapeIPOData() {
        try {
            const response = await axios.get('https://www.investorgain.com/report/live-ipo-gmp/331/');
            const $ = cheerio.load(response.data);

            const keyMapping = {
                'GMP(₹)': 'GMP',
                'Est Listing': 'EstimatedListing',
                'Fire Rating': 'Rating',
                "GMP Updated": "GMPUpdated",
                "BoA Dt": "BoADt",
                "IPO Size": "IPOSize",
                // Add more mappings as needed
            };

            const IPOs = [];

            $('tbody tr').each((index, element) => {
                const IPO = {};
                $(element).find('td').each((i, el) => {
                    const label = $(el).data('label');
                    let value = $(el).text().trim();

                    // Check if the value contains the email pattern
                    if (label === 'IPO') {
                       
                        value = value.split(`[email`).join("");
                        value = value.split(`protected]`).join(" Listed at");
                        value = value.split(`Upcoming`).join(" Not Opened");
                       
                    } else if (!isNaN(value)) {
                        value = parseFloat(value);
                    }
                    const readableKey = keyMapping[label] || label;
                    IPO[readableKey] = value;
                });
                IPOs.push(IPO);
            });
     

            return IPOs;

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const IPOs = await scrapeIPOData();

    console.log("GMP visited");

    res.render('ipogmp', {
         data: IPOs ,
        title: "IPO GMP | ILuvnet.com",
        desc: pageData.ipogmpdesc,
        canonical: `https://iluvnet.com/finance/IPO-GMP-Latest-News`,
        keywords : pageData.ipogmp
        
        });

}

module.exports = { scrapeIPOData }



