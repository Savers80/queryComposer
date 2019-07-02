import { Component,ViewChild, ElementRef , Input } from '@angular/core';
import {  OnChanges,OnInit, SimpleChanges} from '@angular/core';
import { Chunk} from './model/chunk';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  implements OnInit , OnChanges {
  name = 'Angular 6';

  chunks_list:Chunk[] ;

  ngOnInit() {
    this.chunks_list = [];
    let chunk:Chunk = new Chunk();
    chunk.alias = "alias onInit ";
    chunk.descrizione = 'descrizione onInit';
    this.chunks_list.push(chunk);
  }

  ngOnChanges(changes: SimpleChanges) {
    //alert("ciao");
  }


}
