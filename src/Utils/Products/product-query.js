const axios = require("axios");

async function getData(q = "Mobile") {
  const response = await axios.get(
    `https://www.reliancedigital.in/rildigitalws/v2/rrldigital/cms/pagedata?pageType=productSearchPage&q=${q}%3Arelevance&page=0&size=24&pc=`
  );
  const result = await response.data.data.productListData;

  return result;
}
async function getSingleData(id) {
  const response = await axios.get(
    `https://www.reliancedigital.in/rildigitalws/v2/rrldigital/cms/pagedata?pageType=productPage&pageId=productPage&productCode=${id}`
  );
  const result = await response.data;

  return result;
}
module.exports = { getData, getSingleData };
