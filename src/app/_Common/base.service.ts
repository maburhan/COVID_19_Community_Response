import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAppUser, AppNavigation } from "./models";
import { endpoints } from "./constants";


const KEY_PREFIX = "AcPortal_App_";
type StorageType = "local" | "session";

let apiBaseUrl = window['ACPortal_API_Base_URL'];

let _userDetails: IAppUser = (() => {
    const request = new XMLHttpRequest();
    const handleError = (e) => {
        console.log(e);
        console.log(request);
        window.location.reload(true);
    };
    try {
        request.open('GET', `${apiBaseUrl}${endpoints.userDetails}`, false);
        request.withCredentials = true;
        request.send();
        if (request.status === 200) {
            try {
                return JSON.parse(request.responseText);
            } catch (e) {
                handleError(e);
            }
        } else {
            throw new Error(`Invalid Status: ${request.status}, while requesting for UserDetials info.`);
        }
    } catch (e) {
        handleError(e);
    }

})();

const getUserEntityId = (user: IAppUser): number => {
    if (user.impersonatedUser !== null || user.impersonatedUser) {
        return user.impersonatedUser.entityID;
    }
    return user.entityID;
}


@Injectable()
export class BaseService {

    apiBaseUrl: string = '/_api/';

    private _storageType: StorageType = "local";

    constructor(protected http: HttpClient) {
        this.apiBaseUrl = apiBaseUrl;
    }

    set storageType(val) { this._storageType = val; }

    get storage(): Storage {
        return this._storageType === 'local' ? window.localStorage : window.sessionStorage;
    }

    get userEntityId() { return getUserEntityId(_userDetails); }

    private get httpOptions(): { headers?: HttpHeaders; withCredentials?: boolean; } {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        httpHeaders.set('Accept', 'application/json');
        return {
            headers: httpHeaders,
            withCredentials: true,
        };
    }

    public static UserDetails = (): IAppUser => {
        return _userDetails;
    }

    private UpdateUserDetails() {
        this.get<IAppUser>(endpoints.userDetails).subscribe((user) => {
            _userDetails = user;
        });
    }

    private setStorageItem(key: string, data: any) {
        const lKey = (`${KEY_PREFIX}${this.userEntityId}_${key}`).toUpperCase();
        this.storage.setItem(lKey, JSON.stringify(data));
    }

    private getStorageItem(key: string): any {
        const lKey = (`${KEY_PREFIX}${this.userEntityId}_${key}`).toUpperCase();
        const data = this.storage.getItem(lKey);
        if (typeof data !== 'string') { return; }
        try {
            return JSON.parse(data);
        } catch (e) {
            return;
        }
    }

    protected post<TEntity>(
        endpoint: string,
        payload: any,
        options: { refresh?: boolean, storageType?: StorageType } = {}
    ): Observable<TEntity> {
        const obs$ = this.http.post<TEntity>(`${this.apiBaseUrl}${endpoint}`, payload, this.httpOptions);
        return this.processObservable(endpoint, obs$, options);
    }

    private processObservable<TEntity>(
        endpoint: string,
        obs$: Observable<TEntity>,
        options: { refresh?: boolean, storageType?: StorageType } = {}
    ): Observable<TEntity> {

        const { refresh, storageType } = options;
        const key = endpoint.replace(/\//g, '.');

        return Observable.create((obs) => {
            const data = this.getStorageItem(key);
            if (refresh !== true && typeof data !== 'undefined') {
                obs.next(data);
            }
            obs$.subscribe(
                (res) => {
                    if (JSON.stringify(data) !== JSON.stringify(res)) {
                        this.setStorageItem(key, res);
                        obs.next(res);
                    } else if (refresh === true) {
                        obs.next(res);
                    }
                }
                , (err) => {
                    obs.error(err);
                }
                , () => {
                    obs.complete();
                }
            );
        });
    }

    protected get<TEntity>(
        endpoint: string,
        options: { refresh?: boolean, storageType?: StorageType } = {}
    ): Observable<TEntity> {
        const obs$ = this.http.get<TEntity>(`${this.apiBaseUrl}${endpoint}`, this.httpOptions);
        return this.processObservable(endpoint, obs$, options);
    }

    get AppNavigation(): AppNavigation {
        return window['AppNavigation'];
    }
}

