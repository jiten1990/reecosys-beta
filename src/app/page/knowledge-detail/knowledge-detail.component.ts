import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { SwiperOptions } from 'swiper';

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

  ngOnInit() {

    if(this.router.url.indexOf("app") > -1){
      this.isApp = true;
    }

    this.knowledge = this.state.get(knowledgeDetailsKey, null as any);
    this.route.paramMap.subscribe(params => {
      // this.knowledge = this.state.get(knowledgeDetailsKey, null as any);
      if(!this.knowledge){
        this.loadKnowledgeDetails();
      }
    })
  } 

  public isLoading = false;

  public knowledge : any = {};

  loadKnowledgeDetails() {
    // this.categoryObj = {};
    this.isLoading = true;
    this.knowlegeService.knowledgedetails(this.route.snapshot.params['post_id']).subscribe((response: any) => {
        if (response.success == 1) {
          this.knowledge = response.post;
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
