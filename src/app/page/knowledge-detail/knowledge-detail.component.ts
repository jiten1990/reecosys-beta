import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { SwiperOptions } from 'swiper';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';

const knowledgeDetailsKey = makeStateKey('knowledge');

@Component({
  selector: 'app-knowledge-detail',
  templateUrl: './knowledge-detail.component.html',
  styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private knowlegeService: KnowledgeService,
    private route: ActivatedRoute,
    private state: TransferState
  ) { }

  public isApp = false;   
  
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

  public isReadMore : boolean = false;

  ngOnInit() {

    this.isReadMore = false;

    if(this.router.url.indexOf("app") > -1){
      this.isApp = true;
    }

    // this.knowledge = this.state.get(knowledgeDetailsKey, null as any);
    this.route.paramMap.subscribe(params => {
       this.knowledge = {};
       window.scrollTo(0, 0);
      // this.knowledge = this.state.get(knowledgeDetailsKey, null as any);
      // if(!this.knowledge){
        this.loadKnowledgeDetails();
      // }
    })
  } 

  public page = 2;
  public limit = 15;

  public otherFilterObj = {
    tag_id : ""
  };

  public knowledgeListing = [];

  public isLoadingSimilar = false;

  getKnowledges() {
    if(!this.isLoadingSimilar){
      this.isLoadingSimilar = true; 

      console.log(this.otherFilterObj, "tags");

      this.knowlegeService.knowledgeListing(this.page, this.limit, this.otherFilterObj).subscribe((response: any) => {
          if (response.success == 1) {

            if(!this.knowledge.posts){
              this.knowledge.posts = response.posts;  
            }
            else{
              response.posts.forEach(element => {
                  this.knowledge.posts.push(element);
              });
            }
            this.page = this.page+1; 
          }
          else {
          }
          this.isLoadingSimilar = false;
      });
    }
  }


  readMoreContent(){
      this.isReadMore = true;
  }
  readLessContent(){
     this.isReadMore = false;
  }

  public isLoading = false;

  public knowledge : any = {};

  loadKnowledgeDetails() {
    // this.categoryObj = {};
    this.isLoading = true;
    this.knowlegeService.knowledgedetails(this.route.snapshot.params['post_id']).subscribe((response: any) => {
        if (response.success == 1) {
          this.knowledge = response.post;

          var tagArray = [];
          this.knowledge.tags.forEach(tag => {
              tagArray.push(tag.tag_id);
          });

          this.otherFilterObj.tag_id = tagArray.join(",");

          this.knowledge.posts = response.posts;
          this.state.set(knowledgeDetailsKey, response.post as any);
          if(!this.isApp){
            this.state.set(knowledgeDetailsKey, null as any);
          }
        }
        else {
        }
        this.isLoading = false;
    });
  }

}
