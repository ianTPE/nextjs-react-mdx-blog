/**
 * 全局可用的MDX組件
 * 這些組件可以在任何MDX文件中使用，不需要明確導入
 */

// 重新導出CodeBlock組件
export { default as CodeBlock } from '../CodeBlock';

// 導出任何其他全局可用的組件
export { default as Alert } from './Alert';
export { default as Callout } from './Callout';
// 可以添加更多全局組件...
