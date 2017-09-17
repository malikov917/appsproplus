import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {RouteInformation} from "../RouteInfo";
import {Router} from "@angular/router";
import {AuthenticationService} from "../autentication.service";
import {SharedService} from "../shared-service";

@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    submitBool: boolean;

    form = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    constructor(private routes: RouteInformation, private router: Router, private autenticationService: AuthenticationService) {
        this.form.valueChanges.subscribe(() => this.submitBool = SharedService.checkForm(this.form));
    };

    onFormSubmit(): void {
        this.routes.deleteRoutes();
        let login = this.form.get('login').value;
        let password = this.form.get('password').value;

        switch (login) {
            case 'admin': {
                this.router.navigate(['/table']);
                this.autenticationService.setUserUsername('admin');
                break;
            }
            default: {
                this.router.navigate(['/app-info']);
                this.autenticationService.setUserLoginAndPassword(login, password);
                break;
            }
        }
    }

    ngOnInit() {
        this.routes.setDefault();
    }
}
