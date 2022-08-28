import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from 'src/app/models/technician';
import { TechinicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {

  technician: Technician ={
    id: '',
    name: '',
    email: '',
    password: '',
    profiles: [],
    dateCreated: ''
  }

  
  constructor(
    private service: TechinicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void{
    this.service.findById(this.technician.id).subscribe(response =>{
      response.profiles = []
      this.technician = response;
    })
  }

  
  delete(): void{
  this.service.delete(this.technician.id).subscribe(() => {
    this.toast.success('Technician deleted succesfully', 'Delete');
    this.router.navigate(['technicians'])
    
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
  
  if(this.technician.profiles.includes(profile)){
    this.technician.profiles.splice(this.technician.profiles.indexOf(profile), 1);
    
  }else {
    this.technician.profiles.push(profile);
    
  }
}

}
