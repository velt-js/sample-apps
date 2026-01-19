#!/usr/bin/env node
/**
 * This script generates JSON files containing the raw source code content
 * for each sample demo. This avoids issues with ?raw imports in Next.js.
 * 
 * Run this script before building: node scripts/generate-code-files.js
 * 
 * It auto-discovers samples by reading the existing code-files.ts and
 * extracting the import paths.
 */

const fs = require('fs')
const path = require('path')

// Base directories
const MASTER_APP_DIR = path.join(__dirname, '..')
const SAMPLES_DIR = path.join(MASTER_APP_DIR, 'samples')
const APPS_DIR = path.join(MASTER_APP_DIR, '..') // sample-apps/apps
const OUTPUT_DIR = path.join(MASTER_APP_DIR, 'generated')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Find all sample directories
const samples = fs.readdirSync(SAMPLES_DIR).filter(name => {
  const stat = fs.statSync(path.join(SAMPLES_DIR, name))
  return stat.isDirectory()
})

console.log(`Found ${samples.length} samples\n`)

// Process each sample
for (const sampleName of samples) {
  const codeFilesPath = path.join(SAMPLES_DIR, sampleName, 'code-files.ts')
  
  if (!fs.existsSync(codeFilesPath)) {
    console.log(`⏭ ${sampleName}: No code-files.ts found, skipping`)
    continue
  }
  
  const codeFilesContent = fs.readFileSync(codeFilesPath, 'utf-8')
  
  // Check if it already uses JSON import (already migrated)
  if (codeFilesContent.includes('from \'../../generated/')) {
    console.log(`✓ ${sampleName}: Already using JSON import`)
    continue
  }
  
  // Check if it uses ?raw imports
  if (!codeFilesContent.includes('?raw')) {
    console.log(`⏭ ${sampleName}: No ?raw imports found, skipping`)
    continue
  }
  
  console.log(`Processing ${sampleName}...`)
  
  // Extract import statements with ?raw
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)\?raw['"]/g
  const imports = []
  let match
  
  while ((match = importRegex.exec(codeFilesContent)) !== null) {
    imports.push({
      variableName: match[1],
      relativePath: match[2]
    })
  }
  
  if (imports.length === 0) {
    console.log(`  ⚠ No import paths found`)
    continue
  }
  
  // Generate JSON content
  const result = {}
  let successCount = 0
  let errorCount = 0
  
  for (const imp of imports) {
    // Convert relative path to absolute
    // The path is relative to the code-files.ts location
    const absolutePath = path.resolve(path.join(SAMPLES_DIR, sampleName), imp.relativePath)
    
    try {
      const content = fs.readFileSync(absolutePath, 'utf-8')
      result[imp.variableName] = content
      successCount++
    } catch (err) {
      console.error(`  ✗ ${imp.variableName}: ${err.message}`)
      result[imp.variableName] = `// Error loading file: ${imp.relativePath}`
      errorCount++
    }
  }
  
  // Write the JSON file
  const outputPath = path.join(OUTPUT_DIR, `${sampleName}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
  
  // Generate new code-files.ts content
  const newCodeFilesContent = generateCodeFilesTs(codeFilesContent, sampleName, imports)
  const newCodeFilesPath = path.join(SAMPLES_DIR, sampleName, 'code-files.ts')
  fs.writeFileSync(newCodeFilesPath, newCodeFilesContent)
  
  console.log(`  ✓ Generated JSON (${successCount} files, ${errorCount} errors)`)
  console.log(`  ✓ Updated code-files.ts`)
}

console.log('\nDone!')

/**
 * Generate new code-files.ts content that imports from JSON
 */
function generateCodeFilesTs(originalContent, sampleName, imports) {
  // Remove all ?raw import lines
  let newContent = originalContent.replace(/import\s+\w+\s+from\s+['"][^'"]+\?raw['"];\n?/g, '')
  
  // Add the JSON import at the top (after the type import)
  const typeImportMatch = newContent.match(/import\s+{\s*SampleCodeFile\s*}\s+from\s+['"]@\/types\/sample['"]/)
  if (typeImportMatch) {
    const insertPosition = typeImportMatch.index + typeImportMatch[0].length
    const jsonImport = `\n\n// Import generated code content from JSON\nimport codeContent from '../../generated/${sampleName}.json'`
    newContent = newContent.slice(0, insertPosition) + jsonImport + newContent.slice(insertPosition)
  }
  
  // Replace variable references in the codeFiles array
  // e.g., content: pageContent -> content: codeContent.pageContent
  for (const imp of imports) {
    // Match content: variableName or content: variableName }
    const regex = new RegExp(`content:\\s*${imp.variableName}(\\s*[},])`, 'g')
    newContent = newContent.replace(regex, `content: codeContent.${imp.variableName}$1`)
  }
  
  // Clean up any double newlines from removed imports
  newContent = newContent.replace(/\n{3,}/g, '\n\n')
  
  return newContent
}
