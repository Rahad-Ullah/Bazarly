export type TAdmin = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string | null;
  profilePhoto: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    role: string;
    status: string;
  };
};
