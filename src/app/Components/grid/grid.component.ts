import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GridOptions } from "ag-grid";
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  items: Observable<any[]>;
  menuItems: any
  settings = {
    columns: {
      nome: {
        title: 'Nome:'
      }
    }
  };
  constructor(public db: AngularFireDatabase) {
    this.getmenu()

  
    
  }

  ngOnInit() {
  }

  getmenu() {
    this.db.list('MenuPrincipal').valueChanges()
      .subscribe((s) => {
        this.menuItems = s;
        console.log(s)

      })
  };



  private static createColumnDefs() {
    return [
      {
        headerName: "Row",
        field: "row",
        width: 150
      },
      {
        headerName: "Square",
        field: "value",
        editable: true,
        colId: "square",
        width: 150
      },
      {
        headerName: "Cube",
        field: "value",
        colId: "cube",
        width: 150
      },
      {
        headerName: "Row Params",
        field: "row",
        colId: "params",
        width: 150
      },
      {
        headerName: "Currency (Pipe)",
        field: "currency",
        colId: "currency",
        width: 100
      },
      {
        headerName: "Child/Parent",
        field: "value",
        colId: "params",
        width: 180
      }
    ];
  }

  //this.gridOptions = <GridOptions>{};


}
