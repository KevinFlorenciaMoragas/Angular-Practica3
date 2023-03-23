import { Component } from '@angular/core';
import { ServiceService } from 'services/service.service';
import { User } from '../form/form.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  user: User[] = [];
  datos: any = ""
  constructor() {
  }
  ngOnInit(): void {
    // this.userService.sendUser(this.datos).subscribe((user: User[]) => {
    //   this.user = user
    // })
  }
  filterTable(): void {
    let td: HTMLElement | null, txtValue: string;
    let input: string = (document.getElementById("filtro") as HTMLInputElement).value;
    let filter: string = input.toUpperCase();
    let table: HTMLElement | null = document.getElementById("myTable");
    let tr: HTMLCollectionOf<HTMLTableRowElement> = table?.getElementsByTagName("tr") as HTMLCollectionOf<HTMLTableRowElement>;
    for (let i: number = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  sortTable(n: number) {
    let rows: HTMLCollectionOf<HTMLTableRowElement> | null, switching: boolean, tableRows,
      i: number, x, y, shouldSwitch: boolean = true, dir: string, switchcount = 0;
    let table = document.getElementById("myTable") as HTMLTableElement;

    switching = true;

    dir = "asc";
    let count: number = 0;
    while (switching) {
      console.log("entra")
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
        console.log("entra en for")
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("td")[n];
        console.log(x)
        y = rows[i + 1].getElementsByTagName("td")[n];
        count++;
        console.log(count)
        if (dir == "asc") {
          console.log("entra en asc")
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          console.log("entra en desc")
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        console.log("entra en shouldSwitch")
        rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          console.log("entra en switchcount")
          dir = "desc";
          switching = true;
        }
      }

    }

  }
}
