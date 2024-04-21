const axios = require('axios');
const cheerio = require('cheerio');



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
                        console.log('Email pattern found:', value);
                         value = value.split(`[email`).join("");
                        value = value.split(`protected]`).join(" Listed at");
                        console.log('after pattern found:', value);
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

    res.render('ipogmp', { data: IPOs });

}

module.exports = { scrapeIPOData }



