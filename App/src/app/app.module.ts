import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TileComponent } from './tiles/tile.component';
import { VievComponent } from './viev/viev.component';
import { LetterService } from './service/letter.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { OneLetterComponent } from './one-letter/one-letter.component';
import { NewLetterComponent } from './new-letter/new-letter.component';
import { LetterTileComponent } from './letter-tile/letter-tile.component';
import { EditLetterComponent } from './edit-letter/edit-letter.component';
import { DeleteLetterComponent } from './delete-letter/delete-letter.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TileComponent,
    VievComponent,
    LetterTileComponent,
    NewLetterComponent,
    OneLetterComponent,
    EditLetterComponent,
    DeleteLetterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'], // 5000
        blacklistedRoutes: []
      }
    })
  ],
  providers: [LetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
