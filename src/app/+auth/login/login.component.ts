import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {

	rememberMe: boolean = false;

	constructor(private router: Router) {}

	// get dark(): boolean {
	// 	return this.layoutService.config.colorScheme !== 'light';
	// }

	onLoginClick() {
		this.router.navigate(['/apps/dashboard/dashboard-sales']);
	}

}
