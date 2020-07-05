import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from './Services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private toastService: ToastService) {}
  
  ngOnInit(): void {
    
  }

  public _config = this.toastService._config;
}
