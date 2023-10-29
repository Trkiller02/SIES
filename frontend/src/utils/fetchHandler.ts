export const fetchData = async (
  url: string,
  method: string,
  content: unknown,
  token?: unknown
) => {
  const body = JSON.stringify(content);

  try {
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: {
        Authorization: "Bearer " + (token ? token : null),
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDataGET = async (url: string, token: unknown) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + (token ? token : null),
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
