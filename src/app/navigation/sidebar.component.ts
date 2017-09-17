import {Component, OnInit} from '@angular/core';
import {RouteInformation} from "../RouteInfo";
import {LanguageService} from "../language.service";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor(private routeInfo: RouteInformation, private languageService: LanguageService) {
    }

    menuItems: any[];

    ngOnInit() {
        this.menuItems = this.routeInfo.getRoutes();
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    setLanguage(value) {
        this.languageService.language.next(value);
    }
}
