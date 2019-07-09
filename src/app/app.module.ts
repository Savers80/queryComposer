import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatToolbarModule, MatTooltipModule,MatInputModule,MatFormFieldModule,MatIconModule,MatSidenavModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QueryComposerComponent } from './query-composer/query-composer.component';
import { QueryChunkComponent } from './query-chunk/query-chunk.component';
import {Chunk} from './model/chunk'

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
    MatListModule
    ],
    exports:      [ 
    ],
    providers:[
      
    ],
  declarations: [ AppComponent, HelloComponent, QueryComposerComponent, QueryChunkComponent ],
  bootstrap:    [ QueryComposerComponent ]
})
export class AppModule { }
