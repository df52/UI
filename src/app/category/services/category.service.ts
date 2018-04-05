import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../../common/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoryService {
    constructor(private http: Http) {

    }

    addCategory(_config: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "name": _config.Category,
            "description": _config.CategoryDescription,
            "type": _config.CategoryType
        });

        const _response$ = this.http.post(Constant.apiEndpoint + '/Accounts/' + accoundId + '/Category' + '?access_token=' + token, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    addSubCategory(_config: any, categoryId): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({

            "name": _config.Subcategory,
            "description": _config.SubCategoryDescription,
            "parent_type": _config.Category,
            "type": _config.SubCategoryType
        });

        const _response$ = this.http.post(Constant.apiEndpoint + '/Categories/' + categoryId + '/sub-categories' + '?access_token=' + token, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    getCategoriesByAccountId(): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.apiEndpoint + '/Accounts/' + accoundId + '/Category' + '?access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    getCategoriesInrange(_config: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.getCategoriesInRange +
            '?accountId=' + accoundId + '&from=' + _config.from + '&to=' + _config.to + '&access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    getTopCategories(_top: number): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.getTopCategories +
            '?accountId=' + accoundId + '&top=' + _top + '&access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    getSubCategoriesByCategoryId(categoryId): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.apiEndpoint + '/Categories/' + categoryId + '/sub-categories' + '?access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    deleteCategory(category: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.delete(Constant.apiEndpoint + '/Accounts/' + category.accountId + '/Category/' + category.id + '?access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    editCategory(_config: any) {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "name": _config.Category,
            "description": _config.CategoryDescription,
            "type": _config.CategoryType
        });

        const _response$ = this.http.put(Constant.apiEndpoint + '/Accounts/' + accoundId + '/Category/' + _config.categoryId + '?access_token=' + token, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    editSubCategory(_config: any) {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        let _body = JSON.stringify({
            "name": _config.Subcategory,
            "description": _config.SubCategoryDescription,
            "type": _config.SubCategoryType
        });

        const _response$ = this.http.put(Constant.apiEndpoint + '/Categories/' + _config.categoryId + '/sub-categories/' + _config.subCategoryId + '?access_token=' + token, _body, { headers: _headers });
        return _response$.map(res => res);
    }

    deleteSubCategory(_config: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.delete(Constant.apiEndpoint + '/Categories/' + _config.categoryId + '/sub-categories/' + _config.id + '?access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    getTypeHeadSearch(_config: any): Observable<any> {
        let token = localStorage.getItem('access_Token');
        var accoundId = JSON.parse(localStorage.getItem('user')).id;
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.get(Constant.searchTypeAhead + '?accountId=' + accoundId + '&pattern=' + _config.pattern + '&limit=' +
            _config.limit + '&access_token=' + token, { headers: _headers });
        return _response$.map(res => res);
    }

    signOut(token): Observable<any> {
        var _headers = new Headers();

        _headers.append('Content-Type', 'application/json');

        const _response$ = this.http.post(Constant.signOut + '?access_token=' + token, '', { headers: _headers });
        return _response$.map(res => res);
    }
}