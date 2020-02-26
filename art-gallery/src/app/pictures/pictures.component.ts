import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
const url = 'http://localhost:8000/initdata/';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  createPictureForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
  ) {

  }
  namesSize = [];
  namesStyle = [];
  namesColor = [];
  file;

  async refreshTable() {
    const parametres = await fetch(url, {
      method: 'GET',
    });
    const json = await parametres.json();

    this.namesSize = json.sizes;
    this.namesStyle = json.styles;
    this.namesColor = json.colors;
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
    this.clearFields();
  }
  
  async sendPicture(formData) {
    return fetch(url, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // 'Accept': 'application/json',
      },
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
      // this.createPictureForm.get('file').setValue(file);
    }
  }
  public isCollapsed = true;
  ngOnInit(): void {
    this.createPictureForm = this.formBuilder.group({
      title: [''],
      addSizePaper: [''],
      addStyle: [''],
      addMainColor: [''],
      file: ['']
    })
  }
}
