// [SpreadJS] @mescius/spread-sheets-io ships no TypeScript declarations of its
// own. It is a side-effect plugin that augments the GC.Spread.Sheets namespace
// (the Workbook.import / export methods it enables are already declared in
// @mescius/spread-sheets). This ambient declaration lets the side-effect
// `import('@mescius/spread-sheets-io')` resolve without tripping noImplicitAny
// under strict mode.
declare module '@mescius/spread-sheets-io'
