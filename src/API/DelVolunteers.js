import { notifyTostFun } from '../Utils/notifyTostFun.js'

export async function DelVolunteers(requestId, onDelete) {
  if (!confirm("Are you sure you want to delete this Volunteer details?")) return false;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/volunteers/${requestId}`,
      { method: "DELETE" }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Delete failed");

    notifyTostFun("Volunteer details deleted successfully!", "green");
    
    if (onDelete) onDelete(); // refresh UI

    return true; // 👈 this tells caller delete was successful

  } catch (err) {
    console.error("Error deleting Volunteer details:", err);
    notifyTostFun("Failed to delete Volunteer details", "red");
    return false;
  }
}
