import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { AppRouter } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterseptor } from "../shared/auth.interseptor";
import { LoggingInterseptor } from "../shared/logging.interseptor";

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRouter
    ],
    exports: [
        HeaderComponent,
        AppRouter
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterseptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterseptor, multi: true }
    ]
})
export class CoreModule {}