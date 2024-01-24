import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Application',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/apps/admin/application-creation']
                    },
                    {
                        label: 'Module',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/apps/admin/module-creation']
                    },
                    {
                        label: 'Page',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/apps/admin/page-creation']
                    },
                    {
                        label: 'Role',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/apps/admin/role-creation']
                    },
                    {
                        label: 'Role & Page Associate',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['/apps/admin/role-page-associate']
                    },
                    {
                        label: 'User',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/apps/admin/user-creation']
                    },
                    // {
                    //     label: 'Field & Button Associate',
                    //     icon: 'pi pi-fw pi-file-edit',
                    //     routerLink: ['/apps/admin/form-field-button-permission']
                    // },
                ]
            },
            {
                label: 'Fiscal',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Organization',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/apps/fiscal/organization']
                    },
                    {
                        label: 'Institution',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/fiscal/institution']
                    },
                    {
                        label: 'Academic Year',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/fiscal/fiscal-year']
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/fiscal/misc']
                    },
                    {
                        label: 'Misc Detail',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/fiscal/misc-detail']
                    },
                ]
            },
            {
                label: 'PMS',
                icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Master',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Misc',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/master/misc']
                            },
                            {
                                label: 'Misc Detail',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/master/misc-detail']
                            },
                        ]
                    },
                    {
                        label: 'Talent Acquire',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Position Request',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/talent-acquire/position-request']
                            },
                            {
                                label: 'Shortlist CV',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/talent-acquire/shortlist-cv']
                            },
                            {
                                label: 'Select Candidate',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/talent-acquire/select-candidate']
                            },
                            {
                                label: 'Offer',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/talent-acquire/offer']
                            },
                        ]
                    },
                    {
                        label: 'Join / Onboarding',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Add Employee',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/employee/employee-add']
                            },
                            {
                                label: 'Employee List',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/pms/employee/employee-list']
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Students',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Add Student',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/apps/students/student-add']
                    },
                    {
                        label: 'Student List',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/students/student-list']
                    }
                ]
            },
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/apps/apps/dashboard-sales']
                    },
                    {
                        label: 'Analytics Dashboard',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/apps/apps/dashboard-analytics']
                    },
                    {
                        label: 'SaaS Dashboard',
                        icon: 'pi pi-fw pi-bolt',
                        routerLink: ['/apps/apps/dashboard-saas']
                    },
                ]
            },
            {
                label: 'Apps',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Blog',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/apps/blog/list']
                            },
                            {
                                label: 'Detail',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/apps/blog/detail']
                            },
                            {
                                label: 'Edit',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/apps/blog/edit']
                            }
                        ]
                    },
                    {
                        label: 'Calendar',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/apps/apps/calendar']
                    },
                    {
                        label: 'Chat',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/apps/apps/chat']
                    },
                    {
                        label: 'Files',
                        icon: 'pi pi-fw pi-folder',
                        routerLink: ['/apps/apps/files']
                    },
                    {
                        label: 'Kanban',
                        icon: 'pi pi-fw pi-sliders-v',
                        routerLink: ['/apps/apps/kanban']
                    },
                    {
                        label: 'Mail',
                        icon: 'pi pi-fw pi-envelope',
                        items: [
                            {
                                label: 'Inbox',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/apps/apps/mail/inbox']
                            },
                            {
                                label: 'Compose',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/apps/mail/compose']
                            },
                            {
                                label: 'Detail',
                                icon: 'pi pi-fw pi-comment',
                                routerLink: ['/apps/apps/mail/detail/1000']
                            }
                        ]
                    },
                    {
                        label: 'Task List',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/apps/apps/tasklist']
                    }
                ]
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-fw pi-star-fill',
                items: [
                    {
                        label: 'Form Layout',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/apps/uikit/formlayout']
                    },
                    {
                        label: 'Input',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/apps/uikit/input']
                    },
                    {
                        label: 'Float Label',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/apps/uikit/floatlabel']
                    },
                    {
                        label: 'Invalid State',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/apps/uikit/invalidstate']
                    },
                    {
                        label: 'Button',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/apps/uikit/button']
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/apps/uikit/table']
                    },
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/apps/uikit/list']
                    },
                    {
                        label: 'Tree',
                        icon: 'pi pi-fw pi-share-alt',
                        routerLink: ['/apps/uikit/tree']
                    },
                    {
                        label: 'Panel',
                        icon: 'pi pi-fw pi-tablet',
                        routerLink: ['/apps/uikit/panel']
                    },
                    {
                        label: 'Overlay',
                        icon: 'pi pi-fw pi-clone',
                        routerLink: ['/apps/uikit/overlay']
                    },
                    {
                        label: 'Media',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/apps/uikit/media']
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-bars',
                        routerLink: ['/apps/uikit/menu'],
                        routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
                    },
                    {
                        label: 'Message',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/apps/uikit/message']
                    },
                    {
                        label: 'File',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/apps/uikit/file']
                    },
                    {
                        label: 'Chart',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/apps/uikit/charts']
                    },
                    {
                        label: 'Misc',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/apps/uikit/misc']
                    }
                ]
            },
            {
                label: 'Prime Blocks',
                icon: 'pi pi-fw pi-prime',
                items: [
                    {
                        label: 'Free Blocks',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/apps/blocks']
                    },
                    {
                        label: 'All Blocks',
                        icon: 'pi pi-fw pi-globe',
                        url: ['https://www.primefaces.org/primeblocks-ng'],
                        target: '_blank'
                    }
                ]
            },
            {
                label: 'Utilities',
                icon: 'pi pi-fw pi-compass',
                items: [
                    {
                        label: 'PrimeIcons',
                        icon: 'pi pi-fw pi-prime',
                        routerLink: ['utilities/icons']
                    },
                    {
                        label: 'Colors',
                        icon: 'pi pi-fw pi-palette',
                        routerLink: ['utilities/colors']
                    },
                    {
                        label: 'PrimeFlex',
                        icon: 'pi pi-fw pi-desktop',
                        url: ['https://www.primefaces.org/primeflex/'],
                        target: '_blank'
                    },
                    {
                        label: 'Figma',
                        icon: 'pi pi-fw pi-pencil',
                        url: ['https://www.figma.com/file/ijQrxq13lxacgkb6XHlLxA/Preview-%7C-Ultima-2022?node-id=354%3A7715&t=4HWBlQ8kHvfpLU08-1'],
                        target: '_blank'
                    }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Error 2',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error2']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            },
                            {
                                label: 'Access Denied 2',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access2']
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/auth/register']
                            },
                            {
                                label: 'Forgot Password',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['/auth/forgotpassword']
                            },
                            {
                                label: 'New Password',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/auth/newpassword']
                            },
                            {
                                label: 'Verification',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/auth/verification']
                            },
                            {
                                label: 'Lock Screen',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/auth/lockscreen']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/apps/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Invoice',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/pages/invoice']
                    },
                    {
                        label: 'Wizard',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/wizard']
                    },
                    {
                        label: 'Help',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/help']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: ['/pages/contact']
                    }
                ]
            },
            {
                label: 'E-Commerce',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Product Overview',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['ecommerce/product-overview']
                    },
                    {
                        label: 'Product List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['ecommerce/product-list']
                    },
                    {
                        label: 'New Product',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['ecommerce/new-product']
                    },
                    {
                        label: 'Shopping Cart',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/shopping-cart']
                    },
                    {
                        label: 'Checkout Form',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['ecommerce/checkout-form']
                    },
                    {
                        label: 'Order History',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['ecommerce/order-history']
                    },
                    {
                        label: 'Order Summary',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['ecommerce/order-summary']
                    }
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Create',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Start',
                icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Buy Now',
                        icon: 'pi pi-fw pi-shopping-cart',
                        url: ['https://www.primefaces.org/store']
                    },
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/documentation']
                    }
                ]
            }
        ];
    }
}
