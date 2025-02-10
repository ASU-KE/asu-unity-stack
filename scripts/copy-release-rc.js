const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '.releaserc.json');
const packagesDir = path.join(__dirname, '..', 'packages');

function copyReleaseRC() {
  fs.readdir(packagesDir, (err, files) => {
    if (err) {
      console.error('Error reading packages directory:', err);
      return;
    }

    files.forEach(file => {
      const packagePath = path.join(packagesDir, file);
      const destPath = path.join(packagePath, '.releaserc');

      if (fs.lstatSync(packagePath).isDirectory()) {
        fs.copyFile(sourcePath, destPath, (err) => {
          if (err) {
            console.error(`Error copying .releaserc to ${packagePath}:`, err);
          } else {
            console.log(`.releaserc.json copied to ${packagePath}`);
          }
        });
      }
    });
  });
}

copyReleaseRC();
