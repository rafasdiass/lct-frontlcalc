import { Component } from '@angular/core';
import { InputFormComponent } from "../input-form/input-form.component";
import { ResultsComponent } from "../results/results.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputFormComponent, ResultsComponent, FeedbackComponent, FooterComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
