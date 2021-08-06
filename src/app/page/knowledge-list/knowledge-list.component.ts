import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/_services/knowledge.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const knowledgeKey = makeStateKey('knowledgeListing');

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent implements OnInit {

  constructor(
    private knowlegeService: KnowledgeService,
    private state: TransferState
  ) { }

  ngOnInit() {
    this.knowledgeListing = this.state.get(knowledgeKey, null as any);
    if(!this.knowledgeListing){
      this.getKnowledges();
    }
  }

  public isLoading : boolean = false;

  public knowledgeListing = [];

  getKnowledges() {
    // this.categoryObj = {};
    this.isLoading = true;
    this.knowlegeService.knowledgeListing().subscribe((response: any) => {
        if (response.success == 1) {
            this.knowledgeListing = response.posts;
            this.state.set(knowledgeKey, response.posts as any);
        }
        else {
        }
        this.isLoading = false;
    });
  }

}
