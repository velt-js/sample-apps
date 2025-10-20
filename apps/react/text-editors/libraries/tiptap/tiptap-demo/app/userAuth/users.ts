// [Velt] Hard-coded demo users
import type { User } from "@veltdev/types";

export const demoUsers: Record<string, User> = {
  michael: {
    userId: "michael",
    name: "Michael Scott",
    email: "michael.scott@dundermifflin.com",
    organizationId: "demo-org-1",
  },
  jim: {
    userId: "jim",
    name: "Jim Halpert",
    email: "jim.halpert@dundermifflin.com",
    organizationId: "demo-org-1",
  },
  pam: {
    userId: "pam",
    name: "Pam Beesly",
    email: "pam.beesly@dundermifflin.com",
    organizationId: "demo-org-1",
  },
};
