# Exact Character Count DFA Validator (3m 'a's, 2n 'b's)
> **Theory of Computation (TOC) / Formal Languages and Automata Theory (FLAT)**
> **Theory Assessment / TAE Project & Laboratory Simulator**

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, high-performance web application and research laboratory that models, simulates, and formally proves a **Deterministic Finite Automaton (DFA)** designed to accept only strings where the count of `'a'`s is exactly $3m$ and `'b'`s is $2n$ for integers $m, n \ge 0$ over alphabet $\Sigma = \{a, b\}$.

---

## 📌 Problem Statement & Language Definition

Given the input alphabet $\Sigma = \{a, b\}$, design a Deterministic Finite Automaton (DFA) that validates and accepts strings $w \in \Sigma^*$ satisfying:

$$N_a(w) = 3m \quad \text{and} \quad N_b(w) = 2n \quad \text{for } m, n \in \mathbb{Z}_{\ge 0}$$

In modular arithmetic:
$$N_a(w) \equiv 0 \pmod 3 \quad \land \quad N_b(w) \equiv 0 \pmod 2$$

### Key Language Characteristics:
1. **Empty String ($\epsilon$):** Accepted, since $N_a = 0 = 3 \times 0$ ($m=0$) and $N_b = 0 = 2 \times 0$ ($n=0$).
2. **Order Invariance:** Modulo addition is commutative (abelian). Any valid sequence (e.g., $aaabb$, $bbaaa$, $ababa$) produces identical state results.
3. **Closure:** This language is the intersection of two regular languages:
   $$L = L_1 \cap L_2 = \{ w \in \{a,b\}^* \mid N_a(w) \equiv 0 \pmod 3 \} \cap \{ w \in \{a,b\}^* \mid N_b(w) \equiv 0 \pmod 2 \}$$

---

## 📐 Formal 5-Tuple Definition

The DFA is formally specified by the 5-tuple:

$$M = (Q, \Sigma, \delta, q_0, F)$$

Where:
- **$Q$ (Set of States):** $\{ q_{0,0}, q_{1,0}, q_{2,0}, q_{0,1}, q_{1,1}, q_{2,1} \}$
  - State $q_{i,j}$ encodes: $i = N_a(w) \pmod 3$, $j = N_b(w) \pmod 2$.
  - Extended implementation includes $q_{\text{trap}}$ for non-alphabet symbols ($\sigma \notin \{a, b\}$).
- **$\Sigma$ (Alphabet):** $\{a, b\}$
- **$q_0$ (Start State):** $q_{0,0}$
- **$F$ (Accepting/Final States):** $\{ q_{0,0} \}$
- **$\delta$ (Transition Function):** $\delta : Q \times \Sigma \to Q$
  $$\delta(q_{i,j}, a) = q_{(i+1) \bmod 3, \; j}$$
  $$\delta(q_{i,j}, b) = q_{i, \; (j+1) \bmod 2}$$

---

## 📊 State Transition Table

| State ($q \in Q$) | Meaning ($N_a \bmod 3, N_b \bmod 2$) | Input `'a'` ($\delta(q, a)$) | Input `'b'` ($\delta(q, b)$) | Status |
|:---:|:---:|:---:|:---:|:---:|
| $\to * q_{0,0}$ | $(0, 0)$ | $q_{1,0}$ | $q_{0,1}$ | **Initial & Accepting** |
| $q_{1,0}$ | $(1, 0)$ | $q_{2,0}$ | $q_{1,1}$ | Non-accepting |
| $q_{2,0}$ | $(2, 0)$ | $q_{0,0}$ | $q_{2,1}$ | Non-accepting |
| $q_{0,1}$ | $(0, 1)$ | $q_{1,1}$ | $q_{0,0}$ | Non-accepting |
| $q_{1,1}$ | $(1, 1)$ | $q_{2,1}$ | $q_{1,0}$ | Non-accepting |
| $q_{2,1}$ | $(2, 1)$ | $q_{0,1}$ | $q_{2,0}$ | Non-accepting |
| $q_{\text{trap}}$ | Dead state (invalid symbol) | $q_{\text{trap}}$ | $q_{\text{trap}}$ | Trap State |

---

## 🏆 Proof of State Minimality (Myhill-Nerode Theorem)

Why does this DFA require **strictly 6 states**?
Let $L$ be the given language. We prove all 6 equivalence classes are pairwise distinguishable:
- Any state with $j=0$ and another with $j=1$ can be distinguished by suffix $z = \epsilon$ (if one is $q_{0,0}$) or $z = b$.
- For states with identical $j$ but different $i \in \{0, 1, 2\}$, they can be distinguished by $z \in \{a, aa\}$ to bring the residue to $0 \pmod 3$.

Since the Myhill-Nerode equivalence relation has index 6:
$$\text{MinStates}(DFA) = 6$$
No DFA with fewer than 6 states can recognize $L$.

---

## ✨ Features of the Application

1. **Interactive SVG State Machine Diagram:**
   - 2D grid layout with active node halos, glowing pulses, and traveling transition edge animations.
   - Clickable states with formal invariant descriptions.
2. **Visual Input Tape & Head:**
   - Real-time tape cursor pointer, character coloring (processed, current, pending).
   - Live counters: $N_a, N_b$, $m = \lfloor N_a / 3 \rfloor$, $n = \lfloor N_b / 2 \rfloor$, $r_a, r_b$.
3. **Step-by-Step Simulation Controls:**
   - Play, Pause, Step Next, Step Previous, Jump to Start, Jump to End.
   - Speed control (0.5x, 1x, 1.5x, 2x, 3x) and keyboard shortcuts (`Space`, `←`, `→`, `R`).
4. **Instantaneous Descriptions (IDs) & Trace:**
   - Full configuration sequence: $(q_{0,0}, w) \vdash (q_1, w') \vdash \dots \vdash (q_f, \epsilon)$
   - One-click copy trace to clipboard.
5. **Interactive Transition Table:**
   - Dynamic real-time row and cell highlighting as the simulator steps through input.
6. **Automated Batch Test Suite:**
   - 24+ built-in test cases across all categories with 100% pass rate scorecard.
   - Ability to add custom test strings and one-click load them into the visual simulator.
7. **Random String Generator:**
   - Generate valid strings with custom $(m, n)$ or invalid strings with specified defect modes.
8. **TAE Dossier & Viva Voce Q&A:**
   - Interactive viva questions and answers accordion for exam preparation.
   - One-click export of formal academic report (`.md`).
9. **Confetti Celebration & Clear Explanations:**
   - Visual celebration on accepted strings and transparent mathematical reasons on rejections.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 9+

### Steps
```bash
# 1. Clone repository
git clone https://github.com/shivam61999/toc-dfa-character-count.git
cd toc-dfa-character-count

# 2. Install dependencies
npm.cmd install
# (or 'npm install' on Linux/macOS)

# 3. Start development server
npm.cmd run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Deployment Instructions

### 1. Deploy on Vercel (Fastest & Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New..."** &rarr; **"Project"**.
4. Select `toc-dfa-character-count`.
5. Framework preset is automatically detected as **Vite**.
6. Click **Deploy**. Your app is live in seconds with a custom HTTPS URL!

*Alternative via CLI:*
```bash
npm.cmd install -g vercel
vercel
```

---

### 2. Deploy on GitHub Pages
This repository is pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'`).

1. Push to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial TOC TAE DFA validator release"
   git branch -M main
   git remote add origin https://github.com/shivam61999/toc-dfa-character-count.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` and GitHub Actions will automatically build and publish your site!

---

### 3. Deploy on Render
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** &rarr; **Static Site**.
3. Connect your GitHub repository.
4. Set:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.

---

## 🎓 Viva Voce / TAE Presentation Questions

| Question | Core Concept |
|---|---|
| **Why 6 states?** | Cartesian product of 3 modulo states ($a$) and 2 modulo states ($b$). Proved minimal by Myhill-Nerode. |
| **Is $\epsilon$ accepted?** | Yes, $m=0, n=0 \implies N_a = 0, N_b = 0$. Both conditions are satisfied. |
| **Does order matter?** | No, modulo addition is commutative. Any permutation of valid characters yields the same halt state. |
| **Can NFA reduce states?** | No, the language has index 6; independent modular counters require at least 6 states in both DFA and NFA. |
| **How are invalid characters handled?** | Diverted to dead state $q_{\text{trap}}$ which loops on all subsequent symbols and never accepts. |

---

## 📄 License
MIT License. Created for Theory of Computation (TOC) TAE Academic Submission.
