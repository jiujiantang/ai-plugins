ImageDB 工具，用于在 IndexedDB 中存储和检索图片，通过npm install vue-icon-cache安装使用。
PS：注意，每次更新要修改数据库版本号)

```ts
// imageDB.ts
import { App, inject } from 'vue'
import { imageDB } from 'vue-icon-cache'
import type { ImageDB } from 'vue-icon-cache'

declare const __APP_VERSION__: string

/** 提供给组件注入的上下文类型 */
type ImageDbContext = Pick<ImageDB, 'setImage' | 'getImage' | 'closeDB'>

/** 注入/提供 key */
const IMAGE_DB_KEY = Symbol('imageDB')

/** 初始化并提供 DB */
export async function installImageDb(app: App) {
    const db = await imageDB(__APP_VERSION__)
    // console.log('DB版本号:', db.version, db.oldVersion)

    const context: ImageDbContext = {
        setImage: db.setImage,
        getImage: db.getImage,
        closeDB: db.closeDB
    }

    // 全局 provide
    app.provide(IMAGE_DB_KEY, context)
}

/** 组件中使用 imageDB */
export function useImageDb() {
    const db = inject<ImageDbContext>(IMAGE_DB_KEY)
    if (!db) throw new Error('imageDB not provided')
    return db
}
```
```vue
<script setup lang="ts">
  import { useImageDb } from '@/imageDB';
  const {setImage} = useImageDb()

  const urlToBlob = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.blob();
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }
  const file = await urlToBlob("demoUrl");
  if(file) await setImage("demoKey", file)
</script>
```
