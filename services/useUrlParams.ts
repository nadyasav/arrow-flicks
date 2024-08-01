import { usePathname, useSearchParams } from "next/navigation";

export function useUrlParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function getUrlParams(keys: Array<string>) {
    const result: {[key: string]: string | undefined} = {}
    keys.forEach((key) => result[key] = searchParams.get(key) || undefined)
    return result;
  }

  function setUrlParams<T extends object>(params: T) {
    const urlParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      let value = params[key as keyof T];
      if (value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
        urlParams.delete(key);
      } else {
        urlParams.set(key, Array.isArray(value) ? value.join(",") : value.toString());
      }
    });
    window.history.replaceState({}, "", `${pathname}?${urlParams.toString()}`);
  }

  return {getUrlParams, setUrlParams};
}
