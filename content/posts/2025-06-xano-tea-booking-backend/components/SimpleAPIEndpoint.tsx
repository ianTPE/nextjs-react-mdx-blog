"use client";

import { Badge } from "@/components/ui/badge";

interface SimpleAPIEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
}

export default function SimpleAPIEndpoint({ method, path }: SimpleAPIEndpointProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="not-prose flex items-center gap-3 my-4">
      <Badge className={`font-mono font-bold ${getMethodColor(method)}`}>
        {method}
      </Badge>
      <code className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">
        {path}
      </code>
    </div>
  );
}