export type TCoupon = {
  id: string;
  code: string;
  discountAmount: number;
  startTime: string;
  endTime: string;
  usageLimit: number;
  totalUsageLimit: number | null;
  usedCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
