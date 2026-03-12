import type { DemoResponse } from "../shared/api";

export default function handler(req: any, res: any) {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };

  res.status(200).json(response);
}
