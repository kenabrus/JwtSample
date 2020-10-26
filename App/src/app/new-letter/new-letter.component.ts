import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Letter } from '../letter';
import { LetterService } from '../service/letter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-letter',
  templateUrl: './new-letter.component.html',
  styleUrls: ['./new-letter.component.css']
})
export class NewLetterComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private service: LetterService, private router: Router) {
    this.form = this.fb.group({
      id: new FormControl(null),
      character: new FormControl(null),
      description: new FormControl(null),
      imagePath: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const newElement = this.form.value as Letter;
    console.log(newElement);
    this.service.post(newElement).subscribe(response => { console.log(response); });
    this.router.navigate(['/letters']);
  }
}
