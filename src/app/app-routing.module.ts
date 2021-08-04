import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgeDetailComponent } from './page/knowledge-detail/knowledge-detail.component';
import { KnowledgeListComponent } from './page/knowledge-list/knowledge-list.component';


const routes: Routes = [
  { path: '', component: KnowledgeListComponent},
  { path: 'knowledge/:post_id', component: KnowledgeDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }