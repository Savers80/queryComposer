import { ViewChild, ElementRef  } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {  OnChanges, SimpleChanges} from '@angular/core';
import { Chunk } from '../model/chunk';
@Component({
  selector: 'app-query-chunk',
  templateUrl: './query-chunk.component.html',
  styleUrls: ['./query-chunk.component.css']
})
export class QueryChunkComponent implements OnInit, OnChanges {

  @Input() chunk: Chunk;
  @ViewChild('descrizione') descrizioneRef: ElementRef;
  @ViewChild('alias') aliasRef: ElementRef;
  @ViewChild('chunkRaw') chunkRawRef: ElementRef;

  constructor() { }

  ngOnInit() {
   // alert(JSON.stringify(this.chunk));
  }
   ngOnChanges(changes: SimpleChanges) {
     alert("ciao");
   }

createChunk(){
    let newline = "\n"; //String.fromCharCode(13, 10);
    let out:string = newline;
    out += '--#DSCR# ' + this.descrizioneRef.nativeElement.value.trim() + newline;
    out += '--#DROP# DROP TABLE ' + this.aliasRef.nativeElement.value.trim() + newline;
    let queryChunks:string[]  = this.chunkRawRef.nativeElement.value.split("\n");
    for (let entry of queryChunks) {
      entry = entry.trim();
      if(entry !== undefined){
        if (entry.match('FROM')){
          out += '\t\t INTO '+ this.aliasRef.nativeElement.value + newline;
        }
        out += entry + newline;
      }

    }
    return out;
  }
}