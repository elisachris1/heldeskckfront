import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class clientListComponent implements OnInit {
  ELEMENT_DATA: Client[] = [
    
  ]
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private Service: ClientService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  findAll(){
    this.Service.findAll().subscribe(response =>{
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource<Client>(response);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
