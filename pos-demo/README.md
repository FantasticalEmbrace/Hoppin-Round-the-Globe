# Acadia POS Sandbox Demo

A comprehensive sandbox demo for practicing payment processing and printing functionality, inspired by the Acadia POS system.

## 🚀 Features

### Core POS Functionality
- **Product Management**: Browse products by categories (Food, Beverages, Retail)
- **Shopping Cart**: Add/remove items, adjust quantities
- **Real-time Calculations**: Automatic subtotal, tax (8.5%), and total calculations
- **Customer Management**: Store customer information for transactions

### Payment Processing
- **Multiple Payment Methods**:
  - Cash payments
  - Credit/Debit card processing
  - Mobile payments (Apple Pay, Google Pay, etc.)
  - Gift card redemption
- **Payment Simulation**: Realistic payment processing with progress indicators
- **Change Calculation**: Automatic change calculation for cash payments
- **Transaction Management**: Hold orders, void transactions

### Printing & Receipt Management
- **Receipt Generation**: Professional receipt formatting
- **Print Functionality**: Browser-based printing simulation
- **Email Receipts**: Send receipts to customer email addresses
- **Receipt Preview**: View receipts before printing

### Additional Features
- **Real-time Clock**: Live date and time display
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Offline Capability**: Functions without internet connection
- **Transaction History**: Store recent transaction data
- **Demo Mode**: Built-in testing functions for quick demos

## 🎯 How to Use the Demo

### Getting Started
1. Open `index.html` in your web browser
2. The demo will load with sample products and a clean interface

### Basic Workflow
1. **Select Products**: Click on product cards to add them to the cart
2. **Manage Cart**: Use +/- buttons to adjust quantities or clear the cart
3. **Enter Customer Info** (optional): Fill in customer details in the right panel
4. **Choose Payment Method**: Select from Cash, Card, Mobile Pay, or Gift Card
5. **Process Payment**: Click "Process Payment" to simulate the transaction
6. **Print Receipt**: Use the receipt modal to print or email receipts

### Testing Payment Processing
The demo includes realistic payment simulation:
- **Card Payments**: Shows card reader interface with processing steps
- **Cash Payments**: Calculates change automatically
- **Mobile Payments**: Simulates contactless payment flow
- **Gift Cards**: Handles gift card balance checking

### Testing Print Functionality
- **Receipt Preview**: View formatted receipts before printing
- **Print Simulation**: Opens browser print dialog
- **Email Receipts**: Simulates sending receipts via email
- **Professional Formatting**: Receipts include store info, itemized purchases, taxes, and totals

## 🛠️ Demo Functions

For quick testing, add `?demo=true` to the URL to enable demo helper buttons:

- **Add Random Items**: Automatically adds sample products to cart
- **Fill Customer Info**: Populates customer fields with test data
- **Simulate Card Payment**: Runs a complete card payment simulation

Example: `file:///path/to/index.html?demo=true`

## 📱 Responsive Design

The demo is fully responsive and works on:
- **Desktop**: Full three-panel layout
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Single-column layout with touch-friendly buttons

## 🎨 Customization

### Adding Products
Edit the `products` array in `script.js`:
```javascript
{ 
    id: 19, 
    name: 'New Product', 
    price: 9.99, 
    category: 'food', 
    icon: 'fas fa-utensils' 
}
```

### Modifying Tax Rate
Change the tax rate in the POSSystem constructor:
```javascript
this.taxRate = 0.085; // 8.5% tax
```

### Styling
Customize colors and layout in `styles.css`:
- Primary color: `#3498db`
- Success color: `#27ae60`
- Error color: `#e74c3c`

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern features
- **CSS3**: Grid layout, flexbox, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, classes, and modern APIs
- **Font Awesome**: Icons for enhanced UI
- **Local Storage**: For holding orders and transaction history

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Efficient Rendering**: Minimal DOM manipulation
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Images**: Scalable vector icons
- **Local Processing**: No server dependencies

## 📋 Use Cases

### Training Scenarios
- **New Employee Training**: Practice POS operations without real transactions
- **Payment Processing**: Learn different payment methods and procedures
- **Receipt Management**: Practice printing and emailing receipts
- **Error Handling**: Test void transactions and order holds

### Development Testing
- **UI/UX Testing**: Evaluate interface design and user flow
- **Payment Integration**: Test payment processing workflows
- **Print Integration**: Verify receipt formatting and printing
- **Mobile Compatibility**: Test on various device sizes

### Sales Demonstrations
- **Client Presentations**: Show POS capabilities to potential customers
- **Feature Showcase**: Demonstrate specific functionality
- **Workflow Examples**: Illustrate typical transaction processes

## 🚀 Getting Started Quickly

1. **Download/Clone** the repository
2. **Open** `index.html` in your browser
3. **Start Testing**:
   - Add some products to cart
   - Fill in customer information
   - Select a payment method
   - Process a payment
   - Print a receipt

## 📞 Support

This is a demo application for educational and testing purposes. For questions about the actual Acadia POS system, visit [acadiapos.com](https://acadiapos.com).

## 📄 License

This demo is provided for educational purposes. The Acadia POS trademark and branding belong to their respective owners.

---

**Happy Testing!** 🎉

Use this sandbox to practice and familiarize yourself with POS operations, payment processing, and receipt management in a safe, simulated environment.

