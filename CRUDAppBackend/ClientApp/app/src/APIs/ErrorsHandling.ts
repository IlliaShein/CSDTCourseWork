import { AxiosResponse } from "axios";

async function HandleErrors<T>(func: () => Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await func();
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default HandleErrors;