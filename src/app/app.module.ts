import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatToolbarModule, MatTooltipModule,MatInputModule,MatFormFieldModule,MatIconModule,MatSidenavModule, MatListModule, MatTableModule, MatHeaderRow, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import { HelloComponent } from './hello.component';
import { QueryComposerComponent } from './query-composer/query-composer.component';
import { QueryChunkComponent } from './query-chunk/query-chunk.component';
import { QcFileComponent } from './qc-file/qc-file.component';
import { QcWorkspaceComponent } from './qc-workspace/qc-workspace.component';

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
  declarations: [ HelloComponent, QueryComposerComponent, QueryChunkComponent, QcFileComponent, QcWorkspaceComponent ],
  bootstrap:    [  QcWorkspaceComponent ]
})
export class AppModule { }
