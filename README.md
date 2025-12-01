# 🏠 Australian Home Loan Calculator

A professional, feature-rich home loan calculator designed specifically for the Australian market. Built with modern web technologies and a beautiful, responsive interface.

![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 💰 Comprehensive Loan Calculations
- **Flexible Repayment Frequencies**: Monthly, fortnightly, or weekly payments
- **Interest-Only Periods**: Support for interest-only loan periods
- **Offset Account Integration**: Calculate savings from offset account balances
- **Extra Repayments**: See how additional payments reduce your loan term and interest

### 📊 Advanced Financial Analysis
- **Real-Time Calculations**: Instant updates as you adjust parameters
- **Interactive Charts**: Visual balance projection and cost breakdown
- **Amortization Schedule**: Detailed payment breakdown over the loan term
- **Total Cost Analysis**: Complete view of principal, interest, and fees

### 💵 Australian Market Rates
- Live comparison rates from Australia's Big 4 banks:
  - Commonwealth Bank (CBA)
  - Westpac
  - ANZ
  - NAB
- Direct links to verify current rates

### 🎨 Modern User Interface
- **Dark/Light Theme Toggle**: Choose your preferred viewing mode
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Collapsible Sidebar**: Maximize screen space when needed
- **Smooth Animations**: Premium feel with micro-interactions

### 💼 Professional Features
- **Scenario Management**: Save and compare multiple loan scenarios
- **Print/PDF Export**: Generate reports for your records
- **Upfront Cost Calculator**: Include deposit, stamp duty, legal costs, and LMI
- **Monthly Expenses Tracker**: Factor in insurance, rates, and HOA fees

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DeNNiiInc/AU-HomeLoan-Calculator.git
```

2. Navigate to the project directory:
```bash
cd AU-HomeLoan-Calculator
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

That's it! No build process or dependencies required.

## 📖 Usage

### Basic Loan Calculation

1. **Enter Loan Details**:
   - Loan Amount: The total amount you wish to borrow
   - Interest Rate: Annual interest rate (%)
   - Loan Term: Duration of the loan in years
   - Repayment Frequency: Choose monthly, fortnightly, or weekly

2. **View Results**:
   - Your repayment amount is displayed prominently
   - Total interest and total cost are calculated automatically
   - Interactive charts show your loan balance over time

### Advanced Features

#### Upfront Costs & Fees
- Set deposit percentage (auto-calculated)
- Add conveyancing/legal costs
- Include stamp duty
- Factor in LMI and other fees

#### Offset & Extra Repayments
- Enter your offset account balance to see interest savings
- Add extra repayments to reduce loan term
- View the impact on total interest paid

#### Interest-Only Period
- Toggle interest-only period on/off
- Set the duration (up to 5 years)
- See how it affects your repayments

#### Monthly Expenses
- Property insurance
- HOA/Strata fees
- Council rates
- Other monthly costs

### Scenario Management

1. Click **Save / Load** button
2. Enter a scenario name (e.g., "Bank A Offer")
3. Click **Save** to store current settings
4. Load saved scenarios to compare different loan options

## 🎨 Customization

The calculator uses CSS custom properties for easy theming. Edit `styles.css` to customize:

```css
:root {
    --primary: #0f172a;
    --accent: #3b82f6;
    --success: #10b981;
    /* ... more variables */
}
```

## 🏗️ Project Structure

```
AU-HomeLoan-Calculator/
├── index.html          # Main HTML structure
├── styles.css          # Styling and themes
├── script.js           # Calculator logic and interactivity
├── Logo.png           # BCT branding logo
├── LICENSE            # GPL-3.0 license
└── README.md          # This file
```

## 🔧 Technical Details

- **Pure Vanilla JavaScript**: No frameworks or dependencies
- **Modern CSS**: Flexbox, Grid, Custom Properties
- **Responsive Design**: Mobile-first approach
- **Local Storage**: Scenarios saved in browser
- **Print Optimized**: Clean output for PDF generation

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🎥 About Beyond Cloud Technology

This calculator is developed and maintained by Beyond Cloud Technology.

- 🌐 Website: [beyondcloud.technology](https://beyondcloud.technology)
- 📺 YouTube: [@beyondcloudtechnology](https://www.youtube.com/@beyondcloudtechnology)

## ⚠️ Disclaimer

This calculator is for informational purposes only and should not be considered financial advice. Always consult with a qualified financial advisor or mortgage broker before making loan decisions. Interest rates and fees shown are indicative and may not reflect current market rates.

## 🙏 Acknowledgments

- Bank logos provided by [Clearbit](https://clearbit.com)
- Icons from [Feather Icons](https://feathericons.com)
- Fonts from [Google Fonts](https://fonts.google.com)

---

**Made with ❤️ by Beyond Cloud Technology**

© 2025 Beyond Cloud Technology. All rights reserved.
