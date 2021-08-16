import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-knowledge-block',
  templateUrl: './knowledge-block.component.html',
  styleUrls: ['./knowledge-block.component.css']
})
export class KnowledgeBlockComponent implements OnInit {

  @Input() knowledge : any = {};

  public isApp : boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if(this.router.url.indexOf("app") > -1){
      this.isApp = true;
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

}
