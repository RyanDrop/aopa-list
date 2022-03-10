import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage = localStorage;

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getArray(key: string) {
    return JSON.parse(this.storage.getItem(key) || '[]');
  }

  getNumber(key: string): number {
    return parseInt(this.storage.getItem(key) || '0');
  }

  getString(key: string): string {
    return this.storage.getItem(key) || '0';
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
