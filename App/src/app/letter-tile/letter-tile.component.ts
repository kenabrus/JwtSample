import { Component, OnInit, Input } from '@angular/core';
import { LetterService } from '../service/letter.service';
import { AuthService } from '../service/authservice';
import { Letter } from '../letter';
@Component({
  selector: 'app-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.css']
})
export class LetterTileComponent implements OnInit {

  @Input()
  public letter: Letter;
  public role: boolean;

  constructor(private service: LetterService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.role = this.authservice.isAdmin();
  }

}
