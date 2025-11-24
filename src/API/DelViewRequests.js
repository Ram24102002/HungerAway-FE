import { notifyTostFun } from '../../Utils/notifyTostFun.js'

export async function DelViewRequests(requestId, onDelete) {
  if (!confirm("Are you sure you want to delete this request?")) return false;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/requests/${requestId}`,
      { method: "DELETE" }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Delete failed");

    notifyTostFun("Request deleted successfully!", "green");
    
    if (onDelete) onDelete(); // refresh UI

    return true; // 👈 this tells caller delete was successful

  } catch (err) {
    console.error("Error deleting request:", err);
    notifyTostFun("Failed to delete request", "red");
    return false;
  }
}
