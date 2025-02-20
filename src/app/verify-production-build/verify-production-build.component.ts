import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrevIssuedRequest } from '../model/prev-issued-request';
import { VerifyProductionBuildReq } from '../model/verify-production-build';
import { VerifyProductionBuildService } from '../services/verify-production-build.service';

@Component({
  selector: 'app-verify-production-build',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule, MatListModule,
    ReactiveFormsModule, FormsModule
  ],
    templateUrl: './verify-production-build.component.html',
    styleUrl: './verify-production-build.component.scss'
})
export class VerifyProductionBuildComponent implements OnInit, AfterViewInit, AfterContentChecked {

  // Main table definitions
  dataSource = new MatTableDataSource<VerifyProductionBuildReq>();

  readonly displayedColumns: { [key: string]: string } = {
    maps: 'Map',
    partitionGroup: 'Partition Group',
    extractId: 'Extract ID',	
    refN: 'Ref#',
    proposedProjectNumber: 'Proposed Project Number',    	
    builtDateTime: 'PROD Built Date/Time',
    builtStatus: 'PROD Built Status',
    builtSeverity: 'PROD Built Severity',
    promotedDateTime: 'Promoted Date/Time',
    promotedBy: 'Promoted By',                  
    errorLog: 'Error Log'
  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild('promoteToProdPaginator', { read: MatPaginator }) paginator!: MatPaginator;
  @ViewChild('mainTableSort',{ read: MatSort }) sort: MatSort = new MatSort();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<VerifyProductionBuildReq>(true, []);
  readonly columnKeys: string[] = Object.keys(this.displayedColumns);
  readonly columnKeysWithSelect: string[] = ['select', ...this.columnKeys];

  // Previosly Issued Requests
  prevIssedDataSource = new MatTableDataSource<PrevIssuedRequest>();
   
  readonly prevIssedDisplayedColumns: { [key: string]: string } = {
    maps: 'Maps',
    referenceNumber: 'Reference Number',
    proposedProjectNumber: 'Proposed Project Number',
    userId: 'User Id',
    action: 'Action',
    extractDateTime: 'Extract Date/Time',
    partitionGroup: 'Partition Group'
  };

  readonly prevIssedFilterValues: { [key: string]: string } = {};

  @ViewChild('prevIssedPaginator', { read: MatPaginator }) prevIssedPaginator!: MatPaginator;
  @ViewChild('secondaryTableSort',{ read: MatSort })  prevIssedSort: MatSort = new MatSort();
  
  readonly columnKeys1: string[] = Object.keys(this.prevIssedDisplayedColumns);
  readonly columnKeysWithSelect1: string[] = [...this.columnKeys1];
  
  // Selected Maps 
  SELECTED_MAPS: VerifyProductionBuildReq[] = [];
  selectedMapsDataSource = new MatTableDataSource<VerifyProductionBuildReq>();

  @ViewChild( 'selectedMapsHeader' ) selectedMapsHeader!: string;
  readonly selectedDisplayedColumns: string[] = ['maps', 'partitionGroup', 'refN' ];

  constructor(private dataService: VerifyProductionBuildService, private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
  
    this.dataService.getVerifyProductionBuldRequests().subscribe((data) => {      
      this.dataSource.data = data;
    });

    this.dataService.getPrevIssuedRequests().subscribe((data) => {
      this.prevIssedDataSource.data = data;
    });

    this.selectedMapsDataSource.data = this.SELECTED_MAPS;

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

    this.prevIssedDataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);
      return Object.keys(searchTerms).every((key) => {
        return data[key]?.toString().toLowerCase().includes(searchTerms[key]);
      });
    };

    this.prevIssedDataSource.paginator = this.prevIssedPaginator;
    this.prevIssedDataSource.sort = this.prevIssedSort;

  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  // Business logic
  extractBuild() {
    this.drawSelectedMaps();
  }

  sendToDgo() {
    this.drawSelectedMaps();
  }

  private drawSelectedMaps(){

    this.SELECTED_MAPS = [];
    this.selection.selected.forEach(s => {

      const index = this.SELECTED_MAPS.indexOf( s, 0);
      if( index === -1) {
        if( !this.isEmpty( s.builtStatus ) ){
          this.SELECTED_MAPS.push(s);
        }
      }
      else {
        this.SELECTED_MAPS.splice( index, 1);
      }

    });
    this.selectedMapsDataSource.data = this.SELECTED_MAPS;

  }

  deleteRequests() {
    this.selection.selected.forEach(s => console.log(s));
  }

  clearSelection(){
    this.selectedMapsDataSource.data = [];
    this.selection.clear();
  }

  submitBuild() {
    // Those values will be passed into RestAPI
    this.selection.selected.forEach(s => console.log(s));
  }

  retrieveData() {

    this.dataService.getVerifyProductionBuldRequests().subscribe((data) => {
      this.selection.clear();

      // Clear selected maps list
      this.selectedMapsDataSource.data = [];
      this.dataSource.data = data;
      
    });

  }

  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[column] = filterValue.toLowerCase(); // Update the filter value for the column
    this.dataSource.filter = JSON.stringify(this.filterValues); // Trigger filtering
  }

  applyColumnFilterPrevIssuedReq(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prevIssedFilterValues[column] = filterValue.toLowerCase(); // Update the filter value for the column
    this.prevIssedDataSource.filter = JSON.stringify(this.prevIssedFilterValues); // Trigger filtering
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

  isEmpty(value: any) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

}
