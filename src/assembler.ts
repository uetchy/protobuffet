import { bitou8, concatu8 as cc } from "./util";

export function ld(
  fid: bigint | number,
  payload: Uint8Array[] | Uint8Array | string
): Uint8Array {
  const b =
    typeof payload === "string"
      ? new TextEncoder().encode(payload)
      : Array.isArray(payload)
      ? cc(payload)
      : payload;
  const bLen = b.byteLength;
  return cc([bitou8(pbh(fid, 2)), bitou8(encv(BigInt(bLen))), b]);
}

export function vt(fid: bigint | number, payload: bigint | number): Uint8Array {
  return cc([bitou8(pbh(fid, 0)), bitou8(payload)]);
}

// function f3(fid: bigint | number, payload: bigint): Buffer {
//   while (payload >> 8n) {
//     const b = payload & 8n;
//   }
// }

function pbh(fid: bigint | number, type: number): bigint {
  return encv((BigInt(fid) << 3n) | BigInt(type));
}

function encv(n: bigint): bigint {
  let s = 0n;
  while (n >> 7n) {
    s = (s << 8n) | 0x80n | (n & 0x7fn);
    n >>= 7n;
  }
  s = (s << 8n) | n;
  return s;
}
