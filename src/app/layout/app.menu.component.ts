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
                label: 'SCHOOL',
                icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Master',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Misc',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/master/misc']
                            },
                            {
                                label: 'Misc Detail',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/master/misc-detail']
                            },
                            {
                                label: 'Period',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/master/period']
                            },
                        ]
                    },
                    {
                        label: 'Admission Module',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Add Admission',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/admission/admission-entry']
                            },
                            {
                                label: 'Admission List',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/students/admission-list']
                            },
                        ]
                    },
                    {
                        label: 'Student Module',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Add Student',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/students/student-add']
                            },
                            {
                                label: 'Student List',
                                icon: 'pi pi-fw pi-align-left',
                                routerLink: ['/apps/students/student-list']
                            },
                        ]
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
           
        ];
    }
}
