import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-knowledge-block',
  templateUrl: './knowledge-block.component.html',
  styleUrls: ['./knowledge-block.component.css']
})
export class KnowledgeBlockComponent implements OnInit {

  @Input() knowledge : any = {};

  constructor() { }

  ngOnInit() {
  }

}
