export const getAPICall = async (api) => {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // "Authorization": "Bearer " + token,
        },
      })
      return response.json();
    } catch (error) {
      console.error("Error", error);
    }
  };