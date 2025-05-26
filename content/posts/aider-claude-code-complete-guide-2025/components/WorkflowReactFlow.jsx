import React from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 'A',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: '開始新專案' },
    style: {
      background: '#ffffff',
      border: '2px solid #1a202c',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      width: 120,
      height: 50,
    },
  },
  {
    id: 'B',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { label: '任務類型？' },
    style: {
      background: '#fff5f5',
      border: '2px solid #e53e3e',
      borderRadius: '50%',
      fontSize: '14px',
      fontWeight: '500',
      width: 100,
      height: 60,
    },
  },
  {
    id: 'C',
    type: 'default',
    position: { x: 50, y: 220 },
    data: { label: '使用 Aider.chat' },
    style: {
      background: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      width: 130,
      height: 50,
    },
  },
  {
    id: 'D',
    type: 'default',
    position: { x: 250, y: 220 },
    data: { label: '使用 Claude Code' },
    style: {
      background: '#ff6b6b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      width: 140,
      height: 50,
    },
  },
  {
    id: 'E',
    type: 'default',
    position: { x: 450, y: 220 },
    data: { label: '組合使用' },
    style: {
      background: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      width: 100,
      height: 50,
    },
  },
  {
    id: 'F',
    type: 'default',
    position: { x: 50, y: 320 },
    data: { label: '多輪對話迭代' },
    style: {
      background: '#ffffff',
      border: '2px solid #667eea',
      borderRadius: '8px',
      fontSize: '13px',
      width: 110,
      height: 50,
    },
  },
  {
    id: 'G',
    type: 'default',
    position: { x: 50, y: 420 },
    data: { label: '快速驗證想法' },
    style: {
      background: '#ffffff',
      border: '2px solid #667eea',
      borderRadius: '8px',
      fontSize: '13px',
      width: 110,
      height: 50,
    },
  },
  {
    id: 'H',
    type: 'default',
    position: { x: 50, y: 520 },
    data: { label: '需要深度開發？' },
    style: {
      background: '#fff5f5',
      border: '2px solid #e53e3e',
      borderRadius: '50%',
      fontSize: '12px',
      fontWeight: '500',
      width: 110,
      height: 60,
    },
  },
  {
    id: 'I',
    type: 'default',
    position: { x: 250, y: 650 },
    data: { label: '完成任務' },
    style: {
      background: '#f1c40f',
      color: '#2c3e50',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      width: 100,
      height: 50,
    },
  },
  {
    id: 'J',
    type: 'default',
    position: { x: 250, y: 320 },
    data: { label: '深度程式碼理解' },
    style: {
      background: '#ffffff',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      fontSize: '12px',
      width: 120,
      height: 50,
    },
  },
  {
    id: 'K',
    type: 'default',
    position: { x: 250, y: 420 },
    data: { label: '多檔案協同編輯' },
    style: {
      background: '#ffffff',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      fontSize: '12px',
      width: 120,
      height: 50,
    },
  },
  {
    id: 'L',
    type: 'default',
    position: { x: 250, y: 520 },
    data: { label: '自動化測試' },
    style: {
      background: '#ffffff',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      fontSize: '13px',
      width: 100,
      height: 50,
    },
  },
  {
    id: 'M',
    type: 'default',
    position: { x: 380, y: 520 },
    data: { label: 'Git 工作流整合' },
    style: {
      background: '#ffffff',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      fontSize: '12px',
      width: 120,
      height: 50,
    },
  },
  {
    id: 'N',
    type: 'default',
    position: { x: 380, y: 420 },
    data: { label: '自動建立 PR' },
    style: {
      background: '#ffffff',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      fontSize: '13px',
      width: 110,
      height: 50,
    },
  },
  {
    id: 'O',
    type: 'default',
    position: { x: 450, y: 320 },
    data: { label: 'Aider 處理探索階段' },
    style: {
      background: '#ffffff',
      border: '2px solid #2ecc71',
      borderRadius: '8px',
      fontSize: '11px',
      width: 130,
      height: 50,
    },
  },
  {
    id: 'P',
    type: 'default',
    position: { x: 450, y: 420 },
    data: { label: 'Claude Code 處理實現階段' },
    style: {
      background: '#ffffff',
      border: '2px solid #2ecc71',
      borderRadius: '8px',
      fontSize: '10px',
      width: 140,
      height: 50,
    },
  },
  {
    id: 'Q',
    type: 'default',
    position: { x: 450, y: 520 },
    data: { label: '兩者協同維護' },
    style: {
      background: '#ffffff',
      border: '2px solid #2ecc71',
      borderRadius: '8px',
      fontSize: '12px',
      width: 120,
      height: 50,
    },
  },
];

const initialEdges = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: '快速原型',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px', fontWeight: '500' },
  },
  {
    id: 'B-D',
    source: 'B',
    target: 'D',
    label: '複雜開發',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px', fontWeight: '500' },
  },
  {
    id: 'B-E',
    source: 'B',
    target: 'E',
    label: '混合任務',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
    labelStyle: { fontSize: '12px', fontWeight: '500' },
  },
  {
    id: 'C-F',
    source: 'C',
    target: 'F',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'F-G',
    source: 'F',
    target: 'G',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'G-H',
    source: 'G',
    target: 'H',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'H-D',
    source: 'H',
    target: 'D',
    label: '是',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2, stroke: '#27ae60' },
    labelStyle: { fontSize: '12px', fontWeight: '500', fill: '#27ae60' },
  },
  {
    id: 'H-I',
    source: 'H',
    target: 'I',
    label: '否',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2, stroke: '#e74c3c' },
    labelStyle: { fontSize: '12px', fontWeight: '500', fill: '#e74c3c' },
  },
  {
    id: 'D-J',
    source: 'D',
    target: 'J',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'J-K',
    source: 'J',
    target: 'K',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'K-L',
    source: 'K',
    target: 'L',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'L-M',
    source: 'L',
    target: 'M',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'M-N',
    source: 'M',
    target: 'N',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'N-I',
    source: 'N',
    target: 'I',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'E-O',
    source: 'E',
    target: 'O',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'O-P',
    source: 'O',
    target: 'P',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'P-Q',
    source: 'P',
    target: 'Q',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Q-I',
    source: 'Q',
    target: 'I',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
  },
];

function WorkflowReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '800px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.style?.background) {
              case '#667eea': return '#667eea';
              case '#ff6b6b': return '#ff6b6b';
              case '#2ecc71': return '#2ecc71';
              case '#f1c40f': return '#f1c40f';
              default: return '#ffffff';
            }
          }}
          position="top-right"
        />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default WorkflowReactFlow;