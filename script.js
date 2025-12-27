// --- State & Config ---
const state = {
  loanAmount: 500000,
  rate: 5.5,
  term: 30,
  freq: 12,
  offset: 0,
  extra: 0,
  isIO: false,
  ioTerm: 1,
  depositPercent: 5,
  depositAmount: 0,
  legalCosts: 0,
  stampDuty: 0,
  otherFees: 0,
  upfrontFees: 0,
  insurance: 0,
  hoa: 0,
  rates: 0,
  otherMonthly: 0,
  tableMode: "yearly", // or 'monthly'
  state: "VIC",
  autoStampDuty: true,
};

// --- DOM Elements ---
const inputs = {
  loanAmount: document.getElementById("loanAmount"),
  interestRate: document.getElementById("interestRate"),
  loanTerm: document.getElementById("loanTerm"),
  frequency: document.getElementById("frequency"),
  offsetBalance: document.getElementById("offsetBalance"),
  extraRepayment: document.getElementById("extraRepayment"),
  ioTerm: document.getElementById("ioTerm"),
  depositPercent: document.getElementById("depositPercent"),
  depositAmount: document.getElementById("depositAmount"),
  legalCosts: document.getElementById("legalCosts"),
  stampDuty: document.getElementById("stampDuty"),
  otherFees: document.getElementById("otherFees"),
  upfrontFees: document.getElementById("upfrontFees"),
  insurance: document.getElementById("insurance"),
  hoa: document.getElementById("hoa"),
  rates: document.getElementById("rates"),
  otherMonthly: document.getElementById("otherMonthly"),
  state: document.getElementById("state"),
};

const ioToggle = document.getElementById("interestOnlyToggle");
const ioTermGroup = document.getElementById("ioTermGroup");
const autoStampDutyToggle = document.getElementById("autoStampDutyToggle");

// --- Stamp Duty Calculation Functions ---
function calculateStampDuty(propertyValue, state) {
  // Calculate based on property value (loan amount + deposit)
  const value = propertyValue;
  
  switch(state) {
    case "VIC":
      return calculateVICStampDuty(value);
    case "NSW":
      return calculateNSWStampDuty(value);
    case "QLD":
      return calculateQLDStampDuty(value);
    case "WA":
      return calculateWAStampDuty(value);
    case "SA":
      return calculateSAStampDuty(value);
    case "TAS":
      return calculateTASStampDuty(value);
    case "ACT":
      return calculateACTStampDuty(value);
    case "NT":
      return calculateNTStampDuty(value);
    default:
      return 0;
  }
}

function calculateVICStampDuty(value) {
  // Victoria rates (2025)
  if (value <= 25000) return 1.4 * (value / 100);
  if (value <= 130000) return 350 + 2.4 * ((value - 25000) / 100);
  if (value <= 960000) return 2870 + 5.0 * ((value - 130000) / 100);
  return 44370 + 5.5 * ((value - 960000) / 100);
}

function calculateNSWStampDuty(value) {
  // NSW rates (2025)
  if (value <= 14000) return 1.25 * (value / 100);
  if (value <= 32000) return 175 + 1.5 * ((value - 14000) / 100);
  if (value <= 85000) return 445 + 1.75 * ((value - 32000) / 100);
  if (value <= 319000) return 1372.50 + 3.5 * ((value - 85000) / 100);
  if (value <= 1064000) return 9562.50 + 4.5 * ((value - 319000) / 100);
  if (value <= 3500000) return 43087.50 + 5.5 * ((value - 1064000) / 100);
  return 177075.50 + 7.0 * ((value - 3500000) / 100);
}

function calculateQLDStampDuty(value) {
  // Queensland rates (2025)
  if (value <= 5000) return 0;
  if (value <= 75000) return 1.5 * (value / 100);
  if (value <= 540000) return 1050 + 3.5 * ((value - 75000) / 100);
  if (value <= 1000000) return 17325 + 4.5 * ((value - 540000) / 100);
  return 38025 + 5.75 * ((value - 1000000) / 100);
}

function calculateWAStampDuty(value) {
  // Western Australia rates (2025)
  if (value <= 120000) return 1.9 * (value / 100);
  if (value <= 150000) return 2280 + 2.85 * ((value - 120000) / 100);
  if (value <= 360000) return 3135 + 3.8 * ((value - 150000) / 100);
  if (value <= 725000) return 11115 + 4.75 * ((value - 360000) / 100);
  return 28453.75 + 5.15 * ((value - 725000) / 100);
}

function calculateSAStampDuty(value) {
  // South Australia rates (2025)
  if (value <= 12000) return 1.0 * (value / 100);
  if (value <= 30000) return 120 + 2.0 * ((value - 12000) / 100);
  if (value <= 50000) return 480 + 3.0 * ((value - 30000) / 100);
  if (value <= 100000) return 1080 + 3.5 * ((value - 50000) / 100);
  if (value <= 200000) return 2830 + 4.0 * ((value - 100000) / 100);
  if (value <= 250000) return 6830 + 4.25 * ((value - 200000) / 100);
  if (value <= 300000) return 8955 + 4.75 * ((value - 250000) / 100);
  if (value <= 500000) return 11330 + 5.0 * ((value - 300000) / 100);
  return 21330 + 5.5 * ((value - 500000) / 100);
}

function calculateTASStampDuty(value) {
  // Tasmania rates (2025)
  if (value <= 3000) return 50;
  if (value <= 25000) return 50 + 1.75 * ((value - 3000) / 100);
  if (value <= 75000) return 435 + 2.25 * ((value - 25000) / 100);
  if (value <= 200000) return 1560 + 3.5 * ((value - 75000) / 100);
  if (value <= 375000) return 5935 + 4.0 * ((value - 200000) / 100);
  if (value <= 725000) return 12935 + 4.25 * ((value - 375000) / 100);
  return 27810 + 4.5 * ((value - 725000) / 100);
}

function calculateACTStampDuty(value) {
  // ACT rates (2025) - simplified without concessions
  if (value <= 200000) return 0.49 * (value / 100);
  if (value <= 300000) return 980 + 1.96 * ((value - 200000) / 100);
  if (value <= 500000) return 2940 + 3.27 * ((value - 300000) / 100);
  if (value <= 750000) return 9480 + 4.25 * ((value - 500000) / 100);
  if (value <= 1000000) return 20105 + 4.9 * ((value - 750000) / 100);
  if (value <= 1455000) return 32355 + 5.39 * ((value - 1000000) / 100);
  return 56879.50 + 6.4 * ((value - 1455000) / 100);
}

function calculateNTStampDuty(value) {
  // Northern Territory rates (2025)
  const V = value / 1000;
  if (value <= 525000) {
    return (0.06571441 * V * V) + (15 * V);
  }
  if (value <= 3000000) return value * 0.0495;
  if (value <= 5000000) return value * 0.0575;
  return value * 0.0575; // Same as above for >$5M
}

// --- Charts ---
let balanceChartCtx = document.getElementById("balanceChart").getContext("2d");
let breakdownChartCtx = document
  .getElementById("breakdownChart")
  .getContext("2d");
let scheduleData = [];

// --- Initialization ---
function init() {
  // Load Theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  
  // Version Info
  initVersionTag();

  // Load Params or Default
  initFromURL();

  // Listeners
  Object.keys(inputs).forEach((key) => {
    if (inputs[key]) {
      inputs[key].addEventListener("input", updateState);
    }
  });

  if (ioToggle) {
    ioToggle.addEventListener("change", () => {
      toggleIO();
      updateState();
    });
  }

  if (autoStampDutyToggle) {
    autoStampDutyToggle.addEventListener("change", updateState);
  }

  updateState();

  // Resize Listener
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      calculate();
    }, 100);
  });

  // Mobile Menu
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleSidebar);
  }
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", toggleSidebar);
  }
  if (overlay) {
    overlay.addEventListener("click", toggleSidebar);
  }

  // Desktop Collapse
  const collapseBtn = document.getElementById("collapseBtn");
  if (collapseBtn) {
    collapseBtn.addEventListener("click", toggleDesktopSidebar);
  }

  // Load Sidebar State
  const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
  if (isCollapsed) {
    document.querySelector(".app-container").classList.add("sidebar-collapsed");
    document.querySelector(".sidebar").classList.add("collapsed");
    setTimeout(calculate, 100); // Recalculate charts after layout settles
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}

function toggleDesktopSidebar() {
  const app = document.querySelector(".app-container");
  const sidebar = document.querySelector(".sidebar");

  app.classList.toggle("sidebar-collapsed");
  sidebar.classList.toggle("collapsed");

  const isCollapsed = sidebar.classList.contains("collapsed");
  localStorage.setItem("sidebarCollapsed", isCollapsed);

  // Trigger resize for charts
  setTimeout(calculate, 350); // Wait for transition
}

function updateState() {
  state.loanAmount = parseFloat(inputs.loanAmount.value) || 0;
  state.rate = parseFloat(inputs.interestRate.value) || 0;
  state.term = parseFloat(inputs.loanTerm.value) || 0;
  state.freq = parseInt(inputs.frequency.value);
  state.offset = parseFloat(inputs.offsetBalance.value) || 0;
  state.extra = parseFloat(inputs.extraRepayment.value) || 0;
  state.isIO = ioToggle.checked;
  state.ioTerm = parseFloat(inputs.ioTerm.value) || 0;
  state.depositPercent = parseFloat(inputs.depositPercent.value) || 0;
  state.legalCosts = parseFloat(inputs.legalCosts.value) || 0;
  state.otherFees = parseFloat(inputs.otherFees.value) || 0;
  state.upfrontFees = parseFloat(inputs.upfrontFees.value) || 0;
  state.insurance = parseFloat(inputs.insurance.value) || 0;
  state.hoa = parseFloat(inputs.hoa.value) || 0;
  state.rates = parseFloat(inputs.rates.value) || 0;
  state.otherMonthly = parseFloat(inputs.otherMonthly.value) || 0;
  state.state = inputs.state.value;
  state.autoStampDuty = autoStampDutyToggle.checked;

  // Auto-calculate deposit amount
  state.depositAmount = (state.loanAmount * state.depositPercent) / 100;
  inputs.depositAmount.value = state.depositAmount.toFixed(0);

  // Auto-calculate stamp duty if enabled
  if (state.autoStampDuty) {
    const propertyValue = state.loanAmount; // Property value is the loan amount
    state.stampDuty = calculateStampDuty(propertyValue, state.state);
    inputs.stampDuty.value = state.stampDuty.toFixed(0);
    inputs.stampDuty.readOnly = true;
    inputs.stampDuty.style.backgroundColor = 'var(--bg-secondary)';
    document.getElementById('stampDutyHint').textContent = 'Auto-calculated based on property value';
  } else {
    state.stampDuty = parseFloat(inputs.stampDuty.value) || 0;
    inputs.stampDuty.readOnly = false;
    inputs.stampDuty.style.backgroundColor = '';
    document.getElementById('stampDutyHint').textContent = 'Manual entry';
  }

  calculate();
}

function toggleIO() {
  state.isIO = ioToggle.checked;
  ioTermGroup.style.display = state.isIO ? "block" : "none";
}

function toggleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle("active");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
  calculate(); // Redraw charts with new colors
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (theme === "dark") {
    // Sun icon
    icon.innerHTML =
      '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    // Moon icon
    icon.innerHTML =
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
}

// --- Core Logic ---
function calculate() {
  if (state.loanAmount <= 0 || state.rate <= 0 || state.term <= 0) return;

  // Calculate actual loan amount after deposit
  const actualLoanAmount = state.loanAmount - state.depositAmount;

  const r = state.rate / 100 / state.freq;
  const n = state.term * state.freq;
  const ioPeriods = state.isIO ? state.ioTerm * state.freq : 0;

  // Standard Repayment (P&I) - using actual loan amount after deposit
  const remainingTermPeriods = n - ioPeriods;
  let piRepayment = 0;
  if (remainingTermPeriods > 0) {
    piRepayment =
      (actualLoanAmount * r * Math.pow(1 + r, remainingTermPeriods)) /
      (Math.pow(1 + r, remainingTermPeriods) - 1);
  }
  const ioRepayment = actualLoanAmount * r;

  // Simulation - start with actual loan amount after deposit
  let balance = actualLoanAmount;
  let totalInterest = 0;
  let periods = 0;
  const balances = [];
  const labels = [];
  scheduleData = [];

  // Baseline - also use actual loan amount after deposit
  let baseBalance = actualLoanAmount;
  const baseBalances = [];

  const maxPeriods = n;
  let actualPaidOff = false;

  // Aggregates
  let aggInterest = 0;
  let aggPrincipal = 0;
  let aggExtra = 0;

  for (let i = 0; i <= maxPeriods; i++) {
    // Record Data Point
    const isYearlyPoint = i % state.freq === 0;

    if (isYearlyPoint) {
      const year = i / state.freq;
      labels.push(year);
      balances.push(balance > 0 ? balance : 0);
      baseBalances.push(baseBalance > 0 ? baseBalance : 0);
    }

    // Add to schedule based on mode
    if (i > 0) {
      // If Monthly Mode: Add every period
      // If Yearly Mode: Add only at year end
      const shouldAdd =
        state.tableMode === "monthly" ? true : i % state.freq === 0;

      if (shouldAdd) {
        scheduleData.push({
          period: state.tableMode === "monthly" ? i : i / state.freq,
          balance: balance > 0 ? balance : 0,
          interest: aggInterest,
          principal: aggPrincipal,
          extra: aggExtra,
        });
        // Reset aggregates
        aggInterest = 0;
        aggPrincipal = 0;
        aggExtra = 0;
      }
    }

    if (i === maxPeriods) break;

    // --- Actual Scenario ---
    if (balance > 0) {
      const isIOPeriod = i < ioPeriods;
      const interest = Math.max(0, (balance - state.offset) * r);

      let principal = 0;
      let extraPaid = 0;

      if (isIOPeriod) {
        // IO Period: Pay Interest + Extra
        principal = state.extra; // Only extra reduces principal
        extraPaid = state.extra;
      } else {
        // P&I Period: Pay Fixed P&I + Extra
        // Fixed P&I covers interest first, rest is principal
        const normalPrincipal = piRepayment - interest;
        principal = normalPrincipal + state.extra;
        extraPaid = state.extra;
      }

      // Cap principal if it exceeds balance
      if (principal > balance) {
        principal = balance;
        extraPaid = Math.max(0, principal - (piRepayment - interest));
      }

      balance -= principal;
      totalInterest += interest;

      aggInterest += interest;
      aggPrincipal += principal;
      aggExtra += extraPaid;

      if (balance <= 0.01) {
        balance = 0;
        if (!actualPaidOff) {
          periods = i + 1;
          actualPaidOff = true;
        }
      }
    }

    // --- Baseline Scenario ---
    if (baseBalance > 0) {
      const isIOPeriod = i < ioPeriods;
      const baseInt = baseBalance * r;
      const basePrin = isIOPeriod ? 0 : piRepayment - baseInt;
      baseBalance -= basePrin;
    }
  }

  // Update UI
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const currentRepayment = state.isIO ? ioRepayment : piRepayment;
  document.getElementById("repaymentValue").textContent =
    fmt.format(currentRepayment);
  document.getElementById("totalInterest").textContent =
    fmt.format(totalInterest);

  const totalCost =
    actualLoanAmount +
    totalInterest +
    state.stampDuty +
    state.otherFees +
    state.upfrontFees;
  document.getElementById("totalCost").textContent = fmt.format(totalCost);

  // Upfront Cash (includes deposit, legal costs, and all fees)
  const upfrontCash =
    state.depositAmount +
    state.legalCosts +
    state.stampDuty +
    state.otherFees +
    state.upfrontFees;
  document.getElementById("upfrontCash").textContent = fmt.format(upfrontCash);

  // Total Monthly Outgoings
  const monthlyExpenses =
    state.insurance + state.hoa + state.rates + state.otherMonthly;
  const annualExpenses = monthlyExpenses * 12;
  const periodExpenses = annualExpenses / state.freq;

  const totalPeriodCost = currentRepayment + periodExpenses;

  // Update label to match frequency
  const freqLabelMap = { 12: "Monthly", 26: "Fortnightly", 52: "Weekly" };
  const periodName = freqLabelMap[state.freq];

  // Find the card label and update it
  const totalMonthlyCard =
    document.getElementById("totalMonthly").parentElement;
  totalMonthlyCard.querySelector(
    ".card-label"
  ).textContent = `Total ${periodName}`;
  document.getElementById("totalMonthly").textContent =
    fmt.format(totalPeriodCost);

  const freqMap = { 12: "Monthly", 26: "Fortnightly", 52: "Weekly" };
  document.getElementById("frequencyLabel").textContent =
    (state.isIO ? "Interest Only (" : "Principal & Interest (") +
    freqMap[state.freq] +
    ")";

  drawCharts(
    labels,
    balances,
    baseBalances,
    actualLoanAmount,
    totalInterest,
    state.stampDuty + state.otherFees + state.upfrontFees
  );
  updateTable(scheduleData);
}

// --- Table ---
function toggleTableMode() {
  state.tableMode = state.tableMode === "yearly" ? "monthly" : "yearly";
  document.getElementById("tableModeBtn").textContent =
    state.tableMode === "yearly" ? "Show Monthly" : "Show Yearly";
  calculate();
}

function updateTable(data) {
  const tbody = document.querySelector("#amortizationTable tbody");
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Limit rows for performance if monthly
  const displayData = data.length > 1000 ? data.slice(0, 1000) : data;

  tbody.innerHTML = displayData
    .map(
      (row) => `
        <tr>
            <td>${state.tableMode === "yearly" ? "Year" : "Month"} ${
        row.period
      }</td>
            <td>${fmt.format(row.balance)}</td>
            <td style="color: var(--danger)">${fmt.format(row.interest)}</td>
            <td style="color: var(--success)">${fmt.format(row.principal)}</td>
            <td style="color: var(--accent)">${fmt.format(row.extra)}</td>
        </tr>
    `
    )
    .join("");
}

function copyTable() {
  let csv = `Period,Balance,Interest,Principal,Extra\n`;
  scheduleData.forEach((row) => {
    csv += `${row.period},${row.balance.toFixed(2)},${row.interest.toFixed(
      2
    )},${row.principal.toFixed(2)},${row.extra.toFixed(2)}\n`;
  });
  navigator.clipboard
    .writeText(csv)
    .then(() => alert("Table data copied to clipboard (CSV format)!"));
}

// --- Canvas Charts ---
function drawCharts(labels, actualData, baseData, principal, interest, fees) {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const colorGrid = isDark ? "#334155" : "#e2e8f0";
  const colorText = isDark ? "#94a3b8" : "#64748b";
  const colorBase = isDark ? "#64748b" : "#94a3b8";
  const colorMain = "#3b82f6";
  const colorPrincipal = isDark ? "#e2e8f0" : "#0f172a";
  const colorInterest = "#3b82f6";
  const colorFees = "#ef4444";

  // Line Chart
  drawLineChart(
    balanceChartCtx,
    labels,
    actualData,
    baseData,
    colorGrid,
    colorText,
    colorBase,
    colorMain
  );

  // Update Balance Chart Legend
  updateBalanceLegend(labels, actualData, baseData);

  // Donut Chart
  drawDonutChart(
    breakdownChartCtx,
    principal,
    interest,
    fees,
    isDark,
    colorPrincipal,
    colorInterest,
    colorFees
  );

  // Update Breakdown Chart Legend
  updateBreakdownLegend(
    principal,
    interest,
    fees,
    colorPrincipal,
    colorInterest,
    colorFees
  );
}

function updateBalanceLegend(labels, actualData, baseData) {
  const legend = document.getElementById("balanceLegend");
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const finalActual = actualData[actualData.length - 1];
  const finalBase = baseData[baseData.length - 1];

  legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background: #3b82f6;"></div>
            <span>With Extras: <span class="legend-value">${fmt.format(
              finalActual
            )}</span></span>
        </div>
        <div class="legend-item">
            <div class="legend-color legend-dashed"></div>
            <span>Standard: <span class="legend-value">${fmt.format(
              finalBase
            )}</span></span>
        </div>
    `;
}

function updateBreakdownLegend(
  principal,
  interest,
  fees,
  colorP,
  colorI,
  colorF
) {
  const legend = document.getElementById("breakdownLegend");
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const total = principal + interest + fees;

  const pPct = ((principal / total) * 100).toFixed(1);
  const iPct = ((interest / total) * 100).toFixed(1);
  const fPct = ((fees / total) * 100).toFixed(1);

  legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background: ${colorP};"></div>
            <span>Principal: <span class="legend-value">${fmt.format(
              principal
            )} (${pPct}%)</span></span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: ${colorI};"></div>
            <span>Interest: <span class="legend-value">${fmt.format(
              interest
            )} (${iPct}%)</span></span>
        </div>
        ${
          fees > 0
            ? `
        <div class="legend-item">
            <div class="legend-color" style="background: ${colorF};"></div>
            <span>Fees: <span class="legend-value">${fmt.format(
              fees
            )} (${fPct}%)</span></span>
        </div>`
            : ""
        }
    `;
}

function drawLineChart(ctx, labels, data1, data2, cGrid, cText, cBase, cMain) {
  const canvas = ctx.canvas;
  const width = (canvas.width = canvas.offsetWidth);
  const height = (canvas.height = canvas.offsetHeight);
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 20, right: 20, bottom: 30, left: 70 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(state.loanAmount, ...data2);

  const getX = (i) => padding.left + (i / (labels.length - 1)) * chartW;
  const getY = (val) => height - padding.bottom - (val / maxVal) * chartH;

  // Grid
  ctx.beginPath();
  ctx.strokeStyle = cGrid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = height - padding.bottom - (i / 5) * chartH;
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);

    // Y Axis Labels
    ctx.fillStyle = cText;
    ctx.font = "11px Inter";
    ctx.textAlign = "right";
    const labelVal = (maxVal * i) / 5;
    const labelText =
      labelVal >= 1000
        ? "$" + Math.round(labelVal / 1000) + "k"
        : "$" + Math.round(labelVal);
    ctx.fillText(labelText, padding.left - 10, y + 4);
  }
  ctx.stroke();

  // X Axis Labels (every 5 years)
  ctx.fillStyle = cText;
  ctx.font = "11px Inter";
  ctx.textAlign = "center";
  labels.forEach((year, i) => {
    if (year % 5 === 0 || i === labels.length - 1) {
      const x = getX(i);
      ctx.fillText(year + "y", x, height - padding.bottom + 20);
    }
  });

  // Baseline (dashed)
  ctx.beginPath();
  ctx.strokeStyle = cBase;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  data2.forEach((val, i) => {
    if (i === 0) ctx.moveTo(getX(i), getY(val));
    else ctx.lineTo(getX(i), getY(val));
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Actual (solid with gradient fill)
  ctx.beginPath();
  ctx.strokeStyle = cMain;
  ctx.lineWidth = 3;
  data1.forEach((val, i) => {
    if (i === 0) ctx.moveTo(getX(i), getY(val));
    else ctx.lineTo(getX(i), getY(val));
  });
  ctx.stroke();

  // Fill gradient
  const gradient = ctx.createLinearGradient(
    0,
    padding.top,
    0,
    height - padding.bottom
  );
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0.02)");

  ctx.lineTo(getX(data1.length - 1), height - padding.bottom);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Data point markers on actual line
  ctx.fillStyle = cMain;
  data1.forEach((val, i) => {
    if (i % Math.ceil(labels.length / 10) === 0 || i === data1.length - 1) {
      ctx.beginPath();
      ctx.arc(getX(i), getY(val), 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  // Setup tooltip interaction
  setupBalanceTooltip(
    canvas,
    labels,
    data1,
    data2,
    getX,
    getY,
    padding,
    chartW,
    chartH
  );
}

function setupBalanceTooltip(
  canvas,
  labels,
  actualData,
  baseData,
  getX,
  getY,
  padding,
  chartW,
  chartH
) {
  const tooltip = document.getElementById("balanceTooltip");
  const tooltipTitle = document.getElementById("balanceTooltipTitle");
  const tooltipContent = document.getElementById("balanceTooltipContent");
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if mouse is in chart area
    if (
      x < padding.left ||
      x > rect.width - padding.right ||
      y < padding.top ||
      y > rect.height - padding.bottom
    ) {
      tooltip.classList.remove("show");
      return;
    }

    // Find nearest data point
    const chartX = x - padding.left;
    const index = Math.round((chartX / chartW) * (labels.length - 1));

    if (index >= 0 && index < labels.length) {
      const year = labels[index];
      const actual = actualData[index];
      const base = baseData[index];
      const savings = base - actual;

      tooltipTitle.textContent = `Year ${year}`;
      tooltipContent.innerHTML = `
                <div class="tooltip-row">
                    <span class="tooltip-label">
                        <div class="legend-color" style="background: #3b82f6; width: 12px; height: 12px;"></div>
                        With Extras
                    </span>
                    <span class="tooltip-value">${fmt.format(actual)}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">
                        <div class="legend-color legend-dashed" style="width: 12px; height: 12px;"></div>
                        Standard
                    </span>
                    <span class="tooltip-value">${fmt.format(base)}</span>
                </div>
                ${
                  savings > 0
                    ? `
                <div class="tooltip-row" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border);">
                    <span class="tooltip-label" style="color: var(--success);">Savings</span>
                    <span class="tooltip-value" style="color: var(--success);">${fmt.format(
                      savings
                    )}</span>
                </div>`
                    : ""
                }
            `;

      // Position tooltip
      const pointX = getX(index);
      tooltip.style.left = pointX + 15 + "px";
      tooltip.style.top = y - 20 + "px";
      tooltip.classList.add("show");
    }
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
}

function drawDonutChart(
  ctx,
  principal,
  interest,
  fees,
  isDark,
  colorP,
  colorI,
  colorF
) {
  const canvas = ctx.canvas;
  const width = (canvas.width = canvas.offsetWidth);
  const height = (canvas.height = canvas.offsetHeight);
  ctx.clearRect(0, 0, width, height);

  const total = principal + interest + fees;
  const center = { x: width / 2, y: height / 2 };
  const radius = Math.min(width, height) / 2 - 50;
  const lineWidth = 40;

  let startAngle = -Math.PI / 2; // Start from top

  const segments = [];

  const drawSegment = (val, color, label) => {
    const slice = (val / total) * 2 * Math.PI;
    const endAngle = startAngle + slice;

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Store segment info for tooltip
    segments.push({
      startAngle,
      endAngle,
      color,
      label,
      value: val,
      percentage: ((val / total) * 100).toFixed(1),
    });

    startAngle = endAngle;
  };

  drawSegment(principal, colorP, "Principal");
  drawSegment(interest, colorI, "Interest");
  if (fees > 0) {
    drawSegment(fees, colorF, "Fees");
  }

  // Center Text
  ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
  ctx.font = "bold 18px Plus Jakarta Sans";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Total Cost", center.x, center.y - 12);

  ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
  ctx.font = "14px Inter";
  const totalK = Math.round(total / 1000);
  ctx.fillText("$" + totalK.toLocaleString() + "k", center.x, center.y + 12);

  // Setup tooltip interaction
  setupBreakdownTooltip(canvas, segments, center, radius, lineWidth);
}

function setupBreakdownTooltip(canvas, segments, center, radius, lineWidth) {
  const tooltip = document.getElementById("breakdownTooltip");
  const tooltipTitle = document.getElementById("breakdownTooltipTitle");
  const tooltipContent = document.getElementById("breakdownTooltipContent");
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate angle and distance from center
    const dx = x - center.x;
    const dy = y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);

    // Normalize angle to match our drawing (starting from top)
    angle = angle + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;

    // Check if mouse is over the donut ring
    const innerRadius = radius - lineWidth / 2;
    const outerRadius = radius + lineWidth / 2;

    if (distance >= innerRadius && distance <= outerRadius) {
      // Find which segment
      const segment = segments.find(
        (s) => angle >= s.startAngle && angle < s.endAngle
      );

      if (segment) {
        tooltipTitle.textContent = segment.label;
        tooltipContent.innerHTML = `
                    <div class="tooltip-row">
                        <span class="tooltip-label">Amount</span>
                        <span class="tooltip-value">${fmt.format(
                          segment.value
                        )}</span>
                    </div>
                    <div class="tooltip-row">
                        <span class="tooltip-label">Percentage</span>
                        <span class="tooltip-value">${
                          segment.percentage
                        }%</span>
                    </div>
                `;

        tooltip.style.left = x + 15 + "px";
        tooltip.style.top = y - 20 + "px";
        tooltip.classList.add("show");
        return;
      }
    }

    tooltip.classList.remove("show");
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
}

// --- Scenarios (LocalStorage) ---
function openScenarioModal() {
  document.getElementById("scenarioModal").classList.add("show");
  renderScenarioList();
}

function closeScenarioModal() {
  document.getElementById("scenarioModal").classList.remove("show");
}

function saveScenario() {
  const name = document.getElementById("scenarioName").value.trim();
  if (!name) return;

  const scenarios = JSON.parse(localStorage.getItem("loanScenarios") || "[]");
  const newScenario = {
    id: Date.now(),
    name: name,
    data: { ...state }, // Save copy of state
  };

  scenarios.push(newScenario);
  localStorage.setItem("loanScenarios", JSON.stringify(scenarios));

  document.getElementById("scenarioName").value = "";
  renderScenarioList();
}

function loadScenario(id) {
  const scenarios = JSON.parse(localStorage.getItem("loanScenarios") || "[]");
  const scenario = scenarios.find((s) => s.id === id);
  if (scenario) {
    // Apply state to inputs
    inputs.loanAmount.value = scenario.data.loanAmount;
    inputs.interestRate.value = scenario.data.rate;
    inputs.loanTerm.value = scenario.data.term;
    inputs.frequency.value = scenario.data.freq;
    inputs.offsetBalance.value = scenario.data.offset;
    inputs.extraRepayment.value = scenario.data.extra;
    inputs.ioTerm.value = scenario.data.ioTerm;
    ioToggle.checked = scenario.data.isIO;
    inputs.depositPercent.value = scenario.data.depositPercent || 5;
    inputs.legalCosts.value = scenario.data.legalCosts || 0;
    inputs.stampDuty.value = scenario.data.stampDuty;
    inputs.otherFees.value = scenario.data.otherFees;
    inputs.upfrontFees.value = scenario.data.upfrontFees;
    inputs.insurance.value = scenario.data.insurance || 0;
    inputs.hoa.value = scenario.data.hoa || 0;
    inputs.rates.value = scenario.data.rates || 0;
    inputs.otherMonthly.value = scenario.data.otherMonthly || 0;

    toggleIO();
    updateState();
    closeScenarioModal();
  }
}

function deleteScenario(id, e) {
  e.stopPropagation();
  const scenarios = JSON.parse(localStorage.getItem("loanScenarios") || "[]");
  const newScenarios = scenarios.filter((s) => s.id !== id);
  localStorage.setItem("loanScenarios", JSON.stringify(newScenarios));
  renderScenarioList();
}

function renderScenarioList() {
  const list = document.getElementById("scenarioList");
  const scenarios = JSON.parse(localStorage.getItem("loanScenarios") || "[]");

  list.innerHTML = scenarios
    .map(
      (s) => `
        <div class="scenario-item" onclick="loadScenario(${s.id})">
            <div class="scenario-info">
                <h4>${s.name}</h4>
                <p>${new Date(
                  s.id
                ).toLocaleDateString()} - $${s.data.loanAmount.toLocaleString()}</p>
            </div>
            <button class="delete-btn" onclick="deleteScenario(${
              s.id
            }, event)">✕</button>
        </div>
    `
    )
    .join("");

  if (scenarios.length === 0) {
    list.innerHTML =
      '<div style="text-align:center; color:var(--text-sub); padding: 1rem;">No saved scenarios</div>';
  }
}

// --- URL Init ---
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("amt")) inputs.loanAmount.value = params.get("amt");
  // ... (Keep basic URL init if needed, but Save/Load is better)
}

// Start
init();

function initVersionTag() {
    if (typeof APP_VERSION === 'undefined') return;

    // Create GitHub link button
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/DeNNiiInc/AU-HomeLoan-Calculator';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'github-link';
    githubLink.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        View on GitHub
    `;

    // Create version tag
    const versionTag = document.createElement('div');
    versionTag.id = 'version-tag';
    
    // Calculate relative time
    const date = new Date(APP_VERSION.date);
    const now = new Date();
    const diffMs = Math.abs(now - date);
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let timeString = '';
    if (diffMinutes < 1) {
        timeString = 'just now';
    } else if (diffMinutes < 60) {
        timeString = `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
        timeString = `${diffHours}h ago`;
    } else if (diffDays < 7) {
        timeString = `${diffDays}d ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        timeString = `${weeks}w ago`;
    } else {
        const months = Math.floor(diffDays / 30);
        timeString = `${months}mo ago`;
    }

    versionTag.textContent = `${APP_VERSION.hash} • ${timeString}`;
    
    document.body.appendChild(githubLink);
    document.body.appendChild(versionTag);
}

