# PantrySnap - Pantry Scanner App

A simple and efficient way to manage your pantry inventory using barcode scanning. Built with Next.js and local storage for offline-first functionality.

## Features

- 📱 Scan product barcodes using your device's camera
- ⌨️ Manually enter barcodes for products
- 📦 Store product information locally in your browser
- 🗃️ View and manage your pantry inventory
- 🌓 Dark mode support
- 📱 Responsive design for all devices

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Local Storage for data persistence
- react-qr-barcode-scanner for barcode scanning
- date-fns for date formatting

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Add Items**
   - Use the "Scan Barcode" option to scan product barcodes with your camera
   - Or use "Enter Barcode" to manually input barcode numbers

2. **View Inventory**
   - Go to "My Pantry" to see all your stored items
   - Edit item names and quantities
   - Remove items you no longer need

3. **Manage Products**
   - All data is stored locally in your browser
   - No account required
   - Works offline

## Future Improvements

- [ ] Add product name lookup using a barcode database API
- [ ] Add ability to categorize items
- [ ] Add expiration date tracking
- [ ] Add shopping list generation
- [ ] Add data export/import functionality
- [ ] Add ability to add custom product images
