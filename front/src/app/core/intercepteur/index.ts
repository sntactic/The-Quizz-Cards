import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthIntercepteur } from "./auth_intercepteur";

export const HttpIntercepteurProviders = [
    {provide : HTTP_INTERCEPTORS , useClass : AuthIntercepteur , multi : true}
]