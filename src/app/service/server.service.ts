import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/common-response';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  private readonly apiUrl='any';

  constructor(private http:HttpClient) { }

  getservers$= <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log),
    catchError(this.handelError)
  );

  save$= (server:Server)=> <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/save/`,server)
  .pipe(
    tap(console.log),
    catchError(this.handelError)
  );

  ping$= (ipAddress:string)=> <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/ping/${ipAddress}`)
  .pipe(
  tap(console.log),
  catchError(this.handelError)
  );


  filter$= (status:Status,response:CustomResponse)=> <Observable<CustomResponse>>
  new Observable<CustomResponse>(
  subscribe=>{
    console.log(response);
    subscribe.next(
      status===Status.ALL?{...response,message:`Server filtered by ${status} status`}:
      {...response,
      message:response.data.servers.filter(server=>server.status===status).length > 0 ? //YES:NO 
      //here YES= `Servers filterd by ${status===Status.SERVER_UP ? 'SERVER UP' :'SERVER_DOWN'} status`
          // NO= `No Server  ${status} Found`
            `Servers filterd by ${status===Status.SERVER_UP ? 'SERVER UP' :'SERVER_DOWN'} status`:`No Server  ${status} Found`,
            data:{
              servers:response.data.servers.filter(server=>server.status===status)
            }
      }
    );
    subscribe.complete();
  }

  ).pipe(
  tap(console.log),
  catchError(this.handelError)
  );

  delete$= (serverId:number)=> <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/ping/${serverId}`)
  .pipe(
  tap(console.log),
  catchError(this.handelError)
  );


 private  handelError(error: HttpErrorResponse): Observable<never> {
   console.log(error);
    throw new Error('Method not implemented.');
  }

}
