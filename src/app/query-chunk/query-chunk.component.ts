import { ViewChild, ElementRef, ViewRef, ViewContainerRef  } from '@angular/core';
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
  @ViewChild('el') el: ElementRef;
  @ViewChild('descrizione') descrizioneRef: ElementRef;
  @ViewChild('alias') aliasRef: ElementRef;
  @ViewChild('chunkRaw') chunkRawRef: ElementRef;

  constructor() { }

  ngOnInit() {
   // alert(JSON.stringify(this.chunk));
  }
   ngOnChanges(changes: SimpleChanges) {
    // alert("ciao");
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

  getNearText(event:Event):void{
    
   // alert(JSON.stringify(event));
    let element:Element = this.el.nativeElement;  
    console.log(window.getSelection().getRangeAt(0));
    let range = window.getSelection().getRangeAt(0);
    console.log(range);
    let preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    console.log(preCaretRange);
    let caretOffset = preCaretRange.toString().length
    let textContent:String = element.textContent;
    let endIndex:number = textContent.indexOf(" ", caretOffset );
    console.log('end:' +endIndex);
    console.log(textContent.substr(0,caretOffset));
    let index_start:number = new String(textContent.substr(0,caretOffset)).lastIndexOf(" ");
    index_start = index_start ===-1? 0:index_start;
    console.log('index_start:' + index_start);
    console.log( textContent.substr(index_start,endIndex-index_start)  );
    
  }

}