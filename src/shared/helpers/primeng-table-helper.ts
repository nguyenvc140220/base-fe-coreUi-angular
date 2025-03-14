import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';

export class PrimengTableHelper<T> {
  predefinedRecordsCountPerPage = [5, 10, 25, 40, 100];

  defaultRecordsCountPerPage = 10;

  isResponsive = true;

  totalRecordsCount = 0;

  records: T[];

  isLoading = false;

  showLoadingIndicator(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 0);
  }

  hideLoadingIndicator(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }

  getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
    if (!paginator) {
      return this.defaultRecordsCountPerPage;
    }
    if (paginator.rows) {
      return paginator.rows;
    }

    if (!event) {
      return 0;
    }

    return event.rows;
  }

  getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
    if (!paginator) {
      return 0;
    }
    if (paginator.first) {
      return paginator.first;
    }

    if (!event) {
      return 0;
    }

    return event.first;
  }

  getCurrentPage(paginator: Paginator): number {
    let page = paginator?.currentPage() ?? 1;
    return page > 0 ? page : 1;
  }
}
