 // Fetch volunteers (you'll need to create this endpoint)
 export const getVolunteers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/volunteers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch volunteers");

      const data = await response.json();
      console.log("Volunteers fetched successfully:", data);
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };
