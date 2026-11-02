## Pinia Persisted State: Short Summary

The `pinia-plugin-persistedstate` plugin makes it easy to save Pinia store data so it persists across page reloads. It is useful for keeping user preferences, form data, and other state values available after refresh.

### Installation

Install the plugin with your preferred package manager:

```sh
pnpm add pinia-plugin-persistedstate
```

```sh
npm i pinia-plugin-persistedstate
```

```sh
yarn add pinia-plugin-persistedstate
```

Then register it in the Pinia instance:

```ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

### Basic Usage

Set `persist: true` on a store to save its state automatically.

```ts
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    someState: "hello pinia",
  }),
  persist: true,
});
```

For setup stores:

```ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore(
  "main",
  () => {
    const someState = ref("hello pinia");
    return { someState };
  },
  {
    persist: true,
  },
);
```

### Configuration

By default, the plugin uses:

- `localStorage` as the storage engine
- `store.$id` as the storage key
- `JSON.stringify` and `JSON.parse` for serialization
- the full store state for persistence

You can customize this by passing an object to `persist`.

```ts
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    someState: "hello pinia",
  }),
  persist: {
    key: "my-store",
    storage: localStorage,
    // pick, omit, serializer, beforeHydrate, afterHydrate, debug
  },
});
```

### Common config options

- `key`: custom key name for saved data
- `storage`: choose where data is stored
- `serializer`: customize how data is converted
- `pick`: persist only selected fields
- `omit`: exclude selected fields
- `beforeHydrate`: run logic before restoring data
- `afterHydrate`: run logic after restoring data
- `debug`: show persistence debugging information
