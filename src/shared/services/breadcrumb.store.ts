import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreadcrumbStore {
  items: MenuItem[];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
