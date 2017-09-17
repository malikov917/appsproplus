import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {SharedService} from "../shared-service";
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {User} from "../models/users";

@Component({
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    submitBool: boolean;
    users$: Observable<User[]>;

    form = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    constructor(private service: HttpService) {
        this.form.valueChanges.subscribe(() => this.submitBool = SharedService.checkForm(this.form));
        this.users$ = this.service.getUsers();
    }

    ngOnInit() {
    }

    onFormSubmit() {
        this.service.postUser(this.form).subscribe(() => {
            this.users$ = this.service.getUsers();
            this.service.postShop(this.form).subscribe();
            this.service.postApp(this.form).subscribe();
        })
    }
}
