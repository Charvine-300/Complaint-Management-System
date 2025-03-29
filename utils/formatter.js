import moment from "moment";
import useStore from "./ComplaintMgmtStore";

export const formatIconName = (name, isActive) => {
    const formattedName = name.replace(/\s+/g, "-");
    return `/assets/icons/sidebar/${formattedName.toLowerCase()}-${isActive ? "active" : "inactive"}.svg`;
};

export const formatDate = (dateString) => {
  return moment(dateString).format("Do MMMM, YYYY | hh:mm A");
};

export const findItem = (id, showTitle = false) => {
  const { coursesList, courseID } = useStore.getState();
  const courseId = id ?? courseID;
  const courseDetails = coursesList.find(item => item.id === courseId);

  console.log("Filtered course: ", courseDetails, id);
  let fullTitle = `${courseDetails.code} ${courseDetails.name}` ?? null;

  return showTitle ? fullTitle : courseDetails.code;
};

export const formatStatus = (status) => {
  switch (status) {
    case "PENDING":
      return "Investigating";
    case "SUBMITTED":
      return "Pending";
    default:
      return status;
  }
};

export const getWord = (text, position) => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  
  switch (position.toLowerCase()) {
    case 'first':
      return words[0] || '';
    case 'last':
      return words[words.length - 1] || ''; 
    default:
      return text;
  }
}

export const timeAgo = (dateString) => {
  const now = moment();
  const createdAt = moment(dateString);
  const diffInSeconds = now.diff(createdAt, "seconds");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } 
  const diffInMinutes = now.diff(createdAt, "minutes");
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = now.diff(createdAt, "hours");
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = now.diff(createdAt, "days");
  if (diffInDays === 1) {
    return "Yesterday";
  }
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  const diffInWeeks = now.diff(createdAt, "weeks");
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }
  const diffInMonths = now.diff(createdAt, "months");
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }
  
  return createdAt.format("MMM D, YYYY"); // Fallback for older dates
};


  