const API_URL = "v1";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const launches = await response.json();
  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  };

  try {
    return await fetch(`${API_URL}/launches`, options);
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  const options = {
    method: "DELETE",
  };
  try {
    return await fetch(`${API_URL}/launches/${id}`, options);
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
