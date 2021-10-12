const express = require('express')
const cors = require("cors");
const axios = require('axios')
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/delivery/checkPrice", async function (req, res) {
  const { pick_province, pick_district, province, district, address, weight, value, transport } = req.body
  const api = `https://services.giaohangtietkiem.vn/services/shipment/fee?address=${encodeURIComponent(address)}&province=${encodeURIComponent(province)}&district=${encodeURIComponent(district)}&pick_province=${encodeURIComponent(pick_province)}&pick_district=${encodeURIComponent(pick_district)}&weight=${weight}&value=${value}&deliver_option=xteam&tags%5B%5D=1`
  await axios.get(api, {
    headers: {
      Token: '2071A81f29663256388844fed2035F29E8f2f0Fd',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    res.json(response.data)
  }).catch(err => {
    res.json(err)
  })
});
app.listen(port, () => {
  console.log("server listening on port " + port);
})