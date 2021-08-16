import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private knowlegeService: KnowledgeService,
    private state: TransferState
  ) { }

  @ViewChild('stickyMenu', {static:true}) menuElement: ElementRef;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getUserProfile();
    })
  }

  @HostListener('window:scroll', [])
    handleScroll(): void {
        const windowScroll = window.pageYOffset;
        if(windowScroll >= this.menuPosition){
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    }

  public isLoading = false;

  public profile : any = {};

  public activeAccordions : any = ['knowledge', 'work', 'education', 'interest', 'location', 'contact'];

  toggleAccorion(ele){
    var index = this.activeAccordions.indexOf(ele);
    if(index > -1){
        this.activeAccordions.splice(index, 1);
    }
    else{
        this.activeAccordions.push(ele);
    }
  }

  public sticky: boolean = false;

  getUserProfile() {

    if(!this.isLoading){

      this.isLoading = true;

      var user_id = this.route.snapshot.params['user_id'];

      this.knowlegeService.getUserProfile(user_id).subscribe((response: any) => {
        if (response.success == 1) {
          this.profile = response.user;
          this.otherFilterObj.tag_id = "";
          this.otherFilterObj.for_user_id = this.profile.user_id;
          this.getKnowledges();
        }
        
        this.isLoading = false;

      });
    }

  }

  menuPosition: any;

  ngAfterViewInit(){
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }


  public page = 1;
  public limit = 15;
  public otherFilterObj : any = {};

  public knowledgeListing = [];

  public isLoadingKnowledge = false;

  getKnowledges() {

    // this.categoryObj = {};

    if(!this.isLoadingKnowledge){
      this.isLoadingKnowledge = true;
      
      this.knowlegeService.knowledgeListing(this.page, this.limit, this.otherFilterObj).subscribe((response: any) => {
          if (response.success == 1) {

            if(!this.knowledgeListing){
              this.knowledgeListing = response.posts;
            }
            else{
              response.posts.forEach(element => {
                  this.knowledgeListing.push(element);
              });
            }
            this.page = this.page+1; 
          }
          else {
          }
          this.isLoadingKnowledge = false;
      });
    }
  }

}
