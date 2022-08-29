import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-call-update',
  templateUrl: './call-update.component.html',
  styleUrls: ['./call-update.component.css']
})
export class CallUpdateComponent implements OnInit {

  client: Client ={
    id: '',
    name: '',
    email: '',
    password: '',
    profiles: [],
    dateCreated: ''
  }

  name: FormControl =     new FormControl(null, Validators.minLength(3));
  email: FormControl =    new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void{
    this.service.findById(this.client.id).subscribe(response =>{
      response.profiles = []
      this.client = response;
    })
  }

  
  update(): void{
  this.service.update(this.client).subscribe(() => {
    this.toast.success('Client updated succesfully', 'Update');
    this.router.navigate(['clients'])
    
  }, ex => {
    
    if(ex.error.errors){
      ex.error.errors.forEach(element => {
        this.toast.error(element.message);
      });
    }else{
      this.toast.error(ex.error.message);
    }
  })
}

addProfile(profile: any): void{
  
  if(this.client.profiles.includes(profile)){
    this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    
  }else {
    this.client.profiles.push(profile);
    
  }
}

validFields(): boolean{
  return this.name.valid && this.email.valid && this.password.valid
}
}
