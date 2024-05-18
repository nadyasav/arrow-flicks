export const getLocalStorage = (item: string) => {
    const storageItem = localStorage.getItem(item);
    if (storageItem) {
      return JSON.parse(storageItem);
    } else {
      return [];
    }
};
