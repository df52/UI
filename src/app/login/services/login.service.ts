import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../../common/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class LoginService {

    constructor(private http: Http) { }

    login(_config: any): Observable<any> {
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            'username': _config.Username,
            'password': _config.Password
        });

        const _response$ = this.http.post(Constant.loginUrl, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    register(_config: any): Observable<any> {
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let body = JSON.stringify({
            'username': _config.Username,
            'email': _config.Email,
            'password': _config.Password
        });

        const _response$ = this.http.post(Constant.registerUrl, body, { headers: _headers });
        return _response$.map(res => res);
    }

    getUserDetails(_userId): Observable<any> {
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.getUserById + '/' + _userId, { headers: _headers });
        return _response$.map(res => res);
    }
}