
#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Navigate to the build output directory
cd dist

# Create a git repository
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to the gh-pages branch  
git push -f origin main:gh-pages

cd ..
echo "Deployment complete!"
