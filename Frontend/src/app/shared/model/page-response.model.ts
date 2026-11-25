export interface PageResponse<T> {
  content: T[];
  page: number;          // starts at 1
  size: number;
  totalElements: number;
  totalPages: number;
  sort: string;
}
