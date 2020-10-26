import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LetterService } from '../service/letter.service';
@Component({
  selector: 'app-delete-letter',
  templateUrl: './delete-letter.component.html',
  styleUrls: ['./delete-letter.component.css']
})
export class DeleteLetterComponent implements OnInit {

  private id: number;
  public success = false;

  constructor(private activatedRoute: ActivatedRoute, private letterService: LetterService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {this.id = +params.get('id'); });
    this.letterService.delete(this.id).subscribe(result => this.success = result);
  }
}
