const request = require('request-promise-native')
const cheerio = require('cheerio')

const FetchWikiPage = async () => {
  const response = await request(
    'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
  ).catch(console.error)
  const $ = cheerio.load(response)
  return ParseHtmlTable($)
}

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
