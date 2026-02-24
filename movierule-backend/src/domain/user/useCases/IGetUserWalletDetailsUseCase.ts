import { IUserWalletDetails } from "../../../infrastructure/database/mogodb/models/userSchema";

export interface IGetUserWalletDetailsUseCase {
  execute(userId: string): Promise<IUserWalletDetails>;
}
