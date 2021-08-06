import { ConstantPool } from '@angular/compiler';
import {Location} from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ssr-demo';
  showFiller = false;

  public isApp = false;
  public isBack = false;

  constructor(
    private router: Router,
    private _location: Location,
    public route : ActivatedRoute
  ) { 

    router.events.subscribe(event => {
      
      //window.scrollTo(0, 0);

      // if(this.router.url == '/' || this.router.url == '/home'){
      //   this._document.getElementById("snowflakeContainer").classList.remove("hidden");
      // }
      // else{
      //   this._document.getElementById("snowflakeContainer").classList.add("hidden");
      // }

    });


  }

  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {

        var title =  parent.snapshot.data.title;
        if(title != ""){
          data.push(parent.snapshot.data.title);
        }        
    }

    if (state && parent) {
      var title1 = this.getTitle(state, state.firstChild(parent));
      
      if(title1.length > 0){
        title1.forEach(element => {
          data.push(element);
        });
      }
    }

    return data;
  }

  changeOfRoutes(){
    var headerArr = this.getTitle(this.router.routerState, this.router.routerState.root);
    var header = headerArr[headerArr.length-1];
    if(header == "main"){
      this.isBack = false;
    }
    else{
      this.isBack = true;
    }
  }

  navigateBack(){
    this._location.back();
  }

}


