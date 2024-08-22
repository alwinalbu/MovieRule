declare module "node-cron" {
  interface CronTask {
    start(): void;
    stop(): void;
  }

  type CronExpression =
    | "* * * * *"
    | "* * * * * *"
    | "*/5 * * * *"
    | "0 */5 * * *"
    | "0 0 * * *"
    | "0 0 * * * *"
    | string;

  function schedule(expression: CronExpression, task: () => void): CronTask;

  export default { schedule };
}
