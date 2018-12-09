const nock = require('nock')
const { FetchWikiPage } = require('../src/main')
const { mockedPageData } = require('./assertion-data/SP500WikiPage')

describe('main tests', async () => {
  it('should return a list of 500 stocks', async () => {
    nock('https://en.wikipedia.org').get('/wiki/List_of_S%26P_500_companies').reply(200, mockedPageData)

    const response = FetchWikiPage()
    const expectedResult = require('./assertion-data/sp500')

    expect(await response).toEqual(expectedResult)
  })
})
