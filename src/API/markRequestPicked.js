export const markRequestPicked = async (_id,picked) =>{
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${_id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({picked: !picked}),
        });
        if(!response.ok) throw new Error("Failed to mark request as picked");
        const data = await response.json();
        console.log("Request marked as picked successfully:", data);
        return data;
    }catch(error){
        console.error("Error marking request as picked:", error);
        throw error;
    }
}