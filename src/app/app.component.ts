import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/common-response';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  appState$: Observable<AppState<CustomResponse>>;

  title = 'server-management-frontend';

  constructor(private serverService:ServerService){}
  ngOnInit(): void{

    this.appState$=this.serverService.getservers$.pipe(
      map(response=>{
        return {
          dataState:DataState.LODED_STATE, appData:response
        }
      }),
      startWith({dataState:DataState.LODING_STATE}), // here we are seitting the observable to loading as may the network call take some time.
      catchError((error:string)=>{
        return of({dataState:DataState.ERROR_STATE,error})  // here we are setting the observable for error state
      })
    );
  }
  
}
