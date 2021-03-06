# 🍽 protobuffet

[![npm](https://badgen.net/npm/v/protobuffet)](https://npmjs.org/package/protobuffet)
[![npm: total downloads](https://badgen.net/npm/dt/protobuffet)](https://npmjs.org/package/protobuffet)

Fast, zero-dependency [Protocol Buffers](https://developers.google.com/protocol-buffers/) binary message parser and assembler.

## Usage

### Parse

```js
import { parsePb } from "protobuffet";

const parsed = parsePb(uint8Array);
```

### Construct

```js
import { ld, vt, concatu8 as cc } from "protobuffet";

const binMsg = cc(ld(0, "hello"), vt(1, 1000));
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/uetchy"><img src="https://avatars.githubusercontent.com/u/431808?v=4?s=100" width="100px;" alt=""/><br /><sub><b>uetchy</b></sub></a><br /><a href="https://github.com/uetchy/protobuffet/commits?author=uetchy" title="Code">💻</a></td>
    <td align="center"><a href="https://jan-prochazka.eu/"><img src="https://avatars.githubusercontent.com/u/1665677?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jan Procházka</b></sub></a><br /><a href="https://github.com/uetchy/protobuffet/commits?author=jprochazk" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
