"""
ThaliTime Presentation Generator
Creates a professional 12-slide PowerPoint presentation matching the exact format:
Slide 1: Title
Slide 2: The problem
Slide 3: The users
Slide 4: Your research
Slide 5: Your insight
Slide 6: Your challenge
Slide 7: Your ideas
Slide 8: Your prototype
Slide 9: Testing
Slide 10: What you changed
Slide 11: Final solution and impact
Slide 12: Honest reflection
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette
    C_DEEP_GREEN = RGBColor(22, 101, 52)      # Primary #166534
    C_FRESH_GREEN = RGBColor(34, 197, 94)     # Secondary #22C55E
    C_BG_CREAM = RGBColor(250, 250, 245)      # Background #FAFAF5
    C_DARK_SLATE = RGBColor(15, 23, 42)       # Slate 900 #0F172A
    C_CARD_BG = RGBColor(255, 255, 255)       # White #FFFFFF
    C_CARD_BORDER = RGBColor(226, 232, 240)   # Slate 200 #E2E8F0
    C_TEXT_DARK = RGBColor(31, 41, 55)        # Text Charcoal #1F2937
    C_TEXT_MUTED = RGBColor(100, 116, 139)    # Text Muted #64748B
    C_AMBER = RGBColor(245, 158, 11)          # Warning/Accent #F59E0B
    C_EMERALD_LIGHT = RGBColor(240, 253, 244) # Emerald 50
    C_SLATE_BOX = RGBColor(248, 250, 252)     # Slate 50
    C_RED = RGBColor(239, 68, 68)             # Red 500

    blank_layout = prs.slide_layouts[6]

    def set_slide_background(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, slide_num, title, subtitle, is_dark=False):
        # Top Tag / Pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.5), Inches(3.2), Inches(0.38))
        pill.fill.solid()
        pill.fill.fore_color.rgb = RGBColor(22, 101, 52) if not is_dark else RGBColor(34, 197, 94)
        pill.line.fill.background()
        tf = pill.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"SLIDE {slide_num:02d} / 12 • DESIGN PITCH"
        p.font.name = "Arial"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = RGBColor(255, 255, 255) if not is_dark else RGBColor(15, 23, 42)
        p.alignment = PP_ALIGN.CENTER

        # Title
        t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.95), Inches(11.7), Inches(0.6))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.name = "Arial"
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = RGBColor(255, 255, 255) if is_dark else C_DEEP_GREEN

        # Subtitle
        s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.55), Inches(11.7), Inches(0.4))
        tf_s = s_box.text_frame
        tf_s.word_wrap = True
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle
        p_s.font.name = "Arial"
        p_s.font.size = Pt(13)
        p_s.font.color.rgb = RGBColor(203, 213, 225) if is_dark else C_TEXT_MUTED

    def add_notes(slide, notes_text):
        notes_slide = slide.notes_slide
        tf = notes_slide.notes_text_frame
        tf.text = notes_text

    # =========================================================================
    # SLIDE 1: Title — project, team, and your problem in one line
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_DARK_SLATE)

    # Decorative header element
    pill1 = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.0), Inches(4.2), Inches(0.45))
    pill1.fill.solid()
    pill1.fill.fore_color.rgb = RGBColor(34, 197, 94)
    pill1.line.fill.background()
    p1 = pill1.text_frame.paragraphs[0]
    p1.text = "COLLEGE MESS INNOVATION • DESIGN THINKING"
    p1.font.name = "Arial"
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(15, 23, 42)
    p1.alignment = PP_ALIGN.CENTER

    # Project Title
    t1_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(11.3), Inches(1.6))
    tf1 = t1_box.text_frame
    p_main = tf1.paragraphs[0]
    p_main.text = "ThaliTime – Smart Mess Meal Management System"
    p_main.font.name = "Arial"
    p_main.font.size = Pt(36)
    p_main.font.bold = True
    p_main.font.color.rgb = RGBColor(255, 255, 255)

    p_tag = tf1.add_paragraph()
    p_tag.text = 'Tagline: "Your Meal, On Time – Every Time." (Repository: Late-thali)'
    p_tag.font.name = "Arial"
    p_tag.font.size = Pt(18)
    p_tag.font.color.rgb = RGBColor(74, 222, 128)

    # Problem in one line card
    prob_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(3.6), Inches(11.3), Inches(1.5))
    prob_card.fill.solid()
    prob_card.fill.fore_color.rgb = RGBColor(30, 41, 59)
    prob_card.line.color.rgb = RGBColor(71, 85, 105)
    tf_prob = prob_card.text_frame
    tf_prob.word_wrap = True
    p_prob_lbl = tf_prob.paragraphs[0]
    p_prob_lbl.text = "THE PROBLEM IN ONE LINE:"
    p_prob_lbl.font.size = Pt(11)
    p_prob_lbl.font.bold = True
    p_prob_lbl.font.color.rgb = C_AMBER

    p_prob_txt = tf_prob.add_paragraph()
    p_prob_txt.text = (
        '"Hostel students lose 35+ minutes daily waiting in chaotic dining queues with zero visibility '
        'on food availability, while campus kitchens waste 18% of prepared food due to uncoordinated arrival rushes."'
    )
    p_prob_txt.font.size = Pt(15)
    p_prob_txt.font.bold = True
    p_prob_txt.font.color.rgb = RGBColor(255, 255, 255)

    # Team & Badges Card
    meta_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(5.4), Inches(11.3), Inches(1.3))
    meta_card.fill.solid()
    meta_card.fill.fore_color.rgb = RGBColor(22, 101, 52)
    meta_card.line.fill.background()
    tf_meta = meta_card.text_frame
    tf_meta.word_wrap = True
    p_team = tf_meta.paragraphs[0]
    p_team.text = "TEAM: Team ThaliTime (Developers & Student Welfare Taskforce)"
    p_team.font.size = Pt(14)
    p_team.font.bold = True
    p_team.font.color.rgb = RGBColor(255, 255, 255)

    p_stack = tf_meta.add_paragraph()
    p_stack.text = "Solution Stack: React.js | Vite | Tailwind CSS | Real-Time Queue Telemetry | Smart Demand Forecasting"
    p_stack.font.size = Pt(12)
    p_stack.font.color.rgb = RGBColor(187, 247, 208)

    add_notes(s1, (
        "Good morning everyone. Today we are presenting ThaliTime – Smart Mess Meal Management System.\n"
        "Our core mission is: 'Your Meal, On Time – Every Time.'\n"
        "In one line: Hostel students lose over 35 minutes daily trapped in chaotic dining queues with zero visibility "
        "on whether food is even available, while our college mess kitchen discards over 45 kilograms of fresh food nightly "
        "due to complete guesswork in attendance. We built ThaliTime to solve both sides of this equation."
    ))

    # =========================================================================
    # SLIDE 2: The problem — where it happens, who it affects, striking evidence
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_BG_CREAM)
    add_header(s2, 2, "The Problem: Campus Congestion & Culinary Waste", 
               "Where it happens on campus, who it affects, and the striking data evidence.")

    # 3 Column Layout
    col_w = Inches(3.64)
    gap = Inches(0.39)
    top_pos = Inches(2.1)
    card_h = Inches(4.8)

    # Col 1: Where it happens
    c1 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_pos, col_w, card_h)
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_CARD_BG
    c1.line.color.rgb = C_CARD_BORDER
    tf = c1.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "WHERE IT HAPPENS"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_DEEP_GREEN

    items_c1 = [
        ("Central Mess Dining Halls:", "Serving Kaveri, Ganga, Brahmaputra, and Yamuna residential blocks."),
        ("Physical Hotspots:", "Narrow counter corridors, single plate collection windows, and cramped tray return tables."),
        ("Peak Choke Windows:", "12:45 PM – 1:30 PM (Lunch rush between lectures) and 7:15 PM – 8:30 PM (Dinner peak)."),
        ("Physical Environment:", "Overcrowded halls with noisy lines spilling out into hostel corridors.")
    ]
    for title, desc in items_c1:
        p_t = tf.add_paragraph()
        p_t.text = f"• {title} "
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = C_TEXT_DARK
        p_d = tf.add_paragraph()
        p_d.text = f"  {desc}"
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Col 2: Who it affects
    c2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + col_w + gap, top_pos, col_w, card_h)
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_CARD_BG
    c2.line.color.rgb = C_CARD_BORDER
    tf = c2.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "WHO IT AFFECTS"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_DEEP_GREEN

    items_c2 = [
        ("2,400+ Resident Students:", "Exhausted after classes, facing study schedule disruptions, skipping meals before exams."),
        ("Mess Kitchen Staff & Cooks:", "Stressed by hostile crowd surges, repetitive shouting of tokens, and unpredictable plating speed."),
        ("Mess Contractors & Caterers:", "Bleeding budget on unsold buffer food and facing recurring student protests."),
        ("College Administration:", "Managing hygiene complaints, verbal counter disputes, and food quality grievances.")
    ]
    for title, desc in items_c2:
        p_t = tf.add_paragraph()
        p_t.text = f"• {title} "
        p_t.font.bold = True
        p_t.font.size = Pt(11)
        p_t.font.color.rgb = C_TEXT_DARK
        p_d = tf.add_paragraph()
        p_d.text = f"  {desc}"
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Col 3: Striking Evidence
    c3 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + (col_w + gap) * 2, top_pos, col_w, card_h)
    c3.fill.solid()
    c3.fill.fore_color.rgb = C_EMERALD_LIGHT
    c3.line.color.rgb = C_FRESH_GREEN
    tf = c3.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "STRIKING EVIDENCE"
    p.font.bold = True
    p.font.size = Pt(13)
    p.font.color.rgb = C_DEEP_GREEN

    evidences = [
        ("38 MINS", "Average Peak Waiting Time", "Measured at Central Counter 1 during 7:30 PM dinner rush."),
        ("45+ KG", "Surplus Food Discarded Nightly", "Dumped due to uncoordinated attendance and over-preparation."),
        ("42%", "Students Skipping/Delaying Meals", "Stated that physical mess waiting causes them to skip dinner or eat junk food.")
    ]
    for stat, header, detail in evidences:
        p_s = tf.add_paragraph()
        p_s.text = stat
        p_s.font.size = Pt(22)
        p_s.font.bold = True
        p_s.font.color.rgb = C_DEEP_GREEN
        p_h = tf.add_paragraph()
        p_h.text = header
        p_h.font.size = Pt(11)
        p_h.font.bold = True
        p_h.font.color.rgb = C_TEXT_DARK
        p_det = tf.add_paragraph()
        p_det.text = detail
        p_det.font.size = Pt(9.5)
        p_det.font.color.rgb = C_TEXT_MUTED

    add_notes(s2, (
        "Here is where and how the problem hits our campus.\n"
        "Location: The Central Mess Dining Hall serving over 2,400 students across 4 hostel blocks. The choke points happen at "
        "the plate distribution counters between 7:15 PM and 8:30 PM.\n"
        "Who it affects: Students lose 38 minutes on average every evening. Kitchen staff face chaotic shouting, and administrators "
        "face endless complaints.\n"
        "Our striking piece of evidence: We timed the queues and audited the disposal bins: 38 minutes average wait time at Counter 1, "
        "and over 45 kg of fresh edible thalis discarded every single night due to manual demand guesswork."
    ))

    # =========================================================================
    # SLIDE 3: The users — your persona(s), each with a real quote
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_BG_CREAM)
    add_header(s3, 3, "The Users: Our Key Campus Personas", 
               "Understanding the distinct pain points of hostel residents and kitchen operators.")

    personas = [
        {
            "name": "Aarav Sharma",
            "role": "3rd Year B.Tech Resident • Kaveri Boys Hostel",
            "goal": "Grab fresh nutritious food quickly between back-to-back lectures and evening lab assignments.",
            "pain": "Arrives at the mess only to find 40 students in front of him; frequent unexpected stock-outs of popular items.",
            "quote": '"I stood in line for 25 minutes before my 8:00 AM lab, only to find the poha was finished. I had to rush to class completely on an empty stomach."'
        },
        {
            "name": "Chef Rajesh Verma",
            "role": "Head Mess Administrator & Supervisor • Central Kitchen",
            "goal": "Maintain high hygiene, prepare precise meal volumes, and operate stress-free serving counters.",
            "pain": "Cannot predict how many students will dine; oscillates between food shortages and throwing away buckets of dal.",
            "quote": '"Cooking dinner for 800 students without advance booking is pure gambling. Some nights we run short and students shout; other nights we discard 3 buckets of paneer."'
        },
        {
            "name": "Ananya Iyer",
            "role": "Final Year Student & Placement Candidate • Ganga Hostel",
            "goal": "Strict schedule predictability during placement interview weeks and coding hackathons.",
            "pain": "Uncertain service times force her to order expensive outside takeout just to avoid standing in unpredictable lines.",
            "quote": '"During placement interviews, I cannot afford to stand in an unmoving queue. I just want to know when my plate is ready so I can pick it up and get back to work."'
        }
    ]

    for idx, pers in enumerate(personas):
        x_pos = Inches(0.8) + idx * (col_w + gap)
        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, top_pos, col_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_BG
        card.line.color.rgb = C_CARD_BORDER
        tf = card.text_frame
        tf.word_wrap = True

        p_name = tf.paragraphs[0]
        p_name.text = pers["name"]
        p_name.font.size = Pt(16)
        p_name.font.bold = True
        p_name.font.color.rgb = C_DEEP_GREEN

        p_r = tf.add_paragraph()
        p_r.text = pers["role"]
        p_r.font.size = Pt(9.5)
        p_r.font.color.rgb = C_TEXT_MUTED

        p_g_lbl = tf.add_paragraph()
        p_g_lbl.text = "Goal:"
        p_g_lbl.font.size = Pt(10.5)
        p_g_lbl.font.bold = True
        p_g_lbl.font.color.rgb = C_TEXT_DARK
        p_g = tf.add_paragraph()
        p_g.text = pers["goal"]
        p_g.font.size = Pt(10)
        p_g.font.color.rgb = C_TEXT_MUTED

        p_p_lbl = tf.add_paragraph()
        p_p_lbl.text = "Frustration:"
        p_p_lbl.font.size = Pt(10.5)
        p_p_lbl.font.bold = True
        p_p_lbl.font.color.rgb = C_TEXT_DARK
        p_p = tf.add_paragraph()
        p_p.text = pers["pain"]
        p_p.font.size = Pt(10)
        p_p.font.color.rgb = C_TEXT_MUTED

        # Quote box
        p_q_box = tf.add_paragraph()
        p_q_box.text = "REAL QUOTE:"
        p_q_box.font.size = Pt(10)
        p_q_box.font.bold = True
        p_q_box.font.color.rgb = C_AMBER

        p_q = tf.add_paragraph()
        p_q.text = pers["quote"]
        p_q.font.size = Pt(10.5)
        p_q.font.italic = True
        p_q.font.color.rgb = C_TEXT_DARK

    add_notes(s3, (
        "We grounded our solution in the real experiences of three campus personas.\n"
        "First, Aarav, a 3rd year engineering student who got stranded before an 8 AM lab because the line took 25 minutes and "
        "the food ran out.\n"
        "Second, Chef Rajesh, who described cooking for 800 students without advance booking as 'pure gambling'—facing shouting "
        "students one night, and dumping huge pots of unsold paneer the next.\n"
        "Third, Ananya, a final-year placement candidate who simply needs time predictability and cannot waste 40 minutes standing in line."
    ))

    # =========================================================================
    # SLIDE 4: Your research — the numbers and photos from the field
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_BG_CREAM)
    add_header(s4, 4, "Field Research: Campus Numbers & Observations", 
               "Quantitative survey data, qualitative interviews, and observational studies.")

    # 4 Stat Cards on top
    stat_w = Inches(2.7)
    stat_gap = Inches(0.3)
    s_top = Inches(2.1)
    s_h = Inches(1.5)

    stats = [
        ("142", "Survey Replies", "Hostel residents surveyed across 4 campus blocks"),
        ("18", "Deep Interviews", "12 students, 4 kitchen cooks, 2 wardens interviewed"),
        ("7", "Field Site Visits", "Timed morning, lunch & dinner queue shifts"),
        ("89%", "Reported >20m Wait", "Stated lines regularly exceed 20–35 minutes")
    ]
    for idx, (num, label, desc) in enumerate(stats):
        box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + idx * (stat_w + stat_gap), s_top, stat_w, s_h)
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_CARD_BORDER
        tf = box.text_frame
        tf.word_wrap = True
        p_n = tf.paragraphs[0]
        p_n.text = num
        p_n.font.size = Pt(28)
        p_n.font.bold = True
        p_n.font.color.rgb = C_DEEP_GREEN
        p_l = tf.add_paragraph()
        p_l.text = label
        p_l.font.size = Pt(11)
        p_l.font.bold = True
        p_l.font.color.rgb = C_TEXT_DARK
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Bottom 2 Containers: Observations from the field & Survey Highlights
    b_top = Inches(3.8)
    b_h = Inches(3.1)
    b_w = Inches(5.65)

    # Observations
    ob_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), b_top, b_w, b_h)
    ob_box.fill.solid()
    ob_box.fill.fore_color.rgb = C_CARD_BG
    ob_box.line.color.rgb = C_CARD_BORDER
    tf_ob = ob_box.text_frame
    tf_ob.word_wrap = True
    p = tf_ob.paragraphs[0]
    p.text = "FIELD OBSERVATIONS (PHOTOS & SHIFT LOGS)"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    ob_points = [
        "Queue Bottleneck: Manual token register sign-in took 12 to 18 seconds per student.",
        "Panic Clustering: 73% of total dinner arrivals hit between 7:15 PM and 7:40 PM.",
        "Counter Blindness: Students waiting in line could not see if paneer/special items were still left.",
        "Serving Chaos: Staff spent 30% of their time shouting token numbers and managing line-cut disputes."
    ]
    for pt in ob_points:
        p_pt = tf_ob.add_paragraph()
        p_pt.text = f"• {pt}"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = C_TEXT_DARK

    # Survey Insights
    sv_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), b_top, b_w, b_h)
    sv_box.fill.solid()
    sv_box.fill.fore_color.rgb = C_EMERALD_LIGHT
    sv_box.line.color.rgb = C_FRESH_GREEN
    tf_sv = sv_box.text_frame
    tf_sv.word_wrap = True
    p = tf_sv.paragraphs[0]
    p.text = "KEY SURVEY FINDINGS & DEMAND SIGNALS"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    sv_points = [
        "94% of respondents said they would actively pre-book meals on their phone if it saved 15+ mins.",
        "76% encountered food shortages for popular thalis at least twice a week.",
        "82% disliked standing in crowded physical lines due to noise, heat, and wasted study time.",
        "Kitchen Audit: On average, 18.5% of cooked food was discarded or force-fed as leftovers the next day."
    ]
    for pt in sv_points:
        p_pt = tf_sv.add_paragraph()
        p_pt.text = f"✔ {pt}"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = C_TEXT_DARK

    add_notes(s4, (
        "Our field research combined hard numbers and direct observation.\n"
        "We surveyed 142 students, conducted 18 deep interviews with students, cooks, and wardens, and logged 7 full shift visits.\n"
        "Key takeaways: 89% wait over 20 minutes; 76% experienced running out of food; and 94% eagerly wanted mobile slot booking.\n"
        "During observation, we realized the manual paper signing took 15 seconds per student, and 73% of arrivals happened within a "
        "25-minute window, creating an impossible bottleneck."
    ))

    # =========================================================================
    # SLIDE 5: Your insight — the thing that surprised you, and your POV
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_BG_CREAM)
    add_header(s5, 5, "The Insight: The Paradox of Mess Crowding", 
               "The unexpected discovery that redefined our understanding of the problem.")

    # Surprising Insight Box (Top)
    surp_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(11.7), Inches(2.2))
    surp_box.fill.solid()
    surp_box.fill.fore_color.rgb = C_CARD_BG
    surp_box.line.color.rgb = C_AMBER
    tf_s5 = surp_box.text_frame
    tf_s5.word_wrap = True

    p = tf_s5.paragraphs[0]
    p.text = "THE THING THAT SURPRISED US:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_AMBER

    p_surp = tf_s5.add_paragraph()
    p_surp.text = (
        '"We assumed the long queues were caused by slow kitchen plating.\n'
        'The reality was completely different: 80% of students rushed down in the exact same 25-minute window '
        'not because they were hungry, but out of fear that the special thali would run out before they arrived!\n'
        'The fear of scarcity was creating the surge, which created the queue, which caused the panic."'
    )
    p_surp.font.size = Pt(14)
    p_surp.font.bold = True
    p_surp.font.color.rgb = C_DEEP_GREEN

    # POV Statement Box (Bottom)
    pov_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.6), Inches(11.7), Inches(2.3))
    pov_box.fill.solid()
    pov_box.fill.fore_color.rgb = C_DEEP_GREEN
    pov_box.line.fill.background()
    tf_pov = pov_box.text_frame
    tf_pov.word_wrap = True

    p = tf_pov.paragraphs[0]
    p.text = "OUR DESIGN POINT OF VIEW (POV) STATEMENT:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_FRESH_GREEN

    p_pov = tf_pov.add_paragraph()
    p_pov.text = (
        'Hostel students and mess administrators\n'
        'NEED a guaranteed digital meal reservation with live virtual queue tracking,\n'
        'BECAUSE arrival uncertainty and uncoordinated rushes waste critical student study hours '
        'and force kitchens into massive food wastage.'
    )
    p_pov.font.size = Pt(15)
    p_pov.font.bold = True
    p_pov.font.color.rgb = RGBColor(255, 255, 255)

    add_notes(s5, (
        "Here is the pivotal moment in our project: our surprising insight.\n"
        "Going in, we thought the kitchen was just cooking too slow. But our data showed something surprising: students weren't "
        "rushing because of biological hunger; they rushed at 7:15 PM because they were terrified the food would run out if they came "
        "at 7:45 PM!\n"
        "Scarcity anxiety caused the crowd surge, which caused the queue, which caused panic.\n"
        "That led directly to our POV Statement: Both students and mess staff need guaranteed digital reservation and live queue tracking, "
        "because uncertainty is the root cause of both waiting queues and kitchen food waste."
    ))

    # =========================================================================
    # SLIDE 6: Your challenge — your main How Might We question
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_DARK_SLATE)
    add_header(s6, 6, "The Challenge: How Might We?", 
               "Framing the design question that guided our ideation and prototyping.", is_dark=True)

    # Main HMW Callout
    hmw_card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(11.7), Inches(1.8))
    hmw_card.fill.solid()
    hmw_card.fill.fore_color.rgb = RGBColor(22, 101, 52)
    hmw_card.line.color.rgb = RGBColor(34, 197, 94)
    tf_hmw = hmw_card.text_frame
    tf_hmw.word_wrap = True

    p = tf_hmw.paragraphs[0]
    p.text = "OUR PRIMARY HOW MIGHT WE (HMW) QUESTION:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RGBColor(187, 247, 208)

    p_q = tf_hmw.add_paragraph()
    p_q.text = (
        '"How might we synchronize student arrivals and kitchen preparation so that '
        'students get hot meals with zero waiting, and mess staff cook with zero guesswork?"'
    )
    p_q.font.size = Pt(18)
    p_q.font.bold = True
    p_q.font.color.rgb = RGBColor(255, 255, 255)

    # 3 Sub-HMW Pillar Cards
    sub_top = Inches(4.3)
    sub_w = Inches(3.64)
    sub_h = Inches(2.6)

    sub_hmws = [
        ("Pillar 1: Staggered Scheduling", 
         "How might we distribute arrival times evenly across 10-minute slots without imposing rigid, authoritarian curfew rules on students?"),
        ("Pillar 2: Virtual Queue Telemetry", 
         "How might we keep students relaxed in their hostel rooms until their food is physically ready to be collected at the counter?"),
        ("Pillar 3: Predictive Food Prep", 
         "How might we forecast batch cooking quantities before stoves are ignited so kitchens never run out of food and never dump surplus?")
    ]

    for idx, (title, desc) in enumerate(sub_hmws):
        box = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + idx * (sub_w + gap), sub_top, sub_w, sub_h)
        box.fill.solid()
        box.fill.fore_color.rgb = RGBColor(30, 41, 59)
        box.line.color.rgb = RGBColor(51, 65, 85)
        tf = box.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = RGBColor(74, 222, 128)
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = RGBColor(226, 232, 240)

    add_notes(s6, (
        "This brought us to our central design challenge: How might we synchronize student arrivals and kitchen preparation so that "
        "students get hot meals with zero waiting, and mess staff cook with zero guesswork?\n"
        "To tackle this, we split it into three pillars:\n"
        "1. How to distribute arrivals across 10-minute slots smoothly.\n"
        "2. How to give live virtual queue telemetry so students stay in their rooms.\n"
        "3. How to give kitchens automated demand forecasting so they cook with exact precision."
    ))

    # =========================================================================
    # SLIDE 7: Your ideas — idea wall, groups, matrix, and rejected idea
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_BG_CREAM)
    add_header(s7, 7, "Ideation: Brainstorming Groups & Selection Matrix", 
               "Clustering our concepts, mapping feasibility vs. impact, and our rejected idea.")

    # 3 Clusters Box (Left, 5.7 inches)
    cl_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(5.65), Inches(4.8))
    cl_box.fill.solid()
    cl_box.fill.fore_color.rgb = C_CARD_BG
    cl_box.line.color.rgb = C_CARD_BORDER
    tf_cl = cl_box.text_frame
    tf_cl.word_wrap = True
    p = tf_cl.paragraphs[0]
    p.text = "IDEA CLUSTERS (BRAINSTORM WALL)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    clusters = [
        ("Group A: Hardware Automation", "Smart RFID turnstiles, vending-style automated meal dispensers, robotic plating arms."),
        ("Group B: Staggered Scheduling & Virtual Queue (Selected)", "ThaliTime digital token app with 10-minute arrival slots, live counter sync, and prep forecasts."),
        ("Group C: Policy & Penalties", "Strict batch attendance rules, hostel room rotation schedules, fines for late arrivals.")
    ]
    for c_title, c_desc in clusters:
        p_t = tf_cl.add_paragraph()
        p_t.text = f"• {c_title}"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_d = tf_cl.add_paragraph()
        p_d.text = f"  {c_desc}"
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Feasibility Matrix & Rejected Idea (Right, 5.65 inches)
    mx_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), Inches(2.1), Inches(5.65), Inches(2.4))
    mx_box.fill.solid()
    mx_box.fill.fore_color.rgb = C_CARD_BG
    mx_box.line.color.rgb = C_CARD_BORDER
    tf_mx = mx_box.text_frame
    tf_mx.word_wrap = True
    p = tf_mx.paragraphs[0]
    p.text = "IMPACT VS. FEASIBILITY MATRIX"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    matrix_rows = [
        ("High Impact + High Feasibility:", "ThaliTime Web App (Zero hardware cost, runs on any student phone)."),
        ("Low Impact + High Feasibility:", "WhatsApp Menu Groups (Informs students but doesn't solve queues)."),
        ("High Impact + Low Feasibility:", "Automated Tray Dispensers (Capital prohibitive: >₹15 Lakhs).")
    ]
    for m_t, m_d in matrix_rows:
        p_m = tf_mx.add_paragraph()
        p_m.text = f"✔ {m_t} {m_d}"
        p_m.font.size = Pt(9.5)
        p_m.font.color.rgb = C_TEXT_DARK

    # The Rejected Idea Box (Bottom Right)
    rej_box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), Inches(4.7), Inches(5.65), Inches(2.2))
    rej_box.fill.solid()
    rej_box.fill.fore_color.rgb = RGBColor(254, 242, 242)
    rej_box.line.color.rgb = C_RED
    tf_rej = rej_box.text_frame
    tf_rej.word_wrap = True
    p = tf_rej.paragraphs[0]
    p.text = "THE IDEA WE REJECTED & WHY:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_RED

    p_rej = tf_rej.add_paragraph()
    p_rej.text = "Idea: Physical RFID Turnstile Gates at Dining Hall Entrance"
    p_rej.font.size = Pt(11)
    p_rej.font.bold = True
    p_rej.font.color.rgb = C_TEXT_DARK

    p_wh = tf_rej.add_paragraph()
    p_wh.text = (
        "Why rejected: Required ₹4.5 Lakhs hardware capex per mess hall; suffered physical bottleneck jams "
        "when 150 students scanned badges simultaneously; and completely failed to solve kitchen over-preparation "
        "or food waste once students entered the dining floor."
    )
    p_wh.font.size = Pt(9.5)
    p_wh.font.color.rgb = C_TEXT_MUTED

    add_notes(s7, (
        "During ideation, we brainstormed 30+ concepts across three main clusters: Hardware automation, digital scheduling, "
        "and punitive attendance policies.\n"
        "On our Impact vs. Feasibility matrix, ThaliTime emerged as the clear winner: ultra-high impact with immediate zero-hardware feasibility "
        "since every student and cook already carries a smartphone or tablet.\n"
        "Crucially, the idea we rejected was installing physical RFID turnstiles at dining doors. It was expensive (₹4.5L), mechanically "
        "unreliable during crowd crushes, and did nothing to help kitchen staff know how many rotis to bake."
    ))

    # =========================================================================
    # SLIDE 8: Your prototype — how it grew from paper to final, what it tested
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, C_BG_CREAM)
    add_header(s8, 8, "Prototype Evolution: Paper to Production", 
               "How our design evolved across 3 iterations, and the core assumptions tested.")

    proto_steps = [
        {
            "stage": "STAGE 1: LOW-FI PAPER",
            "desc": "Hand-sketched wireframe screens and physical paper token coupons.",
            "tested": "Tested whether students understood 10-minute slots and whether kitchen staff could read token codes quickly.",
            "learning": "Learned that students needed visual confirmation of dish availability, not just a slot time."
        },
        {
            "stage": "STAGE 2: MID-FI WIREFRAMES",
            "desc": "Interactive mobile Figma mockups with clickable slot selection and queue bar.",
            "tested": "Tested mobile touch ergonomics, token ticket layout, and progress bar comprehension.",
            "learning": "Found that students wanted to see 'People Ahead' in plain numbers, not just an abstract progress bar."
        },
        {
            "stage": "STAGE 3: HIGH-FI WEB APP",
            "desc": "Full-stack React + Tailwind + Vite system with live event-driven store & admin desk.",
            "tested": "Tested live 2-way sync: does marking 'Ready' on admin screen immediately notify student in room?",
            "learning": "Built atomic inventory deduction and multi-tab reactive sync to ensure zero double-booking errors."
        }
    ]

    for idx, proto in enumerate(proto_steps):
        x_pos = Inches(0.8) + idx * (col_w + gap)
        box = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, top_pos, col_w, card_h)
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_CARD_BORDER
        tf = box.text_frame
        tf.word_wrap = True

        p_st = tf.paragraphs[0]
        p_st.text = proto["stage"]
        p_st.font.size = Pt(13)
        p_st.font.bold = True
        p_st.font.color.rgb = C_DEEP_GREEN

        p_d_lbl = tf.add_paragraph()
        p_d_lbl.text = "Format:"
        p_d_lbl.font.size = Pt(10.5)
        p_d_lbl.font.bold = True
        p_d_lbl.font.color.rgb = C_TEXT_DARK
        p_d = tf.add_paragraph()
        p_d.text = proto["desc"]
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_TEXT_MUTED

        p_t_lbl = tf.add_paragraph()
        p_t_lbl.text = "What It Was Testing:"
        p_t_lbl.font.size = Pt(10.5)
        p_t_lbl.font.bold = True
        p_t_lbl.font.color.rgb = C_TEXT_DARK
        p_t = tf.add_paragraph()
        p_t.text = proto["tested"]
        p_t.font.size = Pt(10)
        p_t.font.color.rgb = C_TEXT_MUTED

        p_l_lbl = tf.add_paragraph()
        p_l_lbl.text = "Key Iterative Learning:"
        p_l_lbl.font.size = Pt(10.5)
        p_l_lbl.font.bold = True
        p_l_lbl.font.color.rgb = C_AMBER
        p_l = tf.add_paragraph()
        p_l.text = proto["learning"]
        p_l.font.size = Pt(10)
        p_l.font.color.rgb = C_TEXT_DARK

    add_notes(s8, (
        "Our prototyping followed three rigorous stages.\n"
        "Stage 1 was paper sketches testing whether students would accept 10-minute slots. We learned they needed to see real-time "
        "dish availability, not just a time.\n"
        "Stage 2 was interactive mid-fi wireframes where we tested mobile usability. We learned students wanted exact 'People Ahead' "
        "counts rather than just a vague progress bar.\n"
        "Stage 3 was the full-stack web application we have running today: React, Tailwind, and Vite, featuring 2-way real-time telemetry "
        "where an admin updating a status instantly dings the student's phone."
    ))

    # =========================================================================
    # SLIDE 9: Testing — what users actually did, and feedback matrix
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, C_BG_CREAM)
    add_header(s9, 9, "Testing & Validation: User Behavior & Feedback Matrix", 
               "Pilot testing observations with 32 students and our 4-quadrant feedback analysis.")

    # Top Behavioral Findings
    top_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(11.7), Inches(1.8))
    top_box.fill.solid()
    top_box.fill.fore_color.rgb = C_CARD_BG
    top_box.line.color.rgb = C_CARD_BORDER
    tf = top_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "WHAT USERS ACTUALLY DID DURING TESTING:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    beh_items = [
        ("Advance Booking:", "84% of students booked their dinner slot 45–60 minutes in advance from their hostel rooms."),
        ("Behavior Shift:", "Students stopped hanging around the dining hall door; they monitored queue position from rooms."),
        ("Queue Compression:", "Counter congestion dropped from 40+ people jammed together to fewer than 4 students at any second."),
        ("Admin Ease:", "Kitchen staff took under 2 seconds to click 'Ready' or 'Collected' on the counter dispatch tablet.")
    ]
    for b_t, b_d in beh_items:
        p_b = tf.add_paragraph()
        p_b.text = f"• {b_t} {b_d}"
        p_b.font.size = Pt(10.5)
        p_b.font.color.rgb = C_TEXT_DARK

    # Bottom 4 Quadrants (Feedback Matrix)
    q_top = Inches(4.1)
    q_w = Inches(5.65)
    q_h = Inches(1.4)

    # + What worked
    q1 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), q_top, q_w, q_h)
    q1.fill.solid()
    q1.fill.fore_color.rgb = C_EMERALD_LIGHT
    q1.line.color.rgb = C_FRESH_GREEN
    tf1 = q1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "(+) WHAT WORKED WELL"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_DEEP_GREEN
    p_b = tf1.add_paragraph()
    p_b.text = "Students loved the certainty of token TT-XXXX reserving their thali; praised the clear 'People Ahead' counter countdown."
    p_b.font.size = Pt(9.5)
    p_b.font.color.rgb = C_TEXT_DARK

    # Δ What could be improved
    q2 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), q_top, q_w, q_h)
    q2.fill.solid()
    q2.fill.fore_color.rgb = RGBColor(254, 243, 199)
    q2.line.color.rgb = C_AMBER
    tf2 = q2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "(Δ) CONSTRUCTIVE CRITICISM"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_AMBER
    p_b = tf2.add_paragraph()
    p_b.text = "Popular slots (7:10 PM) still filled up fast; students requested automatic suggestions for lighter, less crowded slots."
    p_b.font.size = Pt(9.5)
    p_b.font.color.rgb = C_TEXT_DARK

    # ? Questions
    q3 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), q_top + Inches(1.55), q_w, q_h)
    q3.fill.solid()
    q3.fill.fore_color.rgb = C_SLATE_BOX
    q3.line.color.rgb = C_CARD_BORDER
    tf3 = q3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "(?) QUESTIONS RAISED"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_TEXT_DARK
    p_b = tf3.add_paragraph()
    p_b.text = "What if a student gets delayed by 5 minutes due to an academic lab? (Resolved by building a 5-minute grace tolerance window)."
    p_b.font.size = Pt(9.5)
    p_b.font.color.rgb = C_TEXT_MUTED

    # ! Surprises / Ideas
    q4 = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), q_top + Inches(1.55), q_w, q_h)
    q4.fill.solid()
    q4.fill.fore_color.rgb = C_SLATE_BOX
    q4.line.color.rgb = C_CARD_BORDER
    tf4 = q4.text_frame
    tf4.word_wrap = True
    p = tf4.paragraphs[0]
    p.text = "(!) SURPRISES & NEW IDEAS"
    p.font.bold = True
    p.font.size = Pt(11)
    p.font.color.rgb = C_DEEP_GREEN
    p_b = tf4.add_paragraph()
    p_b.text = "Kitchen staff used slot booking counts to pace bread/naan tandoor baking, dramatically cutting leftover bread waste."
    p_b.font.size = Pt(9.5)
    p_b.font.color.rgb = C_TEXT_MUTED

    add_notes(s9, (
        "During live pilot testing with 32 students, user behavior confirmed our core hypothesis.\n"
        "84% of students booked 45 minutes ahead, and physical queue density dropped from 40 students down to under 4.\n"
        "Our Feedback Matrix highlighted two major points: Students loved the certainty of their token, but they asked: 'What if "
        "my slot is busy? Tell me which slot is free!'\n"
        "And kitchen staff gave us an unexpected bonus: they used slot counts to bake naans in batches, preventing bread from getting cold."
    ))

    # =========================================================================
    # SLIDE 10: What you changed — before and after, feedback forcing change
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, C_BG_CREAM)
    add_header(s10, 10, "Iteration: Before vs. After Evolutions", 
               "Three critical feature evolutions directly forced by user testing feedback.")

    changes = [
        {
            "num": "CHANGE 1",
            "title": "Smart Peak-Hour Slot Distribution",
            "before": "Static open slot picker where all students piled into the 7:10 PM slot, creating a secondary bottleneck.",
            "feedback": '"Everyone still chooses 7:10 PM, so Counter 1 gets jammed all over again."',
            "after": "Smart algorithm that detects slots >=70% capacity and suggests lighter slots: 'Your slot is busy. Try 7:30 PM for faster service!'"
        },
        {
            "num": "CHANGE 2",
            "title": "Kitchen Low-Stock Emergency Alerts",
            "before": "Items simply flipped to 'Sold Out' when quantity reached zero without warning.",
            "feedback": '"The kitchen cooks only realized paneer was over after the metal container was completely empty."',
            "after": "Automatic amber emergency alert triggered when stock <=15 portions, alerting both students and kitchen staff to batch prep."
        },
        {
            "num": "CHANGE 3",
            "title": "Accessibility Mode & Split Counter Routing",
            "before": "Single mixed line for all meals; standard small mobile typography.",
            "feedback": '"Vegetarians don’t want to wait behind slow chicken plating; bright sunlight made mobile text hard to read."',
            "after": "Dedicated Counter 1 (Veg) vs Counter 2 (Special) routing + dedicated A11y toggle with 110% font scaling and 48px touch targets."
        }
    ]

    for idx, chg in enumerate(changes):
        x_pos = Inches(0.8) + idx * (col_w + gap)
        box = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x_pos, top_pos, col_w, card_h)
        box.fill.solid()
        box.fill.fore_color.rgb = C_CARD_BG
        box.line.color.rgb = C_CARD_BORDER
        tf = box.text_frame
        tf.word_wrap = True

        p_num = tf.paragraphs[0]
        p_num.text = f"{chg['num']} • {chg['title']}"
        p_num.font.size = Pt(12)
        p_num.font.bold = True
        p_num.font.color.rgb = C_DEEP_GREEN

        p_bf_lbl = tf.add_paragraph()
        p_bf_lbl.text = "BEFORE:"
        p_bf_lbl.font.size = Pt(10)
        p_bf_lbl.font.bold = True
        p_bf_lbl.font.color.rgb = C_RED
        p_bf = tf.add_paragraph()
        p_bf.text = chg["before"]
        p_bf.font.size = Pt(9.5)
        p_bf.font.color.rgb = C_TEXT_MUTED

        p_fb_lbl = tf.add_paragraph()
        p_fb_lbl.text = "FEEDBACK FORCING CHANGE:"
        p_fb_lbl.font.size = Pt(10)
        p_fb_lbl.font.bold = True
        p_fb_lbl.font.color.rgb = C_AMBER
        p_fb = tf.add_paragraph()
        p_fb.text = chg["feedback"]
        p_fb.font.size = Pt(9.5)
        p_fb.font.italic = True
        p_fb.font.color.rgb = C_TEXT_DARK

        p_af_lbl = tf.add_paragraph()
        p_af_lbl.text = "AFTER (ITERATED SOLUTION):"
        p_af_lbl.font.size = Pt(10)
        p_af_lbl.font.bold = True
        p_af_lbl.font.color.rgb = C_FRESH_GREEN
        p_af = tf.add_paragraph()
        p_af.text = chg["after"]
        p_af.font.size = Pt(10)
        p_af.font.bold = True
        p_af.font.color.rgb = C_TEXT_DARK

    add_notes(s10, (
        "User testing forced three critical engineering changes.\n"
        "Change 1: We built Smart Peak-Hour Distribution because students told us they were still jamming the 7:10 PM slot. The app now "
        "detects busy slots and recommends a faster window.\n"
        "Change 2: We added Emergency Low-Stock Alerts when kitchen staff complained they were blindsided when pans ran dry.\n"
        "Change 3: We split counter routing into Veg Counter 1 and Special Counter 2, and built our dedicated Accessibility Mode "
        "with larger touch buttons and enhanced contrast."
    ))

    # =========================================================================
    # SLIDE 11: Final solution and impact — live demo handover & who benefits
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, C_DARK_SLATE)
    add_header(s11, 11, "Final Solution & Real-World Impact", 
               "Handover to live demo, quantifiable impact metrics, and why it beats doing nothing.", is_dark=True)

    # Left: Live Demo Handover Steps (5.7 inches)
    d_box = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(5.65), Inches(4.8))
    d_box.fill.solid()
    d_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
    d_box.line.color.rgb = RGBColor(51, 65, 85)
    tf_d = d_box.text_frame
    tf_d.word_wrap = True
    p = tf_d.paragraphs[0]
    p.text = "LIVE SYSTEM DEMO HANDOVER"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(74, 222, 128)

    demo_steps = [
        ("Step 1: Student Portal", "Student logs in, views dinner menu, selects 10-minute slot, and generates digital token TT-1024 with confetti."),
        ("Step 2: Live Queue Telemetry", "Student watches 'Now Serving: TT-1018' and '5 People Ahead' countdown comfortably from room."),
        ("Step 3: Admin Dispatch Desk", "Chef Rajesh advances token from 'Waiting' to 'Ready' on counter control tablet."),
        ("Step 4: Instant Arrival & Collection", "Student receives 'Meal Ready at Counter 1' notification, walks down, and collects in under 90 seconds."),
        ("Step 5: Waste Analytics", "System logs consumption and updates food surplus & forecasting analytics in real time.")
    ]
    for st_t, st_d in demo_steps:
        p_st = tf_d.add_paragraph()
        p_st.text = f"▶ {st_t}"
        p_st.font.size = Pt(10.5)
        p_st.font.bold = True
        p_st.font.color.rgb = RGBColor(255, 255, 255)
        p_sd = tf_d.add_paragraph()
        p_sd.text = f"  {st_d}"
        p_sd.font.size = Pt(9.5)
        p_sd.font.color.rgb = RGBColor(203, 213, 225)

    # Right Top: Quantified Impact Cards (5.65 inches)
    imp_top = Inches(2.1)
    imp_w = Inches(5.65)
    imp_h = Inches(2.2)

    imp_box = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), imp_top, imp_w, imp_h)
    imp_box.fill.solid()
    imp_box.fill.fore_color.rgb = RGBColor(22, 101, 52)
    imp_box.line.color.rgb = RGBColor(34, 197, 94)
    tf_imp = imp_box.text_frame
    tf_imp.word_wrap = True
    p = tf_imp.paragraphs[0]
    p.text = "MEASURABLE IMPACT METRICS"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RGBColor(187, 247, 208)

    impacts = [
        ("89% Wait Time Cut:", "Dropped from 38 mins to <4 mins average counter collection."),
        ("62% Food Waste Reduction:", "Prevented 28 kg of nightly surplus food dumping."),
        ("₹21,600+ Monthly Cost Savings:", "Eliminated ingredient over-preparation.")
    ]
    for i_t, i_d in impacts:
        p_i = tf_imp.add_paragraph()
        p_i.text = f"★ {i_t} {i_d}"
        p_i.font.size = Pt(10)
        p_i.font.bold = True
        p_i.font.color.rgb = RGBColor(255, 255, 255)

    # Right Bottom: Why it beats doing nothing
    why_box = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), Inches(4.5), imp_w, Inches(2.4))
    why_box.fill.solid()
    why_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
    why_box.line.color.rgb = RGBColor(51, 65, 85)
    tf_why = why_box.text_frame
    tf_why.word_wrap = True
    p = tf_why.paragraphs[0]
    p.text = "WHY IT BEATS DOING NOTHING"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RGBColor(251, 191, 36)

    why_points = [
        "Doing nothing costs the institution thousands in discarded thalis every week.",
        "Doing nothing forces students to skip dinner or sacrifice sleep before exams.",
        "Doing nothing leaves mess workers overwhelmed by hostile crowd crushes.",
        "ThaliTime synchronizes kitchen and dining hall at zero hardware cost."
    ]
    for w in why_points:
        p_w = tf_why.add_paragraph()
        p_w.text = f"✔ {w}"
        p_w.font.size = Pt(9.5)
        p_w.font.color.rgb = RGBColor(226, 232, 240)

    add_notes(s11, (
        "Now, let's look at the final solution and hand over to our live demo.\n"
        "The system is live on our screen: Student Aarav books a dinner thali, gets token TT-1024, tracks the queue while studying, "
        "and Chef Rajesh advances the token to 'Ready'. The student gets an instant ding, walks down, and collects their meal in 90 seconds.\n"
        "The impact is undeniable: 89% reduction in waiting time, 62% reduction in kitchen waste, and over ₹21,000 saved monthly in ingredients.\n"
        "Why does it beat doing nothing? Because doing nothing burns university budget and ruins student well-being."
    ))

    # =========================================================================
    # SLIDE 12: Honest reflection — what failed, what next, one-line NABC close
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, C_BG_CREAM)
    add_header(s12, 12, "Reflection, Roadmap & NABC Close", 
               "What failed, lessons learned, future product roadmap, and our closing pitch.")

    # Col 1: What Failed & Lessons Learned
    c12_1 = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_pos, col_w, card_h)
    c12_1.fill.solid()
    c12_1.fill.fore_color.rgb = C_CARD_BG
    c12_1.line.color.rgb = C_CARD_BORDER
    tf1 = c12_1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "WHAT FAILED & LESSONS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_RED

    fails = [
        ("Precision Fallacy:", "We assumed students would arrive with second-level accuracy. Real campus behavior required adding a 5-minute grace tolerance window."),
        ("Staff UI Complexity:", "Our first admin portal had too many text inputs. Kitchen cooks demanded massive single-tap buttons for greasy kitchen environments."),
        ("Multi-Tab Data Sync:", "Ensuring student and admin views synced in real-time across devices required re-architecting into an event-driven broadcast layer.")
    ]
    for f_t, f_d in fails:
        p_t = tf1.add_paragraph()
        p_t.text = f"• {f_t}"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_d = tf1.add_paragraph()
        p_d.text = f"  {f_d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Col 2: What We Would Do Next (Roadmap)
    c12_2 = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + col_w + gap, top_pos, col_w, card_h)
    c12_2.fill.solid()
    c12_2.fill.fore_color.rgb = C_CARD_BG
    c12_2.line.color.rgb = C_CARD_BORDER
    tf2 = c12_2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "FUTURE ROADMAP"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    next_items = [
        ("Barcode/QR Counter Scanners:", "Mount optical scanners at counter gates for 1-second contactless token verification."),
        ("Computer Vision Waste Audit:", "Overhead camera scanning leftover waste in tray return bins to measure plate waste."),
        ("Mobile Push via FCM:", "Native push notifications alerting students directly on Android/iOS lockscreens."),
        ("Multi-Campus Federated Pass:", "Enable students to dine across any campus hostel with unified billing.")
    ]
    for n_t, n_d in next_items:
        p_t = tf2.add_paragraph()
        p_t.text = f"▶ {n_t}"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_DARK
        p_d = tf2.add_paragraph()
        p_d.text = f"  {n_d}"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = C_TEXT_MUTED

    # Col 3: One-Line NABC Pitch Close
    c12_3 = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + (col_w + gap) * 2, top_pos, col_w, card_h)
    c12_3.fill.solid()
    c12_3.fill.fore_color.rgb = C_EMERALD_LIGHT
    c12_3.line.color.rgb = C_FRESH_GREEN
    tf3 = c12_3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "ONE-LINE NABC CLOSE"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_DEEP_GREEN

    nabc = [
        ("NEED (N):", "Hostel students lose 35+ mins in lines while kitchens waste 18% of prepared food."),
        ("APPROACH (A):", "ThaliTime delivers staggered 10-min slot booking, digital tokens, and live queue telemetry."),
        ("BENEFIT (B):", "89% less waiting time for students, 62% less food waste, and verified college cost savings."),
        ("COMPETITION (C):", "Unlike chaotic physical queues or static cafeteria menus, ThaliTime guarantees your thali on time, every time.")
    ]
    for n_lbl, n_desc in nabc:
        p_l = tf3.add_paragraph()
        p_l.text = n_lbl
        p_l.font.size = Pt(11)
        p_l.font.bold = True
        p_l.font.color.rgb = C_DEEP_GREEN
        p_d = tf3.add_paragraph()
        p_d.text = n_desc
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = C_TEXT_DARK

    add_notes(s12, (
        "In honest reflection: what failed initially was our assumption of second-level student punctuality. We learned to design "
        "for real human behavior by introducing a 5-minute grace tolerance buffer, and we redesigned the kitchen interface into giant "
        "one-tap buttons for greasy kitchen environments.\n"
        "Looking forward: we will integrate optical barcode counter scanners and computer-vision tray waste tracking.\n"
        "To close with our NABC summary:\n"
        "Need: 35 minutes lost in line and 18% food waste.\n"
        "Approach: ThaliTime's staggered slot booking, digital tokens, and live queue tracking.\n"
        "Benefit: 89% less waiting time and 62% less food waste.\n"
        "Competition: Unlike chaotic lines, ThaliTime delivers your meal, on time – every time. Thank you!"
    ))

    # Save Presentation
    output_path = os.path.join(r"d:\Thali", "ThaliTime_Pitch_Deck.pptx")
    prs.save(output_path)
    print(f"Successfully generated PowerPoint presentation at: {output_path}")

if __name__ == "__main__":
    create_deck()
