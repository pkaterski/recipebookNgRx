import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

export class LoggingInterseptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // logs every response
        return next.handle(req).do(
            event => {
                console.log('Logging Interseptor', event['body'] || event);
            }
        )
    }
}