import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { Start } from './pages/user/start/start';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, MatToolbarModule, CKEditorModule, NgxUiLoaderModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'examportal';

  public Editor: any = ClassicEditor;

  constructor(private loader: NgxUiLoaderService) { }

  ngOnInit() {
    this.loader.start(); // show loader
    setTimeout(() => {
      this.loader.stop(); // hide after 3s
    }, 3000);
  }


}
