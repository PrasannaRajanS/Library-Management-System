import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
    {
        path: 'apps', component: AppLayoutComponent,
        children: [
            { path: 'admin', data: { breadcrumb: 'Admin' }, loadChildren: () => import('./+admin/components/admin.module').then(m => m.AdminModule) },
            { path: 'fiscal', data: { breadcrumb: 'Fiscal' }, loadChildren: () => import('./+fiscal/components/fiscal.module').then(m => m.FiscalModule) },
            { path: 'pms', data: { breadcrumb: 'PMS' }, loadChildren: () => import('./+pms/components/pms.module').then(m => m.PmsModule) },
            { path: 'students', data: { breadcrumb: 'Students' }, loadChildren: () => import('./+school/+students/components/students.module').then(m => m.StudentsModule) },
            { path: 'master', data: { breadcrumb: 'Master' }, loadChildren: () => import('./+school/+master/master.module').then(m => m.MasterModule) },

            { path: 'dashboard', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            // { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
        ]
    },

    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./+auth/auth.module').then(m => m.AuthModule) },
    { path: 'admission', data: { breadcrumb: 'Add Admission' }, loadChildren: () => import('./+school/+students/components/admission-add/admission-add.module').then(m => m.AdmissionAddModule) },
    { path: 'wizard', data: { breadcrumb: 'Wizard' }, loadChildren: () => import('./demo/components/pages/wizard/wizard.module').then(m => m.WizardModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'notfound2', loadChildren: () => import('./demo/components/notfound2/notfound2.module').then(m => m.Notfound2Module) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
