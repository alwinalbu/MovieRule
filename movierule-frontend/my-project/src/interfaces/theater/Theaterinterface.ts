export interface Snack {
  _id?: string;
  name: string;
  price: number;
  image: string;
  theater_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TheaterEntity {
  _id?: string;
  username?: string;
  email: string;
  password: string | null;
  confirmPassword?: string | null;
  OwnerName?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  phone?: string | null;
  otp?: string[];
  profilePicture?: string;
  role: "theatre";
  status?: string | null;
  aadhaarCard?: string;
  licenseDocument?: string;
  comments?: string | null;
  rating?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  snacks?: Snack[];
}
