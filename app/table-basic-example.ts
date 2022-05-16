import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  private uid = 0;

  @ViewChild('table') table: MatTable<any>;

  displayedColumns = ['product', 'unit'];
  dataSource: MatTableDataSource<AbstractControl>;

  get productControlArray() {
    return this.form.get('products') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.addRow();
    this.dataSource = new MatTableDataSource(
      this.productControlArray.controls);
  }

  createForm() {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  trackRows(index: number, row: AbstractControl) {
    return row.value.uid;
  }

  private addRow() {
    const rows = this.productControlArray;
    rows.push(
      this.fb.group({
        uid: this.nextUid(),
        product_id: [undefined, Validators.required],
        unit: [0, Validators.required]
      })
    );
  }
  
  createRow() {
    this.addRow();
    this.table.renderRows();
  }

  private nextUid() {
    ++this.uid
    return this.uid;
  }
}
