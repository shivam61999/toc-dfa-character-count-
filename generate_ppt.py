import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5) # 16:9 Widescreen
    blank_layout = prs.slide_layouts[6]

    # Colors
    c_navy = RGBColor(15, 23, 42)       # Slate 900
    c_indigo = RGBColor(79, 70, 229)    # Indigo 600
    c_sky = RGBColor(2, 132, 199)       # Sky 600
    c_emerald = RGBColor(16, 185, 129)  # Emerald 500
    c_text_dark = RGBColor(30, 41, 59)  # Slate 800
    c_text_muted = RGBColor(100, 116, 139) # Slate 500
    c_card_bg = RGBColor(248, 250, 252) # Slate 50
    c_border = RGBColor(226, 232, 240)  # Slate 200

    def add_header(slide, title_text):
        # Header banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.9))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_top = tf.margin_bottom = tf.margin_left = tf.margin_right = 0
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.name = 'Arial'
        p.font.size = Pt(22)
        p.font.bold = True
        p.font.color.rgb = c_navy

        # Sub-bar
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.3), Inches(11.7), Inches(0.04))
        line.fill.solid()
        line.fill.fore_color.rgb = c_indigo
        line.line.color.rgb = c_indigo

    def add_footer(slide):
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.7), Inches(0.4))
        tf = footer_box.text_frame
        tf.margin_top = tf.margin_bottom = tf.margin_left = tf.margin_right = 0
        p = tf.paragraphs[0]
        p.text = "S. B. Jain Institute of Technology, Management & Research, Nagpur | Department of Emerging Technologies CSE (AI&ML)"
        p.font.name = 'Arial'
        p.font.size = Pt(9)
        p.font.color.rgb = c_text_muted

    # ------------------ SLIDE 1: TITLE SLIDE ------------------
    s1 = prs.slides.add_slide(blank_layout)
    
    # Institute Header Box
    inst_box = s1.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.2))
    tf1 = inst_box.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "S. B. JAIN INSTITUTE OF TECHNOLOGY, MANAGEMENT & RESEARCH, NAGPUR"
    p.alignment = PP_ALIGN.CENTER
    p.font.name = 'Arial'
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = c_navy

    p2 = tf1.add_paragraph()
    p2.text = "(An Autonomous Institute, Affiliated to R.T.M. Nagpur University)\nDEPARTMENT OF EMERGING TECHNOLOGIES CSE (AI&ML)\n\"Become an excellent center for Emerging Technologies in Computer Science to create competent professionals\""
    p2.alignment = PP_ALIGN.CENTER
    p2.font.name = 'Arial'
    p2.font.size = Pt(10)
    p2.font.color.rgb = c_text_muted

    # Divider Line
    line1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.2), Inches(1.85), Inches(10.9), Inches(0.03))
    line1.fill.solid()
    line1.fill.fore_color.rgb = c_indigo
    line1.line.color.rgb = c_indigo

    # Seminar Title Box
    title_box = s1.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(11.7), Inches(2.2))
    tf_t = title_box.text_frame
    tf_t.word_wrap = True
    p = tf_t.paragraphs[0]
    p.text = "TAE-II Seminar on"
    p.alignment = PP_ALIGN.CENTER
    p.font.name = 'Arial'
    p.font.size = Pt(15)
    p.font.color.rgb = c_sky

    p_t = tf_t.add_paragraph()
    p_t.text = "“Exact Character Count Deterministic Finite Automaton:\n|w|ₐ = 3m and |w|_b = 2n Validator”"
    p_t.alignment = PP_ALIGN.CENTER
    p_t.font.name = 'Arial'
    p_t.font.size = Pt(24)
    p_t.font.bold = True
    p_t.font.color.rgb = c_navy

    p_c = tf_t.add_paragraph()
    p_c.text = "under the course: Theory of Computation (N-PCCCM503T)"
    p_c.alignment = PP_ALIGN.CENTER
    p_c.font.name = 'Arial'
    p_c.font.size = Pt(13)
    p_c.font.italic = True
    p_c.font.color.rgb = c_indigo

    # Presenter & Guide Box
    meta_box = s1.shapes.add_textbox(Inches(0.8), Inches(4.8), Inches(11.7), Inches(1.8))
    tf_m = meta_box.text_frame
    tf_m.word_wrap = True
    
    p_meta = tf_m.paragraphs[0]
    p_meta.text = "Presented By: Shivam (shivam61999)                  Under the Guidance of: Prof. Rahul Bambodkar"
    p_meta.alignment = PP_ALIGN.CENTER
    p_meta.font.name = 'Arial'
    p_meta.font.size = Pt(13)
    p_meta.font.bold = True
    p_meta.font.color.rgb = c_text_dark

    p_sub = tf_m.add_paragraph()
    p_sub.text = "5th Sem, Session: 2026-27 (ODD)\nDepartment of Emerging Technologies (AI&ML)"
    p_sub.alignment = PP_ALIGN.CENTER
    p_sub.font.name = 'Arial'
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = c_text_muted

    # ------------------ SLIDE 2: INDEX ------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "INDEX")
    add_footer(s2)

    index_box = s2.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.3), Inches(4.8))
    tf_idx = index_box.text_frame
    tf_idx.word_wrap = True
    items = [
        "1.  Problem Statement",
        "2.  Theoretical Context",
        "3.  Formal Mathematical Definition",
        "4.  Automaton / Model Design / Logic Breakdown",
        "5.  Complexity & Closure Properties",
        "6.  Real-World CSE Applications",
        "7.  Comparative Analysis",
        "8.  Conclusion & Key Takeaways",
        "9.  References & Project Artifacts"
    ]
    for i, item in enumerate(items):
        p = tf_idx.paragraphs[0] if i == 0 else tf_idx.add_paragraph()
        p.text = item
        p.font.name = 'Arial'
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(10)

    # ------------------ SLIDE 3: PROBLEM STATEMENT ------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "1. Problem Statement")
    add_footer(s3)

    box = s3.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2))
    tf = box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "Exact Character Count DFA Validator:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = c_indigo
    
    p = tf.add_paragraph()
    p.text = "The project addresses the fundamental automata theory challenge of constructing a Deterministic Finite Automaton (DFA) that validates whether an arbitrary input string w over alphabet Σ = {a, b} contains exactly 3m 'a's and 2n 'b's for non-negative integers m, n ≥ 0."
    p.font.size = Pt(12)
    p.font.color.rgb = c_text_dark
    p.space_after = Pt(8)

    p = tf.add_paragraph()
    p.text = "Problem Formulation & Requirements:"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_navy
    
    points = [
        "• Modulo Arithmetic Constraint: The language requires Nₐ(w) ≡ 0 (mod 3) and Nb(w) ≡ 0 (mod 2) simultaneously.",
        "• Cartesian State Space: Requires a minimal 6-state product automaton Q = {q₀,₀, q₁,₀, q₂,₀, q₀,₁, q₁,₁, q₂,₁}.",
        "• Empty String (ε) Acceptance: When m=0, n=0, Nₐ=0 (3×0) and Nb=0 (2×0). The initial state q₀,₀ must be an accepting state.",
        "• Order Invariance: Modular addition is abelian (commutative); the machine must accept permutations (aaabb, bbaaa, ababa).",
        "• Robust Alphabet Checking: Any symbol σ ∉ {a, b} must divert to an explicit dead/trap state (q_trap).",
        "• Verification & Traceability: Provide real-time tape simulation, state animations, Instantaneous Descriptions (IDs), and automated test suites."
    ]
    for pt in points:
        p = tf.add_paragraph()
        p.text = pt
        p.font.size = Pt(11.5)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(4)

    p = tf.add_paragraph()
    p.text = "Project Pipeline:"
    p.font.bold = True
    p.font.size = Pt(12)
    p.font.color.rgb = c_indigo
    p.space_before = Pt(8)

    p = tf.add_paragraph()
    p.text = "Input String w  ⟶  Lexical Sanitizer  ⟶  DFA State Transitions δ  ⟶  Modulo Invariant Evaluation  ⟶  Verdict (ACCEPTED / REJECTED)"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = c_navy

    # ------------------ SLIDE 4: THEORETICAL CONTEXT ------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "2. Theoretical Context")
    add_footer(s4)

    box = s4.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2))
    tf = box.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Modular Counting Languages in Automata Theory:"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_indigo

    p = tf.add_paragraph()
    p.text = "Finite automata have strictly finite memory. They cannot count unbounded numbers, but they can perfectly track modular equivalence residues (congruence classes). The language L is defined as:"
    p.font.size = Pt(12)
    p.font.color.rgb = c_text_dark

    p = tf.add_paragraph()
    p.text = "                    L = { w ∈ {a, b}* | Nₐ(w) ≡ 0 (mod 3)  ∧  Nb(w) ≡ 0 (mod 2) }"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_navy
    p.space_after = Pt(8)

    p = tf.add_paragraph()
    p.text = "Cartesian Product Automaton Construction (M = M₁ × M₂):"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_indigo

    p = tf.add_paragraph()
    p.text = "By the closure properties of Regular Languages under intersection, L is the intersection of two simpler regular languages:\n" \
             "    • L₁ = { w | Nₐ(w) ≡ 0 (mod 3) } recognized by 3-state machine M₁ (states representing remainders 0, 1, 2).\n" \
             "    • L₂ = { w | Nb(w) ≡ 0 (mod 2) } recognized by 2-state machine M₂ (states representing even and odd).\n" \
             "    • The composite machine M = M₁ × M₂ recognizes L = L₁ ∩ L₂ with |Q₁| × |Q₂| = 3 × 2 = 6 states."
    p.font.size = Pt(12)
    p.font.color.rgb = c_text_dark
    p.space_after = Pt(8)

    p = tf.add_paragraph()
    p.text = "Why a DFA over NFA?"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_indigo

    p = tf.add_paragraph()
    p.text = "Unlike languages requiring non-deterministic guessing (e.g., sub-string searching), modular arithmetic is purely deterministic. Every symbol read unambiguously increments its respective counter modulo k. A DFA provides optimal O(n) runtime with deterministic predictability and zero branch backtracking."
    p.font.size = Pt(12)
    p.font.color.rgb = c_text_dark

    # ------------------ SLIDE 5: FORMAL MATHEMATICAL DEFINITION ------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "3. Formal Mathematical Definition")
    add_footer(s5)

    # Left: 5-tuple
    box_l = s5.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(5.8), Inches(5.2))
    tf_l = box_l.text_frame
    tf_l.word_wrap = True

    p = tf_l.paragraphs[0]
    p.text = "Formal 5-Tuple Specification:"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_indigo

    p = tf_l.add_paragraph()
    p.text = "The DFA is formally defined as M = (Q, Σ, δ, q₀, F):"
    p.font.size = Pt(11.5)
    p.font.color.rgb = c_text_dark

    # 5-Tuple Table
    table_shape = s5.shapes.add_table(6, 2, Inches(0.8), Inches(2.2), Inches(5.6), Inches(2.8))
    tbl = table_shape.table
    tbl.columns[0].width = Inches(1.2)
    tbl.columns[1].width = Inches(4.4)

    t_data = [
        ("Symbol", "Meaning & Definition"),
        ("Q", "{ q₀,₀, q₁,₀, q₂,₀, q₀,₁, q₁,₁, q₂,₁ }  (|Q| = 6 states)"),
        ("Σ", "{ a, b } (Binary input alphabet)"),
        ("q₀", "q₀,₀  (Initial State, tracking residues Nₐ≡0, Nb≡0)"),
        ("F", "{ q₀,₀ } (Accepting State where Nₐ=3m and Nb=2n)"),
        ("δ", "Transition Function: Q × Σ ⟶ Q")
    ]
    for r_idx, (sym, val) in enumerate(t_data):
        c0 = tbl.cell(r_idx, 0)
        c1 = tbl.cell(r_idx, 1)
        c0.text = sym
        c1.text = val
        for c in (c0, c1):
            c.fill.solid()
            c.fill.fore_color.rgb = c_card_bg if r_idx > 0 else c_indigo
            for par in c.text_frame.paragraphs:
                par.font.size = Pt(9.5)
                par.font.color.rgb = RGBColor(255, 255, 255) if r_idx == 0 else c_text_dark
                par.font.bold = (r_idx == 0 or c == c0)

    # Right: Transition Table
    box_r = s5.shapes.add_textbox(Inches(6.8), Inches(1.5), Inches(5.8), Inches(5.2))
    tf_r = box_r.text_frame
    tf_r.word_wrap = True

    p = tf_r.paragraphs[0]
    p.text = "State Transition Table (δ: Q × Σ ⟶ Q):"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_indigo

    tbl_r_shape = s5.shapes.add_table(7, 4, Inches(6.8), Inches(2.2), Inches(5.7), Inches(3.4))
    tbl_r = tbl_r_shape.table
    tbl_r.columns[0].width = Inches(1.3)
    tbl_r.columns[1].width = Inches(1.1)
    tbl_r.columns[2].width = Inches(1.1)
    tbl_r.columns[3].width = Inches(2.2)

    tr_data = [
        ("Current State", "Input 'a'", "Input 'b'", "Residue Invariant"),
        ("-> * q₀,₀", "q₁,₀", "q₀,₁", "Nₐ ≡ 0 mod 3, Nb ≡ 0 mod 2 (Final)"),
        ("      q₁,₀", "q₂,₀", "q₁,₁", "Nₐ ≡ 1 mod 3, Nb ≡ 0 mod 2"),
        ("      q₂,₀", "q₀,₀", "q₂,₁", "Nₐ ≡ 2 mod 3, Nb ≡ 0 mod 2"),
        ("      q₀,₁", "q₁,₁", "q₀,₀", "Nₐ ≡ 0 mod 3, Nb ≡ 1 mod 2"),
        ("      q₁,₁", "q₂,₁", "q₁,₀", "Nₐ ≡ 1 mod 3, Nb ≡ 1 mod 2"),
        ("      q₂,₁", "q₀,₁", "q₂,₀", "Nₐ ≡ 2 mod 3, Nb ≡ 1 mod 2")
    ]
    for r_idx, row in enumerate(tr_data):
        for c_idx, val in enumerate(row):
            cell = tbl_r.cell(r_idx, c_idx)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = c_card_bg if r_idx > 0 else c_navy
            for par in cell.text_frame.paragraphs:
                par.font.size = Pt(9)
                par.font.color.rgb = RGBColor(255, 255, 255) if r_idx == 0 else c_text_dark
                par.font.bold = (r_idx == 0 or "* q₀,₀" in val)

    # ------------------ SLIDE 6: AUTOMATON / MODEL DESIGN ------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "4. Automaton & Model Design")
    add_footer(s6)

    # Module Architecture Table
    mod_tbl_shape = s6.shapes.add_table(8, 2, Inches(0.8), Inches(1.6), Inches(11.7), Inches(3.6))
    tbl_m = mod_tbl_shape.table
    tbl_m.columns[0].width = Inches(3.0)
    tbl_m.columns[1].width = Inches(8.7)

    mod_data = [
        ("Implementation Module", "Technical Responsibility & Theoretical Function"),
        ("dfaEngine.ts", "Core mathematical transition table δ, remainder calculators, and ID generator."),
        ("DFADiagram.tsx", "Interactive SVG vector state machine graph with real-time active edge and state animations."),
        ("TapeVisualizer.tsx", "Dynamic input tape cells showing processed, active, and upcoming symbols with read head (▼)."),
        ("SimulationControls.tsx", "Controllable execution engine (Play, Pause, Step Next, Step Prev, Speed slider 0.5x-3x)."),
        ("InstantaneousDescription.tsx", "Mathematical derivation sequence: (q₀,₀, w) ⊢ (q₁,₀, w') ⊢ ... with copyable trace."),
        ("BatchTestingSuite.tsx", "Automated test runner verifying 24+ boundary cases with real-time audit pass scorecard."),
        ("InstallAppModal.tsx", "Progressive Web App (PWA) offline installation engine for Android APK and Windows Desktop.")
    ]
    for r_idx, (mod, resp) in enumerate(mod_data):
        c0 = tbl_m.cell(r_idx, 0)
        c1 = tbl_m.cell(r_idx, 1)
        c0.text = mod
        c1.text = resp
        for c in (c0, c1):
            c.fill.solid()
            c.fill.fore_color.rgb = c_card_bg if r_idx > 0 else c_indigo
            for par in c.text_frame.paragraphs:
                par.font.size = Pt(10)
                par.font.color.rgb = RGBColor(255, 255, 255) if r_idx == 0 else c_text_dark
                par.font.bold = (r_idx == 0 or c == c0)

    # Bottom notes
    box_b = s6.shapes.add_textbox(Inches(0.8), Inches(5.4), Inches(11.7), Inches(1.4))
    tf_b = box_b.text_frame
    tf_b.word_wrap = True
    p = tf_b.paragraphs[0]
    p.text = "String Simulation Engine Features:"
    p.font.bold = True
    p.font.size = Pt(12)
    p.font.color.rgb = c_navy
    
    p = tf_b.add_paragraph()
    p.text = "• Real-time Modulo Invariant Equation: Continuously updates Nₐ = 3m + rₐ and Nb = 2n + rb with exact multipliers m and n.\n" \
             "• Step-by-Step State Highlighting: Visual node pulse halo and traveling edge pulse track each symbol read.\n" \
             "• Final Decision: Confetti animation on ACCEPTED (halts in q₀,₀), detailed algebraic reason on REJECTED."
    p.font.size = Pt(11)
    p.font.color.rgb = c_text_dark

    # ------------------ SLIDE 7: COMPLEXITY & CLOSURE PROPERTIES ------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "5. Complexity & Minimality Analysis")
    add_footer(s7)

    box = s7.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.7), Inches(5.3))
    tf = box.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Computational Complexity Analysis:"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_indigo

    complexities = [
        ("• Time Complexity for Simulation:", "O(|w|) strictly linear time, where |w| is the length of the input string. Because the machine is a deterministic DFA, each symbol requires exactly one O(1) table lookup with zero backtracking."),
        ("• Space Complexity:", "O(1) auxiliary runtime space. The automaton requires constant memory representing only the current state index in Q."),
        ("• Verification Precomputation:", "O(|w|) time to extract character frequencies and compute integer quotients m = ⌊Nₐ/3⌋ and n = ⌊Nb/2⌋.")
    ]
    for title, desc in complexities:
        p = tf.add_paragraph()
        p.text = f"{title} {desc}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(4)

    p = tf.add_paragraph()
    p.text = "Proof of State Minimality (Myhill-Nerode Theorem):"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_navy
    p.space_before = Pt(6)

    p = tf.add_paragraph()
    p.text = "Why does this language require strictly 6 states? Can it be compressed?\n" \
             "By the Myhill-Nerode Theorem, the minimum number of states in any DFA for L equals the index (number of equivalence classes) of the relation ≡_L. We prove all 6 states are pairwise distinguishable:\n" \
             "    1. Differentiating 'b' parity: States with different j remainders (e.g. q₀,₀ vs q₀,₁) are distinguished by z = ε (one accepts, other rejects) or z = 'b'.\n" \
             "    2. Differentiating 'a' remainders: States with identical j but different i (e.g. q₁,₀ vs q₂,₀) are distinguished by z = 'aa'. Suffix 'aa' takes q₁,₀ ⟶ q₀,₀ (Accept), while it takes q₂,₀ ⟶ q₁,₀ (Reject).\n" \
             "Since all 6 classes are pairwise distinguishable, MinStates(DFA) = 6. No DFA with fewer than 6 states can recognize L."
    p.font.size = Pt(11)
    p.font.color.rgb = c_text_dark

    p = tf.add_paragraph()
    p.text = "Closure Properties:"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_indigo
    p.space_before = Pt(6)

    p = tf.add_paragraph()
    p.text = "Because L is regular, it is closed under Union, Intersection, Complement, Concatenation, Kleene Star, and Reversal."
    p.font.size = Pt(11.5)
    p.font.color.rgb = c_text_dark

    # ------------------ SLIDE 8: REAL-WORLD APPLICATIONS ------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_header(s8, "6. Real-World CSE Applications")
    add_footer(s8)

    # 4 App Cards
    apps = [
        ("1. Bioinformatics & DNA/RNA Codon Validation",
         "In genetics, mRNA is translated by ribosomes in triplets of 3 nucleotides (codons). Automata verify N ≡ 0 (mod 3) reading frames to prevent frameshift mutations in genomic alignment tools (BLAST, FASTA)."),
        ("2. Hardware Error Detection & Parity Checking",
         "The condition Nb ≡ 0 (mod 2) is the exact mathematical model of Even Parity Checking, used across serial communication hardware (UART, RS-232, PCIe) and ECC RAM for single-bit error detection."),
        ("3. Digital Electronics & VLSI Clock Dividers",
         "This 6-state automaton maps directly to a synchronous dual-clock divider FSM in Verilog/VHDL, synthesizing synchronized 1/3rd and 1/2nd frequency clock phases in microcontrollers."),
        ("4. Compiler Design & Memory Alignment",
         "Compilers (LLVM, GCC) use modular DFAs during lexical analysis to verify 32-bit (4-byte) or 64-bit (8-byte) memory alignment, opcode padding, and grammar block indentation.")
    ]

    for i, (title, desc) in enumerate(apps):
        row = i // 2
        col = i % 2
        x = Inches(0.8 + col * 5.9)
        y = Inches(1.6 + row * 2.6)

        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.6), Inches(2.3))
        card.fill.solid()
        card.fill.fore_color.rgb = c_card_bg
        card.line.color.rgb = c_border

        tb = s8.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.2), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = c_indigo
        p.space_after = Pt(4)

        p = tf.add_paragraph()
        p.text = desc
        p.font.size = Pt(10.5)
        p.font.color.rgb = c_text_dark

    # ------------------ SLIDE 9: COMPARATIVE ANALYSIS ------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_header(s9, "7. Comparative Analysis")
    add_footer(s9)

    cmp_tbl_shape = s9.shapes.add_table(8, 4, Inches(0.8), Inches(1.5), Inches(11.7), Inches(4.5))
    tbl_c = cmp_tbl_shape.table
    tbl_c.columns[0].width = Inches(2.4)
    tbl_c.columns[1].width = Inches(3.1)
    tbl_c.columns[2].width = Inches(3.1)
    tbl_c.columns[3].width = Inches(3.1)

    cmp_data = [
        ("Parameter", "Unoptimized NFA", "Standard Product DFA", "Optimized DFA (Our Model)"),
        ("State Count", "May grow redundantly", "6 States (3 × 2)", "6 States + 1 Trap State"),
        ("Non-Determinism", "Yes (Multiple branches)", "No (Deterministic)", "No (Purely Deterministic)"),
        ("String Runtime", "O(2ⁿ · |w|) backtracking", "O(|w|) Linear", "O(|w|) Real-Time Linear"),
        ("Empty String (ε)", "Handled via ε-closure", "Immediate accept at q₀,₀", "Immediate accept at q₀,₀"),
        ("Invalid Characters", "Halted branch rejection", "Undefined transition", "Explicit Dead/Trap (q_trap)"),
        ("Memory Footprint", "High (Branch stack)", "Constant O(1)", "Constant O(1) Cache-friendly"),
        ("Platform Support", "Theoretical paper only", "Console / Web only", "Installable Offline PWA")
    ]
    for r_idx, row in enumerate(cmp_data):
        for c_idx, val in enumerate(row):
            cell = tbl_c.cell(r_idx, c_idx)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = c_card_bg if r_idx > 0 else c_navy
            for par in cell.text_frame.paragraphs:
                par.font.size = Pt(9.5)
                par.font.color.rgb = RGBColor(255, 255, 255) if r_idx == 0 else c_text_dark
                par.font.bold = (r_idx == 0 or c_idx == 0 or c_idx == 3)

    box_note = s9.shapes.add_textbox(Inches(0.8), Inches(6.2), Inches(11.7), Inches(0.6))
    tf_n = box_note.text_frame
    p = tf_n.paragraphs[0]
    p.text = "Key Takeaway: The Cartesian Product DFA achieves strictly minimal state bounds while eliminating non-deterministic overhead, guaranteeing O(|w|) deterministic validation."
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = c_indigo

    # ------------------ SLIDE 10: CONCLUSION & KEY TAKEAWAYS ------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_header(s10, "8. Conclusion & Key Takeaways")
    add_footer(s10)

    box = s10.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2))
    tf = box.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Conclusion:"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_navy

    p = tf.add_paragraph()
    p.text = "The Exact Character Count DFA project successfully bridges theoretical automata mathematics and modern engineering. It delivers an interactive, mathematically rigorous laboratory for validating and visualizing strings with exactly 3m 'a's and 2n 'b's."
    p.font.size = Pt(12)
    p.font.color.rgb = c_text_dark
    p.space_after = Pt(8)

    p = tf.add_paragraph()
    p.text = "Key Takeaways:"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_indigo

    takeaways = [
        "1. Cartesian Product Automaton: Combining a modulo-3 counter (3 states) and a modulo-2 counter (2 states) yields an irreducible 6-state DFA.",
        "2. State Minimality Proven: Demonstrated via Myhill-Nerode Theorem that all 6 states are pairwise distinguishable, making 6 the absolute mathematical minimum.",
        "3. Empty String & Permutation Invariance: Verified that w = ε is valid for m=0, n=0, and modular commutativity guarantees identical acceptance regardless of character order.",
        "4. Interactive Visual Laboratory: Implemented real-time tape animation, Instantaneous Descriptions (IDs), live transition table highlighting, and 24+ automated test cases.",
        "5. Cross-Platform & Offline Ready: Packaged as an installable Progressive Web App (PWA) operating 100% offline on Android mobile and Windows desktop."
    ]
    for t in takeaways:
        p = tf.add_paragraph()
        p.text = t
        p.font.size = Pt(11.5)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(4)

    # ------------------ SLIDE 11: REFERENCES ------------------
    s11 = prs.slides.add_slide(blank_layout)
    add_header(s11, "9. References & Project Artifacts")
    add_footer(s11)

    box = s11.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.7), Inches(5.3))
    tf = box.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Project Artifacts & Live Deployments:"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = c_indigo

    artifacts = [
        ("• Live Web Application (Vercel):", "https://toc-dfa-character-count-.vercel.app"),
        ("• GitHub Source Repository:", "https://github.com/shivam61999/toc-dfa-character-count-"),
        ("• Windows Desktop App:", "TOC DFA Standalone Window (Offline PWA)"),
        ("• Android Mobile App:", "TOC DFA Mobile Home-Screen App (Offline PWA)"),
        ("• Academic Dossier & Prompt Lifecycle:", "TOC_DFA_Prompt_Engineering_Lifecycle.xlsx")
    ]
    for label, link in artifacts:
        p = tf.add_paragraph()
        p.text = f"{label}  {link}"
        p.font.size = Pt(11.5)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(3)

    p = tf.add_paragraph()
    p.text = "Academic & Theoretical References:"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = c_navy
    p.space_before = Pt(8)

    academic_refs = [
        "• Michael Sipser, Introduction to the Theory of Computation, 3rd Edition, Cengage Learning.",
        "• John E. Hopcroft, Rajeev Motwani & Jeffrey D. Ullman, Introduction to Automata Theory, Languages, and Computation, 3rd Edition, Pearson.",
        "• Peter Linz, An Introduction to Formal Languages and Automata, 6th Edition, Jones & Bartlett Learning.",
        "• John C. Martin, Introduction to Languages and the Theory of Computation, McGraw-Hill.",
        "• Alfred V. Aho, Monica S. Lam, Ravi Sethi & Jeffrey D. Ullman, Compilers: Principles, Techniques, and Tools (Dragon Book), Pearson."
    ]
    for ref in academic_refs:
        p = tf.add_paragraph()
        p.text = ref
        p.font.size = Pt(11)
        p.font.color.rgb = c_text_dark
        p.space_after = Pt(2)

    # Save presentation
    filename = "TOC_TAE_DFA_Character_Count_Seminar.pptx"
    prs.save(filename)
    print(f"Presentation generated successfully: {filename}")

if __name__ == "__main__":
    create_presentation()
