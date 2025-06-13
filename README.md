# POS System - Electron Application

A modern Point of Sale (POS) system built with Electron, React, and TypeScript. This application provides a desktop solution for managing sales transactions and product inventory.

## 🚀 Features

- **Dashboard**: Overview of your POS system with key metrics
- **Sales Management**: Handle sales transactions efficiently
- **Product Management**: Manage your inventory and product catalog
- **Cross-platform**: Runs on Windows, macOS, and Linux
- **Modern UI**: Built with React and responsive design

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, React Router DOM
- **Desktop Framework**: Electron
- **Build Tools**: Webpack, Babel
- **Styling**: CSS3, Sass
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.x)
- [npm](https://www.npmjs.com/) (>=7.x)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lithiaa/pos-electron.git
   cd pos-electron
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install app dependencies**
   ```bash
   cd release/app
   npm install
   cd ../..
   ```

## 🚀 Development

### Start the application in development mode

```bash
npm start
```

This will:
- Start the Webpack dev server for the renderer process
- Launch the Electron main process
- Enable hot module replacement for faster development

### Build for development

```bash
npm run build:dll
```

### Run tests

```bash
npm test
```

### Lint code

```bash
npm run lint
```

### Fix linting issues

```bash
npm run lint:fix
```

## 📦 Building for Production

### Build the application

```bash
npm run build
```

This creates production builds for both main and renderer processes.

### Package the application

```bash
npm run package
```

This will create a distributable package for your current platform in the `release/build` directory.

## 🏗️ Project Structure

```
pos-electron/
├── .erb/                    # Electron React Boilerplate configuration
│   ├── configs/            # Webpack configurations
│   ├── scripts/            # Build and utility scripts
│   └── mocks/              # Test mocks
├── assets/                 # Static assets (icons, images)
├── release/                # Build output directory
│   └── app/               # Packaged app location
├── src/                   # Source code
│   ├── main/              # Electron main process
│   │   ├── main.ts        # Main process entry point
│   │   ├── preload.ts     # Preload script
│   │   ├── menu.ts        # Application menu
│   │   └── util.ts        # Utility functions
│   ├── renderer/          # React renderer process
│   │   ├── App.tsx        # Main React component
│   │   ├── App.css        # Application styles
│   │   ├── index.tsx      # Renderer entry point
│   │   └── index.ejs      # HTML template
│   └── __tests__/         # Test files
├── package.json           # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🖥️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run build:main` | Build main process only |
| `npm run build:renderer` | Build renderer process only |
| `npm run build:dll` | Build development DLL |
| `npm run package` | Package application for distribution |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

## 🎯 Application Features

### Dashboard
- Welcome screen with system overview
- Quick access to main features

### Sales Management
- Process sales transactions
- Transaction history
- Receipt generation

### Product Management
- Add, edit, and delete products
- Inventory tracking
- Product categorization

## 🔧 Configuration

### Development
- The app runs on `http://localhost:1212` by default
- Hot module replacement is enabled for faster development
- DevTools are available in development mode

### Production
- Source maps are generated for debugging
- Code is minified and optimized
- Assets are bundled efficiently

## 🐛 Debugging

### Renderer Process
1. Open DevTools in the application window (Ctrl+Shift+I or Cmd+Option+I)
2. Use the Console, Sources, and Network tabs as needed

### Main Process
1. Use the VS Code debugger with the provided launch configuration
2. Or run with `--inspect` flag for Node.js debugging

## 📱 Platform Support

- **Windows**: Windows 10 and later
- **macOS**: macOS 10.14 and later
- **Linux**: Modern distributions with GTK 3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/lithiaa/pos-electron/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the steps to reproduce

## 🙏 Acknowledgments

- Built with [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)
- Icons provided by [Lucide React](https://lucide.dev/)
- Styling inspired by modern POS design patterns
