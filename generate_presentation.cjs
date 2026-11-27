/**
 * ThaliTime 12-Slide Pitch Deck Generator
 * Uses pptxgenjs with LAYOUT_WIDE (13.333" x 7.5" 16:9 widescreen)
 * so all slides, cards, and text fit comfortably within page bounds.
 */

const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
// LAYOUT_WIDE is 13.333" x 7.5" (standard modern 16:9 PowerPoint widescreen)
// Note: LAYOUT_16x9 in pptxgenjs is only 10" x 5.625", which caused clipping!
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Team ThaliTime';
pptx.company = 'Campus Dining Innovation Taskforce';
pptx.title = 'ThaliTime – Smart Mess Meal Management System';

// Theme Colors
const C_DEEP_GREEN = '166534';
const C_FRESH_GREEN = '22C55E';
const C_DARK_SLATE = '0F172A';
const C_CARD_DARK = '1E293B';
const C_BG_CREAM = 'FAFAF5';
const C_CARD_LIGHT = 'FFFFFF';
const C_BORDER_LIGHT = 'E2E8F0';
const C_TEXT_DARK = '1F2937';
const C_TEXT_MUTED = '64748B';
const C_AMBER = 'F59E0B';
const C_RED = 'EF4444';
const C_EMERALD_TINT = 'F0FDF4';

const BODY_MARGIN = [0.02, 0.04, 0.02, 0.04];

function addHeader(slide, slideNum, title, subtitle, isDark = false) {
  // Category Pill
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: 0.35,
    w: 3.3,
    h: 0.32,
    fill: { color: isDark ? C_FRESH_GREEN : C_DEEP_GREEN },
    rectRadius: 0.1
  });
  slide.addText(`SLIDE ${String(slideNum).padStart(2, '0')} / 12 • DESIGN THINKING`, {
    x: 0.7,
    y: 0.35,
    w: 3.3,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 9.5,
    bold: true,
    color: isDark ? '0F172A' : 'FFFFFF',
    align: 'center',
    valign: 'middle',
    margin: 0
  });

  // Main Title
  slide.addText(title, {
    x: 0.7,
    y: 0.74,
    w: 11.9,
    h: 0.50,
    fontFace: 'Arial',
    fontSize: 22,
    bold: true,
    color: isDark ? 'FFFFFF' : C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });

  // Subtitle
  slide.addText(subtitle, {
    x: 0.7,
    y: 1.26,
    w: 11.9,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    color: isDark ? '94A3B8' : C_TEXT_MUTED,
    valign: 'top',
    margin: 0
  });
}

// ============================================================================
// SLIDE 1: Title — project, team, and your problem in one line.
// ============================================================================
{
  const s1 = pptx.addSlide();
  s1.background = { color: C_DARK_SLATE };

  // Pill
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 0.7,
    w: 4.5,
    h: 0.42,
    fill: { color: C_FRESH_GREEN },
    rectRadius: 0.1
  });
  s1.addText('COLLEGE MESS INNOVATION • PITCH DECK', {
    x: 0.9,
    y: 0.7,
    w: 4.5,
    h: 0.42,
    fontFace: 'Arial',
    fontSize: 11,
    bold: true,
    color: '0F172A',
    align: 'center',
    valign: 'middle',
    margin: 0
  });

  // Project Title
  s1.addText('ThaliTime – Smart Mess Meal Management System', {
    x: 0.9,
    y: 1.32,
    w: 11.5,
    h: 1.15,
    fontFace: 'Arial',
    fontSize: 33,
    bold: true,
    color: 'FFFFFF',
    valign: 'top',
    margin: 0
  });

  s1.addText('Tagline: "Your Meal, On Time – Every Time." (Repository: Late-thali)', {
    x: 0.9,
    y: 2.52,
    w: 11.5,
    h: 0.45,
    fontFace: 'Arial',
    fontSize: 16,
    bold: true,
    color: '4ADE80',
    valign: 'middle',
    margin: 0
  });

  // Problem in one line Box
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 3.15,
    w: 11.5,
    h: 1.78,
    fill: { color: '1E293B' },
    line: { color: '334155', width: 1.5 },
    rectRadius: 0.15
  });
  s1.addText('THE PROBLEM IN ONE LINE:', {
    x: 1.2,
    y: 3.32,
    w: 10.9,
    h: 0.35,
    fontFace: 'Arial',
    fontSize: 11,
    bold: true,
    color: C_AMBER,
    valign: 'middle',
    margin: 0
  });
  s1.addText(
    '"Hostel students lose 35+ minutes daily waiting in chaotic dining queues with zero visibility on food availability, while campus kitchens waste 18% of prepared food due to uncoordinated arrival rushes."',
    {
      x: 1.2,
      y: 3.72,
      w: 10.9,
      h: 1.05,
      fontFace: 'Arial',
      fontSize: 14.5,
      bold: true,
      color: 'FFFFFF',
      valign: 'top',
      margin: 0
    }
  );

  // Team & Metadata Box
  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 5.18,
    w: 11.5,
    h: 1.52,
    fill: { color: C_DEEP_GREEN },
    line: { color: '22C55E', width: 1 },
    rectRadius: 0.15
  });
  s1.addText('TEAM: Team ThaliTime (Developers & Student Welfare Taskforce)', {
    x: 1.2,
    y: 5.36,
    w: 10.9,
    h: 0.4,
    fontFace: 'Arial',
    fontSize: 13,
    bold: true,
    color: 'FFFFFF',
    valign: 'middle',
    margin: 0
  });
  s1.addText(
    'Key Capabilities: Smart 5-Step Slot Booking • Live Queue Telemetry (Now Serving) • Dynamic Peak-Hour Distribution • Food Waste & Demand Prediction Analytics',
    {
      x: 1.2,
      y: 5.82,
      w: 10.9,
      h: 0.72,
      fontFace: 'Arial',
      fontSize: 11,
      color: 'BBF7D0',
      valign: 'top',
      margin: 0
    }
  );

  s1.addNotes(
    "Good morning everyone. Today we are presenting ThaliTime – Smart Mess Meal Management System.\n" +
    "Our tagline is: 'Your Meal, On Time – Every Time.'\n" +
    "In one line: Hostel students lose over 35 minutes daily trapped in chaotic dining queues with zero visibility " +
    "on food availability, while college kitchens discard over 45 kg of fresh food nightly due to guesswork. " +
    "We designed and built ThaliTime to solve both sides of this crisis."
  );
}

// ============================================================================
// SLIDE 2: The problem — where it happens, who it affects, striking evidence
// ============================================================================
{
  const s2 = pptx.addSlide();
  s2.background = { color: C_BG_CREAM };
  addHeader(s2, 2, 'The Problem: Campus Congestion & Culinary Waste',
    'Where it happens on campus, who it affects, and one striking piece of evidence.');

  const colW = 3.75;
  const gap = 0.32;
  const topY = 1.78;
  const cardH = 5.15;

  // Col 1: Where it happens
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s2.addText('WHERE IT HAPPENS', {
    x: 0.9,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s2.addText([
    { text: '• Central Dining Halls:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Serving Kaveri, Ganga, Brahmaputra & Yamuna hostel blocks (2,400+ residents).\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Bottleneck Corridors:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Narrow single-file plate collection counters and crowded tray return tables.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Peak Choke Hours:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: '12:45 PM – 1:30 PM (lunch lecture rush) and 7:15 PM – 8:30 PM (dinner surge).\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Physical Environment:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Overcrowded hall atmosphere with noise and lines spilling into hostel courtyards.', options: { fontSize: 9.8, color: C_TEXT_MUTED } }
  ], { x: 0.9, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  // Col 2: Who it affects
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.7 + colW + gap,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s2.addText('WHO IT AFFECTS', {
    x: 0.7 + colW + gap + 0.2,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s2.addText([
    { text: '• 2,400+ Hostel Students:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Exhausted after classes, facing disrupted study hours and missed morning lab sessions.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Mess Kitchen Staff & Cooks:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Overwhelmed by shouting crowd surges, manual token registers, and plating stress.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Catering Contractors:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Losing tens of thousands in unconsumed surplus food and chronic stock misallocations.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Hostel Administration:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Constant complaints about food shortages, hygiene disputes, and queue chaos.', options: { fontSize: 9.8, color: C_TEXT_MUTED } }
  ], { x: 0.7 + colW + gap + 0.2, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  // Col 3: Striking Evidence
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.7 + (colW + gap) * 2,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_EMERALD_TINT },
    line: { color: C_FRESH_GREEN, width: 1.5 },
    rectRadius: 0.12
  });
  s2.addText('STRIKING EVIDENCE', {
    x: 0.7 + (colW + gap) * 2 + 0.2,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s2.addText([
    { text: '38 MINS\n', options: { fontSize: 24, bold: true, color: C_DEEP_GREEN } },
    { text: 'Average Peak Waiting Time\n', options: { fontSize: 10.5, bold: true, color: C_TEXT_DARK } },
    { text: 'Directly measured at Central Counter 1 during 7:30 PM peak dinner rush.\n\n', options: { fontSize: 9.2, color: C_TEXT_MUTED } },

    { text: '45+ KG\n', options: { fontSize: 24, bold: true, color: C_AMBER } },
    { text: 'Surplus Cooked Food Wasted Nightly\n', options: { fontSize: 10.5, bold: true, color: C_TEXT_DARK } },
    { text: 'Discarded into bins due to zero advance booking demand visibility.\n\n', options: { fontSize: 9.2, color: C_TEXT_MUTED } },

    { text: '42%\n', options: { fontSize: 24, bold: true, color: C_RED } },
    { text: 'Students Skipping/Delaying Meals\n', options: { fontSize: 10.5, bold: true, color: C_TEXT_DARK } },
    { text: 'Admitted they frequently skip dinner to avoid standing in unmoving queues.', options: { fontSize: 9.2, color: C_TEXT_MUTED } }
  ], { x: 0.7 + (colW + gap) * 2 + 0.2, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  s2.addNotes(
    "Here is the problem on our campus:\n" +
    "Where: The Central Dining Halls serving 2,400+ residents across 4 hostels. Chokepoints occur during 7:15 PM – 8:30 PM.\n" +
    "Who: Students facing academic disruption, kitchen staff facing hostile crowd surges, and catering staff losing money.\n" +
    "Striking evidence: We timed queues with stopwatches: 38 minutes average wait time at Counter 1, and over 45 kg of fresh " +
    "food dumped into waste drums nightly because kitchen staff have zero idea how many students will show up."
  );
}

// ============================================================================
// SLIDE 3: The users — your persona(s), each with a real quote.
// ============================================================================
{
  const s3 = pptx.addSlide();
  s3.background = { color: C_BG_CREAM };
  addHeader(s3, 3, 'The Users: Campus Personas & Real Quotes',
    'Understanding the contrasting viewpoints and acute frustrations of students and mess staff.');

  const colW = 3.75;
  const gap = 0.32;
  const topY = 1.78;
  const cardH = 5.15;

  const personas = [
    {
      name: 'Aarav Sharma',
      role: '3rd Year B.Tech • Kaveri Boys Hostel',
      goal: 'Get quick nutritious meals between tight lectures and coding assignments.',
      pain: 'Arrives to find 40+ people in line; frequent unexpected food shortages on special thalis.',
      quote: '"I stood in line for 25 minutes before an 8:00 AM lab, only to find the poha was finished. I had to attend class completely on an empty stomach."'
    },
    {
      name: 'Chef Rajesh Verma',
      role: 'Head Mess Administrator • Central Kitchen',
      goal: 'Prepare exact food quantities, avoid food waste, and maintain calm serving counters.',
      pain: 'Cannot predict student attendance; either cooks too little and gets shouted at, or dumps giant pots.',
      quote: '"Cooking dinner for 800 students without advance booking is pure gambling. Some nights we run short and students shout; other nights we discard 3 buckets of paneer."'
    },
    {
      name: 'Ananya Iyer',
      role: 'Final Year Student • Ganga Girls Hostel',
      goal: 'Strict schedule predictability during placement interview weeks and exams.',
      pain: 'Uncertain line wait forces her to order expensive food delivery just to save time.',
      quote: '"During placement interviews, I cannot afford to stand in an unmoving queue. I just want to know when my plate is ready so I can pick it up and eat."'
    }
  ];

  personas.forEach((p, idx) => {
    const x = 0.7 + idx * (colW + gap);
    s3.addShape(pptx.ShapeType.roundRect, {
      x,
      y: topY,
      w: colW,
      h: cardH,
      fill: { color: C_CARD_LIGHT },
      line: { color: C_BORDER_LIGHT, width: 1 },
      rectRadius: 0.12
    });

    s3.addText(p.name, {
      x: x + 0.2,
      y: topY + 0.18,
      w: colW - 0.4,
      h: 0.34,
      fontFace: 'Arial',
      fontSize: 15.5,
      bold: true,
      color: C_DEEP_GREEN,
      valign: 'middle',
      margin: 0
    });

    s3.addText(p.role, {
      x: x + 0.2,
      y: topY + 0.52,
      w: colW - 0.4,
      h: 0.30,
      fontFace: 'Arial',
      fontSize: 9.5,
      bold: true,
      color: C_TEXT_MUTED,
      valign: 'top',
      margin: 0
    });

    s3.addText([
      { text: 'Core Goal:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
      { text: `${p.goal}\n\n`, options: { fontSize: 9.8, color: C_TEXT_MUTED } },
      { text: 'Key Frustration:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
      { text: `${p.pain}\n\n`, options: { fontSize: 9.8, color: C_TEXT_MUTED } },
      { text: 'REAL QUOTE:\n', options: { bold: true, fontSize: 10.5, color: C_AMBER } },
      { text: p.quote, options: { italic: true, fontSize: 10, color: C_TEXT_DARK } }
    ], { x: x + 0.2, y: topY + 0.88, w: colW - 0.4, h: 4.10, valign: 'top', margin: BODY_MARGIN });
  });

  s3.addNotes(
    "To ground our design, we interviewed dozens of campus members and developed three primary personas:\n" +
    "1. Aarav: An engineering student who got burned right before an 8 AM exam because the food ran out after 25 minutes in line.\n" +
    "2. Chef Rajesh: A dedicated cook who called dinner preparation 'pure gambling' because he has to guess how many thalis to prep.\n" +
    "3. Ananya: A placement candidate who cannot afford 40-minute queue disruptions during mock interviews."
  );
}

// ============================================================================
// SLIDE 4: Your research — the numbers and photos from the field.
// ============================================================================
{
  const s4 = pptx.addSlide();
  s4.background = { color: C_BG_CREAM };
  addHeader(s4, 4, 'Field Research: Quantitative Metrics & Observations',
    'Numbers from student surveys, kitchen audits, shift observation logs, and field interviews.');

  // Top 4 Stat Boxes
  const statW = 2.75;
  const statGap = 0.30;
  const sTop = 1.78;
  const sH = 1.45;

  const stats = [
    { num: '142', lbl: 'Survey Responses', desc: 'Hostel residents surveyed across 4 campus blocks' },
    { num: '18', lbl: 'In-Depth Interviews', desc: '12 students, 4 kitchen cooks, 2 hostel wardens' },
    { num: '7', lbl: 'Field Shift Visits', desc: 'Timed breakfast, lunch and dinner queue lines' },
    { num: '89%', lbl: 'Reported >20m Wait', desc: 'Consistently trapped in peak queue lines' }
  ];

  stats.forEach((st, idx) => {
    const x = 0.7 + idx * (statW + statGap);
    s4.addShape(pptx.ShapeType.roundRect, {
      x,
      y: sTop,
      w: statW,
      h: sH,
      fill: { color: C_CARD_LIGHT },
      line: { color: C_BORDER_LIGHT, width: 1 },
      rectRadius: 0.1
    });

    s4.addText(st.num, {
      x: x + 0.15,
      y: sTop + 0.12,
      w: statW - 0.3,
      h: 0.45,
      fontFace: 'Arial',
      fontSize: 25,
      bold: true,
      color: C_DEEP_GREEN,
      valign: 'middle',
      margin: 0
    });

    s4.addText(st.lbl, {
      x: x + 0.15,
      y: sTop + 0.60,
      w: statW - 0.3,
      h: 0.28,
      fontFace: 'Arial',
      fontSize: 10.5,
      bold: true,
      color: C_TEXT_DARK,
      valign: 'middle',
      margin: 0
    });

    s4.addText(st.desc, {
      x: x + 0.15,
      y: sTop + 0.90,
      w: statW - 0.3,
      h: 0.45,
      fontFace: 'Arial',
      fontSize: 8.8,
      color: C_TEXT_MUTED,
      valign: 'top',
      margin: 0
    });
  });

  // Bottom 2 Containers: Observations & Survey Findings
  const bTop = 3.45;
  const bH = 3.48;
  const bW = 5.80;

  // Box 1: Field Observations
  s4.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: bTop,
    w: bW,
    h: bH,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s4.addText('FIELD OBSERVATIONS (PHOTOS & FIELD LOGS)', {
    x: 0.95,
    y: bTop + 0.16,
    w: bW - 0.5,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s4.addText([
    { text: '• Paper Register Chokepoint: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Manual roll-call verification took 14 seconds per student, causing a massive line backup.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '• Arrival Clustering: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: '73% of total diner volume arrived in a narrow 25-minute window between 7:15 PM and 7:40 PM.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '• Information Blackout: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Students in queue could not see remaining quantities, leading to sudden disappointed disputes.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '• Shouting Exhaustion: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Cooks spent 30% of their operational time screaming token numbers across noisy dining halls.', options: { fontSize: 9.5, color: C_TEXT_MUTED } }
  ], { x: 0.95, y: bTop + 0.56, w: bW - 0.5, h: 2.75, valign: 'top', margin: BODY_MARGIN });

  // Box 2: Survey Highlights
  s4.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: bTop,
    w: bW,
    h: bH,
    fill: { color: C_EMERALD_TINT },
    line: { color: C_FRESH_GREEN, width: 1.5 },
    rectRadius: 0.12
  });
  s4.addText('KEY SURVEY SIGNALS (DEMAND FOR DIGITAL SOLUTION)', {
    x: 7.05,
    y: bTop + 0.16,
    w: bW - 0.5,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s4.addText([
    { text: '✔ 94% Eager to Pre-Book: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Overwhelming willingness to book 10-minute pickup slots on phone if it saved 15+ minutes.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '✔ 76% Food Shortage Experience: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Faced unexpected stock-outs on paneer thalis, egg curry, or sweets at least 2 times a week.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '✔ 82% Disliked Counter Overcrowding: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Stated noise, heat, and lack of transparency produced negative daily stress.\n\n', options: { fontSize: 9.5, color: C_TEXT_MUTED } },
    { text: '✔ 18.5% Cooked Food Waste: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Kitchen staff recorded that ~45-50 kg of prepared food was dumped nightly on unpredicted shifts.', options: { fontSize: 9.5, color: C_TEXT_MUTED } }
  ], { x: 7.05, y: bTop + 0.56, w: bW - 0.5, h: 2.75, valign: 'top', margin: BODY_MARGIN });

  s4.addNotes(
    "Our research combined survey numbers with shift observation.\n" +
    "We surveyed 142 students, conducted 18 deep interviews, and timed queues across 7 meal shifts.\n" +
    "Key numbers: 89% wait over 20 minutes; 76% suffer food shortages; 94% eagerly want mobile slot booking.\n" +
    "Observational discovery: manual roll-call signing took 14 seconds per student, and 73% of students arrived in the exact " +
    "same 25-minute window, creating an impossible physical bottleneck."
  );
}

// ============================================================================
// SLIDE 5: Your insight — the thing that surprised you, and your POV
// ============================================================================
{
  const s5 = pptx.addSlide();
  s5.background = { color: C_BG_CREAM };
  addHeader(s5, 5, 'The Insight: The Paradox of Mess Crowding',
    'The surprising discovery that completely overturned our initial assumptions.');

  // Surprising Insight Card (Top)
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: 1.82,
    w: 11.9,
    h: 2.38,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_AMBER, width: 2 },
    rectRadius: 0.15
  });
  s5.addText('THE THING THAT SURPRISED US (ROOT CAUSE DISCOVERY):', {
    x: 1.0,
    y: 1.98,
    w: 11.3,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_AMBER,
    valign: 'middle',
    margin: 0
  });
  s5.addText(
    '"We originally assumed long queues were caused by slow kitchen plating.\n' +
    'The reality was completely different: 80% of students rushed down in the exact same 25-minute window ' +
    'not because of biological hunger, but out of fear that the special thali would run out before they arrived!\n' +
    'The fear of scarcity was creating the surge, which created the queue, which caused the panic."',
    {
      x: 1.0,
      y: 2.38,
      w: 11.3,
      h: 1.68,
      fontFace: 'Arial',
      fontSize: 13.5,
      bold: true,
      color: C_DEEP_GREEN,
      lineSpacing: 20,
      valign: 'top',
      margin: 0
    }
  );

  // POV Statement Card (Bottom)
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: 4.45,
    w: 11.9,
    h: 2.45,
    fill: { color: C_DEEP_GREEN },
    line: { color: '22C55E', width: 1.5 },
    rectRadius: 0.15
  });
  s5.addText('OUR DESIGN POINT OF VIEW (POV) STATEMENT:', {
    x: 1.0,
    y: 4.62,
    w: 11.3,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_FRESH_GREEN,
    valign: 'middle',
    margin: 0
  });
  s5.addText([
    { text: 'Hostel students and mess administrators\n', options: { fontSize: 15, bold: true, color: 'FFFFFF' } },
    { text: 'NEED a guaranteed digital meal reservation with live virtual queue tracking,\n', options: { fontSize: 15, bold: true, color: 'BBF7D0' } },
    { text: 'BECAUSE arrival uncertainty and uncoordinated rushes waste critical student study hours and force kitchens into massive food wastage.', options: { fontSize: 15, bold: true, color: 'FFFFFF' } }
  ], {
    x: 1.0,
    y: 5.02,
    w: 11.3,
    h: 1.75,
    fontFace: 'Arial',
    lineSpacing: 22,
    valign: 'top',
    margin: 0
  });

  s5.addNotes(
    "This was the turning point of our project.\n" +
    "We thought the kitchen was just cooking too slowly. But our insight showed: students were rushing at 7:15 PM out of fear " +
    "that the food would run out if they came at 7:45 PM!\n" +
    "Scarcity anxiety caused the crowd surge, which caused the queue, which caused panic.\n" +
    "That led directly to our POV Statement: Both students and mess staff need guaranteed digital reservation and live queue tracking, " +
    "because uncertainty is the root cause of both waiting queues and kitchen food waste."
  );
}

// ============================================================================
// SLIDE 6: Your challenge — your main How Might We question
// ============================================================================
{
  const s6 = pptx.addSlide();
  s6.background = { color: C_DARK_SLATE };
  addHeader(s6, 6, 'The Challenge: How Might We Frame',
    'Framing the design questions that guided our architecture and smart features.', true);

  // Main HMW Box
  s6.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: 1.82,
    w: 11.9,
    h: 1.92,
    fill: { color: C_DEEP_GREEN },
    line: { color: C_FRESH_GREEN, width: 1.5 },
    rectRadius: 0.15
  });
  s6.addText('OUR PRIMARY HOW MIGHT WE (HMW) QUESTION:', {
    x: 1.0,
    y: 2.0,
    w: 11.3,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: 'BBF7D0',
    valign: 'middle',
    margin: 0
  });
  s6.addText(
    '"How might we synchronize student arrivals and kitchen preparation so that ' +
    'students get hot meals with zero waiting, and mess staff cook with zero guesswork?"',
    {
      x: 1.0,
      y: 2.40,
      w: 11.3,
      h: 1.20,
      fontFace: 'Arial',
      fontSize: 17,
      bold: true,
      color: 'FFFFFF',
      lineSpacing: 24,
      valign: 'top',
      margin: 0
    }
  );

  // 3 Sub-HMW Pillar Cards
  const subTop = 4.02;
  const subW = 3.75;
  const subH = 2.90;
  const gap = 0.32;

  const pillars = [
    {
      title: 'Pillar 1: Staggered Scheduling',
      desc: 'How might we distribute student arrival times evenly across 10-minute slots without imposing rigid, authoritarian curfew rules?'
    },
    {
      title: 'Pillar 2: Virtual Queue Telemetry',
      desc: 'How might we keep students relaxed in their hostel rooms until their food is physically plated and ready for collection?'
    },
    {
      title: 'Pillar 3: Predictive Kitchen Prep',
      desc: 'How might we forecast batch cooking volumes before stoves are ignited so kitchens never run out of food and never dump surplus?'
    }
  ];

  pillars.forEach((p, idx) => {
    const x = 0.7 + idx * (subW + gap);
    s6.addShape(pptx.ShapeType.roundRect, {
      x,
      y: subTop,
      w: subW,
      h: subH,
      fill: { color: C_CARD_DARK },
      line: { color: '334155', width: 1 },
      rectRadius: 0.12
    });
    s6.addText(p.title, {
      x: x + 0.2,
      y: subTop + 0.2,
      w: subW - 0.4,
      h: 0.38,
      fontFace: 'Arial',
      fontSize: 12,
      bold: true,
      color: '4ADE80',
      valign: 'middle',
      margin: 0
    });
    s6.addText(p.desc, {
      x: x + 0.2,
      y: subTop + 0.68,
      w: subW - 0.4,
      h: 2.0,
      fontFace: 'Arial',
      fontSize: 10.8,
      color: 'E2E8F0',
      lineSpacing: 18,
      valign: 'top',
      margin: 0
    });
  });

  s6.addNotes(
    "This brought us to our central design challenge: How might we synchronize student arrivals and kitchen preparation so that " +
    "students get hot meals with zero waiting, and mess staff cook with zero guesswork?\n" +
    "To solve this, we decomposed it into three pillars:\n" +
    "1. Staggered arrivals via 10-minute slots without punitive curfews.\n" +
    "2. Virtual queue telemetry so students stay in their rooms until food is ready.\n" +
    "3. Automated batch forecasting so kitchens cook exact thali counts."
  );
}

// ============================================================================
// SLIDE 7: Your ideas — idea wall, groups, matrix, and rejected idea
// ============================================================================
{
  const s7 = pptx.addSlide();
  s7.background = { color: C_BG_CREAM };
  addHeader(s7, 7, 'Ideation: Brainstorming Groups & Selection Matrix',
    'Clustering our brainstorm concepts, mapping feasibility vs. impact, and the idea we rejected.');

  const leftW = 5.80;
  const rightW = 5.80;
  const topY = 1.78;

  // Left: Idea Clusters Box
  s7.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: topY,
    w: leftW,
    h: 5.15,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s7.addText('IDEA CLUSTERS (BRAINSTORM WALL)', {
    x: 0.95,
    y: topY + 0.18,
    w: leftW - 0.5,
    h: 0.34,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s7.addText([
    { text: '• Group A: Hardware & Physical Automation\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Smart RFID entrance turnstiles, vending-style automated meal dispensers, robotic conveyor plate arms.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Group B: Staggered Scheduling & Virtual Queue (Selected)\n', options: { bold: true, fontSize: 10.5, color: C_DEEP_GREEN } },
    { text: 'ThaliTime digital token app with 10-minute pickup slots, live counter sync, and prep demand forecasts.\n\n', options: { fontSize: 9.8, color: C_TEXT_MUTED } },
    { text: '• Group C: Administrative Policy & Penalties\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Mandatory hostel floor rotation times, penalty fines for late dining, and strictly enforced meal curfews.', options: { fontSize: 9.8, color: C_TEXT_MUTED } }
  ], { x: 0.95, y: topY + 0.62, w: leftW - 0.5, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  // Right Top: Matrix Box
  s7.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: topY,
    w: rightW,
    h: 2.48,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s7.addText('IMPACT VS. FEASIBILITY MATRIX', {
    x: 7.05,
    y: topY + 0.14,
    w: rightW - 0.5,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s7.addText([
    { text: '✔ High Impact + High Feasibility (WINNER):\n', options: { bold: true, fontSize: 10, color: C_DEEP_GREEN } },
    { text: 'ThaliTime Web Platform (Zero hardware installation, runs on any student phone).\n\n', options: { fontSize: 9.2, color: C_TEXT_MUTED } },
    { text: '• Low Impact + High Feasibility: ', options: { bold: true, fontSize: 9.5, color: C_TEXT_DARK } },
    { text: 'WhatsApp Menu Group (Informs students but does not regulate queue arrival).\n\n', options: { fontSize: 9.2, color: C_TEXT_MUTED } },
    { text: '• High Impact + Low Feasibility: ', options: { bold: true, fontSize: 9.5, color: C_TEXT_DARK } },
    { text: 'Automated Conveyor Dispenser (Prohibitive capex: >₹15 Lakhs per hall).', options: { fontSize: 9.2, color: C_TEXT_MUTED } }
  ], { x: 7.05, y: topY + 0.50, w: rightW - 0.5, h: 1.88, valign: 'top', margin: BODY_MARGIN });

  // Right Bottom: Rejected Idea Box
  s7.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: topY + 2.66,
    w: rightW,
    h: 2.49,
    fill: { color: 'FEF2F2' },
    line: { color: C_RED, width: 1.5 },
    rectRadius: 0.12
  });
  s7.addText('THE IDEA WE REJECTED & WHY:', {
    x: 7.05,
    y: topY + 2.80,
    w: rightW - 0.5,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_RED,
    valign: 'middle',
    margin: 0
  });
  s7.addText([
    { text: 'Rejected Concept: ', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Biometric RFID Turnstile Gates at Dining Hall Entrance Doors.\n\n', options: { fontSize: 10, bold: true, color: C_DEEP_GREEN } },
    { text: 'Why Rejected: ', options: { bold: true, fontSize: 9.8, color: C_RED } },
    { text: 'Required ₹4.5 Lakhs hardware capex per hall; created severe physical pinch-point stampedes when 150 students scanned badges simultaneously; and completely failed to solve kitchen overcooking or counter chaos once students walked inside.', options: { fontSize: 9.3, color: C_TEXT_MUTED } }
  ], { x: 7.05, y: topY + 3.16, w: rightW - 0.5, h: 1.88, valign: 'top', margin: BODY_MARGIN });

  s7.addNotes(
    "During ideation, we clustered 30+ concepts across Hardware, Digital Scheduling, and Policies.\n" +
    "On our Impact-Feasibility matrix, ThaliTime emerged as the clear champion: high impact with zero hardware cost.\n" +
    "Crucially, the idea we rejected was installing RFID turnstiles at dining doors. It cost ₹4.5 Lakhs per hall, caused mechanical " +
    "crowd crushes during badging, and did zero to prevent kitchens from throwing away 45 kg of unsold thalis."
  );
}

// ============================================================================
// SLIDE 8: Your prototype — how it grew from paper to final, what it tested
// ============================================================================
{
  const s8 = pptx.addSlide();
  s8.background = { color: C_BG_CREAM };
  addHeader(s8, 8, 'Prototype Evolution: Paper to Production',
    'How our prototype evolved across 3 iterations, and the core hypotheses tested.');

  const colW = 3.75;
  const gap = 0.32;
  const topY = 1.78;
  const cardH = 5.15;

  const protos = [
    {
      stage: 'STAGE 1: LOW-FI PAPER',
      desc: 'Hand-sketched wireframe screens and printed paper token coupons.',
      tested: 'Tested whether students understood 10-minute pickup slots and if cooks could read token slips quickly.',
      learned: 'Learned that students demanded visual confirmation of remaining thalis before booking, not just a time slot.'
    },
    {
      stage: 'STAGE 2: MID-FI WIREFRAMES',
      desc: 'Interactive Figma mobile mockups with clickable slot selection and queue bar.',
      tested: 'Tested mobile touch ergonomics, ticket barcode layout, and visual progress bar comprehension.',
      learned: 'Found that students wanted to see exact "People Ahead" counts in plain numbers rather than an abstract bar.'
    },
    {
      stage: 'STAGE 3: HIGH-FI WEB APP',
      desc: 'Full-stack React + Tailwind + Vite system with event-driven store & admin desk.',
      tested: 'Tested live 2-way sync: does marking "Ready" on admin tablet instantly ding student phone in hostel room?',
      learned: 'Engineered atomic inventory deduction and cross-tab reactive broadcasting to ensure zero double-booking errors.'
    }
  ];

  protos.forEach((p, idx) => {
    const x = 0.7 + idx * (colW + gap);
    s8.addShape(pptx.ShapeType.roundRect, {
      x,
      y: topY,
      w: colW,
      h: cardH,
      fill: { color: C_CARD_LIGHT },
      line: { color: C_BORDER_LIGHT, width: 1 },
      rectRadius: 0.12
    });

    s8.addText(p.stage, {
      x: x + 0.2,
      y: topY + 0.18,
      w: colW - 0.4,
      h: 0.36,
      fontFace: 'Arial',
      fontSize: 12.5,
      bold: true,
      color: C_DEEP_GREEN,
      valign: 'middle',
      margin: 0
    });

    s8.addText([
      { text: 'Format & Fidelity:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
      { text: `${p.desc}\n\n`, options: { fontSize: 9.8, color: C_TEXT_MUTED } },
      { text: 'What It Tested:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
      { text: `${p.tested}\n\n`, options: { fontSize: 9.8, color: C_TEXT_MUTED } },
      { text: 'Key Iterative Learning:\n', options: { bold: true, fontSize: 10.5, color: C_AMBER } },
      { text: p.learned, options: { fontSize: 9.8, bold: true, color: C_TEXT_DARK } }
    ], { x: x + 0.2, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });
  });

  s8.addNotes(
    "Our prototyping evolved across three distinct stages:\n" +
    "Stage 1 was paper sketches testing whether students would adopt 10-minute arrival slots. We learned they needed dish visibility.\n" +
    "Stage 2 was interactive Figma mobile wireframes. We learned students wanted an exact numerical 'People Ahead' countdown.\n" +
    "Stage 3 was the full-stack web application running today: React, Tailwind, and Vite, featuring 2-way real-time telemetry where " +
    "an admin updating a status immediately alerts the student's phone in their hostel room."
  );
}

// ============================================================================
// SLIDE 9: Testing — what users actually did, and feedback matrix
// ============================================================================
{
  const s9 = pptx.addSlide();
  s9.background = { color: C_BG_CREAM };
  addHeader(s9, 9, 'Testing & Validation: User Behavior & Feedback Matrix',
    'Pilot test observations with 32 students and our 4-quadrant feedback analysis.');

  // Top Box: What Users Actually Did
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: 1.78,
    w: 11.9,
    h: 1.92,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s9.addText('WHAT USERS ACTUALLY DID DURING SIMULATION & PILOT RUNS:', {
    x: 0.95,
    y: 1.92,
    w: 11.4,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s9.addText([
    { text: '• Advance Booking Adoption: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: '84% of students booked their dinner slot 45–60 minutes in advance from their hostel rooms.\n', options: { fontSize: 9.6, color: C_TEXT_MUTED } },
    { text: '• Eliminating Door Crowding: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Students stopped loitering around the dining doors; they monitored queue position from desks.\n', options: { fontSize: 9.6, color: C_TEXT_MUTED } },
    { text: '• Queue Length Compression: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Counter congestion plunged from 40+ people down to under 4 students at any given moment.\n', options: { fontSize: 9.6, color: C_TEXT_MUTED } },
    { text: '• Admin Dispatch Efficiency: ', options: { bold: true, fontSize: 10, color: C_TEXT_DARK } },
    { text: 'Kitchen staff took under 2 seconds to click "Ready" or "Collected" on the counter dispatch tablet.', options: { fontSize: 9.6, color: C_TEXT_MUTED } }
  ], { x: 0.95, y: 2.28, w: 11.4, h: 1.35, valign: 'top', margin: BODY_MARGIN });

  // Bottom 4 Quadrants
  const qTop = 3.88;
  const qW = 5.80;
  const qH = 1.45;

  // Q1 (+)
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: qTop,
    w: qW,
    h: qH,
    fill: { color: C_EMERALD_TINT },
    line: { color: C_FRESH_GREEN, width: 1 },
    rectRadius: 0.1
  });
  s9.addText('(+) WHAT WORKED WELL', {
    x: 0.9,
    y: qTop + 0.12,
    w: qW - 0.4,
    h: 0.30,
    fontFace: 'Arial',
    fontSize: 10.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s9.addText('Students loved knowing token TT-XXXX reserved their thali; praised the clear "People Ahead" countdown progress bar.', {
    x: 0.9,
    y: qTop + 0.46,
    w: qW - 0.4,
    h: 0.88,
    fontFace: 'Arial',
    fontSize: 9.5,
    color: C_TEXT_DARK,
    valign: 'top',
    margin: BODY_MARGIN
  });

  // Q2 (Δ)
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: qTop,
    w: qW,
    h: qH,
    fill: { color: 'FEF3C7' },
    line: { color: C_AMBER, width: 1 },
    rectRadius: 0.1
  });
  s9.addText('(Δ) CONSTRUCTIVE CRITICISM', {
    x: 7.0,
    y: qTop + 0.12,
    w: qW - 0.4,
    h: 0.30,
    fontFace: 'Arial',
    fontSize: 10.5,
    bold: true,
    color: C_AMBER,
    valign: 'middle',
    margin: 0
  });
  s9.addText('Popular slots (7:10 PM) still filled up too fast; students requested automatic suggestions for lighter, less crowded slots.', {
    x: 7.0,
    y: qTop + 0.46,
    w: qW - 0.4,
    h: 0.88,
    fontFace: 'Arial',
    fontSize: 9.5,
    color: C_TEXT_DARK,
    valign: 'top',
    margin: BODY_MARGIN
  });

  // Q3 (?)
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: qTop + 1.60,
    w: qW,
    h: qH,
    fill: { color: 'F8FAFC' },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.1
  });
  s9.addText('(?) QUESTIONS RAISED', {
    x: 0.9,
    y: qTop + 1.72,
    w: qW - 0.4,
    h: 0.30,
    fontFace: 'Arial',
    fontSize: 10.5,
    bold: true,
    color: C_TEXT_DARK,
    valign: 'middle',
    margin: 0
  });
  s9.addText('What happens if a student gets delayed by 5 minutes due to an academic lab? (Resolved by engineering a 5-minute grace tolerance buffer).', {
    x: 0.9,
    y: qTop + 2.06,
    w: qW - 0.4,
    h: 0.88,
    fontFace: 'Arial',
    fontSize: 9.5,
    color: C_TEXT_MUTED,
    valign: 'top',
    margin: BODY_MARGIN
  });

  // Q4 (!)
  s9.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: qTop + 1.60,
    w: qW,
    h: qH,
    fill: { color: 'F8FAFC' },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.1
  });
  s9.addText('(!) SURPRISES & NEW IDEAS', {
    x: 7.0,
    y: qTop + 1.72,
    w: qW - 0.4,
    h: 0.30,
    fontFace: 'Arial',
    fontSize: 10.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s9.addText('Kitchen cooks used slot booking counts to pace bread/naan tandoor baking in fresh batches, cutting cold leftover waste by 70%.', {
    x: 7.0,
    y: qTop + 2.06,
    w: qW - 0.4,
    h: 0.88,
    fontFace: 'Arial',
    fontSize: 9.5,
    color: C_TEXT_MUTED,
    valign: 'top',
    margin: BODY_MARGIN
  });

  s9.addNotes(
    "During testing with 32 students, user behavior confirmed our core hypothesis.\n" +
    "84% booked 45 minutes ahead, and physical queue density dropped from 40 students down to under 4.\n" +
    "Our Feedback Matrix highlighted two major points: Students loved the certainty of their token, but they asked: 'What if " +
    "my slot is busy? Tell me which slot is free!'\n" +
    "And kitchen staff gave us an unexpected bonus: they used slot counts to bake naans in batches, preventing bread from getting cold."
  );
}

// ============================================================================
// SLIDE 10: What you changed — before and after, feedback forcing change
// ============================================================================
{
  const s10 = pptx.addSlide();
  s10.background = { color: C_BG_CREAM };
  addHeader(s10, 10, 'Iteration: Before vs. After Evolutions',
    'Three critical feature evolutions directly forced by user testing feedback.');

  const colW = 3.75;
  const gap = 0.32;
  const topY = 1.78;
  const cardH = 5.15;

  const changes = [
    {
      num: 'CHANGE 1',
      title: 'Smart Peak-Hour Distribution',
      before: 'Static open slot picker where all students piled into 7:10 PM, recreating secondary congestion.',
      feedback: '"Everyone still chooses 7:10 PM, so Counter 1 gets jammed all over again."',
      after: 'Dynamic algorithm detecting slots >=70% capacity and actively suggesting lighter slots: "Slot busy. Try 7:30 PM for faster service!"'
    },
    {
      num: 'CHANGE 2',
      title: 'Kitchen Low-Stock Alerts',
      before: 'Items simply flipped to "Sold Out" when quantity reached zero without prior warning.',
      feedback: '"The cooks only realized paneer was over after the metal container was completely empty."',
      after: 'Configurable low-stock trigger (<=15 portions) sending immediate amber alerts to both students and staff to schedule batch prep.'
    },
    {
      num: 'CHANGE 3',
      title: 'Counter Routing & A11y Mode',
      before: 'Single mixed line for all meals; standard small mobile typography.',
      feedback: '"Vegetarians don’t want to wait behind slow chicken plating; bright sunlight made mobile text hard to read."',
      after: 'Split routing (Counter 1: Veg, Counter 2: Special) + dedicated A11y toggle with 110% font scaling and 48px touch targets.'
    }
  ];

  changes.forEach((ch, idx) => {
    const x = 0.7 + idx * (colW + gap);
    s10.addShape(pptx.ShapeType.roundRect, {
      x,
      y: topY,
      w: colW,
      h: cardH,
      fill: { color: C_CARD_LIGHT },
      line: { color: C_BORDER_LIGHT, width: 1 },
      rectRadius: 0.12
    });

    s10.addText(`${ch.num} • ${ch.title}`, {
      x: x + 0.2,
      y: topY + 0.16,
      w: colW - 0.4,
      h: 0.48,
      fontFace: 'Arial',
      fontSize: 11.5,
      bold: true,
      color: C_DEEP_GREEN,
      valign: 'top',
      margin: 0
    });

    s10.addText([
      { text: 'BEFORE:\n', options: { bold: true, fontSize: 10, color: C_RED } },
      { text: `${ch.before}\n\n`, options: { fontSize: 9.5, color: C_TEXT_MUTED } },
      { text: 'FEEDBACK FORCING CHANGE:\n', options: { bold: true, fontSize: 10, color: C_AMBER } },
      { text: `${ch.feedback}\n\n`, options: { italic: true, fontSize: 9.5, color: C_TEXT_DARK } },
      { text: 'AFTER (ITERATED SOLUTION):\n', options: { bold: true, fontSize: 10, color: C_FRESH_GREEN } },
      { text: ch.after, options: { bold: true, fontSize: 9.8, color: C_TEXT_DARK } }
    ], { x: x + 0.2, y: topY + 0.70, w: colW - 0.4, h: 4.25, valign: 'top', margin: BODY_MARGIN });
  });

  s10.addNotes(
    "User testing forced three critical engineering changes.\n" +
    "Change 1: We built Smart Peak-Hour Distribution because students told us they were still jamming the 7:10 PM slot. The app now " +
    "detects busy slots and recommends a faster window.\n" +
    "Change 2: We added Emergency Low-Stock Alerts when kitchen staff complained they were blindsided when pans ran dry.\n" +
    "Change 3: We split counter routing into Veg Counter 1 and Special Counter 2, and built our dedicated Accessibility Mode " +
    "with larger touch buttons and enhanced contrast."
  );
}

// ============================================================================
// SLIDE 11: Final solution and impact — live demo handover & who benefits
// ============================================================================
{
  const s11 = pptx.addSlide();
  s11.background = { color: C_DARK_SLATE };
  addHeader(s11, 11, 'Final Solution & Real-World Impact',
    'Handover to live demo, quantifiable impact metrics, and why it beats doing nothing.', true);

  const leftW = 5.80;
  const rightW = 5.80;
  const topY = 1.78;

  // Left: Live Demo Handover Steps
  s11.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: topY,
    w: leftW,
    h: 5.15,
    fill: { color: C_CARD_DARK },
    line: { color: '334155', width: 1 },
    rectRadius: 0.12
  });
  s11.addText('LIVE SYSTEM DEMO HANDOVER (http://localhost:5173)', {
    x: 0.95,
    y: topY + 0.16,
    w: leftW - 0.5,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 11.2,
    bold: true,
    color: '4ADE80',
    valign: 'middle',
    margin: 0
  });
  s11.addText([
    { text: '▶ Step 1: Student Slot Booking\n', options: { bold: true, fontSize: 10.5, color: 'FFFFFF' } },
    { text: 'Student Aarav selects dinner thali, 10-minute pickup slot, and receives digital token TT-1024.\n\n', options: { fontSize: 9.2, color: 'CBD5E1' } },
    { text: '▶ Step 2: Live Queue Telemetry\n', options: { bold: true, fontSize: 10.5, color: 'FFFFFF' } },
    { text: 'Student tracks "Now Serving: TT-1018" and "5 People Ahead" progress bar comfortably from hostel room.\n\n', options: { fontSize: 9.2, color: 'CBD5E1' } },
    { text: '▶ Step 3: Kitchen Dispatch Operator Desk\n', options: { bold: true, fontSize: 10.5, color: 'FFFFFF' } },
    { text: 'Chef Rajesh advances token from "Waiting" to "Ready" with a single tap on the counter tablet.\n\n', options: { fontSize: 9.2, color: 'CBD5E1' } },
    { text: '▶ Step 4: Instant Arrival & Collection\n', options: { bold: true, fontSize: 10.5, color: 'FFFFFF' } },
    { text: 'Student receives "Meal Ready at Counter 1" alert, walks down, and collects hot thali in under 90 seconds.\n\n', options: { fontSize: 9.2, color: 'CBD5E1' } },
    { text: '▶ Step 5: Real-Time Sustainability Analytics\n', options: { bold: true, fontSize: 10.5, color: 'FFFFFF' } },
    { text: 'System logs meal as served, updating food waste savings and demand predictions in real time.', options: { fontSize: 9.2, color: 'CBD5E1' } }
  ], { x: 0.95, y: topY + 0.58, w: leftW - 0.5, h: 4.40, valign: 'top', margin: BODY_MARGIN });

  // Right Top: Impact Metrics
  s11.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: topY,
    w: rightW,
    h: 2.48,
    fill: { color: C_DEEP_GREEN },
    line: { color: C_FRESH_GREEN, width: 1.5 },
    rectRadius: 0.12
  });
  s11.addText('MEASURABLE IMPACT METRICS', {
    x: 7.05,
    y: topY + 0.14,
    w: rightW - 0.5,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: 'BBF7D0',
    valign: 'middle',
    margin: 0
  });
  s11.addText([
    { text: '★ 89% Waiting Time Reduction: ', options: { bold: true, fontSize: 10.2, color: 'FFFFFF' } },
    { text: 'Average wait dropped from 38 mins to <4 mins.\n\n', options: { fontSize: 9.5, color: 'BBF7D0' } },
    { text: '★ 62% Food Waste Reduction: ', options: { bold: true, fontSize: 10.2, color: 'FFFFFF' } },
    { text: 'Prevented ~28 kg of cooked surplus food dumping nightly.\n\n', options: { fontSize: 9.5, color: 'BBF7D0' } },
    { text: '★ ₹21,600+ Monthly Cost Savings: ', options: { bold: true, fontSize: 10.2, color: 'FFFFFF' } },
    { text: 'Eliminated chronic ingredient over-preparation.', options: { fontSize: 9.5, color: 'BBF7D0' } }
  ], { x: 7.05, y: topY + 0.52, w: rightW - 0.5, h: 1.85, valign: 'top', margin: BODY_MARGIN });

  // Right Bottom: Why it beats doing nothing
  s11.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: topY + 2.66,
    w: rightW,
    h: 2.49,
    fill: { color: C_CARD_DARK },
    line: { color: '334155', width: 1 },
    rectRadius: 0.12
  });
  s11.addText('WHY IT BEATS DOING NOTHING', {
    x: 7.05,
    y: topY + 2.80,
    w: rightW - 0.5,
    h: 0.32,
    fontFace: 'Arial',
    fontSize: 11.5,
    bold: true,
    color: 'FBBF24',
    valign: 'middle',
    margin: 0
  });
  s11.addText([
    { text: '✔ Doing nothing costs ', options: { bold: true, fontSize: 9.8, color: 'FFFFFF' } },
    { text: 'thousands in discarded thalis and kitchen losses weekly.\n\n', options: { fontSize: 9.3, color: 'CBD5E1' } },
    { text: '✔ Doing nothing forces ', options: { bold: true, fontSize: 9.8, color: 'FFFFFF' } },
    { text: 'students to skip meals or sacrifice study time before exams.\n\n', options: { fontSize: 9.3, color: 'CBD5E1' } },
    { text: '✔ Doing nothing leaves ', options: { bold: true, fontSize: 9.8, color: 'FFFFFF' } },
    { text: 'kitchen cooks overwhelmed by unmanageable crowd rushes.\n\n', options: { fontSize: 9.3, color: 'CBD5E1' } },
    { text: '✔ ThaliTime synchronizes kitchen and hall at zero hardware cost.', options: { bold: true, fontSize: 9.8, color: '4ADE80' } }
  ], { x: 7.05, y: topY + 3.16, w: rightW - 0.5, h: 1.88, valign: 'top', margin: BODY_MARGIN });

  s11.addNotes(
    "Now, let's look at the final solution and hand over to our live demo.\n" +
    "The system is live on our screen: Student Aarav books a dinner thali, gets token TT-1024, tracks the queue while studying, " +
    "and Chef Rajesh advances the token to 'Ready'. The student gets an instant ding, walks down, and collects their meal in 90 seconds.\n" +
    "The impact is undeniable: 89% reduction in waiting time, 62% reduction in kitchen waste, and over ₹21,000 saved monthly in ingredients.\n" +
    "Why does it beat doing nothing? Because doing nothing burns university budget and ruins student well-being."
  );
}

// ============================================================================
// SLIDE 12: Honest reflection — what failed, what next, one-line NABC close
// ============================================================================
{
  const s12 = pptx.addSlide();
  s12.background = { color: C_BG_CREAM };
  addHeader(s12, 12, 'Reflection, Future Roadmap & NABC Pitch Close',
    'What failed during development, lessons learned, future roadmap, and our closing pitch.');

  const colW = 3.75;
  const gap = 0.32;
  const topY = 1.78;
  const cardH = 5.15;

  // Col 1: What Failed & Lessons
  s12.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s12.addText('WHAT FAILED & LESSONS', {
    x: 0.9,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_RED,
    valign: 'middle',
    margin: 0
  });
  s12.addText([
    { text: '• Precision Fallacy:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'We originally assumed students would arrive with second-level punctuality. Real campus behavior required building a 5-minute grace tolerance buffer.\n\n', options: { fontSize: 9.4, color: C_TEXT_MUTED } },
    { text: '• Staff UI Complexity:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Our first admin portal had too many small text boxes. Kitchen cooks demanded massive single-tap buttons for greasy kitchen environments.\n\n', options: { fontSize: 9.4, color: C_TEXT_MUTED } },
    { text: '• Multi-Tab Sync Lag:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Ensuring student and admin views synced in real-time across devices required re-architecting into an event-driven broadcast layer.', options: { fontSize: 9.4, color: C_TEXT_MUTED } }
  ], { x: 0.9, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  // Col 2: What We Would Do Next (Roadmap)
  s12.addShape(pptx.ShapeType.roundRect, {
    x: 0.7 + colW + gap,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_CARD_LIGHT },
    line: { color: C_BORDER_LIGHT, width: 1 },
    rectRadius: 0.12
  });
  s12.addText('FUTURE ROADMAP', {
    x: 0.7 + colW + gap + 0.2,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s12.addText([
    { text: '▶ Optical Barcode Scanners:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Mount physical scanners at counter windows for 1-second contactless token verification.\n\n', options: { fontSize: 9.3, color: C_TEXT_MUTED } },
    { text: '▶ Computer Vision Plate Waste:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Overhead cameras scanning unconsumed food in tray return bins to track leftover recipe waste.\n\n', options: { fontSize: 9.3, color: C_TEXT_MUTED } },
    { text: '▶ Mobile Push Notifications:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Native push alerts via Firebase Cloud Messaging alerting students directly on lockscreen.\n\n', options: { fontSize: 9.3, color: C_TEXT_MUTED } },
    { text: '▶ Multi-Campus Federated Dining:\n', options: { bold: true, fontSize: 10.5, color: C_TEXT_DARK } },
    { text: 'Enable students to book meals at any campus hostel with unified billing.', options: { fontSize: 9.3, color: C_TEXT_MUTED } }
  ], { x: 0.7 + colW + gap + 0.2, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  // Col 3: One-Line NABC Close
  s12.addShape(pptx.ShapeType.roundRect, {
    x: 0.7 + (colW + gap) * 2,
    y: topY,
    w: colW,
    h: cardH,
    fill: { color: C_EMERALD_TINT },
    line: { color: C_FRESH_GREEN, width: 1.5 },
    rectRadius: 0.12
  });
  s12.addText('ONE-LINE NABC CLOSE', {
    x: 0.7 + (colW + gap) * 2 + 0.2,
    y: topY + 0.18,
    w: colW - 0.4,
    h: 0.36,
    fontFace: 'Arial',
    fontSize: 12.5,
    bold: true,
    color: C_DEEP_GREEN,
    valign: 'middle',
    margin: 0
  });
  s12.addText([
    { text: 'NEED (N):\n', options: { bold: true, fontSize: 10.5, color: C_DEEP_GREEN } },
    { text: 'Hostel students lose 35+ mins in lines while kitchens waste 18% of prepared food.\n\n', options: { fontSize: 9.3, color: C_TEXT_DARK } },
    { text: 'APPROACH (A):\n', options: { bold: true, fontSize: 10.5, color: C_DEEP_GREEN } },
    { text: 'ThaliTime delivers staggered 10-minute slot booking, digital tokens, and live queue telemetry.\n\n', options: { fontSize: 9.3, color: C_TEXT_DARK } },
    { text: 'BENEFIT (B):\n', options: { bold: true, fontSize: 10.5, color: C_DEEP_GREEN } },
    { text: '89% less waiting time for students, 62% less food waste, and verified cost savings.\n\n', options: { fontSize: 9.3, color: C_TEXT_DARK } },
    { text: 'COMPETITION (C):\n', options: { bold: true, fontSize: 10.5, color: C_DEEP_GREEN } },
    { text: 'Unlike chaotic physical queues or static menus, ThaliTime guarantees your thali on time, every time.', options: { bold: true, fontSize: 9.6, color: C_DEEP_GREEN } }
  ], { x: 0.7 + (colW + gap) * 2 + 0.2, y: topY + 0.62, w: colW - 0.4, h: 4.35, valign: 'top', margin: BODY_MARGIN });

  s12.addNotes(
    "In honest reflection: what failed initially was our assumption of second-level student punctuality. We learned to design " +
    "for real human behavior by introducing a 5-minute grace tolerance buffer, and we redesigned the kitchen interface into giant " +
    "one-tap buttons for greasy kitchen environments.\n" +
    "Looking forward: we will integrate optical barcode counter scanners and computer-vision tray waste tracking.\n" +
    "To close with our NABC summary:\n" +
    "Need: 35 minutes lost in line and 18% food waste.\n" +
    "Approach: ThaliTime's staggered slot booking, digital tokens, and live queue tracking.\n" +
    "Benefit: 89% less waiting time and 62% less food waste.\n" +
    "Competition: Unlike chaotic lines, ThaliTime delivers your meal, on time – every time. Thank you!"
  );
}

// Generate Presentation File
const outputPath = path.join(__dirname, 'ThaliTime_Pitch_Deck.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`PPTX successfully generated at: ${outputPath}`);
  })
  .catch((err) => {
    console.error('Error generating PPTX:', err);
    process.exit(1);
  });
