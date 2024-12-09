# LCDP-Map 🗺️
A wrapper library for Leaflet, optimized for use in Appsmith with custom functionalities.

### GUIDE FOR BUILDING AND PUBLISHING LCDP-MAP

---

### 1. DIRECTORY STRUCTURE  
```
LCDP-MAP/
├── src/
│   └── index.js        # Main source code
├── dist/               # Build output
├── .gitignore          # Git ignore file
├── LICENSE             # MIT License
├── README.md           # Documentation
├── package.json        # Package config
└── webpack.config.js   # Webpack config
```

---

### 2. CHECK MAIN FILES
- **`package.json`**: Verify version and dependencies.  
- **`webpack.config.js`**: Ensure correct UMD configuration.  
- **`src/index.js`**: Check the code and exports.  
- **`README.md`**: Update documentation if necessary.  

---

### 3. INSTALL DEPENDENCIES, BUILD AND RUN COMMANDS
```bash
# Install dependencies
npm i lcdp-map

# Build package
npm run build
```

---

### 4. POST-PUBLISH CHECKS
- Verify the package on npm:  
  [https://www.npmjs.com/package/lcdp-map](https://www.npmjs.com/package/lcdp-map)  
- Check the CDN URL:  
  [https://cdn.jsdelivr.net/npm/lcdp-map@0.0.5/dist/index.umd.js](https://cdn.jsdelivr.net/npm/lcdp-map@1.0.0/dist/index.umd.js)  
- Test in Appsmith with the new URL.  

