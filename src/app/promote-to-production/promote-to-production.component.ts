import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-verify-modval-build',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './promote-to-production.component.html',
  styleUrl: './promote-to-production.component.css'
})
export class PromoteToProductionComponent implements AfterViewInit, OnInit {

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  // P
  applyColumnFilter(event: Event, column: string) {
  }
}
