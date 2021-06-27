import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  navigationItems: NavigationItem[] = [
    {name: 'Admin', link: '/app/admin'}
  ];

  readonly link = 'app/admin';
}

export class NavigationItem {
  link: string;
  name: string;
}
