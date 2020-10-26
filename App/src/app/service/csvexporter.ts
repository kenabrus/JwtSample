import { Injectable } from '@angular/core';
import { Letter } from '../letter';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
@Injectable({
    providedIn: 'root',
})
export class Csvexporter {
    csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Letter List :',
        useBom: true,
        noDownload: false,
        headers: ['Id', 'Character', 'Description', 'Image Path']
      };

      downloadCSV(letters: Letter[]){
        // this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
        // tslint:disable-next-line:no-unused-expression
        new AngularCsv(letters, 'LetterList', this.csvOptions);
      }
}
