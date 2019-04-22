# redux-observable-example

[redux-observable](https://github.com/redux-observable/redux-observable)の`ofType`でActionの型を完全に推論させるサンプルです。

[![Image from Gyazo](https://i.gyazo.com/7cb37829a8f85b8240232b49e35690d5.png)](https://gyazo.com/7cb37829a8f85b8240232b49e35690d5)

[![Image from Gyazo](https://i.gyazo.com/b5c8b2cc160799dc8526d7ab1f6339b6.png)](https://gyazo.com/b5c8b2cc160799dc8526d7ab1f6339b6)

## How

### プロジェクトで一つのAction
redux-observableの`ofType`で推論させるためにはまずプロジェクトで共通のAction型を定義する必要があります。Actionの型を定義する方法はたくさんありますが、このプロジェクトでは、`as const`と[redux-actions-type](https://github.com/akameco/redux-actions-type) を使ってActionの型を定義します。

src/actionType.ts

```ts
import { ActionType } from "redux-actions-type";
import * as actions from "./actions";

export type Action = ActionType<typeof actions>;
```

### redux-observableの型定義の拡張
Actionの型を利用し、redux-observableの型定義を拡張します。Action型が一つなので、`Extract`を使い`ofType`引数から戻り値の型が推論されるようになります。

src/@types/redux-observable.d.ts

```ts
import { Action } from "../actionType";
import { Observable } from "rxjs";

declare module "redux-observable" {
  function ofType<ActionType extends Action["type"]>(
    ...key: ActionType[]
  ): (
    source: Observable<Action>
  ) => Observable<Extract<Action, { type: ActionType }>>;
}
```

### Epic型の定義

最後に`Epic`型を定義しましょう。これを利用することで`ofType`の推論が効くようになります。あとは、プロジェクトに合わせて必要であればStateやDependenciesを設定するとより補完が便利になるでしょう。

src/typeRoot.ts

```ts
import { Epic as _Epic } from "redux-observable";
import { Action } from "./actionType";

export type Epic = _Epic<Action, Action>;
```

### Enjoy!
これで、`ofType`入力時の補完と`ofType`後のActionが推論されるようになりました。
あとは補完が効く環境で`Epic`を書くだけです。Enjoy！

```ts
import { of } from "rxjs";
import { delay, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "../../typeRoot";
import { increment } from "./actions";

const incrementAsync: Epic = action$ =>
  action$.pipe(
    ofType("incrementAsync"),
    mergeMap(action => of(increment()).pipe(delay(action.delay)))
  );
```

![](https://thumbs.gfycat.com/TangibleDeafeningAnophelesmosquito-small.gif)

## License

MIT © [akameco](http://akameco.github.io)
