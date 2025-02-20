import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, 
  Component, OnInit, inject, model, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, 
  MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModValRequest } from '../model/mod-val-request';
import { PrevIssuedRequest } from '../model/prev-issued-request';
import { ModValServiceService } from '../services/mod-val-service.service';

@Component({
  selector: 'app-verify-modval-build',
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
  templateUrl: './verify-modval-build.component.html',
  styleUrl: './verify-modval-build.component.scss'
})
export class VerifyModvalBuildComponent implements OnInit, AfterViewInit, AfterContentChecked {

  // Main table definitions
  dataSource = new MatTableDataSource<ModValRequest>();

  readonly confirmSubmit = signal('');
  readonly dialog = inject(MatDialog);

  readonly displayedColumns: { [key: string]: string } = {
    maps: 'Maps',
    partitionGroup: 'Partition Group',
    builtDateTime: 'Built Date/Time',
    builtStatus: 'Built Status',
    builtSeverity: 'Built Severity',
    extractId: 'Extract ID',
    extractBy: 'Extracted By',
    extractDateTime: 'Extract Date/Time',
    errorLog: 'Error Log'
  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild('paginator', { read: MatPaginator }) paginator!: MatPaginator;
  @ViewChild('mainTableSort',{ read: MatSort }) sort: MatSort = new MatSort();
  @ViewChild('successButton',{ read: MatRadioButton }) successButton: MatRadioButton = new MatRadioButton();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<ModValRequest>(true, []);
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
  SELECTED_MAPS: ModValRequest[] = [];
  selectedMapsDataSource = new MatTableDataSource<ModValRequest>();

  @ViewChild( 'selectedMapsHeader' ) selectedMapsHeader!: string;
  readonly selectedDisplayedColumns: string[] = ['maps'];

  public sendToDgoGroup!: FormGroup;

  constructor(private dataService: ModValServiceService, private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
  
    this.dataService.getModValRequests('success').subscribe((data) => {      
      this.dataSource.data = data;
    });

    this.dataService.getPrevIssuedRequests().subscribe((data) => {
      this.prevIssedDataSource.data = data;
    });

    this.selectedMapsDataSource.data = this.SELECTED_MAPS;

    this.sendToDgoGroup = new FormGroup({
      referenceNumber: new FormControl( '' ),
      proposedProjectNumber: new FormControl( '' )
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

    if( this.successButton.checked ){
      this.selectedMapsHeader = 'Send to DGO';
    }
    else{
      this.selectedMapsHeader = 'Extract & Build';
    }

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

    let selectedRequestIds: string[] = [];

    // Generate a list of selected RequestIds
    this.selection.selected.forEach(s => {
      if (this.selection.isSelected(s)) {
        selectedRequestIds.push(s.maps);
      }
    });

    const dialogRef = this.dialog.open( CancelRequestsDialog, { data: selectedRequestIds } );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === "submit") {
        // REST API calls will be called from here

      }
    });

  }

  clearSelection(){
    this.selectedMapsDataSource.data = [];
    this.selection.clear();
    this.sendToDgoGroup.get("referenceNumber" )?.setValue( "" );
    this.sendToDgoGroup.get("proposedProjectNumber" )?.setValue( "" );
  }

  submitBuild() {
    // Those values will be passed into RestAPI
    console.log( this.sendToDgoGroup.get("referenceNumber" )?.value );
    console.log( this.sendToDgoGroup.get( "proposedProjectNumber")?.value );
    this.selection.selected.forEach(s => console.log(s));
  }

  retrieveData(successParam: string) {

    this.dataService.getModValRequests(successParam).subscribe((data) => {
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
    let numRows = 0;
    this.dataSource.data.forEach(r => {
      if ( !this.isEmpty( r.builtStatus ) ) {
        numRows++;
      }
    }); 
    return numSelected === numRows;
  }

  selectAllToggle() {
    this.areAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        if (!this.isEmpty(row.builtStatus)) {
          this.selection.select(row);
        }
      });
  }

  isEmpty(value: any) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

}

export interface DialogData {
  confirmSubmit: string;
}

@Component({
  selector: 'delete-requests-dialog',
  templateUrl: 'delete-requests-dialog.html',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CancelRequestsDialog implements AfterViewInit{

  readonly dialogRef = inject(MatDialogRef<CancelRequestsDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly confirmSubmit = model( "submit" );

  ngAfterViewInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
