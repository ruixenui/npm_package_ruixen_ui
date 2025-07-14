const fs = require('fs-extra');
const path = require('path');

async function buildComponents() {
  const srcDir = path.join(__dirname, '../src');
  const distDir = path.join(__dirname, '../dist');
  
  // Ensure dist directory exists
  await fs.ensureDir(distDir);
  
  // Only copy templates if the directory exists
  const templatesDir = path.join(__dirname, '../templates');
  if (await fs.pathExists(templatesDir)) {
    const distTemplatesDir = path.join(distDir, 'templates');
    await fs.copy(templatesDir, distTemplatesDir, { recursive: true });
    console.log('📁 Copied templates directory');
  }
  
  console.log('✅ Components built successfully!');
}

buildComponents().catch(console.error);