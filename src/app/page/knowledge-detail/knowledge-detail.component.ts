import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from 'src/app/_services/knowledge.service';

@Component({
  selector: 'app-knowledge-detail',
  templateUrl: './knowledge-detail.component.html',
  styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent implements OnInit {

  constructor(
    private knowlegeService: KnowledgeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadKnowledgeDetails();
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
        }
        else {
        }
        this.isLoading = false;
    });
  }

}
