import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  locateFile: file => `./sql-wasm.wasm`
});

export { SQL };