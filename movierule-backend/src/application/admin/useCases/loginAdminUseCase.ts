import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const loginAdminUseCase = (dependencies:IAdminDependencies) => {
  const { repositories: { adminFindByEmail}} = dependencies

   return {
     execute: async (email: string, password: string) => {
       try {
         const admin = await adminFindByEmail(email);
         if (!admin) {
           throw new Error("Admin not found");
         }

         const isPasswordValid = password === admin.password;
         if (!isPasswordValid) {
           throw new Error("Invalid credentials");
         }
         return admin;
       } catch (error: any) {
         throw new Error(error.message);
       }
     },
   };
}