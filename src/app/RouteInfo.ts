import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
/**
 * Created by Konstantin on 09.07.2017.
 */
export class RouteInfo {
    path: string;
    title: string;
    icon: string;
    styleClass: string;
}

@Injectable()
export class RouteInformation {
    ROUTES: RouteInfo[] = [
        {path: 'login', title: 'ENTER', icon: 'ti-clipboard', styleClass: ''},
    ];

    // Observable navItem source
    private _source = new BehaviorSubject<string>('login');
    // Observable navItem stream
    change = this._source.asObservable();
    // service command
    changeNav(navigation) {
        this._source.next(navigation);
    }

    setDefault() {
        this.deleteRoutes();
        this.ROUTES.push({path: 'login', title: 'ENTER', icon: 'ti-clipboard', styleClass: ''})
    }

    getRoutes(): RouteInfo[] {
        return this.ROUTES;
    }

    addRoutes(path, title, icon, styleClass) {
        this.ROUTES.push({path: path, title: title, icon: icon, styleClass: styleClass})
    }

    deleteRoute(title) {
        let index = this.ROUTES.findIndex(obj => obj.title == title);
        this.ROUTES.splice(index, 1);
    }

    deleteRoutes() {
        this.ROUTES.splice(0, this.ROUTES.length);
    }

    setRoutesAsAdmin() {
        this.deleteRoutes();
        this.ROUTES.push({path: 'table', title: 'Table List', icon: 'ti-view-list-alt', styleClass: ''});
        this.ROUTES.push({path: 'notifications', title: 'notifications', icon: 'ti-view-list-alt', styleClass: ''});
        this.ROUTES.push({path: 'typography', title: 'typography', icon: 'ti-view-list-alt', styleClass: ''});
        this.ROUTES.push({path: 'icons', title: 'icons', icon: 'ti-view-list-alt', styleClass: ''});
    }

    setRoutesAsManager() {
        this.deleteRoutes();
        this.ROUTES.push({path: 'table', title: 'Table List', icon: 'ti-view-list-alt', styleClass: ''})
    }

    setRoutesAsUser() {
        this.deleteRoutes();
        this.ROUTES.push({path: 'app-info', title: 'APP_INFO', icon: 'ti-user', styleClass: ''});
        this.ROUTES.push({path: 'shop-info', title: 'SHOP_INFO', icon: 'ti-user', styleClass: ''});
        this.ROUTES.push({path: 'news', title: 'NEWS', icon: 'ti-announcement', styleClass: ''});
        this.ROUTES.push({path: 'sales', title: 'SALES', icon: 'ti-star', styleClass: ''});
        this.ROUTES.push({path: 'categories', title: 'CATEGORIES', icon: 'ti-menu-alt', styleClass: ''});
        this.ROUTES.push({path: 'products', title: 'PRODUCTS', icon: 'ti-bag', styleClass: ''});
        this.ROUTES.push({path: 'comments', title: 'COMMENTS', icon: 'ti-comment', styleClass: ''});
        this.ROUTES.push({path: 'basket', title: 'BASKET', icon: 'ti-shopping-cart', styleClass: ''});
        this.ROUTES.push({path: 'gallery', title: 'GALLERY', icon: 'ti-gallery', styleClass: ''});
        this.ROUTES.push({path: 'maps', title: 'MAPS', icon: 'ti-location-pin', styleClass: ''});
    }

}
