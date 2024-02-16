import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styles: `
    
  `,
})
export class SearchBarComponent {
  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }
}
