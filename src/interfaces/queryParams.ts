export interface IProductQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorEmail?: string;
  userEmail?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ICategoryQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IReviewQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  vendorEmail?: string;
}

export interface IShopQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ICouponQueryParams
  extends Record<string, string | number | undefined> {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  startTime?: string;
  endTime?: string;
}
