import { UserEntity } from "@/domain/user/entities";

export interface IAdminHandleBlockUnblockUser {
  execute(id: string, status: string): Promise<UserEntity | null>;
}

