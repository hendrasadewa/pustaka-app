import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LocalStorageKeys } from "./configs/session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  try {
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);
    return token
  } catch (error) {
    console.error(error)
    return null;
  }
}
