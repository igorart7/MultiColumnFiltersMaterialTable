import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    user: string = '';
    password: string = '';
    loginValid: Boolean = true;
    year: number = new Date().getFullYear();
    
    constructor( private authService: AuthenticationService, private router: Router) {
    
    }
    
    login(): void {
        this.authService.login(this.user, this.password).subscribe( (value) => {      
            this.loginValid = value;
            if( value === true ){
                this.router.navigate(['verifyModvalBuild']);
            }
        });
    }
}
