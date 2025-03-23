const fs = require("fs");
const path = require("path");

const standaloneDir = path.join(__dirname, "../.next/standalone");
const filesToCopy = ["frontend.js", "serverless.yml"];

// Ensure .next/standalone exists
if (!fs.existsSync(standaloneDir)) {
  fs.mkdirSync(standaloneDir, { recursive: true });
}

// Copy each file
filesToCopy.forEach((file) => {
  const src = path.join(__dirname, "../", file);
  const dest = path.join(standaloneDir, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file} to .next/standalone/`);
  } else {
    console.warn(`⚠️ Warning: ${file} not found, skipping.`);
  }
});
