import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }


  knowledgeListing(page, limit) {
    const url = environment.apiUrl + 'services/dashboard_posts';
    let body = new HttpParams();
    body = body.append('maxWidth', '640');
    body = body.append('page', page);
    body = body.append('limit', limit);
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  knowledgedetails(post_id){
    const url = environment.apiUrl + 'services/post_data';
    let body = new HttpParams();
    body = body.append('maxWidth', '640');
    body = body.append('post_id', post_id);
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }
}
