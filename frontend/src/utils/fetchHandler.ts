export const fetchData = async (
  url: string,
  method: string,
  content: unknown,
  token?: unknown
) => {
  const body = JSON.stringify(content);

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
    method: method,
    body: body,
    headers: {
      Authorization: "Bearer " + (token ? token : null),
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const fetchDataWithoutBody = async (
  url: string,
  token?: unknown,
  method?: string
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
    method: method ?? "GET",
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
};
