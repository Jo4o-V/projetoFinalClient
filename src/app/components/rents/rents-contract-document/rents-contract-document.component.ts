import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rents-returns',
  templateUrl: './rents-contract-document.component.html',
  styleUrls: ['./rents-contract-document.component.css']
})
export class RentsContractDocumentComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  gerarPDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("Contrato de locação.pdf");
      }
    })
  }

}
