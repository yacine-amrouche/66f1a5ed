const BASE_URL = "https://aircall-backend.onrender.com";

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateActivityArchiveStatus = async (id, isArchived) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: !isArchived,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error updating archive status:", error);
    throw error;
  }
};

export const updateMultipleActivityArchiveStatuses = async (activities) => {
  const updates = activities.map((activity) =>
    updateActivityArchiveStatus(activity, false)
  );

  try {
    await Promise.all(updates);
    return;
  } catch (error) {
    console.error("Error updating multiple archive statuses:", error);
    throw error;
  }
};

export const unarchiveAll = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reset`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error unarchiving all activities:", error);
    throw error;
  }
};
