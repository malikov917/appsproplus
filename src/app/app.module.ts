import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {SidebarModule} from './navigation/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import {NguiMapModule} from '@ngui/map';
import {TableComponent} from './table/table.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationInfoComponent} from './application-info/application-info.component';
import {ShopInfoComponent} from './shop-info/shop-info.component';
import {AuthGuard} from "./auth-guard.guard";
import {AuthenticationService} from "./autentication.service";
import {NewsComponent} from './news/news.component';
import {SalesComponent} from './sales/sales.component';
import {GalleryComponent} from './gallery/gallery.component';
import {BasketComponent} from './basket/basket.component';
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductsModalComponent} from './modals/products-modal/products-modal.component';
import {CategoriesModalComponent} from './modals/categories-modal/categories-modal.component';
import {CommentsComponent} from './comments/comments.component';
import {GalleryModalComponent} from './modals/gallery-modal/gallery-modal.component';
import {PipesModule} from "./shared/pipes/pipes.module";
import {SharedService} from "./shared-service";
import {SalesModalComponent} from "./modals/sales-modal/sales-modal.component";
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {OptionsComponent} from "./shared/components/options/options.component";
import {MessageModalComponent} from "./modals/message-modal/message-modal.component";
import {StoreService} from "./store.service";
import {AddMessageComponent} from "./shared/components/add-message/add-message.component";
import {TemplateComponent} from './application-info/template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ApplicationInfoComponent,
    ShopInfoComponent,
    NewsComponent,
    SalesComponent,
    GalleryComponent,
    BasketComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductsModalComponent,
    CategoriesModalComponent,
    CommentsComponent,
    GalleryModalComponent,
    SalesModalComponent,
    OptionsComponent,
    MessageModalComponent,
    AddMessageComponent,
    TemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [AuthGuard, AuthenticationService, SharedService, HttpService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
