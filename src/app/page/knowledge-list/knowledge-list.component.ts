import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from 'src/app/_services/knowledge.service';

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent implements OnInit {

  constructor(
    private knowlegeService: KnowledgeService,
  ) { }

  ngOnInit() {
    this.getKnowledges();
  }

  public isLoading : boolean = false;

  public knowledgeListing = [];

  getKnowledges() {
    // this.categoryObj = {};
    this.isLoading = true;
    this.knowlegeService.knowledgeListing().subscribe((response: any) => {
        if (response.success == 1) {
          this.knowledgeListing = response.posts;
        }
        else {
        }
        this.isLoading = false;
    });
  }

}
