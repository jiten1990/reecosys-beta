import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeDetailComponent } from './page/knowledge-detail/knowledge-detail.component';
import { KnowledgeListComponent } from './page/knowledge-list/knowledge-list.component';


const routes: Routes = [
  { 
      path: '',
      children: [
        { path: '', component: KnowledgeListComponent, data: { title : "main" }},
        { path: 'knowledge/:post_id', component: KnowledgeDetailComponent, data: { title : "back" }},
      ],
      data: { title : "main" }
  },
  {
      path: 'app',
      children: [
        { path: '', component: KnowledgeListComponent, data: { title : "main" }},
        { path: 'knowledge/:post_id', component: KnowledgeDetailComponent, data: { title : "back" }},
      ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }