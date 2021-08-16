import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import Swiper, { SwiperOptions } from 'swiper';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';
// import { NgxResponsiveEmbedComponent } from 'ngx-responsive-embed';

const knowledgeKey = makeStateKey('knowledgeListing');
// const trendingKey = makeStateKey('knowledgeListing');

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private knowlegeService: KnowledgeService,
    private state: TransferState
  ) { }

  public isApp = false;

  ngOnInit() {
    
    if(this.router.url.indexOf("app") > -1){
      this.isApp = true;
    }
    

    //this.trendingPosts = this.state.get(trendingKey, null as any);

    // this.knowledgeListing = this.state.get(knowledgeKey, null as any);

    // if(!this.knowledgeListing){
      
    // }
    // if(!this.trendingPosts){

      this.route.paramMap.subscribe(params => {
        this.getKnowledges();
        if(!this.route.snapshot.params['tag_id']){
          this.getTrendingPosts();
        }
      })
    // }

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

  public configTrending :  SwiperOptions = {
    slidesPerView: 1.3,
    spaceBetween: 15,
    slidesOffsetBefore: 15,
    slidesOffsetAfter: 15,
    preloadImages: false,
    lazy: true
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
  public limit = 15;

  public otherFilterObj = {
    tag_id : ""
  };

  public firstLoading = true;

  getKnowledges() {

    // this.categoryObj = {};

    if(!this.isLoading){
      this.isLoading = true;
      
      if(this.route.snapshot.params['tag_id']){
        this.otherFilterObj.tag_id = this.route.snapshot.params['tag_id']
      }

      this.knowlegeService.knowledgeListing(this.page, this.limit, this.otherFilterObj).subscribe((response: any) => {
          if (response.success == 1) {

            if(!this.knowledgeListing){
              this.knowledgeListing = response.posts;
              // this.state.set(knowledgeKey, response.posts as any);
              this.firstLoading = false;
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


  public isLoadingTrending = false;

  public trendingPosts = [];

  getTrendingPosts() {

    // this.categoryObj = {};

    if(!this.isLoadingTrending){
      this.isLoadingTrending = true;
      this.knowlegeService.trendingListing().subscribe((response: any) => {
          if (response.success == 1) {
              this.trendingPosts = response.posts;
              //this.state.set(trendingKey, this.trendingPosts as any);
          }
          this.isLoadingTrending = false;
      });
    }
  }

}
