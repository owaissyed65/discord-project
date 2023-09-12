import { Server, Member, Profile } from "@prisma/client";

export type serverWithMembersWithProfie = Server & {
  members: (Member & { profile: Profile })[];
};
