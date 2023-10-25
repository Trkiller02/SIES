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
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token ? token.toString() : null),
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

export const fetchDataGet = async (url: string, token: unknown) => {
  console.log(token);

  try {
    const response = await fetch(url, {
      headers: {
        Autorization: "Bearer " + (token ? token : null),
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
