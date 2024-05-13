export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr).toLocaleString("en-US", { day: 'numeric', month: 'long' });
    const year = new Date(dateStr).getFullYear();
    return `${date}, ${year}`;
};
