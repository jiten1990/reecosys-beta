import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getUserProfile();
    })
  }

  public isLoading = false;

  public profile = {};

  getUserProfile() {

    if(!this.isLoading){

      this.isLoading = true;

      var user_id = this.route.snapshot.params['user_id'];

      this.knowlegeService.getUserProfile(user_id).subscribe((response: any) => {
        if (response.success == 1) {
          this.profile = response.user;
        }

        console.log(this.profile, "profile page");

        this.isLoading = false;

      });
    }

  }

}
