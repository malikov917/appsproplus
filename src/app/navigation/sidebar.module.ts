import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { RouteInformation } from "../RouteInfo";
import {PipesModule} from "../shared/pipes/pipes.module";

@NgModule({
    imports: [ RouterModule, CommonModule, PipesModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ],
    providers: [ RouteInformation ]
})

export class SidebarModule {}
