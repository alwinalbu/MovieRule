export interface IVerifyTheaterOtpUseCase {
  execute(email: string, otp: string[]): Promise<boolean>;
}
