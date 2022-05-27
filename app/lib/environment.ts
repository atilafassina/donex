/**
 * this exists only to trick VSCode into thinking the runtime is NodeJS
 * otherwise the TS Server will complain about a Deno specific imports and
 * the `Deno` global. Only this file is read as Deno code within VSCode.
 *
 * Despite this, everything works well because there's no Nodejs/Deno
 * specific code besides fetching env variables.
 */
export const XATA_API_KEY = Deno.env.get('XATA_API_KEY')
export const SESSION_SECRET = Deno.env.get('SESSION_SECRET')
