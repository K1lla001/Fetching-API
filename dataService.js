// import { countryUrl, harborUrl, detailUrl, taxUrl } from "./Urls.js";

const countryUrl = "https://insw-dev.ilcs.co.id/n/negara?ur_negara=";
const harborUrl = "https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=";
const detailUrl = "https://insw-dev.ilcs.co.id/n/barang?hs_code=";
const taxUrl = "https://insw-dev.ilcs.co.id/n/tarif?hs_code=";

let countryCode = "";
let customsData = 0;

function clickMe() {
  console.log("Hello you click me!");
}

async function getDataCountry(data) {
  const countryApi = countryUrl + data;
  if (data.length === 3) {
    const result = await fetch(countryApi);
    const response = await result.json();
    if (response.code === "200") {
      const countryData = response.data[0].ur_negara;
      countryCode = response.data[0].kd_negara;
      document.getElementById("countries").value = countryData;
    }
  }
}

async function getHarborData(data) {
  const harborApi = harborUrl + countryCode + "&ur_pelabuhan=" + data;
  if (data.length === 3) {
    const result = await fetch(harborApi);
    const response = await result.json();
    if (response.code === "200") {
      const harborData = response.data[0].ur_pelabuhan;
      document.getElementById("harbors").value = harborData;
    }
  }
}

async function getDataDetail(data) {
  const dataDetailApi = detailUrl + data;
  const result = await fetch(dataDetailApi);
  const response = await result.json();
  if (response.code === "200") {
    const dataDetail = response.data[0].sub_header + " " + response.data[0].uraian_id;
    document.getElementById("details").value = dataDetail;
  } else {
    document.getElementById("details").value = "";
  }
  await getDataCukai(data);
}

async function getDataCukai(data) {
  const dataCukaiApi = taxUrl + data;
  const result = await fetch(dataCukaiApi);
  const response = await result.json();
  if (response.code === "200") {
    customsData = response.data[0].bm;
    document.getElementById("cukai").value = customsData;
  } else {
    document.getElementById("cukai").value = "";
  }
}

async function getTotal(data) {
  const total = data * customsData;
  if (total) {
    document.getElementById("total").value = total;
  } else {
    document.getElementById("total").value = "";
  }
}
