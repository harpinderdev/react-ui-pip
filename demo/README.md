# React UI PiP - Demo Application

This is a fully functional Next.js demo application showcasing all features of the `react-ui-pip` library.

## Features Demonstrated

1. **Audio Player (Home)** - Basic PiP with snap to corners and position persistence
2. **Controlled Mode** - Full position control with programmatic movement
3. **Snap to Corners** - Magnetic corner snapping with adjustable threshold
4. **Drag Handle** - Restrict dragging to specific elements

## Quick Start

### 1. Build the Library

First, make sure the main library is built:

```bash
cd ..
npm install
npm run build
```

### 2. Install Demo Dependencies

```bash
cd demo
npm install
```

### 3. Run the Demo

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
demo/
├── app/
│   ├── layout.tsx          # Root layout with PipContainer
│   ├── page.tsx            # Home page (Audio Player demo)
│   ├── controlled/
│   │   └── page.tsx        # Controlled mode demo
│   ├── snap-corners/
│   │   └── page.tsx        # Snap to corners demo
│   ├── drag-handle/
│   │   └── page.tsx        # Drag handle demo
│   └── globals.css         # Global styles
├── components/
│   └── Navigation.tsx      # Navigation component
├── package.json
├── next.config.js
└── tsconfig.json
```

## Demo Pages

### Home (Audio Player)
- Demonstrates basic PiP functionality
- Features a music player with play/pause
- Shows progress bar and stats
- Includes snap to corners and position persistence

### Controlled Mode
- Full position control via React state
- Programmatic position updates
- Real-time position display
- Buttons to move PiP to specific locations

### Snap to Corners
- Magnetic corner snapping
- Adjustable snap threshold (20-150px)
- Visual feedback when snapped
- onSnapToCorner callback demonstration

### Drag Handle
- Restrict dragging to header only
- Toggle between handle and full-area dragging
- Interactive content (input, buttons)
- Shows use cases for restricted dragging

## Key Features Shown

- Portal-based architecture (no re-mounts when entering/exiting PiP)
- SSR-safe (works with Next.js App Router)
- Window-bounded dragging
- Position persistence with localStorage
- TypeScript support
- Responsive design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Customization

Feel free to modify the demo to test different configurations:

1. Edit `app/page.tsx` to change the audio player demo
2. Adjust styles in `app/globals.css`
3. Add new demo pages in `app/your-demo/page.tsx`
4. Update navigation in `components/Navigation.tsx`

## Tips for Testing

1. **Navigate Between Pages**: The PiP window persists across page navigation
2. **Drag Around**: Test window bounds - the PiP can't escape the viewport
3. **Snap to Corners**: Drag near edges to see magnetic snapping
4. **Resize Window**: The PiP adjusts to stay within bounds
5. **Reload Page**: Position is saved to localStorage (for demos with `persistKey`)

## Troubleshooting

### PiP Not Showing
- Make sure you clicked "Enter PiP" button
- Check browser console for errors
- Ensure the library is built (`npm run build` in parent directory)

### Library Not Found
- Run `npm install` in the demo directory
- The demo uses `"react-ui-pip": "file:.."` to link to the parent library
- Make sure the parent library is built first

### TypeScript Errors
- Run `npm install` to ensure all types are installed
- Check that `tsconfig.json` is properly configured

## Production Build

To build for production:

```bash
npm run build
npm start
```

The production build will be optimized and ready to deploy.

## Learn More

- [react-ui-pip Documentation](../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## Feedback

If you find issues or have suggestions for the demo, please open an issue on the [GitHub repository](https://github.com/harpinderdev/react-ui-pip/issues).
