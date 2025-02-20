import { Routes } from '@angular/router';
import { ExtractRequestComponent } from './extract-request/extract-request.component';
import { VerifyModvalBuildComponent } from './verify-modval-build/verify-modval-build.component';
import { PromoteToProductionComponent } from './promote-to-production/promote-to-production.component';
import { VerifyProductionBuildComponent } from './verify-production-build/verify-production-build.component';
import { LogReportComponent } from './log-report/log-report.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path:  '', pathMatch: 'full', redirectTo: 'login' },
    { path:  'extractRequest', component: ExtractRequestComponent },
    { path:  'verifyModvalBuild', component: VerifyModvalBuildComponent },
    { path:  'promoteToProduction', component: PromoteToProductionComponent },
    { path:  'verifyProductionBuild', component: VerifyProductionBuildComponent },
    { path:  'logReport', component: LogReportComponent },
    { path:  'login', component: LoginComponent },
    { path:  '**', component: LoginComponent } 
];
