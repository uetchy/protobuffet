import { ProtoBufReader } from "./reader";
import { PBToken, PBType, PBValue } from "./token";

export function parsePb(input: Uint8Array, depth: number = 0): PBValue {
  const pbr = new ProtoBufReader(input);

  const tokens: PBToken[] = [];
  let nextHeader;

  while ((nextHeader = pbr.eatVariant())) {
    const [fid, type] = ProtoBufReader.splitHeader(nextHeader);
    switch (type) {
      case 0: {
        const v = pbr.eatVariant();
        if (v == null) throw new Error("Invalid sequence (v)");
        tokens.push({ fid, type: PBType.V, v });
        break;
      }
      case 2: {
        pbr.save();
        const len = pbr.eatVariant();
        if (len == null) throw new Error("Invalid sequence (ld)");
        if (len > pbr.remainingBytes()) {
          pbr.rewind();
        } else {
          const inner = pbr.eat(Number(len));
          if (inner == null) {
            pbr.rewind();
          } else {
            const v = parsePb(inner, depth + 1);
            tokens.push({ fid, type: PBType.LD, v });
            break;
          }
        }
      }
      case 1: {
        pbr.save();
        const v = pbr.eatUInt64();
        if (v !== null) {
          tokens.push({ fid, type: PBType.F64, v });
          break;
        }
        // throw new Error("Invalid sequence (f64)");
        pbr.rewind();
      }
      case 5: {
        pbr.save();
        const v = pbr.eatUInt32();

        if (v !== null) {
          tokens.push({ fid, type: PBType.F32, v });
          break;
        }

        // throw new Error("Invalid sequence (f32)");
        pbr.rewind();
      }
      default: {
        // throw new Error("Unknown type: " + type);
        const res = new TextDecoder().decode(input);
        return res;
      }
    }
  }

  if (tokens.length === 0) {
    throw new Error("Empty sequence");
  }

  return tokens;
}
