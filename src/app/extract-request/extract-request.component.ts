import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, 
          Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, 
          MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExtractRequest } from '../model/extract-request';
import { ExtractRequestService } from '../services/extract-request.service';

@Component({
  selector: 'app-extract-request',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule    
  ],
  templateUrl: './extract-request.component.html',
  styleUrl: './extract-request.component.scss'
})
export class ExtractRequestComponent implements OnInit, AfterViewInit, AfterContentChecked {

  readonly confirmSubmit = signal('');
  readonly dialog = inject(MatDialog);

  // Main table definitions
  dataSource = new MatTableDataSource<ExtractRequest>();

  readonly displayedColumns: { [key: string]: string } = {
    requestId: "Request Id",
    extractId: "Extract Id",
    requestDateTime: "Request Date/Time",
    requestedBy: "Requested By",
    maps: "Maps",
    partitionGroup: "Partition Group",
    estimatedDateTime: "Estimated Date/Time",
    completionDateTime: "Completion Date/Time",
    requestStatus: "Request Status"
  };

  readonly filterValues: { [key: string]: string } = {};

  @ViewChild('paginator', { read: MatPaginator }) paginator!: MatPaginator;
  @ViewChild('mainTableSort', { read: MatSort }) sort: MatSort = new MatSort();

  // Angular Utility for Selection from Lists/Collections
  selection = new SelectionModel<ExtractRequest>(true, []);
  readonly columnKeys: string[] = Object.keys(this.displayedColumns);
  readonly columnKeysWithSelect: string[] = ['select', ...this.columnKeys];

  constructor(private dataService: ExtractRequestService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.dataService.getExtractRequests().subscribe((data) => {
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

  cancelBuilds() {

    let selectedRequestIds: string[] = [];

    // Generate a list of selected RequestIds
    this.selection.selected.forEach(s => {
      if (this.selection.isSelected(s)) {
        selectedRequestIds.push(s.requestId);
      }
    });

    const dialogRef = this.dialog.open( CancelRequestsDialog, { data: selectedRequestIds } );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === "submit") {
        // REST API calls will be called from here

      }
    });

  }

  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[column] = filterValue.toLowerCase(); // Update the filter value for the column
    this.dataSource.filter = JSON.stringify(this.filterValues); // Trigger filtering
  }

  areAllSelected() {
    const numSelected = this.selection.selected.length;

    let numRows = 0;
    this.dataSource.data.forEach(r => {
      if (this.isEmpty(r.requestStatus)) {
        numRows++;
      }
    });

    return numSelected === numRows;
  }

  selectAllToggle() {
    this.areAllSelected() ? this.selection.clear() :
      this.dataSource.data.forEach(row => {
        if (this.isEmpty(row.requestStatus)) {
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
  selector: 'cancel-requests-dialog',
  templateUrl: 'cancel-requests-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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
