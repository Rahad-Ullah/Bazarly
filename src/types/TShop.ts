import { TVendor } from "./TVendor";

export interface IShop {
  id: string;
  name: string;
  description?: string;
  logoUrl: string;
  phoneNumber: string;
  shopAddress?: string;
  status: string;
  vendorId: string;
  vendor?: TVendor;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
