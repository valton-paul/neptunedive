import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(isoDate: string|null) {
  if (!isoDate) {
    return '';
  }
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR"); // Formate en dd/MM/yyyy en français
}


export function parseTime(timeString: string|null) {
  if (!timeString) {
    return null;
  }
  const [hours, minutes, seconde] = timeString.split(':').map(Number);
  return hours + ':' + minutes + ':' + seconde;
}