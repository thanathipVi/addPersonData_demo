import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html'
})
export class AddItemDialogComponent {
  data: any = { name: '', birthDate: null, age: null };

  constructor(private dialogRef: MatDialogRef<AddItemDialogComponent>) {}

  calculateAge() {
    if (!this.data.birthDate) { this.data.age = null; return; }
    const today = new Date();
    const birth = new Date(this.data.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    this.data.age = age;
  }

  save() {
    // Normalize birthDate to ISO string for API
    if (this.data.birthDate) {
      this.data.birthDate = new Date(this.data.birthDate).toISOString();
    }
    this.dialogRef.close(this.data);
  }
}
