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
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrevIssuedRequest } from '../model/prev-issued-request';
import { PromoteToProductionReq } from '../model/promote-to-production-req';
import { PromoteToProductionService } from '../services/promote-to-production.service';

@Component({
  selector: 'promote-to-production',
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
    templateUrl: './promote-to-production.component.html',
    styleUrl: './promote-to-production.component.scss'
})
export class PromoteToProductionComponent implements OnInit, AfterViewInit, AfterContentChecked {

  // Main table definitions
  dataSource = new MatTableDataSource<PromoteToProductionReq>();

  readonly displayedColumns: { [key: string]: string } = {
    maps: 'Map',
    partitionGroup: 'Partition Group',
    extractId: 'Extract ID',		
    builtDateTime: 'ModVal Built Date/Time',
    builtStatus: 'ModVal Built Status',
    builtSeverity: 'ModVal Built Severity',
    promotedBy: 'Promoted By',
    promotedDateTime: 'Promoted Date/Time',
    sentBy: 'Sent By',
    sentDateTime: 'Sent Date/Time',	                        
    refN: 'Ref#',
    proposedProjectNumber: 'Proposed Project Number'

  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild('promoteToProdPaginator', { read: MatPaginator }) paginator!: MatPaginator;
  @ViewChild('mainTableSort',{ read: MatSort }) sort: MatSort = new MatSort();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<PromoteToProductionReq>(true, []);
  readonly columnKeys: string[] = Object.keys(this.displayedColumns);
  readonly columnKeysWithSelect: string[] = ['select', ...this.columnKeys];

  readonly confirmSubmit = signal('');
  readonly dialog = inject(MatDialog);

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
  SELECTED_MAPS: PromoteToProductionReq[] = [];
  selectedMapsDataSource = new MatTableDataSource<PromoteToProductionReq>();

  @ViewChild( 'selectedMapsHeader' ) selectedMapsHeader!: string;
  readonly selectedDisplayedColumns: string[] = ['maps', 'partitionGroup', 'refN' ];

  constructor(private dataService: PromoteToProductionService, private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
  
    this.dataService.getPromoteToProdRequests().subscribe((data) => {      
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
  promoteToPRD() {
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

  updateRequests() {

    let selectedRequestIds: string[] = [];

    // Generate a list of selected RequestIds
    this.selection.selected.forEach(s => {
      if (this.selection.isSelected(s)) {
        selectedRequestIds.push(s.maps);
      }
    });

    const dialogRef = this.dialog.open( ConfirmRequestsDialog, { data: { selectedRequestIds, actionName: "Update" }  } );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === "submit") {
        // REST API calls will be called from here

      }
    });

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

    this.dataService.getPromoteToProdRequests().subscribe((data) => {
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
  actionName: string;
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
export class ConfirmRequestsDialog implements AfterViewInit{

  readonly dialogRef = inject(MatDialogRef<ConfirmRequestsDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly confirmSubmit = model( "submit" );

  ngAfterViewInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
