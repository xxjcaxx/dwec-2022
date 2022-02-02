import { Component, Input, OnInit } from '@angular/core';
import { Survivor } from '../../../interfaces/survivor';

@Component({
  selector: 'app-survivor-form',
  templateUrl: './survivor-form.component.html',
  styleUrls: ['./survivor-form.component.css']
})
export class SurvivorFormComponent implements OnInit {

  public isImageSaved: boolean = false;
  public imageBase64: string = '';
  public imageError: string = '';

  @Input() survivor!: Survivor;

  constructor() { }

  ngOnInit(): void {

    this.imageBase64 = this.survivor.image ? this.survivor.image : '';

  }

  onSubmit(){

  }

  imageChangeEvent(fileInput: any){
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];


        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 10 + 'Mb';

            return false;
        }

        if (!allowed_types.includes(fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {

                    const imgBase64Path = e.target.result;
                    this.imageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;

            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
        return true;
    }
    else{
      return false;
    }
}

}
