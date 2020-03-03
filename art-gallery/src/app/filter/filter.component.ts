import { Component, OnInit } from '@angular/core';
const url = 'http://localhost:8000/initdata/';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor() { }
  namesSize = [];
  namesStyle = [];
  namesColor = [];
  async getParametres() {
    const parametres = await fetch(url, {
      method: 'GET',
    });
    const json = await parametres.json();
        
    this.namesSize = json.sizes;
    this.namesStyle = json.styles;
    this.namesColor = json.colors;
    console.log(this.namesSize);
    }

  public isCollapsed = true;
  ngOnInit(): void {
  }
}
