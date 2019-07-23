import { Component,ViewChild, ElementRef , Input } from '@angular/core';
import {  OnChanges,OnInit, SimpleChanges} from '@angular/core';
import { Chunk} from '../model/chunk';

@Component({
  selector: 'qc-file',
  templateUrl: './qc-file.component.html',
  styleUrls: [ './qc-file.component.scss' ]
})
export class QcFileComponent  implements OnInit , OnChanges {
  name = 'Angular 6';

  public chunks_list:Chunk[] ;

  ngOnInit() {
    this.chunks_list = [];
    let chunk:Chunk = new Chunk();
    chunk.alias = "alias onInit ";
    chunk.query = "SELECT *"
                  +"FROM TableRef";
    chunk.descrizione = "descrizione onInit While Flex-Layout makes every attempt to assign smart, valid flexbox stylings... some usages and some browsers will manifest layout issues."
      +"CanIuse.com reports and tracks many browsers issues using FlexBox; especially with IE browsers and Column stacking layouts."
    +"Developers should consult the Known Issues and the Resources sections.";
    this.chunks_list.push(chunk);
  }

  ngOnChanges(changes: SimpleChanges) {
    //alert("ciao");
  }
getChunkList():Chunk[]{
  return this.chunks_list ;
}
  addChunk(){
    let chunk:Chunk = new Chunk();
    let index:number = this.chunks_list.length;
    chunk.alias = "alias_1 ";
    chunk.descrizione = 'descrizione_1';
    this.chunks_list.push(chunk);
  }

}
