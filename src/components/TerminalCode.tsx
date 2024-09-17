import { PropsWithChildren } from "react";

export function TerminalCode({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-900 text-white font-mono p-4 rounded-lg shadow-lg overflow-auto flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <span className="bg-red-500 w-3 h-3 rounded-full"></span>
        <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
        <span className="bg-green-500 w-3 h-3 rounded-full"></span>
      </div>

      <pre className="overflow-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}
