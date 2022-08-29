import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Call } from 'src/app/models/call';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { CallService } from 'src/app/services/call.service';
import { ClientService } from 'src/app/services/client.service';
import { TechinicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-call-create',
  templateUrl: './call-create.component.html',
  styleUrls: ['./call-create.component.css']
})
export class CallCreateComponent implements OnInit {

  call: Call = {
    priority: '',
    status: '',
    title: '',
    description: '',
    technician: '',
    client: '',
    clientName: '',
    technicianName: '',
  }
  clients: Client [] = []
  technicians: Technician [] = []

  priority:     FormControl = new FormControl(null, [Validators.required])
  status:       FormControl = new FormControl(null, [Validators.required])
  title:        FormControl = new FormControl(null, [Validators.required])
  description:  FormControl = new FormControl(null, [Validators.required])
  technician:   FormControl = new FormControl(null, [Validators.required])
  client:       FormControl = new FormControl(null, [Validators.required])

  constructor( 
  
  private callService: CallService,
  private clientService: ClientService,
  private technicianService: TechinicianService,
  private toastService: ToastrService,
  private router: Router
  
  ){ }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllTechnicians();
  }

  create(): void{
    this.callService.create(this.call).subscribe(response =>{
      this.toastService.success('Call created successfully', 'New call');
      this.router.navigate(['calls']);
    }, ex =>{
      console.log(ex);
    
      this.toastService.error(ex.error.error);
    })
  }

  findAllClients(): void{
    this.clientService.findAll().subscribe(response =>{
        this.clients = response;
    })
 
  }

  findAllTechnicians(): void{
    this.technicianService.findAll().subscribe(response =>{
      this.technicians = response;
    })
  }

validFields(): boolean{
  return this.priority.valid && this.status.valid &&
  this.title.valid && this.description.valid &&
  this.technician.valid &&  this.client.valid
}
 
}