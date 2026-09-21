import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Next.js 16부터 `next lint` 명령이 사라지고 ESLint CLI를 직접 사용합니다.
 * 실행: npm run lint  (내부적으로 `eslint .` 실행)
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
