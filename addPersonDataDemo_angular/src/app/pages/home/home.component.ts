import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../../components/add-item-dialog/add-item-dialog.component';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthDate', 'age'];
  dataSource: any[] = [];

  constructor(private dialog: MatDialog, private personService: PersonService) {}

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const ref = this.dialog.open(AddItemDialogComponent, { width: '420px' });
    ref.afterClosed().subscribe(result => {
      if (result) {
        // send to API
        this.personService.addPerson(result).subscribe({
          next: () => this.loadData(),
          error: err => console.error(err)
        });
      }
    });
  }

  loadData() {
    this.personService.getAll().subscribe({
      next: (res) => this.dataSource = res,
      error: (err) => console.error(err)
    });
  }
}
