import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qc-workspace',
  templateUrl: './qc-workspace.component.html',
  styleUrls: ['./qc-workspace.component.css']
})
export class QcWorkspaceComponent implements OnInit {
  tabs = ['First', 'Second', 'Third'];
  constructor() { }

  ngOnInit() {
  }

  public onFileChange(event):void {
    let file = event.target.files[0];
    let reader = new FileReader();
    console.log(file);
    if(event.target.files && event.target.files.length > 0) {
      console.log(file);
      reader.onloadend= () => {
        this.tabs.push(file.name);
        console.log( reader.result);
        
      };
      reader.readAsText(file);

    }
  }

}
