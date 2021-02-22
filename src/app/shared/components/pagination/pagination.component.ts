import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  public pagination: number[] = [];
  
  private _total: number = 1;
  @Input() 
  set total(page: number) {
    this._total = page || 1;
  };
  get total(): number {
    return this._total;
  };

  private _active: number = 1;
  @Input() 
  set active(page: number) {
    this._active = page || 1;
    this._filterPagination();
  };
  get active(): number {
    return this._active;
  };

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  public paginationClick(page: number): void {
    if(page && page !== this.active) {
      this.pageChanged.emit(page);
    }
  }

  private _filterPagination(): void {
    if(this.total < 9) {
      this.pagination = Array(this.total).fill(0).map((x, i) => x = ++i);
    }
    else {
      if(this.active === 1) {
        this.pagination = [1, 2, 3, null, (this.total - 1), this.total]; // 1 2 3 ... 8 9
      }
      else if(this.active === this.total) {
        this.pagination = [1, 2, null, (this.total - 2), (this.total - 1), this.total]; // 1 2 ... 7 8 9
      }
      else { // 1 2 ... 4 5 6 ... 19 20
        const preActive = this.active - 1
        const nextActive = this.active + 1;
        let cluster: number[] = [];

        if(this.active >= 5) { // active >= 5
          cluster = [1, 2, null, preActive, this.active]; // 1 2 ... 4 5

          if(nextActive < this.total) {
            cluster.push(nextActive); // 1 2 ... 4 5 6
          }
          if(nextActive < (this.total - 1)) {
            if((nextActive + 1) === (this.total - 1)) {
              cluster = cluster.concat([(this.total - 1), this.total]); // 1 2 ... 18 19 20
            }
            else {
              cluster = cluster.concat([null, (this.total - 1), this.total]); // 1 2 ... 4 5 6 ... 19 20 
            }
          }
          else {
            cluster.push(this.total); // 1 2 ... 4 5 6 7 8
          }
        }
        else { // active < 5
          cluster = Array(this.active).fill(0).map((x, i) => x = ++i); // 1 2 3 4
          cluster = cluster.concat([nextActive, null, (this.total - 1), this.total]); // 1 2 3 4 5 ... 19 20
        }
        this.pagination = cluster;
      }
    }
  }

}
