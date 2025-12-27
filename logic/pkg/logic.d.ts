/* tslint:disable */
/* eslint-disable */

export class IEEEResult {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  readonly full_binary: string;
  readonly hex: string;
  readonly sign: string;
  readonly exponent: string;
  readonly mantissa: string;
}

export function convert_f32(input: number): IEEEResult;

export function convert_f64(input: number): IEEEResult;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ieeeresult_free: (a: number, b: number) => void;
  readonly convert_f32: (a: number) => number;
  readonly convert_f64: (a: number) => number;
  readonly ieeeresult_exponent: (a: number) => [number, number];
  readonly ieeeresult_full_binary: (a: number) => [number, number];
  readonly ieeeresult_hex: (a: number) => [number, number];
  readonly ieeeresult_mantissa: (a: number) => [number, number];
  readonly ieeeresult_sign: (a: number) => [number, number];
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
