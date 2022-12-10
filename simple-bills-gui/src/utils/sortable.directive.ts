import { Directive, EventEmitter, Input, Output, QueryList } from "@angular/core";

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const rotate: { [key: string]: SortDirection } = {'asc': 'desc', 'desc': '', '': 'asc'};

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

export interface SortableState {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  dateFrom: Date
  dateTo: Date
  sortColumn: string;
  sortDirection: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

export class SortUtils {

  public static resetOtherHeaders(headers: QueryList<NgbdSortableHeader>,
                                  column: string) {
    headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    return headers;
  }

  public static sortTableByColumn(elements: any[],
                                  direction: "asc" | "desc" | "",
                                  column: string): any[] {
    if (direction === '' || column === '') {
      return elements;
    } else {
      return [...elements].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
