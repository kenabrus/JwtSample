import { Letter } from './../letter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LetterService } from '../service/letter.service';
import { AuthService } from '../service/authservice';
import { Csvexporter } from '../service/csvexporter';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public form: FormGroup;
  public letters: Letter[] = [];
  public role: boolean;
  @Output()
  public info = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private service: LetterService, private authservice: AuthService, private exporter: Csvexporter) {
    this.form = this.fb.group({
      sort: new FormControl(null)
    });
  }

  ngOnInit(): void {
    const sort = localStorage.getItem('sort');
    this.service.getAll(sort).subscribe(response => this.letters = response);
    this.role = this.authservice.isAdmin();
  }

  send(str: string){
    this.info.emit(str);
  }

  description(letter: Letter): string {
    return 'Id : ' + letter.id + ' | Character: ' + letter.character + ' | Description: ' + letter.description;
  }

  downloadCSV(){
    this.exporter.downloadCSV(this.letters);
  }

  onSubmit(){
    const sort = this.form.controls.sort.value;
    localStorage.setItem('sort', sort);
    this.service.getAll(sort).subscribe(response => this.letters = response);
  }

  public clear(){
    this.form = this.fb.group({
      sort: new FormControl(null)
    });
    localStorage.removeItem('sort');
    this.service.getAll().subscribe(response => this.letters = response);
  }
}
