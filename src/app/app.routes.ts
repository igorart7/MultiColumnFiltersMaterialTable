import { Routes } from '@angular/router';
import { VerifyModvalBuildComponent } from './verify-modval-build/verify-modval-build.component';
import { ManualExtractComponent } from './manual-extract/manual-extract.component';
import { ExtractRequestComponent } from './extract-request/extract-request.component';
import { PromoteToProductionComponent } from './promote-to-production/promote-to-production.component';
import { VerifyProductionBuildComponent } from './verify-production-build/verify-production-build.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    { path: 'manual-extract', component: ManualExtractComponent },
    { path: 'extractRequest', component: ExtractRequestComponent },
    { path: 'verifyModvalBuild', component: VerifyModvalBuildComponent },
    { path: 'promoteToProduction', component: PromoteToProductionComponent },
    { path: 'verifyProductionBuild', component: VerifyProductionBuildComponent },
    { path: 'logReport', component: LoginComponent }

];
