import { ViewChild, ElementRef, ViewRef, ViewContainerRef  } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {  OnChanges, SimpleChanges} from '@angular/core';
import hljs from 'highlight.js';
import { saveAs } from 'file-saver';

import { Chunk } from '../model/chunk';
import { RestApiService } from '../shared/rest-api.service';
import { MatSort, MatTableDataSource } from '@angular/material';
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
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  public executeQuery_msg:string;

  columnsToDisplay: string[] = this.displayedColumns.slice();
  data  = QueryChunkComponent.ELEMENT_DATA;
  datasource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restApi: RestApiService ) { }

  ngOnInit() {
   // alert(JSON.stringify(this.chunk));
   hljs.initHighlightingOnLoad();
    this.datasource.sort = this.sort;
    this.datasource.data = QueryChunkComponent.ELEMENT_DATA;
    this.datasource.filterPredicate = this.createFilter();
  }

   ngOnChanges(changes: SimpleChanges) {
    // alert("ciao");
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

    let range = window.getSelection().getRangeAt(0);
    console.log(range);
    let index = 0;
    let char_position = range.endOffset;
    let container = range.endContainer.parentNode.nodeName=='SPAN'? range.endContainer.parentNode.previousSibling: range.endContainer.previousSibling;
    while(container != null && index <20 ){
      console.log("char_position: " +char_position);
      index++;
      char_position += container.textContent.length;
      container = container.previousSibling;
    }
    console.log("char_position: " +char_position);


    if (e.ctrlKey == true) {
      if (e.keyCode == 32) {
      }
    }else {
      if (e.keyCode == tabkey) {
          e.preventDefault();
          element.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
          return false;
        }
        else{
        // element. (element.children());
         element.innerHTML =  hljs.highlightAuto( element.textContent).value;
        }
        console.log(e);
        console.log(element);
    }
console.log("repositioning");

    let current_el:Node = element.firstChild;
    do{
      console.log(current_el);
      if (current_el){
        if ( current_el.textContent.length < char_position ){
          char_position -= current_el.textContent.length;
          }

              current_el = current_el.nextSibling==null? current_el : current_el.nextSibling ;
             
        
      } 
    }while( current_el!=null && current_el.textContent.length < char_position);
    current_el = current_el.nodeName=='SPAN' ? current_el.firstChild : current_el;
      if (current_el==null){
        char_position=0;  
      }
    
    console.log("current_el:");
    console.log(current_el);
    console.log(char_position);
    window.getSelection().setPosition(current_el, char_position);
  }

  listAllColumnsQuery(dataEmployee) {
    this.restApi.listAllColumnsQuery().subscribe((data: []) => {
      this.columnsToDisplay = data['columns_name'];
      this.displayedColumns = data['columns_name']; 
      this.data=[];
      data['rows'].forEach(element => {
        this.data.push(
          this.columnsToDisplay.reduce(function(acc, cur, i) {
            acc[ cur ] = element[i];
            return acc;
          }, {}) 
        )
      });

      console.log(this.data);
    })
    }

    executeQuery(dataEmployee) {
      this.restApi.executeQuery(this.el.nativeElement.textContent).subscribe((data: []) => {
        this.columnsToDisplay = data['columns_name'];
        this.displayedColumns = data['columns_name']; 
        this.executeQuery_msg = data['msg']; 

        this.data=[];
        if (data['rows']){
          data['rows'].forEach(element => {
            this.data.push(
              this.columnsToDisplay.reduce(function(acc, cur, i) {
                acc[ cur ] = element[i];
                return acc;
              }, {}) 
            )
          });
        }
        console.log(this.data);
      })

      this.datasource.data = this.data;
      }

      applyFilter(filterValue: string) {
        this.datasource.filter = filterValue.trim().toLowerCase();
      }

  public static ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


  public createFilter(): (data: any, filter: any) => boolean {
    const filterFunction = function(data, filter): boolean {
      const searchData = JSON.parse(filter);
      let status = false;
      for (const key in searchData) {
        if (data[key].indexOf(searchData[key]) !== -1) {
          status = true;
        } else {
          status = false;
          break;
        }
      }
      return status;
    };
    return filterFunction;
  }

  public saveFile():void{
    let blob = new Blob([""], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "filename.txt",true);
  }


}