const https = require('https')
const cheerio = require('cheerio')

const url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'

const FetchWikiPage = async () => {
  const response = await GetPageData()
  const $ = cheerio.load(response)
  return ParseHtmlTable($)
}

const GetPageData = () => new Promise((resolve, reject) => https.get(url, response => {
  let data
  response.on('data', chunk => (data += chunk))
  response.on('end', () => resolve(data))
  response.on('error', err => reject(err))
}))

const ParseHtmlTable = $ => {
  return $('.wikitable')
    .map((i, table) => {
      if (i === 0) {
        return $('tr', table)
          .map((i, row) => {
            if (i !== 0) {
              return {
                Symbol: $('td, th', row).eq(0).text(),
                Name: $('td, th', row).eq(1).text(),
                Sector: $('td, th', row).eq(3).text()
              }
            }
          }).get()
      }
    }).get()
}

module.exports = { FetchWikiPage }
