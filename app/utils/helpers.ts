export const formatTime = (date: Date | string) => {
    if (typeof date === "string") {
        date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};