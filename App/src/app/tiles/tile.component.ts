import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Letter } from '../letter';
import { LetterService } from '../service/letter.service';
import { Csvexporter } from '../service/csvexporter';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  public form: FormGroup;
  public letters: Letter[] = [];
  @Output()
  public info = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private service: LetterService, private exporter: Csvexporter) {
    this.form = this.fb.group({
      sort: new FormControl(null)
    });
  }

  ngOnInit(): void {
    // console.log("zadanie");
    const sort = localStorage.getItem('sort');
    this.service.getAll(sort).subscribe(her => this.letters = her);
  }

  send(str: string) {
    this.info.emit(str);
  }

  description(letter: Letter): string {
    return 'Id : ' + letter.id + ' | Character: ' + letter.character + ' | Description: ' + letter.description;
  }

  downloadCSV() {
    this.exporter.downloadCSV(this.letters);
  }
  onSubmit() {
    // console.log("sort i filtr");
    const sort = this.form.controls.sort.value;
    localStorage.setItem('sort', sort);
    this.service.getAll(sort).subscribe(response => this.letters = response);
  }

  public clear() {
    this.form = this.fb.group({
      sort: new FormControl(null),
      filtr: new FormControl(null)
    });

    localStorage.removeItem('sort');
    this.service.getAll().subscribe(response => this.letters = response);
  }
}
