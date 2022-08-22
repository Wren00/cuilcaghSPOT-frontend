type User = {
  userId: number;
  userName: string;
  emailAddress: string;
  userPassword: string;
  trustedUser: boolean;
  userLevelId: number;
};

type CreateUser = {
  userName: string;
  emailAddress: string;
  userPassword: string;
};

export type { User, CreateUser };
