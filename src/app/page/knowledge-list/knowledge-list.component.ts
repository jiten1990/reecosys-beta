import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';
// import { NgxResponsiveEmbedComponent } from 'ngx-responsive-embed';

const knowledgeKey = makeStateKey('knowledgeListing');

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private knowlegeService: KnowledgeService,
    private state: TransferState
  ) { }

  public isApp = false;

  ngOnInit() {
    
    if(this.router.url.indexOf("app") > -1){
      this.isApp = true;
    }

    this.knowledgeListing = this.state.get(knowledgeKey, null as any);
    if(!this.knowledgeListing){
      this.getKnowledges();
    }

  }

  public config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  public playerOptions = {
    hideControls: true,
    disableContextMenu : true,
    autoplay : false,
    muted: true,
  }

  public isLoading : boolean = false;

  public knowledgeListing = [];

  public page = 1;
  public limit = 10;

  getKnowledges() {

    // this.categoryObj = {};

    if(!this.isLoading){
      this.isLoading = true;
      this.knowlegeService.knowledgeListing(this.page, this.limit).subscribe((response: any) => {
          if (response.success == 1) {

            if(!this.knowledgeListing){
              this.knowledgeListing = response.posts;
              this.state.set(knowledgeKey, response.posts as any);
            }
            else{
              response.posts.forEach(element => {
                  this.knowledgeListing.push(element);
              });
            }

            this.page = this.page+1;
            // this.state.set(knowledgeKey, response.posts as any);    
              
          }
          else {
          }
          this.isLoading = false;
      });
    }
  }

}
