const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'components', 'ui');

// Read all component files
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(componentsDir, file);
      
      // Read file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace the import path
      const updatedContent = content.replace(
        /from '\@\/lib\/utils'/g,
        'from \'../../src/lib/utils\''
      );
      
      // Write the updated content back to the file
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    }
  });
  
  console.log('All component imports have been updated!');
});
