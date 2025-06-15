"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface APIEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  responses?: Array<{
    status: number;
    description: string;
    example?: any;
  }>;
  example?: string;
}

export default function APIEndpoint({ 
  method, 
  path, 
  description, 
  parameters, 
  responses, 
  example 
}: APIEndpointProps) {
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${method} ${path}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={`font-mono font-bold ${getMethodColor(method)}`}>
                {method}
              </Badge>
              <code className="text-lg font-mono bg-gray-100 px-2 py-1 rounded">
                {path}
              </code>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="複製端點"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {description && (
            <p className="text-gray-600 mt-2">{description}</p>
          )}
          {copied && (
            <span className="text-green-600 text-sm">✓ 已複製到剪貼板</span>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {parameters && parameters.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">參數</h4>
              <div className="space-y-2">
                {parameters.map((param, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="font-mono text-sm bg-white px-2 py-1 rounded">
                        {param.name}
                      </code>
                      <Badge variant={param.required ? "default" : "secondary"} className="text-xs">
                        {param.type}
                      </Badge>
                      {param.required && (
                        <Badge variant="destructive" className="text-xs">
                          必需
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {responses && responses.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">響應</h4>
              <div className="space-y-3">
                {responses.map((response, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`font-mono ${
                        response.status >= 200 && response.status < 300 
                          ? 'bg-green-100 text-green-800'
                          : response.status >= 400
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {response.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{response.description}</span>
                    </div>
                    {response.example && (
                      <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>{JSON.stringify(response.example, null, 2)}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {example && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">請求範例</h4>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                <code>{example}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}