const TOKEN = "pk.61ff74da8da14ef78b32eff4920b2492";
const URL = "https://ap1.unwiredlabs.com/v2/process";

async function getLocation(mcc, mnc, lac, cid, networkType) {
  const payload = {
    token: TOKEN,
    radio: networkType === "auto" ? "" : networkType,
    mcc: parseInt(mcc),
    mnc: parseInt(mnc),
    cells: [
      {
        lac: parseInt(lac),
        cid: parseInt(cid),
      },
    ],
    address: 1,
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.status === "ok") {
      const { lat, lon, address } = data;
      return { latitude: lat, longitude: lon, address: address };
    } else {
      throw new Error(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error(`Error fetching location: ${error}`);
    return null;
  }
}
