import { useState } from "react";
import vlogsData from "../../../data/vlogsData";

// Custom hook for vlog state management
// Ready to replace with real API calls when backend is connected
export function useVlogs() {
  const [activeId, setActiveId] = useState(null);

  const openVlog = (id) => {
    setActiveId(id);
    document.body.style.overflow = "hidden";
  };

  const closeVlog = () => {
    setActiveId(null);
    document.body.style.overflow = "auto";
  };

  const getVlogById = (id) => vlogsData.find((v) => v.id === id) || null;

  return {
    vlogs: vlogsData,
    activeId,
    activeVlog: getVlogById(activeId),
    openVlog,
    closeVlog,
  };
}
