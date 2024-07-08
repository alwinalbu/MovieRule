import { AdminEntity } from "@/domain/admin/entities";

export interface IAdminRepositories {
  adminFindByEmail: (email: string) => Promise<AdminEntity | null>;
}