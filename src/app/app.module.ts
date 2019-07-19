import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatToolbarModule, MatTooltipModule,MatInputModule,MatFormFieldModule,MatIconModule,MatSidenavModule, MatListModule, MatTableModule, MatHeaderRow, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QueryComposerComponent } from './query-composer/query-composer.component';
import { QueryChunkComponent } from './query-chunk/query-chunk.component';
import {Chunk} from './model/chunk'
import { from } from 'rxjs';

@NgModule({
  imports:      [ 
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule
    ],
    exports:      [ 
      MatHeaderRow
    ],
    providers:[
      
    ],
  declarations: [ AppComponent, HelloComponent, QueryComposerComponent, QueryChunkComponent ],
  bootstrap:    [ QueryComposerComponent ]
})
export class AppModule { }
