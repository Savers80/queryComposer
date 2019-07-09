import { ViewChild, ElementRef, ViewRef, ViewContainerRef  } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {  OnChanges, SimpleChanges} from '@angular/core';
import hljs from "highlight.js";


import { Chunk } from '../model/chunk';
import { v } from '@angular/core/src/render3';
@Component({
  selector: 'app-query-chunk',
  templateUrl: './query-chunk.component.html',
  styleUrls: ['./query-chunk.component.css']
})
export class QueryChunkComponent implements OnInit, OnChanges {


  @Input() chunk: Chunk;
  @ViewChild('el') el: ElementRef;
  @ViewChild('descrizione') descrizioneRef: ElementRef;
  descrizione_readonly:boolean = true;
  @ViewChild('alias') aliasRef: ElementRef;
  alias_readonly:boolean = true;
  @ViewChild('chunkRaw') chunkRawRef: ElementRef;

  constructor() { }

  ngOnInit() {
   // alert(JSON.stringify(this.chunk));
   hljs.initHighlightingOnLoad();
  }

   ngOnChanges(changes: SimpleChanges) {
    // alert("ciao");
   }

createChunk(){
    let newline = "\n"; //String.fromCharCode(13, 10);
    let out:string = newline;
    let descr_chunks:string[] = this.descrizioneRef.nativeElement.value.split(" ")
    let max_column :number = 80;
    let index_column:number=0;
    let out_descr:string="";
    descr_chunks.forEach(element => {
      if (index_column ==0){
        out_descr +=  newline+ '<b>--#DSCR#</b> ';
        index_column += '--#DSCR# '.length;
      }else if (index_column< max_column){
        out_descr += element + " ";
        index_column += element.length +1;
      }else{
        index_column = 0;
        out_descr += element + " ";
      }
    });
    
    out += out_descr +newline;
    out += '--#DROP# DROP TABLE ' + this.aliasRef.nativeElement.value.trim() + newline;
    let queryChunks:string[]  = this.el.nativeElement.textContent.split("\n");
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
    
   // element.innerHTML =  hljs.highlightAuto(element.textContent).value ;
    console.log ("getNearText");
    return;
  }
  getPosition(event:HTMLElement){
    let element:Element = event; 
    console.log(window.getSelection().getRangeAt(0));
    let range = window.getSelection().getRangeAt(0);
    console.log(range);
    let preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    console.log(preCaretRange);
    let caretOffset = preCaretRange.toString().length
    let textContent:String = element.textContent;
    console.log('textContent:' +textContent);
    let endIndex:number = textContent.indexOf(" ", caretOffset );
    console.log('end:' +endIndex);
    console.log(textContent.substr(0,caretOffset));
    let index_start:number = new String(textContent.substr(0,caretOffset)).lastIndexOf(" ");
    index_start = index_start ===-1? 0:index_start;
    console.log('index_start:' + index_start);
    console.log( textContent.substr(index_start,endIndex-index_start)  );
    
         /*
    let textContent_orig:String = element.textContent;
    let str_list:string[] = textContent_orig.split(" ");
    let statement:string[] = ['select', 'from', 'as', 'where', 'order','by', 'over','partition'];
    let html_out:string =  "";

    let a:RegExp = new RegExp('(from)|(select)');

    str_list.forEach(element => {
      if ( statement.includes(element.toLocaleLowerCase(),0) ){
        html_out += "<b style='color:blue'>" + element.toLocaleUpperCase() + "</b>";
      }else {
        html_out += element;
      }
      html_out += " ";
    });
    element.innerHTML = textContent_orig.replace(a,"<b style='color:blue'>$1</b>");
    */
  }


   keyHandler(e:KeyboardEvent) {
    var tabkey = 9;
    let element:HTMLInputElement = <HTMLInputElement> e.target;
    
    if (e.ctrlKey == true) {
      if (e.keyCode == 32) {
        this.getPosition(element);
      }
    }else {
      if (e.keyCode == tabkey) {
          e.preventDefault();
          element.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
          return false;
        }
        else{
        // element. (element.children());
        // element.r innerHTML =  hljs.highlightAuto( element.textContent).value;
        }
        console.log(e);
        console.log(element);
        element.setSelectionRange(element.innerHTML.length,element.innerHTML.length, 'forward') ;
    }
 
  }
}