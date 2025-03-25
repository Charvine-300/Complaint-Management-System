import moment from "moment";
import useStore from "./ComplaintMgmtStore";

export const formatIconName = (name, isActive) => {
    const formattedName = name.replace(/\s+/g, "-");
    return `/assets/icons/sidebar/${formattedName.toLowerCase()}-${isActive ? "active" : "inactive"}.svg`;
};

export const formatDate = (dateString) => {
  return moment(dateString).format("Do MMMM, YYYY HH:mm");
};

export const findItem = (id, showTitle = false) => {
  const { coursesList, courseID } = useStore.getState();
  const courseId = id ?? courseID;
  const courseDetails = coursesList.find(item => item.id === courseId);

  let fullTitle = `${courseDetails.code} ${courseDetails.name}` ?? null;

  return showTitle ? fullTitle : courseDetails.code;
};


  