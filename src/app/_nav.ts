import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cil-speedometer'},
  },
  {
    name: 'Chiến dịch',
    url: '/campaigns',
    icon: 'pi pi-megaphone'
  },
  {
    name: 'Liên hệ',
    url: '/contacts',
    icon: 'pi pi-users',
  },
  // {
  //   name: 'Admin',
  //   url: '/admin',
  //   iconComponent: {name: 'cil-user'},
  // },
  {
    name: 'Phân khúc khách hàng',
    url: '/segmentation',
    icon: 'pi pi-filter-fill',
  },
  {
    name: 'Admin',
    url: '/admin',
    icon: 'pi pi-cog',
    children: [
      {
        name: 'Quản lý người dùng',
        url: '/admin/users',
        icon: 'pi pi-user',
        class: 'm-l-1',
      },
      {
        name: 'Trường thông tin liên hệ',
        url: '/admin/dynamic/contact/fields',
        icon: 'pi pi-list',
        class: 'm-l-1',
      },
    ],
  },
];
