import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface Todo {
  message?: string | null;
  is_done?: boolean | null;
  created_at?: string | null;
}

export type TodoRecord = Todo & XataRecord;

export interface User {
  username?: string | null;
  password?: string | null;
}

export type UserRecord = User & XataRecord;

export type DatabaseSchema = {
  todos: Todo;
  users: User;
};

const links = { todos: [], users: [] };

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      { databaseURL: "https://demos-urucbe.xata.sh/db/donex", ...options },
      links
    );
  }
}
