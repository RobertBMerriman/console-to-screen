import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mixing tw and actual utils feels weird

export function findDiagonal(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

export function ppi(diagonalPixels: number, inches: number) {
  return Math.round(diagonalPixels / inches)
}
