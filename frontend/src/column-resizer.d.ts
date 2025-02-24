declare module "column-resizer" {
    export default class ColumnResizer {
      constructor(table: HTMLTableElement, options?: unknown);
      reset(options?: unknown): void;
    }
  }