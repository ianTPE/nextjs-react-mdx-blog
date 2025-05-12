/**
 * 全局可用的MDX組件
 * 這些組件可以在任何MDX文件中使用，不需要明確導入
 */

// 導出全局可用的組件
export { default as Alert } from './Alert';
export { default as Callout } from './Callout';

// 如果 CodeBlock 存在，導出它
try {
  const CodeBlock = require('../CodeBlock').default;
  module.exports.CodeBlock = CodeBlock;
} catch (error) {
  console.warn('CodeBlock 寬件加載失敗，它將不可用：', error);
}

