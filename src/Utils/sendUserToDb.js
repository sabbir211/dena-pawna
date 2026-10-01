const sendUserToDb = async (accessToken, photoUrl, name, email, phone) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ photoUrl, name, email, phone }),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending user to database:", error);
    throw error;
  }
};
export { sendUserToDb };