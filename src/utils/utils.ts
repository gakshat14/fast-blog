import { IApiObject } from "../components/models";

export function getApiResourceObject<T>(data: T, isLoading = false, hasError = false): IApiObject<T> {
    return {data, hasError, isLoading};
}
