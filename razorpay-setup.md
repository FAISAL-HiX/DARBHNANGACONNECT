# Razorpay Integration Setup Guide

## 🚀 Complete Payment Integration for DarbhangaConnect

### 1. Get Razorpay Account
1. Visit [razorpay.com](https://razorpay.com)
2. Sign up for a business account
3. Complete KYC verification
4. Get your API keys from Dashboard

### 2. Update API Keys
In `payment.html`, replace the test key:

```javascript
// Line 175 - Replace with your actual key
key: 'YOUR_RAZORPAY_KEY_HERE', // Replace with your Razorpay Key
```

**Test Keys (for development):**
- Key ID: `rzp_test_xxxxxxxxxx`
- Key Secret: `xxxxxxxxxxxxxxxxxx`

**Live Keys (for production):**
- Key ID: `rzp_live_xxxxxxxxxx`
- Key Secret: `xxxxxxxxxxxxxxxxxx`

### 3. Test Payment Flow

#### Test Card Details:
- **Card Number:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **Name:** Any name

#### Test UPI:
- **UPI ID:** success@razorpay
- **UPI ID (failure):** failure@razorpay

#### Test Netbanking:
- Select any bank and use "success" as password

### 4. Complete Setup Process:

1. **Sign up at Razorpay:**
   - Visit [razorpay.com](https://razorpay.com)
   - Create business account
   - Complete KYC verification

2. **Get API Keys:**
   - Dashboard → Settings → API Keys
   - Generate Test Keys first
   - Copy the **Key ID** (not the Key Secret)

3. **Replace in payment.html:**
   - Open `HTML/payment.html`
   - Find: `key: 'YOUR_RAZORPAY_KEY_HERE',`
   - Replace with your actual key

4. **Test the Integration:**
   - Use test card: `4111 1111 1111 1111`
   - Any future expiry date
   - Any 3-digit CVV

### 5. Current Features

✅ **Implemented:**
- Razorpay payment gateway integration
- 10% discount for online payments
- Payment success/failure handling
- WhatsApp notifications with payment details
- Admin panel with payment tracking
- Booking confirmation with payment status

✅ **Payment Methods Supported:**
- Credit/Debit Cards
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking
- Wallets (Paytm, Mobikwik, etc.)

Your DarbhangaConnect is now ready with complete payment integration! 🚀