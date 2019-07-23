import { Component, OnInit } from '@angular/core';
import { Chunk } from '../model/chunk';

@Component({
  selector: 'app-query-composer',
  templateUrl: './query-composer.component.html',
  styleUrls: ['./query-composer.component.css']
})
export class QueryComposerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
createChunk(chunk:Chunk){
  let newline = "\n"; //String.fromCharCode(13, 10);
  let out:string = newline;
  let descr_chunks:string[] = chunk.descrizione.split(" ");
  let max_column :number = 80;
  let index_column:number=0;
  let out_descr:string="";
  descr_chunks.forEach(element => {
    if (index_column ==0){
      out_descr +=  newline+ '--#DSCR# ';
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
  out += '--#DROP# DROP TABLE ' + chunk.alias.trim() + newline;
  let queryChunks:string[]  = chunk.query.split("\n");
  for (let entry of queryChunks) {
    entry = entry.trim();
    if(entry !== undefined){
      if (entry.match('FROM')){
        out += '\t\t INTO '+ chunk.alias + newline;
      }
      out += entry + newline;
    }

  }
  return out;
}
}