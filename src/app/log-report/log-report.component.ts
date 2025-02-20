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
import { LogReportRequest } from '../model/log-report-request';
import { LogReportService } from '../services/log-report.service';

@Component({
  selector: 'app-log-report',
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
    templateUrl: './log-report.component.html',
    styleUrl: './log-report.component.scss'
})
export class LogReportComponent implements OnInit, AfterViewInit, AfterContentChecked {

  // Main table definitions
  dataSource = new MatTableDataSource<LogReportRequest>();

  readonly displayedColumns: { [key: string]: string } = {
    extractId: 'Extract Id',
    extractDateTime: 'Extract Date/Time',
    partitionGroup: 'Partition Group',
    maps: 'Map',
    extractBy: 'Extract By',
    modValBuiltDateTime: 'ModVal Built Date/Time',
    modValBuiltStatus: 'ModVal Built Status',
    modValBuiltSeverity: 'ModVal Built Severity',
    dgoWta: 'DGO WTA#',
    proposedProjectNumber: 'Proposed Project Number',
    sentBy: 'Sent By',
    sentDateTime: 'Sent Date/Time',
    promotedBy: 'Promoted By',
    promotedDateTime: 'Promoted Date/Time',
    prdBuiltDateTime: 'PRD Built Date/Time',
    prdBuiltStatus: 'PRD Built Status',
    prdBuiltSeverity: 'PRD Built Severity',
    workFlowStatus: 'WorkFlow Status',
    modValErrorLog: 'ModVal Error Log',
    prdErrorLog: 'Prod Error Log'
  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild('promoteToProdPaginator', { read: MatPaginator }) paginator!: MatPaginator;
  @ViewChild('mainTableSort',{ read: MatSort }) sort: MatSort = new MatSort();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<LogReportRequest>(true, []);
  readonly columnKeys: string[] = Object.keys(this.displayedColumns);
  readonly columnKeysWithSelect: string[] = ['select', ...this.columnKeys];

  constructor(private dataService: LogReportService, private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
  
    this.dataService.getLogReportRequests().subscribe((data) => {      
      this.dataSource.data = data;
    });

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

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  retrieveData() {

    this.dataService.getLogReportRequests().subscribe((data) => {
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

  isEmpty(value: any) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

}
