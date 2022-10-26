import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { AuthService } from './users/login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'psicodidact-agendamiento-citas-front';
}
