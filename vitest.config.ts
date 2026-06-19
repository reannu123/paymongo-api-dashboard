import { defineConfig } from "vitest/config";
import path from "path";

// Resolve the "@/..." alias (matches tsconfig paths) so unit tests can import
// project modules the same way the app does.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    include: ["lib/**/*.test.ts"],
  },
});
