
export async function fetchData(endpoint, options = {}) {

  try {
    const response = await api.get("/getTasks");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
}