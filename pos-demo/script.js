// POS System Demo JavaScript

class POSSystem {
    constructor() {
        this.cart = [];
        this.products = [
            // Food Items
            { id: 1, name: 'Burger', price: 12.99, category: 'food', icon: 'fas fa-hamburger' },
            { id: 2, name: 'Pizza Slice', price: 4.50, category: 'food', icon: 'fas fa-pizza-slice' },
            { id: 3, name: 'Sandwich', price: 8.99, category: 'food', icon: 'fas fa-bread-slice' },
            { id: 4, name: 'Salad', price: 9.99, category: 'food', icon: 'fas fa-leaf' },
            { id: 5, name: 'Pasta', price: 13.99, category: 'food', icon: 'fas fa-utensils' },
            { id: 6, name: 'Tacos', price: 7.99, category: 'food', icon: 'fas fa-pepper-hot' },
            
            // Beverages
            { id: 7, name: 'Coffee', price: 3.50, category: 'beverages', icon: 'fas fa-coffee' },
            { id: 8, name: 'Soda', price: 2.99, category: 'beverages', icon: 'fas fa-glass-whiskey' },
            { id: 9, name: 'Water', price: 1.99, category: 'beverages', icon: 'fas fa-tint' },
            { id: 10, name: 'Juice', price: 4.99, category: 'beverages', icon: 'fas fa-glass-martini' },
            { id: 11, name: 'Tea', price: 2.99, category: 'beverages', icon: 'fas fa-mug-hot' },
            { id: 12, name: 'Smoothie', price: 6.99, category: 'beverages', icon: 'fas fa-blender' },
            
            // Retail Items
            { id: 13, name: 'T-Shirt', price: 19.99, category: 'retail', icon: 'fas fa-tshirt' },
            { id: 14, name: 'Hat', price: 15.99, category: 'retail', icon: 'fas fa-hat-cowboy' },
            { id: 15, name: 'Mug', price: 12.99, category: 'retail', icon: 'fas fa-mug-hot' },
            { id: 16, name: 'Keychain', price: 5.99, category: 'retail', icon: 'fas fa-key' },
            { id: 17, name: 'Notebook', price: 8.99, category: 'retail', icon: 'fas fa-book' },
            { id: 18, name: 'Pen Set', price: 14.99, category: 'retail', icon: 'fas fa-pen' }
        ];
        
        this.selectedPaymentMethod = null;
        this.taxRate = 0.085; // 8.5% tax
        this.currentTransaction = null;
        
        this.init();
    }
    
    init() {
        this.updateDateTime();
        this.renderProducts();
        this.setupEventListeners();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }
    
    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
    }
    
    renderProducts(category = 'all') {
        const productsGrid = document.getElementById('productsGrid');
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === category);
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <i class="${product.icon}"></i>
                <h4>${product.name}</h4>
                <div class="price">$${product.price.toFixed(2)}</div>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderProducts(e.target.dataset.category);
            });
        });
        
        // Product selection
        document.getElementById('productsGrid').addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.productId);
                this.addToCart(productId);
            }
        });
        
        // Payment method selection
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.selectedPaymentMethod = e.currentTarget.dataset.method;
                this.updatePaymentAmount();
            });
        });
        
        // Clear cart
        document.getElementById('clearCart').addEventListener('click', () => {
            this.clearCart();
        });
        
        // Process payment
        document.getElementById('processPayment').addEventListener('click', () => {
            this.processPayment();
        });
        
        // Action buttons
        document.getElementById('printReceipt').addEventListener('click', () => {
            this.showReceiptModal();
        });
        
        document.getElementById('emailReceipt').addEventListener('click', () => {
            this.emailReceipt();
        });
        
        document.getElementById('holdOrder').addEventListener('click', () => {
            this.holdOrder();
        });
        
        document.getElementById('voidTransaction').addEventListener('click', () => {
            this.voidTransaction();
        });
        
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closePaymentModal();
        });
        
        document.getElementById('closeReceiptModal').addEventListener('click', () => {
            this.closeReceiptModal();
        });
        
        document.getElementById('printReceiptBtn').addEventListener('click', () => {
            this.printReceipt();
        });
        
        document.getElementById('emailReceiptBtn').addEventListener('click', () => {
            this.emailReceiptFromModal();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.renderCart();
        this.updateTotals();
        this.showNotification(`${product.name} added to cart`, 'success');
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.renderCart();
        this.updateTotals();
    }
    
    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;
        
        item.quantity += change;
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.renderCart();
            this.updateTotals();
        }
    }
    
    renderCart() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 2rem;">Cart is empty</div>';
            return;
        }
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="pos.updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="pos.updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');
    }
    
    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        
        // Update payment amount
        this.updatePaymentAmount();
    }
    
    updatePaymentAmount() {
        const total = this.getTotal();
        document.getElementById('paymentAmount').value = total.toFixed(2);
    }
    
    getSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getTax() {
        return this.getSubtotal() * this.taxRate;
    }
    
    getTotal() {
        return this.getSubtotal() + this.getTax();
    }
    
    clearCart() {
        this.cart = [];
        this.renderCart();
        this.updateTotals();
        this.showNotification('Cart cleared', 'success');
    }
    
    processPayment() {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty', 'error');
            return;
        }
        
        if (!this.selectedPaymentMethod) {
            this.showNotification('Please select a payment method', 'error');
            return;
        }
        
        const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
        const total = this.getTotal();
        
        if (paymentAmount < total) {
            this.showNotification('Payment amount is insufficient', 'error');
            return;
        }
        
        this.showPaymentModal();
        this.simulatePaymentProcessing();
    }
    
    showPaymentModal() {
        const modal = document.getElementById('paymentModal');
        modal.style.display = 'block';
        
        // Reset payment status
        document.getElementById('paymentStatus').textContent = 'Processing payment...';
        document.getElementById('progressBar').style.width = '0%';
    }
    
    closePaymentModal() {
        document.getElementById('paymentModal').style.display = 'none';
    }
    
    simulatePaymentProcessing() {
        const statusElement = document.getElementById('paymentStatus');
        const progressBar = document.getElementById('progressBar');
        
        const steps = [
            { text: 'Connecting to payment processor...', progress: 20 },
            { text: 'Authorizing payment...', progress: 50 },
            { text: 'Processing transaction...', progress: 80 },
            { text: 'Payment approved!', progress: 100 }
        ];
        
        let currentStep = 0;
        
        const processStep = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                statusElement.textContent = step.text;
                progressBar.style.width = step.progress + '%';
                
                currentStep++;
                setTimeout(processStep, 1000 + Math.random() * 1000);
            } else {
                setTimeout(() => {
                    this.completeTransaction();
                }, 1000);
            }
        };
        
        processStep();
    }
    
    completeTransaction() {
        const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
        const total = this.getTotal();
        const change = paymentAmount - total;
        
        this.currentTransaction = {
            id: 'TXN' + Date.now(),
            items: [...this.cart],
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            total: total,
            paymentMethod: this.selectedPaymentMethod,
            paymentAmount: paymentAmount,
            change: change,
            timestamp: new Date(),
            customer: {
                name: document.getElementById('customerName').value || 'Walk-in Customer',
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value
            }
        };
        
        this.closePaymentModal();
        this.showNotification(`Payment successful! Change: $${change.toFixed(2)}`, 'success');
        
        // Clear cart and reset form
        this.clearCart();
        this.selectedPaymentMethod = null;
        document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('paymentAmount').value = '';
        
        // Clear customer info
        document.getElementById('customerName').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('customerPhone').value = '';
        
        // Auto-show receipt
        setTimeout(() => {
            this.showReceiptModal();
        }, 1000);
    }
    
    showReceiptModal() {
        if (!this.currentTransaction) {
            this.showNotification('No recent transaction to print', 'error');
            return;
        }
        
        const modal = document.getElementById('receiptModal');
        const receiptContent = document.getElementById('receiptContent');
        
        receiptContent.innerHTML = this.generateReceiptHTML();
        modal.style.display = 'block';
    }
    
    closeReceiptModal() {
        document.getElementById('receiptModal').style.display = 'none';
    }
    
    generateReceiptHTML() {
        if (!this.currentTransaction) return '';
        
        const txn = this.currentTransaction;
        
        return `
            <div class="receipt-header">
                <h3>DEMO STORE</h3>
                <p>123 Main Street<br>
                Demo City, DC 12345<br>
                Phone: (555) 123-4567</p>
                <p>Transaction ID: ${txn.id}</p>
                <p>${txn.timestamp.toLocaleString()}</p>
            </div>
            
            <div class="receipt-items">
                ${txn.items.map(item => `
                    <div class="receipt-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="receipt-total">
                <div class="receipt-item">
                    <span>Subtotal:</span>
                    <span>$${txn.subtotal.toFixed(2)}</span>
                </div>
                <div class="receipt-item">
                    <span>Tax (8.5%):</span>
                    <span>$${txn.tax.toFixed(2)}</span>
                </div>
                <div class="receipt-item">
                    <span><strong>Total:</strong></span>
                    <span><strong>$${txn.total.toFixed(2)}</strong></span>
                </div>
                <div class="receipt-item">
                    <span>Payment (${this.getPaymentMethodName(txn.paymentMethod)}):</span>
                    <span>$${txn.paymentAmount.toFixed(2)}</span>
                </div>
                <div class="receipt-item">
                    <span>Change:</span>
                    <span>$${txn.change.toFixed(2)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1rem; border-top: 1px dashed #333; padding-top: 1rem;">
                <p>Customer: ${txn.customer.name}</p>
                ${txn.customer.email ? `<p>Email: ${txn.customer.email}</p>` : ''}
                ${txn.customer.phone ? `<p>Phone: ${txn.customer.phone}</p>` : ''}
                <p style="margin-top: 1rem;">Thank you for your business!</p>
                <p>Please come again!</p>
            </div>
        `;
    }
    
    getPaymentMethodName(method) {
        const methods = {
            'cash': 'Cash',
            'card': 'Credit/Debit Card',
            'mobile': 'Mobile Payment',
            'gift': 'Gift Card'
        };
        return methods[method] || method;
    }
    
    printReceipt() {
        if (!this.currentTransaction) {
            this.showNotification('No transaction to print', 'error');
            return;
        }
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receipt - ${this.currentTransaction.id}</title>
                <style>
                    body { font-family: 'Courier New', monospace; font-size: 12px; margin: 20px; }
                    .receipt { max-width: 300px; margin: 0 auto; }
                    .receipt-header { text-align: center; border-bottom: 1px dashed #333; padding-bottom: 10px; margin-bottom: 10px; }
                    .receipt-item { display: flex; justify-content: space-between; margin-bottom: 2px; }
                    .receipt-total { border-top: 1px dashed #333; padding-top: 5px; margin-top: 5px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <div class="receipt">
                    ${this.generateReceiptHTML()}
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
        
        this.showNotification('Receipt sent to printer', 'success');
        this.closeReceiptModal();
    }
    
    emailReceipt() {
        const email = document.getElementById('customerEmail').value;
        if (!email) {
            this.showNotification('Please enter customer email address', 'error');
            return;
        }
        
        // Simulate email sending
        this.showNotification(`Receipt emailed to ${email}`, 'success');
    }
    
    emailReceiptFromModal() {
        if (!this.currentTransaction || !this.currentTransaction.customer.email) {
            this.showNotification('No email address available', 'error');
            return;
        }
        
        // Simulate email sending
        this.showNotification(`Receipt emailed to ${this.currentTransaction.customer.email}`, 'success');
        this.closeReceiptModal();
    }
    
    holdOrder() {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty', 'error');
            return;
        }
        
        const holdId = 'HOLD' + Date.now();
        // In a real system, this would save to database
        localStorage.setItem(holdId, JSON.stringify({
            cart: this.cart,
            timestamp: new Date(),
            customer: {
                name: document.getElementById('customerName').value,
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value
            }
        }));
        
        this.clearCart();
        this.showNotification(`Order held with ID: ${holdId}`, 'success');
    }
    
    voidTransaction() {
        if (!this.currentTransaction) {
            this.showNotification('No transaction to void', 'error');
            return;
        }
        
        // Simulate voiding transaction
        this.showNotification(`Transaction ${this.currentTransaction.id} voided`, 'success');
        this.currentTransaction = null;
    }
    
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}-message`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            ${message}
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            color: 'white',
            background: type === 'success' ? '#27ae60' : '#e74c3c',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500',
            animation: 'slideInRight 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize POS system
const pos = new POSSystem();

// Demo data and helper functions for testing
window.demoFunctions = {
    addRandomItems: () => {
        const randomProducts = pos.products.sort(() => 0.5 - Math.random()).slice(0, 3);
        randomProducts.forEach(product => pos.addToCart(product.id));
        pos.showNotification('Added random items to cart', 'success');
    },
    
    fillCustomerInfo: () => {
        document.getElementById('customerName').value = 'John Doe';
        document.getElementById('customerEmail').value = 'john.doe@example.com';
        document.getElementById('customerPhone').value = '(555) 123-4567';
        pos.showNotification('Customer info filled', 'success');
    },
    
    simulateCardPayment: () => {
        if (pos.cart.length === 0) {
            pos.showNotification('Add items to cart first', 'error');
            return;
        }
        
        // Select card payment
        document.querySelector('[data-method="card"]').click();
        
        // Process payment after a short delay
        setTimeout(() => {
            document.getElementById('processPayment').click();
        }, 500);
    }
};

// Add demo helper buttons (for testing purposes)
if (window.location.search.includes('demo=true')) {
    const demoPanel = document.createElement('div');
    demoPanel.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; background: #2c3e50; color: white; padding: 1rem; border-radius: 8px; z-index: 1000;">
            <h4>Demo Functions</h4>
            <button onclick="demoFunctions.addRandomItems()" style="margin: 2px; padding: 5px 10px; border: none; border-radius: 4px; background: #3498db; color: white; cursor: pointer;">Add Random Items</button><br>
            <button onclick="demoFunctions.fillCustomerInfo()" style="margin: 2px; padding: 5px 10px; border: none; border-radius: 4px; background: #27ae60; color: white; cursor: pointer;">Fill Customer Info</button><br>
            <button onclick="demoFunctions.simulateCardPayment()" style="margin: 2px; padding: 5px 10px; border: none; border-radius: 4px; background: #e74c3c; color: white; cursor: pointer;">Simulate Card Payment</button>
        </div>
    `;
    document.body.appendChild(demoPanel);
}

