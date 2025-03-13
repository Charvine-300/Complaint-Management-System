export const formatIconName = (name, isActive) => {
    const formattedName = name.replace(/\s+/g, "-");
    return `/assets/icons/sidebar/${formattedName.toLowerCase()}-${isActive ? "active" : "inactive"}.svg`;
  };
  