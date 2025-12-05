export const markDonationPicked = async (_id, picked) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/food-donations/${_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picked: !picked }), // Toggle
      }
    );

    if (!response.ok) throw new Error("Failed to update donation");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating donation:", error);
    throw error;
  }
};
