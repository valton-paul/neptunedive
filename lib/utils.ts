import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EventEmitter } from 'events';

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

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
};


// Crée une instance d'EventEmitter
const eventEmitter = new EventEmitter();

export default eventEmitter;





