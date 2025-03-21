import moment from "moment";
import useStore from "./ComplaintMgmtStore";

export const formatIconName = (name, isActive) => {
    const formattedName = name.replace(/\s+/g, "-");
    return `/assets/icons/sidebar/${formattedName.toLowerCase()}-${isActive ? "active" : "inactive"}.svg`;
};

export const formatDate = (dateString) => {
  return moment(dateString).format("Do MMMM, YYYY HH:mm");
};

export const findItem = (id) => {
  let courseDetails = useStore.getState().coursesList.find(item => item.id === id);
  // console.log('Course code found!', courseDetails, id);
  return courseDetails.code ?? null;
};

  