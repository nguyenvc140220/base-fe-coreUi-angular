import { Component, Input } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@shared/services';
import { Router } from '@angular/router';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  store: BreadcrumbStore;

  constructor(
    private classToggler: ClassToggleService,
    private breadcrumbStore: BreadcrumbStore,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super();
    this.store = breadcrumbStore;
  }

  logout() {
    Swal.fire({
      title: 'Thông báo',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Xác nhận',
      confirmButtonText: 'Hủy',
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        sessionStorage.clear()
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
