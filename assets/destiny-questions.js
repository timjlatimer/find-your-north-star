/* Destiny Discovered — the 30-question deep dive.
   Native HB1000 rebuild of the months-long North Star excavation.
   Field types: text | list | rank | choice | multi | belief | percent
   Phases (for the racetrack): foundation, purpose, action, beliefs, legacy */
window.DD_PHASES = {
  foundation: { label: "Philosophy & Values",            color: "var(--gold)"   },
  purpose:    { label: "Purpose & Contribution",         color: "var(--cyan)"   },
  action:     { label: "Action & Impact",                color: "var(--teal)"   },
  beliefs:    { label: "Beliefs & Absolutes",            color: "var(--violet)" },
  legacy:     { label: "Success, Relationships & Legacy", color: "var(--rose)"   }
};

window.DD_QUESTIONS = [
  /* ---------- Philosophy & Values (1-8) ---------- */
  { id:"q1", n:1, phase:"foundation", type:"text", rows:3,
    label:"What is the most important ingredient in your life — beyond your loved ones and your health?",
    help:"The thing that shapes your values and guides your decisions every day." },
  { id:"q2", n:2, phase:"foundation", type:"text", rows:3,
    label:"What characteristic do you admire most in others that you would like to have yourself?" },
  { id:"q3", n:3, phase:"foundation", type:"list", count:3,
    label:"Name three things you would like to change about your own behaviour." },
  { id:"q4", n:4, phase:"foundation", type:"text", rows:3,
    label:"Which influences in your life feel out of your control?" },
  { id:"q5", n:5, phase:"foundation", type:"text", rows:3,
    label:"Which influences in your life are under your control?" },
  { id:"q6", n:6, phase:"foundation", type:"list", count:3,
    label:"Name the three most driving and controlling influences that determine the continuation of the universe." },
  { id:"q7", n:7, phase:"foundation", type:"list", count:3,
    label:"Name the three biggest limiting factors in your life." },
  { id:"q8", n:8, phase:"foundation", type:"rank", items:["Body","Mind","Spirit"],
    label:"Rate these in your order of importance.",
    help:"Put 1 beside the most important, 3 beside the least." },

  /* ---------- Purpose & Contribution (9-14) ---------- */
  { id:"q9", n:9, phase:"purpose", type:"choice", options:["Bad","Good","Excellent"],
    label:"How would you rate your opportunity to develop a meaningful contribution?" },
  { id:"q10", n:10, phase:"purpose", type:"list", count:3,
    label:"What three pieces of advice matter most for success?" },
  { id:"q11", n:11, phase:"purpose", type:"list", count:3,
    label:"Name three things your life should stand for." },
  { id:"q12", n:12, phase:"purpose", type:"list", count:3,
    label:"Name three things you are not prepared to do." },
  { id:"q13", n:13, phase:"purpose", type:"choice", options:["Outstanding","Average","Poor"],
    label:"How would others rate your future possibility?" },
  { id:"q14", n:14, phase:"purpose", type:"choice", options:["Yes — very important","No","Take it or leave it"],
    followup:"Why?",
    label:"How important is money or material wealth to you?" },

  /* ---------- Action & Impact (15-18) ---------- */
  { id:"q15", n:15, phase:"action", type:"list", count:6,
    label:"List six measurable ways you could change the world WITHOUT money." },
  { id:"q16", n:16, phase:"action", type:"list", count:6,
    label:"List six measurable ways you could change the world WITH money." },
  { id:"q17", n:17, phase:"action", type:"text", rows:3,
    label:"Do you feel an obligation to actually do the things you listed in 15 and 16? Which ones?" },
  { id:"q18", n:18, phase:"action", type:"choice", options:["Good","Fair","Bad"],
    label:"What are the success possibilities of your schemes and dreams?" },

  /* ---------- Beliefs & Absolutes (19-23) ---------- */
  { id:"q19", n:19, phase:"beliefs", type:"choice", options:["Yes","No"], followup:"Explain your reasons.",
    label:"Do you hold limitations or preferences regarding culture, race, religion, or behaviour patterns?" },
  { id:"q20", n:20, phase:"beliefs", type:"list", count:6,
    label:"Name the six absolutes that govern your thoughts and actions." },
  { id:"q21", n:21, phase:"beliefs", type:"text", rows:4,
    label:"How do you justify those absolutes?" },
  { id:"q22", n:22, phase:"beliefs", type:"belief",
    label:"If you believe in God or a Superior Being…",
    subs:[ {k:"why", l:"Why do you believe?"}, {k:"adv", l:"What are the advantages?"},
           {k:"dis", l:"What are the disadvantages?"}, {k:"evi", l:"What is your evidence of existence?"} ] },
  { id:"q23", n:23, phase:"beliefs", type:"belief",
    label:"If you do NOT believe in God or a Superior Being…",
    help:"This is the question the old version skipped. Here it is, with room to answer fully.",
    subs:[ {k:"why", l:"Why don't you believe?"}, {k:"adv", l:"What are the advantages?"},
           {k:"dis", l:"What are the disadvantages?"}, {k:"evi", l:"What is your evidence?"} ] },

  /* ---------- Success, Relationships & Legacy (24-30) ---------- */
  { id:"q24", n:24, phase:"legacy", type:"choice", options:["Excellent","Good","Fair","Bad"],
    followup:"Give three reasons — and are the people around you proving you right or wrong?",
    label:"How do you rate the times you live in for the opportunity for success?" },
  { id:"q25", n:25, phase:"legacy", type:"multi", allowOther:true,
    label:"What makes successful people successful? Choose all you believe apply.",
    options:["Inherited wealth","A gifted mind","Unusual opportunities","Special assistance",
             "Personal development","Hard work","A lucky break","Strong principles","A good plan","A good idea"] },
  { id:"q26", n:26, phase:"legacy", type:"list", count:3, withReason:true,
    label:"Name three people you would ask to assist you in life's adventure — and why.",
    help:"For each person, add the reason you would choose them." },
  { id:"q27", n:27, phase:"legacy", type:"choice", options:["None","Some","Total","Other"], followup:"Why?",
    label:"If someone lets you down in a personal relationship, what is your responsibility to keep meeting your obligations?" },
  { id:"q28", n:28, phase:"legacy", type:"choice", options:["None","Some","Total","Other"], followup:"Why?",
    label:"If the other party doesn't fulfil their agreement in business, what is your obligation?" },
  { id:"q29", n:29, phase:"legacy", type:"choice", options:["Yes","No"], followup:"Why, and how?",
    label:"Do you have an obligation to assist the truly disadvantaged?" },
  { id:"q30", n:30, phase:"legacy", type:"percent",
    label:"Break down the factors of your success as percentages that add up to 100%.",
    subs:[ {k:"personal", l:"Personal influence"}, {k:"others", l:"Influence of others"},
           {k:"economic", l:"Economic / social influences"}, {k:"uncontrollable", l:"Uncontrollable influences"} ] }
];
