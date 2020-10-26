import { Letter } from '../letter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LetterService } from '../service/letter.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.css']
})

export class EditLetterComponent implements OnInit {
  public form: FormGroup;
  public id: number;
  public load = false;
  public letter?: Letter;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private letterService: LetterService, private router: Router) {
    this.form = this.fb.group({
      id: new FormControl(null),
      character: new FormControl(null),
      description: new FormControl(null),
      imagePath: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { this.id = +params.get('id'); });
    this.letterService.get(this.id).subscribe(response => {
    this.letter = response; console.log(this.letter);
    this.load = true;

    this.form.controls.id.setValue(this.letter.id);
    this.form.controls.character.setValue(this.letter.character);
    this.form.controls.description.setValue(this.letter.description);
    this.form.controls.imagePath.setValue(this.letter.imagePath);
    });
  }

  onSubmit() {
    const newLetter = this.form.value as Letter;
    console.log('Edycja');
    if (newLetter.id == null) { newLetter.id = this.letter.id; }
    if (newLetter.character == null) { newLetter.character = this.letter.character; }
    if (newLetter.description == null) { newLetter.description = this.letter.description; }
    if (newLetter.imagePath == null) { newLetter.imagePath = this.letter.imagePath; }
    console.log(newLetter);
    this.letterService.put(this.id, newLetter).subscribe(
      response => { console.log(response);
       });
    this.router.navigate(['/letters']);
  }

}
