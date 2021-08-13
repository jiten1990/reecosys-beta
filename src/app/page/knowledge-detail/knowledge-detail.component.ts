import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const knowledgeDetailsKey = makeStateKey('knowledge');

@Component({
  selector: 'app-knowledge-detail',
  templateUrl: './knowledge-detail.component.html',
  styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent implements OnInit {

  constructor(
    private knowlegeService: KnowledgeService,
    private route: ActivatedRoute,
    private state: TransferState
  ) { }


  
  ngOnInit() {


    if(this.knowledge.post_id != this.route.snapshot.params['post_id']){
        this.knowledge = this.state.get(knowledgeDetailsKey, null as any);
    }

    // console.log(this.knowledge, "know");
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
          // this.state.set(knowledgeDetailsKey, null as any);
        }
        else {
        }
        this.isLoading = false;
    });
  }

}
