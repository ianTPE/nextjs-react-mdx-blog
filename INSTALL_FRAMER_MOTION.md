# 安裝 Framer Motion

為了在專案中使用 Framer Motion 並啟用更豐富的動畫效果，請按照以下步驟執行：

## 安裝步驟

1. 在專案根目錄執行以下命令安裝 Framer Motion：

```bash
npm install framer-motion
```

或者，如果您使用 yarn：

```bash
yarn add framer-motion
```

2. 安裝完成後，更新 MotionCard 組件（位於 `components/animation/MotionCard.tsx`）：

```tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

export default function MotionCard({ children, className = '' }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
```

3. 已經完成！現在您的卡片將使用 Framer Motion 的動畫效果，具有更流暢和專業的懸停交互。

## 可選的進階效果

安裝 Framer Motion 後，您可以進一步增強卡片的動畫效果：

### 添加點擊效果

```tsx
<motion.div
  className={className}
  whileHover={{ 
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }}
  whileTap={{ y: -4 }} // 點擊時稍微反彈
  transition={{ 
    duration: 0.3,
    ease: "easeOut"
  }}
>
  {children}
</motion.div>
```

### 添加初始動畫

為了讓卡片在頁面加載時有個淡入效果：

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ 
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }}
  className={className}
>
  {children}
</motion.div>
```

### 添加列表動畫（用於卡片列表）

在父組件中：

```tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BlogList({ posts }) {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
```

然後在 MotionCard 中添加相應的 variants：

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }}
  whileHover={{ 
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }}
  className={className}
>
  {children}
</motion.div>
```

這將使卡片以交錯的方式淡入頁面，創建更引人注目的加載體驗。
