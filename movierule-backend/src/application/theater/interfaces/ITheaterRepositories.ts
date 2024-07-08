import { TheaterEntity } from "@/domain/theater/entities";


export interface ITheaterRepositories {
  theaterCreate: (data: TheaterEntity) => Promise<TheaterEntity | null>;
  theaterCheckEmail: (email: string) => Promise<boolean>;
  theaterVerifyOtpRepo: (email: string, otp: string[]) => Promise<boolean>;
  theaterFindByEmail: (email: string) => Promise<TheaterEntity | null>;
  theaterFindById: (id: string) => Promise<TheaterEntity | null>;
  updateTheaterPassword: (data: {
    email: string;
    password: string;
  }) => Promise<TheaterEntity | null>;
}
