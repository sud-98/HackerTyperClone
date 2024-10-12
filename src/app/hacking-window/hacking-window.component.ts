import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FileReaderService } from '../file-reader.service';

@Component({
  selector: 'app-hacking-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hacking-window.component.html',
  styleUrl: './hacking-window.component.css',
})
export class HackingWindowComponent implements OnInit {

  private sourceCode = "";
  public displayCode = "";
  private startIndex = 0;
  public accessMsg = "";
  public locked = false;
  public success = false;
  public showCursor = true;
  constructor(
    private fileReaderService: FileReaderService
  ) { }
  ngOnInit(): void {
    this.getFile();
    this.controlCursorBlink();
  }


  // This listens to keydown events on the window object
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const charsToType = 3;
    if (event) {      
      if (!this.locked) {
        this.displayCode += this.sourceCode.slice(this.startIndex, this.startIndex + charsToType);
        this.startIndex += charsToType;

        if (this.startIndex % 300 === 0) {
          this.accessMsg = 'ACCESS DENIED';
          this.success = false;
          this.locked = true;
        }
        if (this.startIndex % 750 === 0) {
          this.accessMsg = 'ACCESS GANTED';
          this.success = true;
          this.locked = true;
        }        
      }
      if (event.key === "Escape" || event.key === "Enter") {
        this.locked = false;
      }
    }
  }

  getFile() {
    const filePath = 'assets/files/code.txt';
    this.fileReaderService.getFileContents(filePath).subscribe(data => {
      if (data) {
        this.sourceCode = data;
      }
    });
  }

  controlCursorBlink(){
    setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500);
  }
}
