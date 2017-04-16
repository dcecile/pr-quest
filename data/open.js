import axios from 'axios'

const apiURL = 'https://api.openparliament.ca'

const service = axios.create({
  baseURL: apiURL
})

const getData = async (url, params) => {
  return (await service.get(url, { params })).data
}

const getPagedData = async (url, params) => {
  const results = []
  let responseData = await getData(url, params)
  while (true) {
    results.push(...responseData.objects)
    const nextURL = responseData.pagination.next_url
    if (nextURL) {
      responseData = await getData(nextURL)
    } else {
      break;
    }
  }
  return results
}

const getHumanURL = path => `https://openparliament.ca${path}`

export default {
  getData,
  getPagedData,
  getHumanURL,
}
