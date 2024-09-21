export const formatDate = (dateString) => {
    console.log("first", dateString)
    if(!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);

    return formattedDate;
}