import SignUpPage from "@/pages/sign-up";
import type { RouteObject } from "react-router";

export const routeConfig: RouteObject[] = [
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
];
