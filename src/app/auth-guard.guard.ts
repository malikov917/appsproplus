import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from "./autentication.service";
import {RouteInformation} from "./RouteInfo";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private autenticationService: AuthenticationService, private routes: RouteInformation,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let login = this.autenticationService.getUserUsername();
        if (!login) {
            this.router.navigate(['/login']);
            return false;
        }
        switch (login) {
            case 'admin': {
                this.routes.setRoutesAsAdmin();
                break;
            }
            case 'manager': {
                this.routes.setRoutesAsManager();
                break;
            }
            default: {
                this.routes.setRoutesAsUser();
                break;
            }
        }

      return this.autenticationService.getUserLoggedIn();
    }
}
