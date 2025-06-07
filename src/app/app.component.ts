import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { LoadingService } from './shared/services/loading/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  constructor(
    private config: PrimeNG,
    private translateService: TranslateService,
    public loadingService: LoadingService,
  ) {}

  ngAfterViewInit(): void {
    this.translateService.use('pt-BR').subscribe(() => {
      this.translateService.get('primeng').subscribe(res => {
        this.config.setTranslation(res);
      });
    });
  }
}
