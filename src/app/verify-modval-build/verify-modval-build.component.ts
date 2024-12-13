import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModValRequest } from '../model/mod-val-request';
import { ModValServiceService } from '../services/mod-val-service.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-verify-modval-build',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule, MatListModule
  ],
  templateUrl: './verify-modval-build.component.html',
  styleUrl: './verify-modval-build.component.scss',
})
export class VerifyModvalBuildComponent implements AfterViewInit, OnInit {

  // Main table definitions
  dataSource = new MatTableDataSource<ModValRequest>();
  readonly displayedColumns: { [key: string]: string } = {
    maps: 'Maps',
    partitionGroup: 'Partition Group',
    builtDateTime: 'Built Date/Time',
    builtStatus: 'Built Status',
    builtSeverity: 'Built Severity',
    extractId: 'Extract ID',
    extractBy: 'Extracted By',
    extractDateTime: 'Extract Date/Time',
    errorLog: 'Error Log',
  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<ModValRequest>(true, []);
  readonly columnKeys: string[] = Object.keys(this.displayedColumns);
  readonly columnKeysWithSelect: string[] = ['select', ...this.columnKeys];

  constructor(private dataService: ModValServiceService) { }

  ngOnInit() {
    this.dataService.getModValRequestData('success').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  submitBuild() {
    this.extractBuild();
  }

  ngAfterViewInit() {

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every((key) => {
        return data[key]?.toString().toLowerCase().includes(searchTerms[key]);
      });
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Business logic
  extractBuild() {
    this.selection.selected.forEach(s => console.log(s));
  }

  sendToDGO() {
    this.selection.selected.forEach(s => console.log(s));
  }

  deleteRequests() {
    this.selection.selected.forEach(s => console.log(s));
  }

  retrieveData(successParam: string) {

    this.dataService.getModValRequestData(successParam).subscribe((data) => {
      this.selection.clear();
      this.dataSource.data = data;
    });
  }

  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[column] = filterValue.toLowerCase(); // Update the filter value for the column
    this.dataSource.filter = JSON.stringify(this.filterValues); // Trigger filtering
  }

  areAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectAllToggle() {
    this.areAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  isEmpty( value: any ) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

}
