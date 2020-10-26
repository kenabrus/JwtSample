import { Component, OnInit, Input } from '@angular/core';
import { Letter } from '../letter';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '../service/letter.service';
import { AuthService } from '../service/authservice';
@Component({
  selector: 'app-one-letter',
  templateUrl: './one-letter.component.html',
  styleUrls: ['./one-letter.component.css']
})
export class OneLetterComponent implements OnInit {
  private id: number;
  public letter: Letter;
  public load = false;
  public role: boolean;

  constructor(private route: ActivatedRoute, private service: LetterService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.id = +params.get('id'); });
    this.service.get(this.id).subscribe(response => {this.letter = response; this.load = true; });
    this.role = this.authservice.isAdminwithoutroute();
  }
}
