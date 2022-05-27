import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface Todo {
  message?: string | null;
  is_done?: boolean | null;
  created_at?: string | null;
}

export type TodoRecord = Todo & XataRecord;

export type DatabaseSchema = {
  todos: Todo;
};

const links = { todos: [] };

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      { databaseURL: "https://demos-urucbe.xata.sh/db/donex", ...options },
      links
    );
  }
}
