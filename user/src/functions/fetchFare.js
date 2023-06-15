export async function generateFare(dist) {
  const fare = await fetch(
    `${process.env.REACT_APP_BACKEND}/passenger/fetchFare`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage?.getItem("user")?.toString(),
      },
      body: JSON.stringify({
        start: dist?.source?.st_id,
        dest: dist?.destination?.st_id,
      }),
    }
  );
  const response = await fare.json();
  return response.amount;
}
