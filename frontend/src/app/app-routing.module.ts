import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from './report/report.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: 'report',
        component: ReportComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'}),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
