import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DataComponent } from './pages/data/data.component';
import { NewsComponent } from './pages/news/news.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent},
  { path: 'news', component: NewsComponent},
  { path: 'repository', component: RepositoryComponent},
  { path: 'about-us', component: AboutUsComponent}
];
