import moment from "moment";

export const formatIconName = (name, isActive) => {
    const formattedName = name.replace(/\s+/g, "-");
    return `/assets/icons/sidebar/${formattedName.toLowerCase()}-${isActive ? "active" : "inactive"}.svg`;
};

export const formatDate = (dateString) => {
  return moment(dateString).format("Do MMMM, YYYY HH:mm");
};

  