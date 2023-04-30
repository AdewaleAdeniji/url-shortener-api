const axios = require("axios");

exports.shortenURL = async (url) => {
  let data = JSON.stringify({
    long_url: "https://feranmi.ng",
    domain: "bit.ly",
  });

  let config = {
    method: "post",
    url: "https://api-ssl.bitly.com/v4/shorten",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer e518510dfa4a9c16ebb1c164322e8183fa2f88fe",
    },
    data: data,
  };

  const res = await axios.post(config.url, data, config);
  return res;
};

