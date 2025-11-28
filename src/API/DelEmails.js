import { notifyTostFun } from '../Utils/notifyTostFun.js'

export async function DelEmails(requestId, onDelete) {
  if (!confirm("Are you sure you want to delete this Email?")) return false;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contacts/${requestId}`,
      { method: "DELETE" }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Delete failed");

    notifyTostFun("Email deleted successfully!", "green");
    
    if (onDelete) onDelete(); // refresh UI

    return true; // 👈 this tells caller delete was successful

  } catch (err) {
    console.error("Error deleting Email:", err);
    notifyTostFun("Failed to delete Email", "red");
    return false;
  }
}
