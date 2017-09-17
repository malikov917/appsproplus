import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./models/users";
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "./autentication.service";

@Injectable()
export class HttpService {
  private baseUri: string = 'http://35.157.244.150:5000/restapi/v1.1/';
  private catalogUser: string = 'catalog/user';
  private catalogShop: string = 'catalog/shop';
  private catalogApp: string = 'catalog/application';
  private catalogMessages: string = 'catalog/messages';
  private catalogCategory: string = 'catalog/categories';
  private catalogProducts: string = 'catalog/products';
  private catalogImage: string = 'catalog/image';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  /**
   * Получить список пользователей.
   * @returns {Observable<R|T>}
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUri.concat(this.catalogUser))
        .catch(this.handleError);
  }

  /**
   * Создать пользователя.
   * @param form
   * @returns {Observable<R|T>}
   */
  postUser(form: FormGroup): Observable<User> {
    return this.http.post(this.baseUri.concat(this.catalogUser), form.value)
        .catch(this.handleError);
  }

  /**
   * Обновить пользователя
   * @param id
   * @param form
   * @returns {Observable<R|T>}
   */
  putUser(id, form: FormGroup): Observable<User> {
    return this.http.put(this.baseUri.concat(this.catalogUser + '${id}'), form.value)
        .catch(this.handleError);
  }

  getShop(): Observable<any> {
    return this.http.get(this.baseUri.concat(this.catalogShop), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  postShop(form: FormGroup): Observable<any> {
    return this.http.post(this.baseUri.concat(this.catalogShop), {}, {headers: this.getAuthHeaders(form)})
        .catch(this.handleError);
  }

  putShop(form: FormGroup): Observable<any> {
    return this.http.put(this.baseUri
        .concat(this.catalogShop)
        .concat(`/${form.value['_id']}`), form.value, {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getApp(): Observable<any> {
    return this.http.get(this.baseUri.concat(this.catalogApp), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  postApp(form: FormGroup): Observable<any> {
    return this.http.post(this.baseUri.concat(this.catalogApp), {
      colorsheme: 0,
      iconpack: 0,
      layout: 0,
      "menuitems": [
        "Новости",
        "Акции",
        "Комментарии",
        "Галерея"
      ]
    }, {headers: this.getAuthHeaders(form)})
        .catch(this.handleError);
  }

  putApp(form: FormGroup): Observable<any> {
    return this.http.put(this.baseUri
        .concat(this.catalogApp)
        .concat(`/${form.value['_id']}`), form.value, {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getMessage(message: string): Observable<any> {
    const params = new HttpParams().set('category', message);
    return this.http.get(this.baseUri.concat(this.catalogMessages), {headers: this.getAuthHeaders(), params: params})
        .map(message => {
          const mess = <any>message;
          for (let i = 0; i < mess.length; i++) {
            for (let j = 0; j < mess[i].images.length; j++) {
              mess[i].images[j] = this.getImage(mess[i].images[j].id)
            }
          }
          return mess
        })
        .catch(this.handleError);
  }

  getMessageById(messageName, id): Observable<any> {
    const params = new HttpParams().set('category', messageName);
    return this.http.get(this.baseUri
        .concat(this.catalogMessages)
        .concat(`/${id}`), {headers: this.getAuthHeaders(), params: params})
        .map(messageBody => messageBody[0])
        .catch(this.handleError)
  }

  deleteMessage(id): Observable<any>  {
    return this.http.delete(this.baseUri
        .concat(this.catalogMessages)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  putMessage(messageName: string, messageBody: FormGroup): Observable<any> {
    const params = new HttpParams().set('category', messageName);
    return this.http.put(
        this.baseUri
        .concat(this.catalogMessages)
        .concat(`/${messageBody.value['_id']}`), messageBody.value, {headers: this.getAuthHeaders(), params: params})
        .catch(this.handleError)
  }

  postMessage(messageBody: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogMessages), messageBody.value, {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getImage(id): Observable<any> {
    return this.http.get(this.baseUri
        .concat(this.catalogImage)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .map(messageBody => messageBody['image'])
        .catch(this.handleError)
  }

  postCategory(form: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogCategory), form.value, {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getCategories(): Observable<any> {
    return this.http
        .get(this.baseUri.concat(this.catalogCategory), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  postProduct(form: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogProducts), form.value, {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getProducts(category?): Observable<any> {
    let params;
    if (category) {
      params = new HttpParams().set('category', category);
    }
    return this.http
        .get(this.baseUri.concat(this.catalogProducts), {headers: this.getAuthHeaders(), params: params})
        .map(items => {
          const item = <any>items;
          for (let i = 0; i < item.length; i++) {
            if (item[i].images) {
              for (let j = 0; j < item[i].images.length; j++) {
                item[i].images[j] = this.getImage(item[i].images[j].id)
              }
            }
          }
          return item
        })
        .catch(this.handleError);
  }

  deleteProduct(id): Observable<any>  {
    return this.http.delete(this.baseUri
        .concat(this.catalogProducts)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }


  private handleError(error: any): Promise<any> {
    console.info('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private getAuthHeaders(form?: FormGroup): HttpHeaders {
    let user;
    if (form) {
      user = {login: form.value['login'], password: form.value['password']};
    } else {
      user = this.auth.getLoginAndPassword();
    }
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(user.login + ':' + user.password));
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }
}
