import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private currentPageKey = 'currentPage';

  constructor() { }

  setCurrentPage(page: number): void {
    localStorage.setItem(this.currentPageKey, page.toString());
  }

  getCurrentPage(): number | null {
    const savedPage = localStorage.getItem(this.currentPageKey);
    return savedPage ? parseInt(savedPage, 10) : null;
  }
}
