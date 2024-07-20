import { UserEntity } from "@/domain/user/entities";

export interface IGetAllUsersAdmin {
    execute():Promise<UserEntity[]| boolean>;
}