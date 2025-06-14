# MDX 解析測試

## 各種語法的行為：

### ❌ 會出錯的寫法：
```markdown
<code>{variable_name}</code>
<span>{another_variable}</span>  
Path: {api_endpoint}
```

### ✅ 安全的寫法：
```markdown
`{variable_name}`
**{another_variable}**
Path: [api_endpoint] 或 \{api_endpoint\}
```

### 原理解釋：
1. `<code>{var}</code>` → JSX 組件，{var} 被解析為表達式
2. `` `{var}` `` → Markdown code，{var} 是純文本  
3. `{var}` → 直接的 JSX 表達式，需要定義變數
4. `[var]` → 純文本，不會被解析
