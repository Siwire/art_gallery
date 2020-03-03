import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

const url = 'http://localhost:8000';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  public isCollapsed = true;

  createPictureForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
  ) {

  }
  namesSize = [];
  namesStyle = [];
  namesColor = [];
  pictures = [];
  file;

  async openClosePictureForm() {
    if (this.isCollapsed) {
      await this.refreshInitData();
    }
    this.isCollapsed = !this.isCollapsed;
  }

  async refreshInitData() {
    const parametres = await fetch(`${url}/initdata`, {
      method: 'GET',
    });
    const json = await parametres.json();

    this.namesSize = json.sizes;
    this.namesStyle = json.styles;
    this.namesColor = json.colors;
  }
  async getPictures() {
    const pictures = await fetch(`${url}/picture`, {
      method: 'GET',
    });
    const json = await pictures.json();

    this.pictures = json.pictures;
   
  }
  async collectParametres() {
    const formData = new FormData();
    const title = this.createPictureForm.get('title').value;
    const sizePaper = this.createPictureForm.get('addSizePaper').value;
    const style = this.createPictureForm.get('addStyle').value;
    const color = this.createPictureForm.get('addMainColor').value;

    formData.append('title', title);
    formData.append('size', sizePaper); 
    formData.append('style', style);
    formData.append('color', color);
    console.log(this.file, 'asd');
    formData.append('file', this.file);
    const result = await this.sendPicture(formData);
    // console.log(result);
    this.clearFields();
  }
  
  async sendPicture(formData) {
    return fetch(`${url}/picture`, {
      method: 'POST',
      body: formData,
    });
  }
  clearFields() {
    this.createPictureForm.get('title').setValue('');
  }
  input(event: any) {
    // console.log(event);
    const name = event.target.name;
    const value = event.target.value
    // console.log({[name]: value})
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // console.log(file);
      this.createPictureForm.get('file').setValue(this.file);
    }
  }
  /*async getPictures() {
    const p1 = new Promise((resolve, reject) => {
      reject();
    });
    const pictures = await fetch(url, {
      method: 'GET',
    });
    const json = await pictures.json();

  }*/
  ngOnInit(): void {
    this.createPictureForm = this.formBuilder.group({
      title: [''],
      addSizePaper: [''],
      addStyle: [''],
      addMainColor: [''],
      file: ['']
    });
    this.getPictures();
  }
}
