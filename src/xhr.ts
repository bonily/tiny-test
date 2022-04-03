import axios from "axios";

export interface MapParams {
  [key: string]: string;
}

const xhr = {
  get: (url: string, params?: MapParams): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(params ? addQueryObjectToUrl(url, params) : url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          errorHandler(error, resolve, reject);
          throw error;
        });
    });
  },
};
export function objectToUrlQuery(value: MapParams): string {
  const params = Object.keys(value)
    .map((key) => {
      return `${key}=${value[key].trim().split(" ").join("_")}`;
    })
    .join("");
  return params;
}

export function addQueryObjectToUrl(url: string, value: MapParams): string {
  const params = objectToUrlQuery(value);

  return `${url}?${params}`;
}

export function errorHandler(
  error: any,
  resolve: (value?: any) => void,
  reject: (value?: any) => void
): void {
  reject(error);
}

export default xhr;
