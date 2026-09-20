const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const movements = [
  {id:'bench',name:'Barbell Bench Press',muscle:'Chest',equipment:'Barbell',pattern:'Horizontal push',weight:80,reps:8,increment:2.5},
  {id:'incline',name:'Incline Dumbbell Press',muscle:'Chest',equipment:'Dumbbells',pattern:'Horizontal push',weight:30,reps:10,increment:2},
  {id:'lateral',name:'Cable Lateral Raise',muscle:'Shoulders',equipment:'Cable',pattern:'Abduction',weight:7.5,reps:15,increment:2.5},
  {id:'pushdown',name:'Rope Triceps Pushdown',muscle:'Triceps',equipment:'Cable',pattern:'Elbow extension',weight:30,reps:12,increment:2.5},
  {id:'row',name:'Chest-Supported Row',muscle:'Back',equipment:'Machine',pattern:'Horizontal pull',weight:55,reps:10,increment:5},
  {id:'squat',name:'Back Squat',muscle:'Legs',equipment:'Barbell',pattern:'Squat',weight:105,reps:6,increment:2.5},
  {id:'latpulldown',name:'Lat Pulldown',muscle:'Back',equipment:'Cable',pattern:'Vertical pull',weight:60,reps:10,increment:5},
  {id:'deadlift',name:'Conventional Deadlift',muscle:'Back',equipment:'Barbell',pattern:'Hinge',weight:125,reps:5,increment:2.5},
  {id:'ohp',name:'Overhead Press',muscle:'Shoulders',equipment:'Barbell',pattern:'Vertical push',weight:47.5,reps:8,increment:2.5},
  {id:'frontRaise',name:'Dumbbell Front Raise',muscle:'Shoulders',equipment:'Dumbbells',pattern:'Shoulder flexion',weight:10,reps:12,increment:2},
  {id:'curl',name:'EZ-Bar Curl',muscle:'Biceps',equipment:'EZ-Bar',pattern:'Elbow flexion',weight:30,reps:10,increment:2.5},
  {id:'hammerCurl',name:'Hammer Curl',muscle:'Biceps',equipment:'Dumbbells',pattern:'Elbow flexion',weight:14,reps:10,increment:2},
  {id:'skullcrusher',name:'EZ-Bar Skull Crusher',muscle:'Triceps',equipment:'EZ-Bar',pattern:'Elbow extension',weight:27.5,reps:10,increment:2.5},
  {id:'legpress',name:'Leg Press',muscle:'Legs',equipment:'Machine',pattern:'Squat',weight:180,reps:10,increment:10},
  {id:'rdl',name:'Romanian Deadlift',muscle:'Legs',equipment:'Barbell',pattern:'Hinge',weight:90,reps:8,increment:2.5},
  {id:'legcurl',name:'Seated Leg Curl',muscle:'Legs',equipment:'Machine',pattern:'Knee flexion',weight:50,reps:12,increment:5},
  {id:'calfraise',name:'Standing Calf Raise',muscle:'Legs',equipment:'Machine',pattern:'Plantar flexion',weight:80,reps:12,increment:5},
  {id:'plank',name:'Plank',muscle:'Core',equipment:'Bodyweight',pattern:'Anti-extension',weight:0,reps:45,increment:5},
  {id:'crunch',name:'Cable Crunch',muscle:'Core',equipment:'Cable',pattern:'Spinal flexion',weight:40,reps:12,increment:5},
  {id:'pallof',name:'Pallof Press',muscle:'Core',equipment:'Cable',pattern:'Anti-rotation',weight:15,reps:12,increment:2.5},
  {id:'pullup',name:'Pull-Up',muscle:'Back',equipment:'Bodyweight',pattern:'Vertical pull',weight:0,reps:8,increment:1},
  {id:'dip',name:'Parallel Bar Dip',muscle:'Chest',equipment:'Bodyweight',pattern:'Vertical push',weight:0,reps:10,increment:1},
  {id:'hipthrust',name:'Barbell Hip Thrust',muscle:'Legs',equipment:'Barbell',pattern:'Hip extension',weight:110,reps:8,increment:2.5}
];
const workoutSeed = {id:'upperA',name:'Upper A',exercises:[
  {movement:'bench',warmups:1,sets:3},{movement:'row',warmups:1,sets:3},{movement:'ohp',warmups:0,sets:3},{movement:'curl',warmups:0,sets:3},{movement:'pushdown',warmups:0,sets:3}
]};
const splitTemplates = [
  {name:'Push / Pull / Legs',cadence:'3–6 days a week',description:'Movements grouped by direction. The classic way to train each muscle twice a week.',workouts:[
    {name:'Push',exercises:[['bench',3,8],['ohp',3,8],['incline',3,10],['lateral',3,15],['pushdown',3,12]]},
    {name:'Pull',exercises:[['deadlift',3,5],['row',3,10],['latpulldown',3,10],['curl',3,10],['hammerCurl',3,10]]},
    {name:'Legs',exercises:[['squat',3,6],['rdl',3,8],['legpress',3,10],['legcurl',3,12],['calfraise',3,12]]}
  ]},
  {name:'Upper / Lower',cadence:'4 days a week',description:'Two workouts alternated. Simple to schedule and easy to recover from.',workouts:[
    {name:'Upper',exercises:[['bench',3,8],['row',3,10],['ohp',3,8],['latpulldown',3,10],['curl',2,12],['pushdown',2,12]]},
    {name:'Lower',exercises:[['squat',3,6],['rdl',3,8],['legpress',3,10],['legcurl',3,12],['calfraise',3,12]]}
  ]},
  {name:'Full body 3×',cadence:'3 days a week',description:'Every session hits the whole body. Best when time in the gym is limited.',workouts:[
    {name:'Full Body A',exercises:[['squat',3,6],['bench',3,8],['row',3,10],['plank',3,45]]},
    {name:'Full Body B',exercises:[['deadlift',3,5],['ohp',3,8],['latpulldown',3,10],['pallof',3,12]]},
    {name:'Full Body C',exercises:[['legpress',3,10],['incline',3,10],['row',3,10],['crunch',3,12]]}
  ]},
  {name:'5-day split',cadence:'5 days a week',description:'One focused session for each major training area across five days.',workouts:[
    {name:'Chest Day',exercises:[['bench',4,8],['incline',3,10],['dip',3,10]]},
    {name:'Back Day',exercises:[['deadlift',3,5],['row',4,10],['latpulldown',3,10]]},
    {name:'Leg Day',exercises:[['squat',4,6],['legpress',3,10],['legcurl',3,12]]},
    {name:'Shoulder Day',exercises:[['ohp',4,8],['lateral',3,15],['frontRaise',3,12]]},
    {name:'Arm Day',exercises:[['curl',3,10],['hammerCurl',3,10],['skullcrusher',3,10],['pushdown',3,12]]}
  ]},
  {name:'Bro Split',cadence:'5 days a week',description:'One major muscle group per session, with simple focused workouts.',workouts:[
    {name:'Chest',exercises:[['bench',4,8],['incline',3,10],['dip',3,10]]},
    {name:'Back',exercises:[['deadlift',3,5],['row',4,10],['latpulldown',3,10]]},
    {name:'Shoulders',exercises:[['ohp',4,8],['lateral',3,15],['frontRaise',3,12]]},
    {name:'Arms',exercises:[['curl',3,10],['hammerCurl',3,10],['skullcrusher',3,10],['pushdown',3,12]]},
    {name:'Legs',exercises:[['squat',4,6],['rdl',3,8],['legpress',3,10],['calfraise',3,12]]}
  ]},
  {name:'Arnold Split',cadence:'6 days a week',description:'Chest and back, shoulders and arms, then legs, repeated twice weekly.',workouts:[
    {name:'Chest & Back',exercises:[['bench',4,8],['row',4,10],['incline',3,10],['latpulldown',3,10]]},
    {name:'Shoulders & Arms',exercises:[['ohp',4,8],['lateral',3,15],['curl',3,10],['pushdown',3,12]]},
    {name:'Legs',exercises:[['squat',4,6],['rdl',3,8],['legpress',3,10],['legcurl',3,12]]}
  ]},
  {name:'PHUL',cadence:'4 days a week',description:'Power and hypertrophy sessions split across upper and lower body.',workouts:[
    {name:'Upper Power',exercises:[['bench',4,5],['row',4,6],['ohp',3,6],['curl',3,8]]},
    {name:'Lower Power',exercises:[['squat',4,5],['rdl',4,6],['legpress',3,8],['calfraise',4,10]]},
    {name:'Upper Hypertrophy',exercises:[['incline',4,10],['latpulldown',4,10],['lateral',4,15],['pushdown',3,12]]},
    {name:'Lower Hypertrophy',exercises:[['legpress',4,12],['legcurl',4,12],['rdl',3,10],['calfraise',4,15]]}
  ]},
  {name:'Full Body 2×',cadence:'2 days a week',description:'Two efficient full-body sessions for a simple, flexible weekly plan.',workouts:[
    {name:'Full Body A',exercises:[['squat',3,6],['bench',3,8],['row',3,10],['lateral',2,15]]},
    {name:'Full Body B',exercises:[['rdl',3,8],['ohp',3,8],['latpulldown',3,10],['curl',2,12]]}
  ]}
];
const splitRatings = {
  'Push / Pull / Legs':{Volume:'High',Time:'Medium',Recovery:'Medium'},
  'Upper / Lower':{Volume:'Medium',Time:'Medium',Recovery:'High'},
  'Full body 3×':{Volume:'Medium',Time:'Low',Recovery:'High'},
  '5-day split':{Volume:'High',Time:'High',Recovery:'Medium'},
  'Bro Split':{Volume:'Medium',Time:'High',Recovery:'Low'},
  'Arnold Split':{Volume:'High',Time:'High',Recovery:'Medium'},
  PHUL:{Volume:'High',Time:'Medium',Recovery:'Medium'},
  'Full Body 2×':{Volume:'Medium',Time:'Low',Recovery:'High'}
};
function splitRatingDots(level){const count={Low:1,Medium:2,High:3}[level]||1;return `<span class="rating-dots" aria-label="${level}">${[1,2,3].map(i=>`<i class="${i<=count?'filled':''}"></i>`).join('')}</span>`}
const sessionExercise=(movement,weight,reps,count=3,warmups=0)=>({movement,sets:[...Array.from({length:warmups},(_,i)=>({id:`${movement}-w${i}`,warmup:true,weight:Math.max(0,weight/2),reps:10,outcome:'calibration'})),...Array.from({length:count},(_,i)=>({id:`${movement}-s${i}`,warmup:false,weight,reps,outcome:'hit'}))]});
let savedProfile={};
try{savedProfile=JSON.parse(localStorage.getItem('sevro-profile'))||{}}catch{}
const state = {
  view:'home', tab:'home', liveTab:'active', liveIndex:0, elapsed:0, rest:0, restTotal:90,
  theme:localStorage.getItem('sevro-theme')||'system',
  accent:localStorage.getItem('sevro-accent')||'#0a84ff',
  units:localStorage.getItem('sevro-units')||'kg',
  restTimers:localStorage.getItem('sevro-rest-timers')!=='off',
  workouts:[{id:'lowerA',name:'Lower A',exercises:[{movement:'squat',warmups:2,sets:4},{movement:'rdl',warmups:1,sets:3},{movement:'legcurl',warmups:0,sets:3},{movement:'calfraise',warmups:0,sets:3}]},workoutSeed,{id:'upperB',name:'Upper B',exercises:[{movement:'latpulldown',warmups:1,sets:3},{movement:'ohp',warmups:1,sets:3},{movement:'hammerCurl',warmups:0,sets:3},{movement:'skullcrusher',warmups:0,sets:3}]}],
  sessions:[
    {id:'s1',name:'Upper A',date:'Monday, 14 Sep',duration:'54:18',sets:12,volume:'7,820 kg',exercises:[sessionExercise('bench',80,8,3,1),sessionExercise('row',55,10),sessionExercise('ohp',47.5,8),sessionExercise('curl',30,10)]},
    {id:'s2',name:'Lower A',date:'Saturday, 12 Sep',duration:'49:42',sets:11,volume:'9,430 kg',exercises:[sessionExercise('squat',105,6,3,2),sessionExercise('rdl',90,8),sessionExercise('legcurl',50,12),sessionExercise('calfraise',80,12,2)]},
    {id:'s3',name:'Upper A',date:'Thursday, 10 Sep',duration:'52:09',sets:12,volume:'7,610 kg',exercises:[sessionExercise('bench',77.5,8,3,1),sessionExercise('row',55,10),sessionExercise('ohp',45,8),sessionExercise('pushdown',30,12)]},
    {id:'s4',name:'Push Strength',date:'Tuesday, 8 Sep',duration:'50:31',sets:12,volume:'6,980 kg',exercises:[sessionExercise('bench',77.5,8,3,1),sessionExercise('incline',30,10),sessionExercise('lateral',7.5,15),sessionExercise('pushdown',30,12)]},
    {id:'s5',name:'Pull Strength',date:'Sunday, 6 Sep',duration:'55:06',sets:13,volume:'8,120 kg',exercises:[sessionExercise('deadlift',125,5,3,2),sessionExercise('row',55,10,4),sessionExercise('latpulldown',60,10),sessionExercise('curl',30,10,3)]},
    {id:'s6',name:'Upper A',date:'Friday, 4 Sep',duration:'51:27',sets:12,volume:'7,450 kg',exercises:[sessionExercise('bench',75,8,3,1),sessionExercise('row',52.5,10),sessionExercise('ohp',45,8),sessionExercise('curl',27.5,10)]},
    {id:'s7',name:'Legs & Core',date:'Wednesday, 2 Sep',duration:'57:14',sets:13,volume:'10,240 kg',exercises:[sessionExercise('squat',102.5,6,4,2),sessionExercise('legpress',180,10),sessionExercise('legcurl',50,12),sessionExercise('plank',0,45,3)]}
  ],
  goals:[{kind:'Workouts per week',current:3,target:4},{kind:'Chest volume',current:9,target:12}],
  profile:{name:'Joe',weight:87,height:182,sex:'Not specified',...savedProfile},
  live:[], toast:null, timer:null, restTimer:null, editMode:false,
  pickerSelection:new Set(), pickerFilter:'All', pickerQuery:'', sheetBack:null, sheetMode:null, modalReturnFocus:null, overlayKeydown:null, statusTimer:null,
  activeSplit:null, splitDraft:null, splitAccordionIndex:null, historyOpen:null, liveOverviewEditing:false, liveDragIndex:null, builderDragIndex:null, bestsOpen:false, bestsEditing:false,
  trackedBests:new Set(['bench','squat','deadlift','row','ohp','legpress']), volumeZone:'moderate', volumeGrouping:'major', volumeEditing:false, volumeLocks:new Set(), volumeLongPressGroup:null,
  volumeTargets:{Chest:12,Back:14,Shoulders:10,Arms:8,Legs:14}, transition:'none'
};
if(state.accent.toLowerCase()==='#000000'){
  state.accent='#0a84ff';
  localStorage.setItem('sevro-accent',state.accent);
}
try{const saved=JSON.parse(localStorage.getItem('sevro-workouts'));if(Array.isArray(saved)&&saved.length)state.workouts=saved}catch{}
try{state.activeSplit=JSON.parse(localStorage.getItem('sevro-split'))||null}catch{}
const textSizeParam = new URLSearchParams(location.search).get('text');
if(['large','accessibility'].includes(textSizeParam)) document.documentElement.dataset.textSize=textSizeParam;
const mv = id => movements.find(x=>x.id===id);
const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionDelay = ms => prefersReducedMotion() ? 0 : ms;
function haptic(kind='selection'){
  const patterns={selection:8,setLogged:12,restSkipped:[8,28,8],workoutCompleted:[12,38,18]};
  try{navigator.vibrate?.(patterns[kind]??patterns.selection)}catch{}
}
function animateAccordionClose(content,after){
  if(!content||prefersReducedMotion()){after();return}
  let finished=false;
  const finish=()=>{
    if(finished)return;
    finished=true;
    content.removeEventListener('animationend',finish);
    after();
  };
  content.classList.add('accordion-closing');
  content.addEventListener('animationend',finish,{once:true});
  window.setTimeout(finish,220);
}
const displayWeight = kg => {const n=state.units==='lb'?kg*2.2046226218:kg;return Number(n.toFixed(1)).toLocaleString()};
const weightText = kg => `${displayWeight(kg)} ${state.units}`;
const inputWeight = value => state.units==='lb'?value/2.2046226218:value;
const volumeText = value => {const kg=typeof value==='number'?value:parseFloat(String(value).replace(/,/g,''))||0;const n=state.units==='lb'?kg*2.2046226218:kg;return `${Math.round(n).toLocaleString()} ${state.units}`};
const strengthCompoundIds=['bench','squat','deadlift','ohp','row'];
const strengthBestByLift = sessions => {const best={};sessions.forEach(session=>(session.exercises||[]).forEach(exercise=>{if(!strengthCompoundIds.includes(exercise.movement))return;(exercise.sets||[]).forEach(set=>{if(set.warmup||set.outcome==='skipped'||!(set.weight>0)||!(set.reps>0))return;const e1rm=set.weight*(1+set.reps/30);best[exercise.movement]=Math.max(best[exercise.movement]||0,e1rm)})}));return best};
function strengthIndexData(){let baseline=null;try{baseline=JSON.parse(localStorage.getItem('sevro-strength-baseline'))||null}catch{}if(!baseline&&state.sessions.length>=2){baseline=strengthBestByLift(state.sessions.slice(-2));if(Object.keys(baseline).length)localStorage.setItem('sevro-strength-baseline',JSON.stringify(baseline))}const current=strengthBestByLift(state.sessions),lifts=Object.keys(baseline||{}).filter(id=>current[id]);if(!lifts.length)return {ready:false,index:100,change:0,lifts:0};const index=lifts.reduce((sum,id)=>sum+current[id]/baseline[id],0)/lifts.length*100;return {ready:true,index,change:index-100,lifts:lifts.length};}
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => ({
  home:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" data-sf-symbol="house"><path d="m3 10.5 9-7 9 7M6.5 9.5V20h11V9.5M10 20v-6h4v6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  workouts:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" data-sf-symbol="dumbbell"><path d="M3 9.5h3v5H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm4-3h3v11H7v-11Zm3 5h4v1H10v-1Zm4-5h3v11h-3v-11Zm4 3h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3v-5Z" fill="currentColor"/></svg>',
  insights:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" data-sf-symbol="chart.line.uptrend.xyaxis"><path d="M4 19V5M4 19h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m6 15 4-4 3 2 5-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h3v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  settings:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" data-sf-symbol="gear"><path fill="currentColor" fill-rule="evenodd" d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98L14.5 2.42C14.47 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42L9.12 5.07c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"/></svg>',
  profile:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 20a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  active:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2Z" fill="currentColor"/></svg>',
  overview:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  progress:'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
}[name]||'•');
function applyTheme(){
  const dark=state.theme==='dark'||(state.theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme=dark?'dark':'light';
  document.documentElement.style.colorScheme=dark?'dark':'light';
  document.documentElement.style.setProperty('--accent',state.accent);
  document.documentElement.style.setProperty('--accent-ink',accentInk(state.accent));
  document.documentElement.style.setProperty('--accent-text',accentText(state.accent,dark));
}
function accentRgb(hex){const value=hex.replace('#','');if(!/^[0-9a-f]{6}$/i.test(value))return [10,132,255];return [0,2,4].map(i=>parseInt(value.slice(i,i+2),16))}
function relativeLuminance(rgb){const linear=rgb.map(v=>{const n=v/255;return n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4)});return .2126*linear[0]+.7152*linear[1]+.0722*linear[2]}
function contrastRatio(a,b){const light=Math.max(relativeLuminance(a),relativeLuminance(b)),dark=Math.min(relativeLuminance(a),relativeLuminance(b));return (light+.05)/(dark+.05)}
function accentText(hex,dark){const background=dark?[28,28,30]:[247,248,252],target=dark?[255,255,255]:[0,0,0];let color=accentRgb(hex);for(let i=0;i<32&&contrastRatio(color,background)<4.5;i++)color=color.map((v,index)=>Math.round(v*.82+target[index]*.18));return `#${color.map(v=>v.toString(16).padStart(2,'0')).join('')}`}
function accentInk(hex){
  const [r,g,b]=accentRgb(hex);
  return (r*299+g*587+b*114)/1000>170?'#111216':'#ffffff';
}

function shell(content, nav=true){
  return `<div class="app-frame transition-${state.transition||'none'}">${content}${nav===true?mainNav():nav||''}</div>`;
}
function mainNav(){
  return `<nav class="bottom-nav" aria-label="Main navigation" role="tablist">${['home','workouts','insights','settings'].map(t=>`<button class="nav-item ${state.tab===t?'active':''}" data-nav="${t}" role="tab" aria-selected="${state.tab===t}" ${state.tab===t?'aria-current="page"':''}><i>${icon(t)}</i><span>${t[0].toUpperCase()+t.slice(1)}</span></button>`).join('')}</nav>`;
}
function pageHead(title, subtitle='', back=''){
  return `<header class="page-head ${back?'':'centerless'}">${back?`<button class="back-link" data-back="${back}">Back</button>`:''}<div class="${back?'center-title':''}">${subtitle?`<p class="eyebrow">${esc(subtitle)}</p>`:''}<h1>${esc(title)}</h1></div>${back?'<span></span>':''}</header>`;
}
function profileCard(){const p=state.profile;return `<section class="profile-card settings-profile"><div class="profile-copy"><h1>${esc(p.name)}</h1><p>${weightText(p.weight)} · ${p.height} cm<br>${esc(p.sex)}</p></div><div class="profile-emoji" aria-hidden="true">🏋️</div></section>`}
function home(){
  const strength=strengthIndexData();
  const inWorkout=!!state.currentWorkoutId&&state.live.length>0;
  const activeExercise=inWorkout?state.live[state.liveIndex]:null;
  const activeSets=activeExercise?.sets||[];
  const activeLogged=activeSets.filter(s=>s.outcome).length;
  const workoutFocus=inWorkout?`<div class="focus-workout resume-workout"><div><span>Workout in progress</span><strong>${esc(state.currentName||'Workout')}</strong><small>${activeExercise?`${esc(activeExercise.name)} · ${activeLogged} of ${activeSets.length} sets recorded`:'Continue your session'}</small></div><button class="focus-start" data-resume-workout aria-label="Resume ${esc(state.currentName||'workout')}"><b>Resume</b><i class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 19 19 5m-8 0h8v8"/></svg></i></button></div>`:`<div class="focus-workout"><div><span>Today's workout</span><strong>Upper A</strong><small>5 exercises · about 60 min</small></div><button class="focus-start" data-start="upperA" aria-label="Start Upper A"><b>Start</b><i class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 19 19 5m-8 0h8v8"/></svg></i></button></div>`;
  return shell(`<main class="screen home-screen">
    <div class="brand-header"><div><h1>Lift w/</h1><p>Bad Squirrel</p></div></div>
    <section class="training-focus" aria-label="Training overview">${workoutFocus}<div class="home-section-head"><h2>Your week</h2></div><div class="home-editorial-cards"><button class="home-editorial-card volume" data-nav="insights" data-scroll-insights="volume"><span class="editorial-copy"><small>VOLUME</small><strong>Your training load looks balanced</strong><span>31 working sets this week, spread across upper and lower body.</span></span><span class="volume-ring"><b>31</b><small>sets</small></span></button><button class="home-editorial-card goals" data-nav="insights"><span class="editorial-copy"><small>STRENGTH</small><strong>Your strength is increasing</strong><span>${strength.ready?`Your strength index is up ${strength.change.toFixed(1)}% since your starting baseline.`:'Log two weeks to establish your starting baseline.'}</span></span><span class="goal-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></button></div></section>
  </main>`);
}
function prTypes(sessionIndex,movement,set){const prior=state.sessions.slice(sessionIndex+1).flatMap(s=>(s.exercises||[]).filter(e=>e.movement===movement).flatMap(e=>(e.sets||[]).filter(x=>!x.warmup)));if(!prior.length)return ['Weight PR','Volume PR'];const weight=Math.max(...prior.map(x=>x.weight||0)),estimate=Math.max(...prior.map(x=>(x.weight||0)*(1+(x.reps||0)/30))),volume=Math.max(...prior.map(x=>(x.weight||0)*(x.reps||0))),currentWeight=set.weight||0,currentEstimate=currentWeight*(1+(set.reps||0)/30),currentVolume=currentWeight*(set.reps||0);return [currentWeight>weight?'Weight PR':'',currentVolume>volume?'Volume PR':''].filter(Boolean)}
function historyDetails(s,index){const exercises=s.exercises||[];return `<div class="history-details" data-history-details="${index}"><div class="history-detail-meta"><span>${exercises.length} exercises</span><span>${esc(s.duration)}</span><span>${volumeText(s.volumeKg??s.volume)}</span></div>${exercises.map((e,ei)=>{const m=mv(e.movement)||{name:e.movement,muscle:''},sets=(e.sets||[]).filter(x=>!x.warmup);return `<section class="history-exercise"><div class="history-exercise-head"><strong>${esc(m.name)}</strong><span>${esc(m.muscle)}</span></div><div class="history-sets">${sets.map((set,si)=>{const labels=(set.pr===true||(index===0&&ei===0&&si===0))?prTypes(index,e.movement,set):[];return `<div class="history-set ${labels.length?'history-set-pr':''}"><span>Set ${si+1}</span><strong>${weightText(set.weight)} × ${set.reps}</strong>${labels.length?`<small>${labels.join(' · ')}</small>`:''}</div>`}).join('')}</div></section>`}).join('')}</div>`}
function workouts(){
  return shell(`<main class="screen"><header class="ios-page-head"><button class="ios-link" data-toggle-edit>${state.editMode?'Done':'Edit'}</button><h1>Workouts</h1><button class="ios-link plus" data-open="builder" aria-label="Create workout">＋</button></header>
    <section class="workout-card-stack">${state.workouts.map(w=>{const muscles=[...new Set(w.exercises.map(e=>muscleCategory(mv(e.movement))))].join(' · '),mins=w.id==='lowerA'?55:w.id==='upperA'?60:50;return `<article class="card workout-select-card">${state.editMode?`<button class="remove-circle" data-delete-workout="${w.id}" aria-label="Remove ${esc(w.name)}">−</button>`:''}<button class="row-tap" data-workout="${w.id}"><span class="grow"><p class="row-title">${esc(w.name)}</p><p class="row-meta">${esc(muscles)} · est ${mins} min</p></span></button><button class="play-button" data-start="${w.id}" aria-label="Start ${esc(w.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5 19.5 12 7 19.5Z"/></svg></button></article>`}).join('')}</section>
    ${state.activeSplit?`<section class="card active-split-card"><div><p class="eyebrow">ACTIVE SPLIT</p><h2>${esc(state.activeSplit.name)}</h2><p>${splitAssignmentCount(state.activeSplit)} workouts · ${state.activeSplit.mode==='weekday'?'Days of the week':'Numbered rotation'}</p></div><button class="ghost" data-open="create-split">Edit</button></section>`:''}
    <button class="split-button" data-open="create-split"><span>＋</span>${state.activeSplit?'Create a new split':'Create a split'}</button>
    <button class="standard-split-link" data-open="splits">Browse standard splits</button>
    <div class="section-head"><h2>Workout history</h2></div>
    <section class="card list history-list">${state.sessions.slice(0,4).map((s,i)=>`<div class="history-entry"><button class="list-row" data-history="${i}" aria-expanded="${state.historyOpen===i}"><span class="grow"><p class="row-title">${esc(s.name)} ${i===0?'<small class="pr-badge">♕ 3 PR</small>':''}</p><p class="row-meta">${esc(s.date)} · ${s.duration} · ${s.exercises?.length||4} exercises<br>${volumeText(s.volumeKg??s.volume)}</p></span><span class="chev">${state.historyOpen===i?'⌃':'›'}</span></button>${state.historyOpen===i?historyDetails(s,i):''}</div>`).join('')}</section>
  </main>`);
}
function insights(){
  const inWorkout=!!state.currentWorkoutId&&state.live.length>0;
  if(inWorkout){
    const ex=state.live[state.liveIndex];
    return shell(`<main class="screen"><header class="ios-page-head centered"><span></span><h1>Insights</h1><span></span></header>
      ${progressContent(ex,true)}
    </main>`,true);
  }
  const volumeGroups=[['Chest',12],['Lats',10],['Upper back',10],['Front delts',6],['Side delts',8],['Rear delts',6],['Biceps',8],['Triceps',8],['Quads',10],['Hamstrings',8],['Glutes',10],['Calves',8],['Abs/core',6],['Forearms',6,true],['Adductors',6,true]];
  const volumeSections=[['Push',['Chest','Front delts','Side delts','Triceps']],['Pull',['Lats','Upper back','Rear delts','Biceps']],['Lower body',['Quads','Hamstrings','Glutes','Calves']],['Core',['Abs/core']],['Optional',['Forearms','Adductors']]];
  const zoneOffset={low:-4,moderate:0,high:4}[state.volumeZone];
  const zoneLabel={low:'Low',moderate:'Moderate',high:'High'}[state.volumeZone];
  const volumeActual={Chest:9,Lats:8,'Upper back':7,'Front delts':5,'Side delts':6,'Rear delts':4,Biceps:5,Triceps:6,Quads:8,Hamstrings:6,Glutes:7,Calves:5,'Abs/core':3,Forearms:3,Adductors:2};
  const volumeByName=Object.fromEntries(volumeGroups.map(([name,target,optional])=>[name,{target,optional}]));
  const volumeRows=state.volumeGrouping==='major'?volumeSections.map(([group,names])=>[group,names.reduce((sum,name)=>sum+(state.volumeTargets[name]??volumeByName[name].target),0),names.reduce((sum,name)=>sum+(volumeActual[name]??0),0)]):volumeSections.flatMap(([group,names])=>[[group,null,null],...names.map(name=>[name,state.volumeTargets[name]??volumeByName[name].target,volumeActual[name]??0,volumeByName[name].optional])]);
  const volumeChart=volumeRows.map(([name,targetValue,actual,optional])=>{if(targetValue===null)return `<div class="volume-chart-group">${name}</div>`;const target=Math.max(2,targetValue+(state.volumeLocks.has(name)?0:zoneOffset));const pct=Math.min(100,Math.round(actual/target*100));const controller=state.volumeLongPressGroup===name?`<div class="volume-inline-controller"><button data-volume-adjust="${name}:-1" aria-label="Decrease ${name} target">−</button><b>${target} sets</b><button data-volume-adjust="${name}:1" aria-label="Increase ${name} target">+</button><button class="volume-lock ${state.volumeLocks.has(name)?'locked':''}" data-volume-lock="${name}">${state.volumeLocks.has(name)?'Locked':'Lock'}</button><button class="volume-inline-save" data-volume-inline-save>Save</button></div>`:'';const longPressAttr=state.volumeGrouping==='all'?` data-volume-longpress="${name}"`:'';return `<div class="volume-chart-row"${longPressAttr}><div class="volume-chart-label"><strong>${name}${optional?' · optional':''}</strong><span>${actual} / ${target} sets</span></div><div class="volume-chart-track"><i style="width:${pct}%"></i></div>${controller}</div>`}).join('');
  const volumeZoneControl=`<div class="volume-zone" role="group" aria-label="Volume target zone">${['low','moderate','high'].map(zone=>`<button class="${state.volumeZone===zone?'selected':''}" data-volume-zone="${zone}" aria-pressed="${state.volumeZone===zone}">${zone[0].toUpperCase()+zone.slice(1)}</button>`).join('')}</div>`;
  const volumeSettings=state.volumeEditing?`<p class="row-meta volume-help">${zoneLabel} weekly working-set targets. Long-press a chart row to edit and lock an individual target.</p>${volumeGroups.map(([name,defaultTarget,optional])=>{const base=state.volumeTargets[name]??defaultTarget;const target=Math.max(2,base+(state.volumeLocks.has(name)?0:zoneOffset));return `<div class="volume-target-row"><div><strong>${name}${optional?' · optional':''}</strong><span>${target-2}–${target+2} sets / week</span></div><div class="volume-stepper"><button data-volume-adjust="${name}:-1" aria-label="Decrease ${name} target">−</button><b>${target}</b><button data-volume-adjust="${name}:1" aria-label="Increase ${name} target">+</button><button class="volume-lock ${state.volumeLocks.has(name)?'locked':''}" data-volume-lock="${name}" aria-label="${state.volumeLocks.has(name)?'Unlock':'Lock'} ${name} target">${state.volumeLocks.has(name)?'Locked':'Lock'}</button></div></div>`}).join('')}`:'';
  const frequencyGoal=state.goals.find(g=>g.kind==='Workouts per week')||{current:3,target:4};
  const bestOptions=state.bestsEditing?movements.slice(0,12):movements.filter(m=>state.trackedBests.has(m.id));
  const strength=strengthIndexData(),strengthIndex=strength.ready?strength.index.toFixed(1):'—',strengthChange=strength.ready?`${strength.change>=0?'+':''}${strength.change.toFixed(1)}% since start`:'Baseline pending',strengthDescription=strength.ready?`Based on ${strength.lifts} compound lift${strength.lifts===1?'':'s'} from your first two weeks.`:'Log two weeks of working sets to establish your starting baseline.';
  return shell(`<main class="screen"><header class="ios-page-head centered"><span></span><h1>Insights</h1><span></span></header>
    <section class="insight-hero"><div class="insight-score"><strong>${strengthIndex}</strong><span>Strength index</span></div><div class="insight-copy"><strong>${strengthChange}</strong><span>${strengthDescription}</span></div></section>
    <section class="history-summary"><div class="active"><strong>7</strong><span>Workouts</span></div><div><strong>${frequencyGoal.current}/${frequencyGoal.target}</strong><span>This week</span></div></section>
    <section class="card history-chart"><div class="chart-head"><div><h2>Strength Index</h2><p>Baseline 100</p></div><div class="insight-change">${strength.ready?`↗ ${strength.change.toFixed(1)}%`:strengthChange}</div></div><div class="insight-line-chart"><svg viewBox="0 0 320 130" role="img" aria-label="Strength index trend from baseline to now"><defs><linearGradient id="insightArea" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#5bbaff" stop-opacity=".28"/><stop offset="1" stop-color="#5bbaff" stop-opacity="0"/></linearGradient></defs><path class="insight-area" d="M6 112 C45 106 52 92 86 94 S132 77 162 80 S211 55 240 59 S278 36 314 24 L314 126 L6 126 Z"/><path class="insight-line" d="M6 112 C45 106 52 92 86 94 S132 77 162 80 S211 55 240 59 S278 36 314 24"/><circle cx="314" cy="24" r="5"/></svg></div><div class="insight-axis"><span>Baseline</span><span>Now · ${strengthIndex}</span></div></section>
    <div class="section-head"><h2>Volume</h2><button class="volume-help-button" data-volume-help aria-label="How volume works">?</button></div><section id="insights-volume" class="card goals-card volume-targets"><div class="volume-group-toggle" role="group" aria-label="Volume grouping"><button class="${state.volumeGrouping==='major'?'selected':''}" data-volume-group="major" aria-pressed="${state.volumeGrouping==='major'}">Major groups</button><button class="${state.volumeGrouping==='all'?'selected':''}" data-volume-group="all" aria-pressed="${state.volumeGrouping==='all'}">All muscles</button></div>${volumeZoneControl}${state.volumeEditing?volumeSettings:`<div class="volume-chart" aria-label="Weekly volume against targets">${volumeChart}</div>`}</section>
    <section class="card list single-row personal-bests-accordion"><button class="list-row" data-toggle-bests aria-expanded="${state.bestsOpen}"><span class="glyph">♕</span><span class="grow"><p class="row-title">Personal bests</p><p class="row-meta">${state.bestsEditing?'Select up to 6 exercises':'Hold to edit tracked exercises'}</p></span><span class="count">${state.trackedBests.size}/6</span><span class="chev">${state.bestsOpen?'⌃':'›'}</span></button>${state.bestsOpen?`<div class="history-details personal-bests-details">${bestOptions.map(m=>`<button class="personal-best-row ${state.trackedBests.has(m.id)?'tracked':''}" data-track-best="${m.id}" aria-pressed="${state.trackedBests.has(m.id)}"><strong>${m.name}</strong><span>Best ${displayWeight(m.weight)} × ${m.reps} · e1RM ${weightText(Math.round(m.weight*(1+m.reps/30)))}</span><b>${state.bestsEditing?(state.trackedBests.has(m.id)?'Selected':'Select'):'Tracked'}</b></button>`).join('')}</div>`:''}</section>
  </main>`,true);
}
function profile(){
  return shell(`<main class="screen"><header class="ios-page-head centered"><span></span><h1>Profile</h1><span></span></header>
    ${profileCard()}
    <section class="card list single-row"><button class="list-row" data-open="bests"><span class="glyph">♕</span><span class="grow"><p class="row-title">Personal bests</p><p class="row-meta">Your best set for every exercise</p></span><span class="count">15</span><span class="chev">›</span></button></section>
    <div class="section-head"><h2>Goals</h2></div><section class="card goals-card"><div class="goal-row"><div><strong>Workouts per week</strong><span>2 / 4</span></div><div class="goal-track"><i style="width:50%"></i></div></div><div class="goal-row"><div><strong>Barbell Bench Press</strong><span>${weightText(82.5)} / ${weightText(90)} × 5</span></div><div class="goal-track"><i style="width:92%"></i></div></div><div class="goal-row"><div><strong>Back volume</strong><span>3 sets / 14</span></div><div class="goal-track"><i style="width:21%"></i></div></div><button class="list-row" data-open="goals"><span class="glyph">◎</span><span class="grow"><p class="row-title">All goals</p><p class="row-meta">3 active</p></span><span class="chev">›</span></button></section>
    <div class="section-head"><h2>Workouts per week</h2></div><section class="card weekly-card"><strong>2</strong><span>Target 4 · last 8 weeks</span></section>
  </main>`,false);
}
function workoutDetail(w){
  return shell(`<main class="screen">${pageHead(w.name,`${w.exercises.length} exercises`,'workouts')}
    <section class="workout-exercise-stack">${w.exercises.map((e,i)=>{const m=mv(e.movement);return `<article class="card workout-exercise-card"><span class="glyph">${i+1}</span><span class="grow"><p class="row-title">${m.name}</p><p class="row-meta">${e.warmups?`${e.warmups} warm-up · `:''}${e.sets} × ${m.reps} at ${weightText(e.weight??m.weight)}</p></span></article>`}).join('')}</section>
    <button class="primary" style="margin-top:18px" data-start="${w.id}">Start workout</button><button class="secondary" style="width:100%;margin-top:9px" data-edit="${w.id}">Edit workout</button>
  </main>`,false);
}
function makeLive(w){
  return w.exercises.map((e,ei)=>{const m=mv(e.movement),targetWeight=e.weight??m.weight,targetReps=e.reps??m.reps,defaultRest=e.rest??90,sets=[];for(let i=0;i<e.warmups;i++){const si=sets.length;sets.push({id:`${ei}-w${i}`,warmup:true,targetWeight:Math.round(targetWeight*.5*2)/2,targetReps:10,weight:Math.round(targetWeight*.5*2)/2,reps:10,restDuration:e.setRests?.[si]??defaultRest,outcome:null})}for(let i=0;i<e.sets;i++){const si=sets.length;sets.push({id:`${ei}-s${i}`,warmup:false,targetWeight,targetReps,weight:targetWeight,reps:targetReps,restDuration:e.setRests?.[si]??defaultRest,outcome:null})}return {...m,warmups:e.warmups,restDuration:defaultRest,sets}});
}
function startWorkout(id){
  const w=state.workouts.find(x=>x.id===id)||state.workouts[0]; state.live=makeLive(w);state.liveIndex=0;state.liveTab='active';state.elapsed=0;state.rest=0;state.restTotal=state.live[0]?.restDuration||90;state.currentName=w.name;state.currentWorkoutId=w.id;state.tab='workouts';state.view='live';clearInterval(state.timer);state.timer=setInterval(()=>{state.elapsed++;const el=$('[data-elapsed]');if(el)el.textContent=fmt(state.elapsed)},1000);render();
}
function overviewExerciseDetails(ex){return `<div class="overview-exercise-details"><div class="overview-detail-meta"><span>${ex.sets.length} sets planned</span><span>${ex.restDuration}s rest</span></div>${ex.sets.map((s,i)=>`<div class="overview-set"><span>${s.warmup?'Warm-up':`Set ${i+1-ex.warmups}`}</span><strong>${weightText(s.targetWeight)} × ${s.targetReps}</strong><small>${s.outcome?`${weightText(s.weight)} × ${s.reps} · ${s.outcome}`:'Planned'}</small></div>`).join('')}</div>`}
function liveAddExerciseSheet(){
  openSheet(`${sheetHeader('Add exercise')}<p class="sheet-intro">Add an exercise to this workout. It will start with three working sets.</p><section class="card list live-add-exercise-list">${movements.map(m=>`<button class="list-row" data-live-add="${m.id}"><span class="glyph">${m.name[0]}</span><span class="grow"><p class="row-title">${esc(m.name)}</p><p class="row-meta">${esc(m.muscle)} · ${esc(m.equipment)}</p></span><span class="chev">›</span></button>`).join('')}</section>`,{mode:'live-add-exercise'});
}
function moveLiveExercise(from,to){
  if(from===to||from<0||to<0||from>=state.live.length||to>=state.live.length)return;
  const [exercise]=state.live.splice(from,1);
  state.live.splice(to,0,exercise);
  if(state.liveIndex===from)state.liveIndex=to;
  else if(from<state.liveIndex&&to>=state.liveIndex)state.liveIndex--;
  else if(from>state.liveIndex&&to<=state.liveIndex)state.liveIndex++;
  if(state.overviewOpen===from)state.overviewOpen=to;
  else if(state.overviewOpen!==null&&from<state.overviewOpen&&to>=state.overviewOpen)state.overviewOpen--;
  else if(state.overviewOpen!==null&&from>state.overviewOpen&&to<=state.overviewOpen)state.overviewOpen++;
  state.liveDragIndex=null;
  render();
}
function liveScreen(){
  const ex=state.live[state.liveIndex], all=state.live.flatMap(e=>e.sets), logged=all.filter(s=>s.outcome).length, next=ex?.sets.findIndex(s=>!s.outcome)??-1;
  let body='';
  if(state.liveTab==='active') body=`<section class="exercise-head"><div class="grow"><p class="eyebrow" style="color:var(--accent)">EXERCISE ${state.liveIndex+1} OF ${state.live.length}</p><div class="exercise-title-row"><h1>${esc(ex.name)}</h1><button class="secondary swap" data-open="swap">Swap</button></div><p class="workout-meta">${ex.muscle} · ${ex.equipment} · Standard</p></div></section>
    <section class="sets">${ex.sets.map((s,i)=>{const skipped=s.outcome==='skipped',missed=!skipped&&s.outcome&&!s.warmup&&(s.weight!==s.targetWeight||s.reps!==s.targetReps);return `<button class="set-row ${s.outcome&&!skipped?'logged':''} ${skipped?'skipped':''} ${missed?'missed':''} ${i===next?'next':''}" data-edit-set="${i}" aria-label="Edit ${s.warmup?'warm-up':`set ${i+1-ex.warmups}`}" ><span class="set-index">${skipped?'–':s.outcome?'✓':s.warmup?'W':i+1-ex.warmups}</span><span class="set-copy"><strong>${s.warmup?'Warm-up · calibration':`${weightText(s.targetWeight)} × ${s.targetReps}`}</strong><span>${skipped?'Skipped':s.outcome?`${weightText(s.weight)} × ${s.reps} · ${missed?'Not achieved':s.outcome}${s.pr?' · New record':''}`:s.warmup?`${weightText(s.weight)} × 10 default`:i===next?'Next up':'Planned'}</span></span><span class="chev"><svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5.5 4 4M5 19h4l9.8-9.8a2.8 2.8 0 0 0-4-4L5 15v4Z"/></svg></span></button>${i<ex.sets.length-1?`<div class="set-rest-divider" aria-label="${s.restDuration??ex.restDuration} seconds rest"><i></i><span>${s.restDuration??ex.restDuration}s</span><i></i></div>`:''}`}).join('')}</section>
    ${next>=0?(state.rest>0?`<div class="rest-action" data-rest-action role="group" aria-label="Adjust rest timer" style="--rest-progress:${Math.max(0,state.rest/state.restTotal*100)}%"><button class="rest-adjust" data-rest-add="-15" aria-label="Decrease rest by 15 seconds">−15s</button><button class="rest-adjust" data-rest-skip aria-label="Skip rest">Skip</button><button class="rest-adjust" data-rest-add="15" aria-label="Increase rest by 15 seconds">+15s</button></div>`:`<button class="hold-btn ${ex.sets[next].warmup?'secondary':''}" data-log="${next}"><span>${ex.sets[next].warmup?`Log warm-up ${next+1}`:`Log Set ${next+1-ex.warmups}`}</span>${!ex.sets[next].warmup?`<small>${weightText(ex.sets[next].targetWeight)} × ${ex.sets[next].targetReps}</small>`:''}</button><p class="hint">Tap to log target · hold to adjust</p>`):`<section class="card" style="margin-top:20px;padding:20px;text-align:center"><h2>Exercise complete</h2><p class="muted">${state.liveIndex<state.live.length-1?'Moving to the next exercise…':'All planned sets are recorded.'}</p></section>`}`;
  if(state.liveTab==='overview') body=`<div class="section-head"><div><p class="eyebrow">LIVE WORKOUT</p><h1>Overview</h1></div><button class="ghost" data-live-overview-edit>${state.liveOverviewEditing?'Done':'Edit'}</button></div><section class="live-overview-cards">${state.live.map((e,i)=>{const done=e.sets.filter(s=>s.outcome).length,pct=Math.round(done/e.sets.length*100),open=state.overviewOpen===i;return `<div class="overview-entry ${state.liveOverviewEditing?'overview-editing':''}" data-live-drag="${i}"><button class="overview-exercise-card ${done===e.sets.length?'complete':''} ${open?'open':''}" data-overview-exercise="${i}" aria-expanded="${open}" ${state.liveOverviewEditing?'disabled':''}><span class="overview-index">${done===e.sets.length?'✓':i+1}</span><span class="overview-copy"><strong>${e.name}</strong><span>${e.muscle} · ${done} of ${e.sets.length} recorded</span><i><b style="width:${pct}%"></b></i></span><span class="chev">${open?'⌃':'›'}</span></button>${state.liveOverviewEditing?`<div class="overview-edit-toolbar"><button class="drag-handle" data-live-drag-handle="${i}" aria-label="Drag ${esc(e.name)} to reorder"><span aria-hidden="true">⠿</span> Drag</button><div class="overview-edit-controls"><button data-live-move="${i}:-1" aria-label="Move ${esc(e.name)} up" ${i===0?'disabled':''}>↑</button><button data-live-move="${i}:1" aria-label="Move ${esc(e.name)} down" ${i===state.live.length-1?'disabled':''}>↓</button><button class="danger" data-live-remove="${i}" aria-label="Remove ${esc(e.name)}">×</button></div></div>`:''}${open&&!state.liveOverviewEditing?overviewExerciseDetails(e):''}</div>`}).join('')}</section>${state.liveOverviewEditing?'<button class="secondary live-add-button" data-live-add-open>＋ Add exercise</button>':''}`;
  if(state.liveTab==='progress') body=progressContent(ex,true);
  const progress=Math.max(2,logged/all.length*100);
  return shell(`<main class="screen live"><header class="live-header"><div class="live-grid"><span></span><div class="timer" data-elapsed>${fmt(state.elapsed)}</div><button class="ghost" data-finish>Finish</button></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div><div class="segmented live-view-switch" role="tablist" aria-label="Workout view"><button class="${state.liveTab==='active'?'active':''}" data-live-tab="active" role="tab" aria-selected="${state.liveTab==='active'}">Exercise</button><button class="${state.liveTab==='overview'?'active':''}" data-live-tab="overview" role="tab" aria-selected="${state.liveTab==='overview'}">Overview</button></div></header>${body}</main>`,true);
}
function logSet(si, values){
  const ex=state.live[state.liveIndex], s=ex.sets[si]; if(!s||s.outcome)return;
  s.weight=values?.weight??s.targetWeight;s.reps=values?.reps??s.targetReps;s.outcome=s.warmup?'calibration':values?'performed':'hit';s.pr=!s.warmup&&s.weight>80;
  haptic('setLogged');
  if(state.restTimers) startRest(s.restDuration??ex.restDuration); else {clearInterval(state.restTimer);state.rest=0;}
  const advancesToNext=ex.sets.every(x=>x.outcome)&&state.liveIndex<state.live.length-1;
  toast(s.warmup?'Warm-up recorded':`${weightText(s.weight)} × ${s.reps} recorded`);
  if(advancesToNext){
    state.transition='exercise-complete';
    render();
    setTimeout(()=>{state.liveIndex++;state.transition='exercise-next';render()},650);
    return;
  }
  render();
}
function syncRestDivider(){const ex=state.live[state.liveIndex],next=ex?.sets.findIndex(s=>!s.outcome)??-1,dividers=$$('.set-rest-divider');dividers.forEach((d,i)=>{const span=d.querySelector('span');if(!span)return;const active=state.rest>0&&i===next-1;const completed=!active&&!!ex?.sets[i]?.outcome;d.classList.toggle('active',active);d.classList.toggle('completed',completed);if(active){span.textContent=fmt(state.rest);d.setAttribute('aria-label',`${fmt(state.rest)} rest remaining`)}else if(completed){span.textContent='';d.setAttribute('aria-label','Rest complete')}else d.setAttribute('aria-label',`${span.textContent} rest`)});}
function syncRestAction(){const row=$('[data-rest-action]'),buttons=$$('[data-rest-action] .rest-adjust');if(!row)return;const pct=Math.max(0,state.restTotal?state.rest/state.restTotal*100:0);row.style.setProperty('--rest-progress',`${pct}%`);buttons.forEach((button,i)=>button.classList.toggle('on-fill',pct>(i/buttons.length)*100));}
function startRest(seconds){ state.rest=seconds;state.restTotal=seconds;clearInterval(state.restTimer);syncRestDivider();syncRestAction();state.restTimer=setInterval(()=>{state.rest=Math.max(0,state.rest-1);syncRestAction();syncRestDivider();if(!state.rest){clearInterval(state.restTimer);render()}},1000); }
function finishFlow(){finishFlowSets()}
function finishFlowSets(){
  const all=state.live.flatMap(e=>e.sets), working=all.filter(s=>!s.warmup), logged=working.filter(s=>s.outcome).length, missing=working.length-logged;
  if(!all.some(s=>s.outcome)){cancelWorkout();return;}
  openDialog(`<h2>Finish workout?</h2><p>${missing?`${missing} working sets are unrecorded. Choose what to do with them on the next screen.`:'Everything planned has been recorded.'}</p><div class="dialog-actions"><button class="primary" data-finish-save="${missing}">Save</button><button class="secondary danger" data-discard>Discard workout</button><button class="secondary" data-close>Cancel</button></div>`);
}
function missingFlow(n){ openSheet(`<h2>${n} working sets are unrecorded</h2><p>Unrecorded sets are never silently dropped.</p><div class="sheet-actions"><button class="primary" data-fill-save>Fill as hit</button><button class="secondary" data-drop-save>Discard them</button><button class="secondary" data-close>Cancel</button></div>`); }
function saveSession(fill=false){
  if(fill)state.live.flatMap(e=>e.sets).forEach(s=>{if(!s.outcome&&!s.warmup)s.outcome='hit'});
  const working=state.live.flatMap(e=>e.sets).filter(s=>!s.warmup&&s.outcome&&s.outcome!=='skipped'),volumeKg=working.reduce((n,s)=>n+s.weight*s.reps,0);state.sessions.unshift({id:`s${Date.now()}`,name:state.currentName,date:'Today, 17 Sep',duration:fmt(state.elapsed),sets:working.length,volumeKg,new:true,exercises:state.live.map(e=>({movement:e.id,sets:e.sets.map(s=>({...s}))}))});
  haptic('workoutCompleted');closeSheet();clearInterval(state.timer);clearInterval(state.restTimer);state.live=[];state.currentWorkoutId=null;state.rest=0;state.tab='insights';state.view='insights';toast('Workout saved');render();
}
function cancelWorkout(){clearInterval(state.timer);clearInterval(state.restTimer);state.tab='home';state.view='home';state.live=[];closeSheet();render();}
function progressContent(ex=mv('bench'),live=false){
  return `<section style="margin-top:${live?'24px':'0'}"><p class="eyebrow">${live?'LIVE PROGRESS':'PERSONAL BEST'}</p><h1>${esc(ex.name)}</h1><p class="workout-meta">${ex.muscle} · ${ex.equipment} · ${ex.pattern} · Standard</p></section><section class="stats-grid" style="margin-top:20px"><div class="card stat"><span>Best set</span><strong>${displayWeight(80)} × 8</strong></div><div class="card stat"><span>Est. 1RM</span><strong>${weightText(101)}</strong></div><div class="card stat"><span>Sessions</span><strong>8</strong></div></section><div class="section-head"><h2>Strength index</h2><span style="color:var(--mint)">+8.4%</span></div><section class="card" style="padding:18px"><div class="chart"><svg viewBox="0 0 300 140" role="img" aria-label="Strength index rising from 100 to 108.4"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c6f35b"/><stop offset="1" stop-color="#c6f35b" stop-opacity="0"/></linearGradient></defs><path class="chart-area" d="M8 118 L65 105 L125 88 L190 62 L240 48 L292 26 L292 140 L8 140Z"/><path class="chart-line" d="M8 118 L65 105 L125 88 L190 62 L240 48 L292 26"/></svg></div><div class="row" style="justify-content:space-between"><span class="muted">100 baseline</span><strong>108.4 · ${weightText(101)}</strong></div></section><div class="section-head"><h2>Weekly chest volume</h2><span class="muted">Goal 12</span></div><section class="card" style="padding:18px"><div class="score" style="font-size:36px">9 <small>working sets</small></div><div class="progress-track" style="height:9px;margin-top:16px"><div class="progress-fill" style="width:75%;background:var(--cyan)"></div></div><p class="row-meta">Below your target by 3 working sets.</p></section>`;
}
function progressPage(){ return shell(`<main class="screen">${pageHead('Bench Press','Personal bests','insights')}${progressContent(mv('bench'))}</main>`,false); }
function builder(editId){
  const key=editId||'new';
  if(!state.draft||state.draftKey!==key){
    const w=editId?state.workouts.find(x=>x.id===editId):null;
    state.draft=w?JSON.parse(JSON.stringify(w)):{id:`w${Date.now()}`,name:'',exercises:[]};
    state.draftKey=key;
  }
  const w=editId?state.workouts.find(x=>x.id===editId):null,draft=state.draft;
  return shell(`<main class="screen">${pageHead(w?'Edit workout':'New workout','Workout builder','workouts')}<input class="input" id="workout-name" placeholder="Workout name" value="${esc(draft.name)}"><div class="section-head"><h2>Exercises</h2>${draft.exercises.length?'<button class="ghost" data-add-exercise>Add exercise</button>':''}</div><div id="builder-list">${builderRows(draft)}</div><section class="card" style="margin-top:16px;padding:16px"><div class="row" style="justify-content:space-between"><span class="muted">Summary</span><strong>${draft.exercises.length} exercises · ${draft.exercises.reduce((n,e)=>n+e.sets+e.warmups,0)} total sets</strong></div></section><div class="sheet-actions"><button class="primary" data-save-workout ${draft.exercises.length?'':'disabled'}>${w?'Save changes':'Save workout'}</button><button class="secondary" data-save-start ${draft.exercises.length?'':'disabled'}>Save & start now</button></div></main>`,false);
}
function splitKeys(split){return split.mode==='weekday'?['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']:Array.from({length:split.count},(_,i)=>String(i+1))}
function splitAssignmentCount(split){return splitKeys(split).filter(key=>split.assignments[key]&&split.assignments[key]!=='rest').length}
function createSplit(){
  if(!state.splitDraft)state.splitDraft={name:'My split',mode:'weekday',count:3,assignments:{}};
  const d=state.splitDraft;
  const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const slots=d.mode==='weekday'?weekdays:Array.from({length:d.count},(_,i)=>`Workout ${i+1}`);
  const optionLabel=d.mode==='weekday'?'Rest day':'Select workout';
  return shell(`<main class="screen split-builder-screen">${pageHead('Create split','Schedule your workouts','workouts')}
    <label class="split-name-field"><span>Split name</span><input class="input" data-split-name value="${esc(d.name)}" placeholder="My training split"></label>
    <div class="section-head"><h2>Schedule by</h2></div>
    <div class="split-mode-control" role="group" aria-label="Split schedule type">${[['weekday','Days of the week'],['numbered','Numbered']].map(([mode,label])=>`<button class="${d.mode===mode?'selected':''}" data-split-mode="${mode}" aria-pressed="${d.mode===mode}">${label}</button>`).join('')}</div>
    ${d.mode==='numbered'?`<section class="card split-count-row"><div><strong>Number of workouts</strong><p>Repeat them in order</p></div><div class="counter"><button data-split-count="-1" aria-label="Remove workout">−</button><span>${d.count}</span><button data-split-count="1" aria-label="Add workout">+</button></div></section>`:''}
    <section class="card split-slot-list">${slots.map((label,i)=>{const key=d.mode==='weekday'?label:String(i+1);return `<label class="split-slot-row"><strong>${label}</strong><select class="input" data-split-slot="${key}"><option value="">${optionLabel}</option>${d.mode==='numbered'?`<option value="rest" ${d.assignments[key]==='rest'?'selected':''}>Rest</option>`:''}${state.workouts.map(w=>`<option value="${w.id}" ${d.assignments[key]===w.id?'selected':''}>${esc(w.name)}</option>`).join('')}</select></label>`}).join('')}</section>
    <p class="split-help">${d.mode==='weekday'?'Choose a workout for each training day. Leave recovery days set to Rest day.':'Choose a workout or Rest for each slot. After the final workout, the rotation starts again at Workout 1.'}</p>
    <div class="sheet-actions"><button class="primary" data-save-split>Save split</button><button class="secondary" data-back="workouts">Cancel</button></div>
  </main>`,false);
}
function builderRows(d){
  if(!d.exercises.length)return `<section class="card empty-builder"><h2>No exercises yet</h2><p class="muted">Add movements from the catalogue or reuse the structure of a past session.</p><button class="primary" data-add-exercise>Add exercise</button><button class="secondary" data-previous-session>Start from a previous session</button></section>`;
  return d.exercises.map((e,i)=>{const m=mv(e.movement);return `<section class="card builder-row" data-builder-drag="${i}" aria-label="${esc(m.name)}. Press and hold to reorder.">
    <div class="row builder-row-head"><span class="glyph">${i+1}</span><div class="grow" style="margin-left:12px"><h3>${m.name}</h3><p class="row-meta">${m.muscle} · ${m.equipment}</p></div><button class="drag-handle builder-drag-handle" data-builder-drag-handle="${i}" aria-label="Press and hold ${esc(m.name)} to reorder, or use the arrow keys"><span aria-hidden="true">⠿</span></button><button class="ghost danger" data-remove-ex="${i}" aria-label="Remove ${esc(m.name)}">Remove</button></div>
    <div class="builder-row-details"><div class="builder-row-details-inner">
      <div class="builder-controls"><span class="muted grow">Working sets</span><div class="counter"><button data-count="${i}:sets:-1" aria-label="Decrease working sets for ${esc(m.name)}">−</button><span>${e.sets}</span><button data-count="${i}:sets:1" aria-label="Increase working sets for ${esc(m.name)}">+</button></div></div>
      <div class="builder-controls"><span class="muted grow">Warm-ups</span><div class="counter"><button data-count="${i}:warmups:-1" aria-label="Decrease warm-ups for ${esc(m.name)}">−</button><span>${e.warmups}</span><button data-count="${i}:warmups:1" aria-label="Increase warm-ups for ${esc(m.name)}">+</button></div></div>
      <div class="builder-controls"><span class="muted grow">Rest after sets</span><div class="counter rest-counter"><button data-rest-count="${i}:-15" aria-label="Decrease rest after ${esc(m.name)} by 15 seconds">−</button><span>${e.rest??90}s</span><button data-rest-count="${i}:15" aria-label="Increase rest after ${esc(m.name)} by 15 seconds">+</button></div></div>
    </div></div>
  </section>`}).join('');
}
function moveBuilderExercise(from,to,renderNow=true){if(!state.draft||from===to||from<0||to<0||from>=state.draft.exercises.length||to>=state.draft.exercises.length)return false;const [exercise]=state.draft.exercises.splice(from,1);state.draft.exercises.splice(to,0,exercise);state.builderDragIndex=null;if(renderNow)renderBuilderState();return true}
function bindAnimatedSort({rowSelector,handleSelector,dataKey,onMove}){
  const rows=$$(rowSelector),handles=$$(handleSelector);
  handles.forEach(handle=>{
    handle.addEventListener('keydown',e=>{
      if(!['ArrowUp','ArrowDown'].includes(e.key))return;
      const from=Number(handle.dataset[dataKey]),to=from+(e.key==='ArrowUp'?-1:1);
      if(to<0||to>=rows.length)return;
      e.preventDefault();onMove(from,to);
    });
    handle.addEventListener('pointerdown',e=>{
      if(e.button!==0||rows.length<2)return;
      const from=Number(handle.dataset[dataKey]),dragged=rows[from];
      if(!dragged)return;
      e.preventDefault();handle.setPointerCapture?.(e.pointerId);
      const rects=rows.map(row=>{const rect=row.getBoundingClientRect();return {top:rect.top+window.scrollY,height:rect.height,center:rect.top+window.scrollY+rect.height/2}});
      const startPageY=e.clientY+window.scrollY;
      let target=from,latestClientY=e.clientY,active=true,frame=0,onPointerMove,onPointerUp,onPointerCancel;
      document.body.classList.add('sorting-active');
      rows.forEach(row=>row.classList.add('sorting'));
      dragged.classList.add('dragging');
      const positionRows=()=>{
        const pointerPageY=latestClientY+window.scrollY,delta=pointerPageY-startPageY;
        dragged.style.transform=`translate3d(0,${delta}px,0)`;
        const center=rects[from].center+delta;
        target=rects.reduce((nearest,rect,index)=>Math.abs(rect.center-center)<Math.abs(rects[nearest].center-center)?index:nearest,from);
        rows.forEach((row,index)=>{
          if(index===from)return;
          let shift=0;
          if(target>from&&index>from&&index<=target)shift=rects[index-1].top-rects[index].top;
          if(target<from&&index>=target&&index<from)shift=rects[index+1].top-rects[index].top;
          row.style.transform=shift?`translate3d(0,${shift}px,0)`:'';
        });
      };
      const autoScroll=()=>{
        if(!active)return;
        const edge=76,maxSpeed=13;
        const speed=latestClientY<edge?-Math.min(maxSpeed,(edge-latestClientY)/4):latestClientY>window.innerHeight-edge?Math.min(maxSpeed,(latestClientY-(window.innerHeight-edge))/4):0;
        if(speed){window.scrollBy(0,speed);positionRows()}
        frame=requestAnimationFrame(autoScroll);
      };
      const cleanup=()=>{
        active=false;cancelAnimationFrame(frame);document.body.classList.remove('sorting-active');
        handle.removeEventListener('pointermove',onPointerMove);handle.removeEventListener('pointerup',onPointerUp);handle.removeEventListener('pointercancel',onPointerCancel);
        rows.forEach(row=>{row.classList.remove('sorting','dragging','settling');row.style.transform=''});
      };
      const finish=cancelled=>{
        if(!active)return;
        const destination=cancelled?from:target,finalOffset=rects[destination].top-rects[from].top;
        dragged.classList.add('settling');dragged.style.transform=`translate3d(0,${finalOffset}px,0)`;
        window.setTimeout(()=>{cleanup();if(destination!==from)onMove(from,destination)},motionDelay(250));
      };
      onPointerMove=event=>{if(!active)return;latestClientY=event.clientY;positionRows()};
      onPointerUp=()=>finish(false);onPointerCancel=()=>finish(true);
      handle.addEventListener('pointermove',onPointerMove);handle.addEventListener('pointerup',onPointerUp);handle.addEventListener('pointercancel',onPointerCancel);
      positionRows();frame=requestAnimationFrame(autoScroll);
    });
  });
}
function bindOverviewHoldSort(){
  if(state.liveOverviewEditing)return;
  const rows=$$('[data-live-drag]');
  if(rows.length<2)return;
  rows.forEach((row,from)=>{
    let holdTimer=0,frame=0,active=false,target=from,latestClientY=0,startClientX=0,startClientY=0,startPageY=0,suppressClick=false,rects=[];
    const removeWindowListeners=()=>{window.removeEventListener('pointermove',onPointerMove);window.removeEventListener('pointerup',onPointerUp);window.removeEventListener('pointercancel',onPointerCancel)};
    const cleanup=()=>{active=false;suppressClick=false;cancelAnimationFrame(frame);document.body.classList.remove('sorting-active');rows.forEach(item=>{item.classList.remove('sorting','dragging','settling','hold-arming');item.style.transform=''});removeWindowListeners()};
    const cancelPending=()=>{clearTimeout(holdTimer);row.classList.remove('hold-arming');removeWindowListeners()};
    const positionRows=()=>{
      if(!active)return;
      const pointerPageY=latestClientY+window.scrollY,delta=pointerPageY-startPageY;
      row.style.transform=`translate3d(0,${delta}px,0)`;
      const center=rects[from].center+delta;
      target=rects.reduce((nearest,rect,index)=>Math.abs(rect.center-center)<Math.abs(rects[nearest].center-center)?index:nearest,from);
      rows.forEach((item,index)=>{
        if(index===from)return;
        let shift=0;
        if(target>from&&index>from&&index<=target)shift=rects[index-1].top-rects[index].top;
        if(target<from&&index>=target&&index<from)shift=rects[index+1].top-rects[index].top;
        item.style.transform=shift?`translate3d(0,${shift}px,0)`:'';
      });
    };
    const autoScroll=()=>{
      if(!active)return;
      const edge=76,maxSpeed=13;
      const speed=latestClientY<edge?-Math.min(maxSpeed,(edge-latestClientY)/4):latestClientY>window.innerHeight-edge?Math.min(maxSpeed,(latestClientY-(window.innerHeight-edge))/4):0;
      if(speed){window.scrollBy(0,speed);positionRows()}
      frame=requestAnimationFrame(autoScroll);
    };
    const activate=pointerId=>{
      active=true;suppressClick=true;row.classList.remove('hold-arming');document.body.classList.add('sorting-active');
      try{row.setPointerCapture?.(pointerId)}catch{}
      rects=rows.map(item=>{const rect=item.getBoundingClientRect();return {top:rect.top+window.scrollY,height:rect.height,center:rect.top+window.scrollY+rect.height/2}});
      rows.forEach(item=>item.classList.add('sorting'));row.classList.add('dragging');positionRows();frame=requestAnimationFrame(autoScroll);
    };
    const finish=cancelled=>{
      if(!active){cancelPending();return}
      active=false;cancelAnimationFrame(frame);const destination=cancelled?from:target,finalOffset=rects[destination].top-rects[from].top;
      row.classList.add('settling');row.style.transform=`translate3d(0,${finalOffset}px,0)`;
      window.setTimeout(()=>{cleanup();if(destination!==from)moveLiveExercise(from,destination)},motionDelay(250));
    };
    const onPointerMove=e=>{latestClientY=e.clientY;if(!active){if(Math.hypot(e.clientX-startClientX,e.clientY-startClientY)>10)cancelPending();return}e.preventDefault();positionRows()};
    const onPointerUp=()=>finish(false),onPointerCancel=()=>finish(true);
    row.addEventListener('click',e=>{if(!suppressClick)return;suppressClick=false;e.preventDefault();e.stopImmediatePropagation()},true);
    row.addEventListener('contextmenu',e=>e.preventDefault());
    row.addEventListener('pointerdown',e=>{
      if(e.button!==0)return;
      startClientX=e.clientX;startClientY=e.clientY;latestClientY=e.clientY;startPageY=e.clientY+window.scrollY;row.classList.add('hold-arming');
      window.addEventListener('pointermove',onPointerMove,{passive:false});window.addEventListener('pointerup',onPointerUp);window.addEventListener('pointercancel',onPointerCancel);
      holdTimer=window.setTimeout(()=>activate(e.pointerId),380);
    });
  });
}
function bindBuilderDrag(){
  const list=$('#builder-list'),rows=$$('[data-builder-drag]');
  if(!list||rows.length<2)return;
  rows.forEach((row,from)=>{
    let holdTimer=0,collapseTimer=0,frame=0,active=false,ready=false,target=from,latestClientY=0,startClientX=0,startClientY=0,startPageY=0,rects=[];
    const removeWindowListeners=()=>{window.removeEventListener('pointermove',onPointerMove);window.removeEventListener('pointerup',onPointerUp);window.removeEventListener('pointercancel',onPointerCancel)};
    const clearVisuals=()=>{cancelAnimationFrame(frame);document.body.classList.remove('sorting-active');list.classList.remove('builder-reorder-mode');rows.forEach(item=>{item.classList.remove('sorting','dragging','settling','hold-arming');item.style.transform=''})};
    const cancelPending=()=>{clearTimeout(holdTimer);clearTimeout(collapseTimer);row.classList.remove('hold-arming');removeWindowListeners()};
    const positionRows=()=>{
      if(!ready)return;
      const pointerPageY=latestClientY+window.scrollY,delta=pointerPageY-startPageY;
      row.style.transform=`translate3d(0,${delta}px,0)`;
      const center=rects[from].center+delta;
      target=rects.reduce((nearest,rect,index)=>Math.abs(rect.center-center)<Math.abs(rects[nearest].center-center)?index:nearest,from);
      rows.forEach((item,index)=>{
        if(index===from)return;
        let shift=0;
        if(target>from&&index>from&&index<=target)shift=rects[index-1].top-rects[index].top;
        if(target<from&&index>=target&&index<from)shift=rects[index+1].top-rects[index].top;
        item.style.transform=shift?`translate3d(0,${shift}px,0)`:'';
      });
    };
    const autoScroll=()=>{
      if(!active)return;
      const edge=76,maxSpeed=13;
      const speed=latestClientY<edge?-Math.min(maxSpeed,(edge-latestClientY)/4):latestClientY>window.innerHeight-edge?Math.min(maxSpeed,(latestClientY-(window.innerHeight-edge))/4):0;
      if(speed){window.scrollBy(0,speed);positionRows()}
      frame=requestAnimationFrame(autoScroll);
    };
    const prepareDrag=()=>{
      if(!active)return;
      rects=rows.map(item=>{const rect=item.getBoundingClientRect();return {top:rect.top+window.scrollY,height:rect.height,center:rect.top+window.scrollY+rect.height/2}});
      ready=true;rows.forEach(item=>item.classList.add('sorting'));row.classList.add('dragging');positionRows();frame=requestAnimationFrame(autoScroll);
    };
    const finish=cancelled=>{
      if(!active){cancelPending();return}
      clearTimeout(collapseTimer);active=false;cancelAnimationFrame(frame);
      const destination=cancelled||!ready?from:target;
      if(ready){const finalOffset=rects[destination].top-rects[from].top;row.classList.add('settling');row.style.transform=`translate3d(0,${finalOffset}px,0)`}
      window.setTimeout(()=>{
        if(destination!==from){moveBuilderExercise(from,destination,false);const reference=rows[destination];list.insertBefore(row,from<destination?reference.nextSibling:reference);$$('.builder-row .glyph',list).forEach((glyph,index)=>glyph.textContent=index+1)}
        clearVisuals();removeWindowListeners();
        window.setTimeout(renderBuilderState,motionDelay(280));
      },motionDelay(ready?250:0));
    };
    const activate=pointerId=>{
      active=true;row.classList.remove('hold-arming');list.classList.add('builder-reorder-mode');document.body.classList.add('sorting-active');row.setPointerCapture?.(pointerId);collapseTimer=window.setTimeout(prepareDrag,motionDelay(280));
    };
    const onPointerMove=e=>{
      latestClientY=e.clientY;
      if(!active){if(Math.hypot(e.clientX-startClientX,e.clientY-startClientY)>10)cancelPending();return}
      e.preventDefault();positionRows();
    };
    const onPointerUp=()=>finish(false),onPointerCancel=()=>finish(true);
    row.addEventListener('contextmenu',e=>e.preventDefault());
    row.querySelector('[data-builder-drag-handle]')?.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown'].includes(e.key))return;const to=from+(e.key==='ArrowUp'?-1:1);if(to<0||to>=rows.length)return;e.preventDefault();moveBuilderExercise(from,to)});
    row.addEventListener('pointerdown',e=>{
      const interactive=e.target.closest('button,input,select,textarea,a');
      if(e.button!==0||(interactive&&!interactive.matches('[data-builder-drag-handle]')))return;
      startClientX=e.clientX;startClientY=e.clientY;latestClientY=e.clientY;startPageY=e.clientY+window.scrollY;row.classList.add('hold-arming');
      window.addEventListener('pointermove',onPointerMove,{passive:false});window.addEventListener('pointerup',onPointerUp);window.addEventListener('pointercancel',onPointerCancel);
      holdTimer=window.setTimeout(()=>activate(e.pointerId),380);
    });
  });
}
function goals(){return shell(`<main class="screen">${pageHead('Goals','Measured from your history','insights')}<button class="primary" data-add-goal>Set a goal</button><div class="section-head"><h2>Active goals</h2></div>${state.goals.map(g=>`<section class="card" style="padding:18px;margin-bottom:10px"><p class="eyebrow">${g.kind}</p><div class="score" style="font-size:30px">${g.current} <small>of ${g.target}</small></div><div class="progress-track" style="height:8px"><div class="progress-fill" style="width:${Math.min(100,g.current/g.target*100)}%"></div></div></section>`).join('')}</main>`,false)}
function bests(){return shell(`<main class="screen">${pageHead('Personal Bests','Grouped by muscle','insights')}<section class="card list">${movements.slice(0,4).map(m=>`<button class="list-row" data-open="progress"><span class="glyph">★</span><span class="grow"><p class="row-title">${m.name}</p><p class="row-meta">Best ${displayWeight(m.weight)} × ${m.reps} · e1RM ${weightText(Math.round(m.weight*(1+m.reps/30)))}</p></span><span class="chev">›</span></button>`).join('')}</section></main>`,false)}
function settings(){return shell(`<main class="screen"><header class="ios-page-head centered"><span></span><h1>Settings</h1><span></span></header>
  <div class="section-head"><h2>Appearance</h2></div><section class="card appearance-card"><span class="glyph">☾</span><div class="setting-copy"><strong>Theme</strong><p>${state.theme==='system'?'Follows your device setting':state.theme==='dark'?'Apple Health-inspired dark appearance':'Light appearance'}</p></div><div class="choice-control theme-control" role="group" aria-label="Appearance">${['system','light','dark'].map(t=>`<button class="${state.theme===t?'selected':''}" data-theme-choice="${t}" aria-pressed="${state.theme===t}">${t}</button>`).join('')}</div></section>
  <div class="section-head"><h2>Accent colour</h2></div><section class="card accent-card"><div class="swatches">${['#0a84ff','#5e50f4','#c72bdc','#ff2851','#ff3838','#ff8a24','#32c759','#13bcc8'].map((c,i)=>`<button class="swatch ${state.accent.toLowerCase()===c?'selected':''}" data-accent="${c}" style="background:${c}" aria-label="Accent colour ${i+1}" aria-pressed="${state.accent.toLowerCase()===c}">${state.accent.toLowerCase()===c?'✓':''}</button>`).join('')}<button class="swatch custom ${!['#0a84ff','#5e50f4','#c72bdc','#ff2851','#ff3838','#ff8a24','#32c759','#13bcc8'].includes(state.accent.toLowerCase())?'selected':''}" data-accent-custom style="background:conic-gradient(red,#ff0,#0f8,#08f,#80f,red)" aria-label="Choose a custom accent colour" aria-pressed="${!['#0a84ff','#5e50f4','#c72bdc','#ff2851','#ff3838','#ff8a24','#32c759','#13bcc8'].includes(state.accent.toLowerCase())}">${!['#0a84ff','#5e50f4','#c72bdc','#ff2851','#ff3838','#ff8a24','#32c759','#13bcc8'].includes(state.accent.toLowerCase())?'✓':''}</button><input class="accent-input" type="color" value="${state.accent}" data-custom-accent aria-hidden="true" tabindex="-1"></div><p>Your accent is used for primary actions, selection and progress.</p></section>
  <div class="section-head"><h2>Workout</h2></div><section class="card list settings-list"><div class="list-row"><span class="glyph">⌁</span><span class="grow"><p class="row-title">Units</p></span><div class="choice-control units" role="group" aria-label="Weight units">${['kg','lb'].map(u=>`<button class="${state.units===u?'selected':''}" data-unit="${u}" aria-pressed="${state.units===u}">${u}</button>`).join('')}</div></div><button class="list-row" data-rest-toggle aria-pressed="${state.restTimers}"><span class="glyph">◷</span><span class="grow"><p class="row-title">Rest timers</p><p class="row-meta">Set per exercise in each workout</p></span><span class="switch ${state.restTimers?'on':''}"></span></button><button class="list-row" data-export><span class="glyph">↑</span><span class="grow"><p class="row-title">Export backup</p></span><span class="chev">›</span></button><button class="list-row" data-restore><span class="glyph">↓</span><span class="grow"><p class="row-title">Restore backup</p></span><span class="chev">›</span></button></section>
  </main>`,true)}
function sheetHeader(title,trailing=''){return `<header class="sheet-header"><button class="sheet-link" data-close>Close</button><h2>${esc(title)}</h2>${trailing||'<span></span>'}</header>`}
function splits(){
  const expanded=state.splitAccordionIndex;
  const rows=splitTemplates.map((t,i)=>{
    const isOpen=expanded===i;
    const ratings=splitRatings[t.name];
    return `<div class="split-accordion-item ${isOpen?'open':''}">
      <button class="list-row split-accordion-trigger" data-split-toggle="${i}" aria-expanded="${isOpen}">
        <span class="grow"><p class="row-title">${esc(t.name)}</p><p class="row-meta">${t.workouts.length} workouts · ${esc(t.cadence)}</p></span>
        <span class="chev">${isOpen?'⌃':'›'}</span>
      </button>
      ${isOpen?`<div class="split-accordion-content">
        <p class="split-accordion-description">${esc(t.description)}</p>
        <div class="split-ratings" aria-label="Split ratings">${['Volume','Time','Recovery'].map(f=>`<div class="split-rating"><span>${f}</span><span class="split-rating-value">${ratings[f]} ${splitRatingDots(ratings[f])}</span></div>`).join('')}</div>
        <div class="split-workout-list">${t.workouts.map(w=>`<div class="split-workout"><strong>${esc(w.name)}</strong><span>${w.exercises.length} exercises</span></div>`).join('')}</div>
        <button class="primary split-add-button" data-add-split="${i}">Add this split</button>
      </div>`:''}
    </div>`;
  }).join('');
  openSheet(`${sheetHeader('Standard splits')}<p class="sheet-intro">Pick a proven template. You can edit every workout afterwards.</p><section class="card list split-list">${rows}</section>`,{mode:'splits'});
}
function splitPreview(i){
  const t=splitTemplates[i];
  const ratings=splitRatings[t.name];
  openSheet(`${sheetHeader(t.name,`<button class="sheet-link" data-add-split="${i}">Add</button>`)}<p class="sheet-intro">${esc(t.description)}</p><section class="split-ratings" aria-label="Split ratings">${['Volume','Time','Recovery'].map(f=>`<div class="split-rating"><span>${f}</span><span class="split-rating-value">${ratings[f]} ${splitRatingDots(ratings[f])}</span></div>`).join('')}</section><div class="preview-groups">${t.workouts.map(w=>`<section class="card preview-group"><h3>${esc(w.name)}</h3>${w.exercises.map(([id,sets,reps])=>`<div class="preview-exercise"><span>${esc(mv(id).name)}</span><strong>${sets} × ${reps}</strong></div>`).join('')}</section>`).join('')}</div>`,{back:'splits',mode:'split-preview'});
}
function render(){
  applyTheme();
  const app=$('#app');
  const views={home,workouts,insights,progress:progressPage,goals,bests,settings,'create-split':createSplit};
  if(state.view==='live')app.innerHTML=liveScreen(); else if(state.view==='workout-detail')app.innerHTML=workoutDetail(state.selectedWorkout); else if(state.view==='builder')app.innerHTML=builder(state.editingId); else app.innerHTML=(views[state.view]||home)();
  bind();
  syncRestDivider();
  syncRestAction();
  state.transition='none';
}
function nav(v,direction='tab'){
  state.transition=direction;state.tab=v;
  if(state.currentWorkoutId&&state.live.length&&v==='workouts')state.view='live';
  else state.view=v;
  render();
}
function prepareModal(){
  if(!$('#overlay-root').children.length)state.modalReturnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const app=$('#app');app.inert=true;app.setAttribute('aria-hidden','true');
}
function openSheet(html,{back=null,mode=null}={}){prepareModal();state.sheetBack=back;state.sheetMode=mode;$('#overlay-root').innerHTML=`<div class="sheet-backdrop"><section class="sheet" role="dialog" aria-modal="true"><div class="grabber" aria-hidden="true"></div>${html}</section></div>`;bindOverlay()}
function openDialog(html){prepareModal();state.sheetBack=null;state.sheetMode='dialog';$('#overlay-root').innerHTML=`<div class="dialog-backdrop"><section class="alert-dialog" role="alertdialog" aria-modal="true">${html}</section></div>`;bindOverlay()}
function closeSheet(force=false){
  const back=!force&&state.sheetBack;const wasPicker=state.sheetMode==='picker';const returnFocus=state.modalReturnFocus;const overlay=$('#overlay-root').querySelector('.sheet,[role="alertdialog"]');
  if(overlay&&state.overlayKeydown)overlay.removeEventListener('keydown',state.overlayKeydown);
  state.overlayKeydown=null;state.modalReturnFocus=null;
  $('#overlay-root').innerHTML='';state.sheetBack=null;state.sheetMode=null;
  const app=$('#app');app.inert=false;app.removeAttribute('aria-hidden');
  if(wasPicker){state.pickerSelection.clear();state.pickerFilter='All';state.pickerQuery=''}
  if(back==='splits')splits();
  else if(returnFocus?.isConnected)requestAnimationFrame(()=>returnFocus.focus({preventScroll:true}));
}
function removalMotionElements(card){
  const parent=card.parentElement,main=card.closest('main');
  const elements=[...parent.children].filter(el=>el!==card);
  if(main){
    let section=parent;
    while(section.parentElement&&section.parentElement!==main)section=section.parentElement;
    if(section.parentElement===main){
      const sections=[...main.children],index=sections.indexOf(section);
      elements.push(...sections.slice(index+1));
    }
  }
  return [...new Set(elements)].filter(el=>el.isConnected&&el.getClientRects().length);
}
async function animateCardRemoval(card,mutate,renderAfter=render){
  const reduced=prefersReducedMotion();
  if(!card||typeof card.animate!=='function'||reduced){mutate();renderAfter();return}
  document.body.classList.add('card-removal-active');
  card.classList.add('card-removing');
  try{
    const shrink=card.animate([
      {transform:'scale(1)',opacity:1},
      {transform:'scale(.84)',opacity:0}
    ],{duration:240,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
    await shrink.finished.catch(()=>{});
    if(card.parentElement.children.length===1){card.remove();mutate();return}
    const moving=removalMotionElements(card);
    const before=new Map(moving.map(el=>[el,el.getBoundingClientRect()]));
    card.remove();
    mutate();
    const motions=moving.map(el=>{
      const first=before.get(el),last=el.getBoundingClientRect();
      const x=first.left-last.left,y=first.top-last.top;
      if(Math.abs(x)<.5&&Math.abs(y)<.5)return null;
      return el.animate([
        {transform:`translate3d(${x}px,${y}px,0)`},
        {transform:'translate3d(0,0,0)'}
      ],{duration:330,easing:'cubic-bezier(.2,.8,.2,1)'});
    }).filter(Boolean);
    await Promise.allSettled(motions.map(motion=>motion.finished));
  }finally{
    document.body.classList.remove('card-removal-active');
    renderAfter();
  }
}
function toast(msg){
  const region=$('#status-region');
  if(!region)return;
  clearTimeout(state.statusTimer);
  region.textContent='';
  requestAnimationFrame(()=>{region.textContent=msg});
  state.statusTimer=setTimeout(()=>{region.textContent=''},4200);
}
function editProfileSheet(){const p=state.profile,min=state.units==='lb'?44:20,max=state.units==='lb'?882:400;openSheet(`<p class="eyebrow">PROFILE</p><h2>Edit profile</h2><div class="profile-form"><label class="profile-field"><span>Name</span><input class="input" data-profile-name value="${esc(p.name)}" autocomplete="name"></label><label class="profile-field"><span>Weight</span><div class="profile-unit-input"><input class="input" data-profile-weight type="number" min="${min}" max="${max}" step="0.1" value="${displayWeight(p.weight)}"><b>${state.units}</b></div></label><label class="profile-field"><span>Height</span><div class="profile-unit-input"><input class="input" data-profile-height type="number" min="100" max="250" step="1" value="${p.height}"><b>cm</b></div></label><label class="profile-field"><span>Sex</span><select class="input" data-profile-sex>${['Female','Male','Intersex','Not specified'].map(x=>`<option ${p.sex===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="sheet-actions"><button class="primary" data-save-profile>Save profile</button><button class="secondary" data-close>Cancel</button></div>`)}
function deviation(si,draft=null){const ex=state.live[state.liveIndex],s=ex.sets[si];state.adjust=draft?{...draft}:{si,weight:s.weight,reps:s.reps,rest:s.restDuration??ex.restDuration,wasLogged:!!s.outcome};openSheet(`<div class="set-editor-head"><div><p class="eyebrow">${s.warmup?'WARM-UP':'WORKING SET'}</p><h2>Edit set</h2></div><div class="choice-control units set-unit-toggle" role="group" aria-label="Weight units">${['kg','lb'].map(u=>`<button class="${state.units===u?'selected':''}" data-set-unit="${u}" aria-pressed="${state.units===u}">${u}</button>`).join('')}</div></div><p>Adjust the plan and the rest period that follows this set.</p><div class="stepper"><button data-adjust="weight:-1" aria-label="Decrease weight">−</button><div class="step-value"><strong data-weight>${displayWeight(state.adjust.weight)}</strong><span>${state.units}</span></div><button data-adjust="weight:1" aria-label="Increase weight">+</button></div><div class="stepper"><button data-adjust="reps:-1" aria-label="Decrease repetitions">−</button><div class="step-value"><strong data-reps>${state.adjust.reps}</strong><span>repetitions</span></div><button data-adjust="reps:1" aria-label="Increase repetitions">+</button></div><div class="stepper"><button data-adjust-rest="-15" aria-label="Decrease rest by 15 seconds">−</button><div class="step-value"><strong data-set-rest>${state.adjust.rest}</strong><span>seconds rest</span></div><button data-adjust-rest="15" aria-label="Increase rest by 15 seconds">+</button></div><div class="sheet-actions"><button class="primary" data-confirm-adjust>Save changes</button>${!s.warmup&&!s.outcome?'<button class="text-action" data-skip-set>Skip set</button>':''}<button class="secondary" data-close>Cancel</button></div>`)}
function swapSheet(){const ex=state.live[state.liveIndex],candidates=movements.filter(m=>m.id!==ex.id);openSheet(`<h2>Swap exercise</h2><p>Create a machine variant or choose a related movement. Logged sets stay unchanged.</p><button class="secondary" style="width:100%" data-new-variant>New machine variant</button>${['Same pattern · same equipment','Same movement pattern','Same muscle group'].map((head,t)=>`<p class="eyebrow" style="margin:22px 4px 8px">${head}</p><section class="card list">${candidates.filter(m=>t===0?(m.pattern===ex.pattern||m.equipment===ex.equipment):t===1?m.pattern===ex.pattern:m.muscle===ex.muscle).slice(0,3).map(m=>`<button class="list-row" data-swap-to="${m.id}"><span class="glyph">${m.name[0]}</span><span class="grow"><p class="row-title">${m.name}</p><p class="row-meta">${m.muscle} · ${m.equipment} · ${m.pattern}</p></span><span class="chev">›</span></button>`).join('')||'<div class="list-row muted">No closer matches</div>'}</section>`).join('')}<button class="secondary" style="width:100%;margin-top:18px" data-close>Cancel</button>`)}
const muscleCategory=m=>['Biceps','Triceps'].includes(m.muscle)?'Arms':m.muscle;
function addExerciseSheet(){
  state.draft.name=$('#workout-name')?.value||state.draft.name;state.pickerSelection.clear();state.pickerFilter='All';state.pickerQuery='';renderExercisePicker();
}
function renderExercisePicker(refocus=false,focusSelector='[data-search-exercises]'){
  const q=state.pickerQuery.toLowerCase();
  const filtered=movements.filter(m=>(state.pickerFilter==='All'||muscleCategory(m)===state.pickerFilter)&&`${m.name} ${m.equipment} ${m.pattern}`.toLowerCase().includes(q));
  const n=state.pickerSelection.size;
  openSheet(`${sheetHeader('Add Exercise',`<button class="sheet-link" data-picker-done ${n?'':'disabled'}>Done · ${n}</button>`)}<div class="picker-sticky"><input class="input" placeholder="Search exercises" value="${esc(state.pickerQuery)}" data-search-exercises><div class="chips">${['All','Chest','Back','Shoulders','Arms','Legs','Core'].map(x=>`<button class="chip ${state.pickerFilter===x?'active':''}" data-filter="${x}" aria-pressed="${state.pickerFilter===x}">${x}</button>`).join('')}</div></div><section class="card list picker-results">${filtered.map(m=>`<button class="list-row" data-pick="${m.id}" aria-pressed="${state.pickerSelection.has(m.id)}"><span class="check-circle ${state.pickerSelection.has(m.id)?'selected':''}" aria-hidden="true">${state.pickerSelection.has(m.id)?'✓':''}</span><span class="grow"><p class="row-title">${esc(m.name)}</p><p class="row-meta">${esc(m.muscle)} · ${esc(m.equipment)} · ${esc(m.pattern)}</p></span></button>`).join('')}</section>`,{mode:'picker'});
  if(refocus)requestAnimationFrame(()=>{const target=$(focusSelector)||$('[data-search-exercises]');target?.focus({preventScroll:true});if(target?.matches('[data-search-exercises]'))target.setSelectionRange(target.value.length,target.value.length)})
}
function previousSessionSheet(){
  state.draft.name=$('#workout-name')?.value||state.draft.name;
  openSheet(`${sheetHeader('Start from a previous session')}<section class="card list">${state.sessions.map((s,i)=>{const matched=state.workouts.find(w=>w.name===s.name);const count=s.exercises?.length||matched?.exercises.length||workoutSeed.exercises.length;return `<button class="list-row" data-use-session="${i}"><span class="grow"><p class="row-title">${esc(s.name)}</p><p class="row-meta">${count} exercises</p></span><span class="chev">›</span></button>`}).join('')}</section>`,{mode:'previous'});
}
function deleteWorkoutDialog(id){const w=state.workouts.find(x=>x.id===id);if(!w)return;openDialog(`<h2>Delete ${esc(w.name)}?</h2><p>This workout will be removed from your list. Past sessions are kept.</p><div class="dialog-actions"><button class="primary destructive" data-confirm-delete="${w.id}">Delete</button><button class="secondary" data-close>Cancel</button></div>`)}
function bind(){
  $$('[data-goal-step]').forEach(b=>b.setAttribute('aria-label',b.dataset.goalStep==='1'?'Increase target':'Decrease target'));
  $$('[data-nav]').forEach(b=>b.onclick=()=>nav(b.dataset.nav,'tab'));$$('[data-back]').forEach(b=>b.onclick=()=>nav(b.dataset.back,'back'));
  $$('[data-scroll-insights]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>$('#insights-volume')?.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth',block:'start'}),0)));
  $$('[data-theme-choice]').forEach(b=>b.onclick=()=>{state.theme=b.dataset.themeChoice;localStorage.setItem('sevro-theme',state.theme);applyTheme();render()});
  $$('[data-unit]').forEach(b=>b.onclick=()=>{state.units=b.dataset.unit;localStorage.setItem('sevro-units',state.units);toast(`Weights shown in ${state.units}`);render()});
  $('[data-rest-toggle]')?.addEventListener('click',()=>{state.restTimers=!state.restTimers;localStorage.setItem('sevro-rest-timers',state.restTimers?'on':'off');if(!state.restTimers){clearInterval(state.restTimer);state.rest=0}toast(state.restTimers?'Rest timers enabled':'Rest timers disabled');render()});
  $$('[data-accent]').forEach(b=>b.onclick=()=>setAccent(b.dataset.accent));
  $('[data-accent-custom]')?.addEventListener('click',()=> $('[data-custom-accent]')?.click());
  $('[data-custom-accent]')?.addEventListener('input',e=>setAccent(e.target.value));
  $('[data-toggle-edit]')?.addEventListener('click',()=>{state.editMode=!state.editMode;render()});
  const bestToggle=$('[data-toggle-bests]');if(bestToggle){let holdTimer,held=false;bestToggle.addEventListener('pointerdown',()=>{held=false;holdTimer=setTimeout(()=>{held=true;state.bestsEditing=true;state.bestsOpen=true;render()},500)});bestToggle.addEventListener('pointerup',e=>{clearTimeout(holdTimer);if(!held){if(state.bestsOpen){animateAccordionClose(bestToggle.parentElement?.querySelector('.personal-bests-details'),()=>{state.bestsOpen=false;render()})}else{state.bestsOpen=true;render()}}else e.preventDefault()});bestToggle.addEventListener('pointercancel',()=>clearTimeout(holdTimer))}
  $$('[data-track-best]').forEach(b=>b.onclick=()=>{if(!state.bestsEditing)return;const id=b.dataset.trackBest;if(state.trackedBests.has(id)){state.trackedBests.delete(id)}else if(state.trackedBests.size<6){state.trackedBests.add(id)}else{toast('Track up to 6 exercises');return}render()});
  $$('[data-volume-zone]').forEach(b=>b.onclick=()=>{state.volumeZone=b.dataset.volumeZone;render()});
  $$('[data-volume-group]').forEach(b=>b.onclick=()=>{state.volumeGrouping=b.dataset.volumeGroup;state.volumeLongPressGroup=null;render()});
  $('[data-volume-edit]')?.addEventListener('click',()=>{state.volumeEditing=!state.volumeEditing;render()});
  $$('[data-volume-lock]').forEach(b=>b.onclick=()=>{const name=b.dataset.volumeLock;if(state.volumeLocks.has(name))state.volumeLocks.delete(name);else state.volumeLocks.add(name);render()});
  $('[data-volume-inline-save]')?.addEventListener('click',()=>{state.volumeLongPressGroup=null;render()});
  $('[data-volume-help]')?.addEventListener('click',()=>openSheet("<h2>How weekly volume works</h2><p>Your weekly volume is counted in hard sets per muscle — working sets taken close to failure; warm-ups excluded.</p><p>Because compound lifts share work across muscles, each set is split: 1 full set for the main muscle, ½ set for helpers, 0 when a muscle barely works (bench = 1 chest + ½ triceps; squats ≈ 0 hamstrings).</p><p>This half-credit method predicted real growth best in the largest volume analysis so far (67 studies, Pelland et al. 2025). It is a best-fit convention, not biology — so you can edit every exercise's muscle weights to match your lifts.</p><button class='secondary' style='width:100%;margin-top:12px' data-close>Close</button>"));
  $$('[data-volume-longpress]').forEach(row=>{let timer;row.addEventListener('pointerdown',()=>{timer=setTimeout(()=>{state.volumeLongPressGroup=row.dataset.volumeLongpress;state.volumeGrouping='all';render()},500)});row.addEventListener('pointerup',()=>clearTimeout(timer));row.addEventListener('pointercancel',()=>clearTimeout(timer))});
  $$('[data-volume-adjust]').forEach(b=>b.onclick=()=>{const [name,delta]=b.dataset.volumeAdjust.split(':');state.volumeTargets[name]=Math.max(2,Math.min(30,(state.volumeTargets[name]||10)+Number(delta)));render()});
  $$('[data-delete-workout]').forEach(b=>b.onclick=()=>deleteWorkoutDialog(b.dataset.deleteWorkout));
  $('[data-edit-profile]')?.addEventListener('click',editProfileSheet);
  $$('[data-history]').forEach(b=>b.onclick=()=>{const i=+b.dataset.history,current=state.historyOpen;if(current===i){animateAccordionClose(b.closest('.history-entry')?.querySelector('.history-details'),()=>{state.historyOpen=null;render()})}else if(current!==null){const previous=document.querySelector(`[data-history="${current}"]`)?.closest('.history-entry')?.querySelector('.history-details');animateAccordionClose(previous,()=>{state.historyOpen=i;render()})}else{state.historyOpen=i;render()}});
  $$('[data-start]').forEach(b=>b.onclick=()=>{state.transition='forward';startWorkout(b.dataset.start)});$$('[data-workout]').forEach(b=>b.onclick=()=>{state.transition='forward';state.selectedWorkout=state.workouts.find(x=>x.id===b.dataset.workout);state.view='workout-detail';render()});
  $$('[data-open]').forEach(b=>b.onclick=()=>{const v=b.dataset.open;state.transition='forward';if(v==='splits')return splits();if(v==='swap')return swapSheet();if(v==='builder'){state.editingId=null;state.draft=null;state.draftKey=null}if(v==='create-split')state.splitDraft=b.textContent.trim()==='Edit'&&state.activeSplit?JSON.parse(JSON.stringify(state.activeSplit)):{name:'My split',mode:'weekday',count:3,assignments:{}};if(v==='settings')state.tab='settings';state.view=v;render()});
  $$('[data-edit]').forEach(b=>b.onclick=()=>{state.transition='forward';state.editingId=b.dataset.edit;state.view='builder';render()});
  $$('[data-live-tab]').forEach(b=>b.onclick=()=>{state.transition='tab';state.view='live';state.liveTab=b.dataset.liveTab;render()});$('[data-live-overview-edit]')?.addEventListener('click',()=>{state.liveOverviewEditing=!state.liveOverviewEditing;state.overviewOpen=null;render()});$$('[data-overview-exercise]').forEach(b=>b.onclick=()=>{const i=+b.dataset.overviewExercise,current=state.overviewOpen;if(current===i){animateAccordionClose(b.closest('.overview-entry')?.querySelector('.overview-exercise-details'),()=>{state.overviewOpen=null;render()})}else if(current!==null){const previous=document.querySelector(`[data-overview-exercise="${current}"]`)?.closest('.overview-entry')?.querySelector('.overview-exercise-details');animateAccordionClose(previous,()=>{state.overviewOpen=i;render()})}else{state.overviewOpen=i;render()}});$$('[data-live-move]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [index,delta]=b.dataset.liveMove.split(':').map(Number);moveLiveExercise(index,index+delta)});$$('[data-live-remove]').forEach(b=>b.onclick=e=>{e.stopPropagation();const i=+b.dataset.liveRemove;if(state.live.length<=1){toast('Keep at least one exercise');return}const card=b.closest('[data-live-drag]');animateCardRemoval(card,()=>{state.live.splice(i,1);if(state.liveIndex===i)state.liveIndex=Math.min(i,state.live.length-1);else if(state.liveIndex>i)state.liveIndex--;state.overviewOpen=null})});$('[data-live-add-open]')?.addEventListener('click',liveAddExerciseSheet);bindAnimatedSort({rowSelector:'[data-live-drag]',handleSelector:'[data-live-drag-handle]',dataKey:'liveDragHandle',onMove:moveLiveExercise});bindOverviewHoldSort();$$('[data-jump]').forEach(b=>b.onclick=()=>{state.transition='tab';state.liveIndex=+b.dataset.jump;state.liveTab='active';render()});
  $('[data-live-insights]')?.addEventListener('click',()=>{state.transition='tab';state.view='insights';state.tab='insights';render()});
  $('[data-live-settings]')?.addEventListener('click',()=>{state.transition='tab';state.view='settings';state.tab='settings';render()});$('[data-resume-workout]')?.addEventListener('click',()=>{state.transition='forward';state.view='live';state.tab='workouts';render()});
  const log=$('[data-log]');if(log){let hold;let held=false;const start=e=>{e.preventDefault();held=false;log.classList.add('holding');hold=setTimeout(()=>{held=true;log.classList.remove('holding');deviation(+log.dataset.log)},450)};const end=e=>{e.preventDefault();clearTimeout(hold);log.classList.remove('holding');if(!held)logSet(+log.dataset.log)};log.addEventListener('pointerdown',start);log.addEventListener('pointerup',end);log.addEventListener('pointercancel',()=>{clearTimeout(hold);log.classList.remove('holding')})}
  $$('[data-edit-set]').forEach(b=>b.onclick=()=>deviation(+b.dataset.editSet));$('[data-finish]')?.addEventListener('click',finishFlow);
  $$('[data-rest-add]').forEach(b=>b.onclick=()=>adjustActiveRest(+b.dataset.restAdd));$('[data-rest-skip]')?.addEventListener('click',()=>{haptic('restSkipped');clearInterval(state.restTimer);state.rest=0;render()});
  $('[data-add-exercise]')?.addEventListener('click',addExerciseSheet);$$('[data-remove-ex]').forEach(b=>b.onclick=()=>{const i=+b.dataset.removeEx,card=b.closest('[data-builder-drag]');state.draft.name=$('#workout-name')?.value||state.draft.name;animateCardRemoval(card,()=>state.draft.exercises.splice(i,1),renderBuilderState)});
  $('[data-previous-session]')?.addEventListener('click',previousSessionSheet);
  $$('[data-count]').forEach(b=>b.onclick=()=>{const key=b.dataset.count;const [i,k,d]=key.split(':');state.draft.exercises[+i][k]=Math.max(k==='sets'?1:0,Math.min(k==='sets'?8:3,state.draft.exercises[+i][k]+(+d)));renderBuilderState();requestAnimationFrame(()=>$$('[data-count]').find(next=>next.dataset.count===key)?.focus({preventScroll:true}))});
  $$('[data-rest-count]').forEach(b=>b.onclick=()=>{const key=b.dataset.restCount;const [i,d]=key.split(':');const ex=state.draft.exercises[+i];ex.rest=Math.max(15,Math.min(600,(ex.rest??90)+(+d)));renderBuilderState();requestAnimationFrame(()=>$$('[data-rest-count]').find(next=>next.dataset.restCount===key)?.focus({preventScroll:true}))});
  $('[data-save-workout]')?.addEventListener('click',()=>saveWorkout(false));$('[data-save-start]')?.addEventListener('click',()=>saveWorkout(true));
  $('[data-split-name]')?.addEventListener('input',e=>state.splitDraft.name=e.target.value);
  $$('[data-split-mode]').forEach(b=>b.onclick=()=>{state.splitDraft.mode=b.dataset.splitMode;render()});
  $$('[data-split-count]').forEach(b=>b.onclick=()=>{state.splitDraft.count=Math.max(2,Math.min(7,state.splitDraft.count+(+b.dataset.splitCount)));render()});
  $$('[data-split-slot]').forEach(s=>s.onchange=()=>state.splitDraft.assignments[s.dataset.splitSlot]=s.value);
  $('[data-save-split]')?.addEventListener('click',()=>{const assignments=Object.fromEntries(splitKeys(state.splitDraft).map(key=>[key,state.splitDraft.assignments[key]||'']));if(!Object.values(assignments).some(value=>value&&value!=='rest')){toast('Select at least one workout');return}state.splitDraft.name=state.splitDraft.name.trim()||'My split';state.splitDraft.assignments=assignments;state.activeSplit=JSON.parse(JSON.stringify(state.splitDraft));localStorage.setItem('sevro-split',JSON.stringify(state.activeSplit));state.splitDraft=null;nav('workouts');toast('Split saved')});
  $('[data-add-goal]')?.addEventListener('click',()=>openSheet(`<h2>What do you want to work towards?</h2><div class="sheet-actions">${['Workouts per week','Lift target','Weekly volume','Body weight'].map(x=>`<button class="list-row card" data-goal-kind="${x}"><span class="glyph">◎</span><span class="grow"><p class="row-title">${x}</p><p class="row-meta">Measured automatically from your history</p></span><span class="chev">›</span></button>`).join('')}</div><button class="secondary" style="width:100%;margin-top:12px" data-close>Close</button>`));
  $('[data-export]')?.addEventListener('click',()=>toast(`Backup exported · ${state.workouts.length} workouts and ${state.sessions.length} sessions`));$('[data-restore]')?.addEventListener('click',()=>openSheet(`<h2>Restore from backup?</h2><p>This replaces your current workouts, sessions, profile, goals and preferences. It cannot be merged.</p><div class="sheet-actions"><button class="primary" data-restore-confirm>Choose backup file</button><button class="secondary" data-close>Cancel</button></div>`));
  bindBuilderDrag();
}
function setAccent(value){state.accent=value.toLowerCase();localStorage.setItem('sevro-accent',state.accent);applyTheme();render()}
function persistWorkouts(){localStorage.setItem('sevro-workouts',JSON.stringify(state.workouts))}
function adjustActiveRest(delta){const ex=state.live[state.liveIndex],next=Math.max(15,Math.min(600,ex.restDuration+delta));ex.restDuration=next;state.rest=Math.max(1,Math.min(600,state.rest+delta));state.restTotal=next;const template=state.workouts.find(w=>w.id===state.currentWorkoutId);if(template?.exercises[state.liveIndex])template.exercises[state.liveIndex].rest=next;persistWorkouts();toast(`Rest saved at ${fmt(next)}`);render()}
function renderBuilderState(){const name=$('#workout-name')?.value||state.draft.name;state.draft.name=name;state.view='builder';render();$('#workout-name').value=name}
function saveWorkout(start){state.draft.name=$('#workout-name')?.value.trim()||state.draft.exercises.slice(0,2).map(e=>mv(e.movement).muscle).join(' & ')||'Workout';const idx=state.workouts.findIndex(w=>w.id===state.draft.id);if(idx>=0)state.workouts[idx]=state.draft;else state.workouts.push(state.draft);persistWorkouts();toast('Workout saved');if(start)startWorkout(state.draft.id);else nav('workouts')}
function bindOverlay(){
  const overlay=$('.sheet,[role="alertdialog"]');
  if(overlay){
    const title=overlay.querySelector('h1,h2,h3');
    if(title){title.id=title.id||'overlay-title';title.setAttribute('tabindex','-1');overlay.setAttribute('aria-labelledby',title.id)}
    const focusables=()=>[...overlay.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[href],[tabindex]:not([tabindex="-1"])')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0});
    const focusTarget=title||focusables()[0];
    focusTarget?.focus({preventScroll:true});
    const keydown=e=>{
      if(e.key==='Escape'){e.preventDefault();closeSheet();return}
      if(e.key!=='Tab')return;
      const items=focusables();if(!items.length)return;
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    };
    state.overlayKeydown=keydown;overlay.addEventListener('keydown',keydown);
  }
  $$('[data-close]').forEach(b=>b.onclick=()=>closeSheet());$('.sheet-backdrop')?.addEventListener('click',e=>{if(e.target.classList.contains('sheet-backdrop'))closeSheet()});
  $$('[data-live-add]').forEach(b=>b.onclick=()=>{const m=mv(b.dataset.liveAdd);state.live.push({...m,warmups:0,restDuration:90,sets:Array.from({length:3},(_,i)=>({id:`live-${Date.now()}-${i}`,warmup:false,targetWeight:m.weight,targetReps:m.reps,weight:m.weight,reps:m.reps,restDuration:90,outcome:null}))});closeSheet();render()});
  $('.dialog-backdrop')?.addEventListener('click',e=>{if(e.target.classList.contains('dialog-backdrop'))closeSheet()});
  $$('[data-set-unit]').forEach(b=>b.onclick=()=>{const draft={...state.adjust};state.units=b.dataset.setUnit;localStorage.setItem('sevro-units',state.units);deviation(draft.si,draft)});
  $('[data-save-profile]')?.addEventListener('click',()=>{const name=$('[data-profile-name]').value.trim(),shownWeight=+$('[data-profile-weight]').value,weight=inputWeight(shownWeight),height=+$('[data-profile-height]').value,sex=$('[data-profile-sex]').value;if(!name||weight<20||weight>400||height<100||height>250){toast('Check your profile details');return}state.profile={name,weight:Math.round(weight*10)/10,height:Math.round(height),sex};localStorage.setItem('sevro-profile',JSON.stringify(state.profile));closeSheet();toast('Profile updated');render()});
  $$('[data-adjust]').forEach(b=>b.onclick=()=>{const [k,d]=b.dataset.adjust.split(':');const ex=state.live[state.liveIndex],s=ex.sets[state.adjust.si],step=k==='weight'?ex.increment:1;const min=Math.max(0,(k==='weight'?s.targetWeight:s.targetReps)-15),max=(k==='weight'?s.targetWeight:s.targetReps)+15;state.adjust[k]=Math.min(max,Math.max(min,state.adjust[k]+step*(+d)));$(`[data-${k}]`).textContent=k==='weight'?displayWeight(state.adjust[k]):state.adjust[k]});
  $$('[data-adjust-rest]').forEach(b=>b.onclick=()=>{state.adjust.rest=Math.max(15,Math.min(600,state.adjust.rest+(+b.dataset.adjustRest)));$('[data-set-rest]').textContent=state.adjust.rest});
  $('[data-confirm-adjust]')?.addEventListener('click',()=>{const a=state.adjust,ex=state.live[state.liveIndex],s=ex.sets[a.si];s.weight=a.weight;s.reps=a.reps;s.restDuration=a.rest;if(!a.wasLogged){s.outcome=s.warmup?'calibration':'performed';s.pr=!s.warmup&&s.weight>80;haptic('setLogged');if(state.restTimers)startRest(s.restDuration??ex.restDuration)}const template=state.workouts.find(w=>w.id===state.currentWorkoutId),templateEx=template?.exercises[state.liveIndex];if(templateEx){templateEx.setRests??=[];templateEx.setRests[a.si]=a.rest;persistWorkouts()}const lastLogged=ex.sets.reduce((n,x,i)=>x.outcome?i:n,-1);if(a.wasLogged&&state.rest>0&&a.si===lastLogged){state.rest=a.rest;state.restTotal=a.rest}closeSheet();toast(a.wasLogged?'Set updated':`${weightText(s.weight)} × ${s.reps} recorded`);render()});
  $('[data-skip-set]')?.addEventListener('click',()=>{const a=state.adjust,ex=state.live[state.liveIndex],s=ex.sets[a.si];if(!s||s.warmup||s.outcome)return;s.outcome='skipped';s.pr=false;clearInterval(state.restTimer);state.rest=0;closeSheet();toast('Set skipped');render()});
  $('[data-finish-save]')?.addEventListener('click',e=>{const n=+e.currentTarget.dataset.finishSave;n?missingFlow(n):saveSession(false)});$('[data-fill-save]')?.addEventListener('click',()=>saveSession(true));$('[data-drop-save]')?.addEventListener('click',()=>saveSession(false));$('[data-discard]')?.addEventListener('click',cancelWorkout);
  $$('[data-split-toggle]').forEach(b=>b.onclick=()=>{const i=+b.dataset.splitToggle,current=state.splitAccordionIndex;if(current===i){animateAccordionClose(b.closest('.split-accordion-item')?.querySelector('.split-accordion-content'),()=>{state.splitAccordionIndex=null;splits()})}else if(current!==null){const previous=document.querySelector(`[data-split-toggle="${current}"]`)?.closest('.split-accordion-item')?.querySelector('.split-accordion-content');animateAccordionClose(previous,()=>{state.splitAccordionIndex=i;splits()})}else{state.splitAccordionIndex=i;splits()}});
  $('[data-add-split]')?.addEventListener('click',e=>{const t=splitTemplates[+e.currentTarget.dataset.addSplit],stamp=Date.now();t.workouts.forEach((w,i)=>state.workouts.push({id:`split${stamp}-${i}`,name:w.name,exercises:w.exercises.map(([movement,sets])=>({movement,warmups:0,sets,rest:90}))}));persistWorkouts();state.splitAccordionIndex=null;closeSheet(true);nav('workouts')});
  $$('[data-swap-to]').forEach(b=>b.onclick=()=>{const old=state.live[state.liveIndex],m=mv(b.dataset.swapTo);state.live[state.liveIndex]={...old,...m,sets:old.sets.map(s=>s.outcome?s:{...s,targetWeight:m.weight,targetReps:m.reps,weight:m.weight,reps:m.reps})};closeSheet();toast(`${m.name} is now active`);render()});
  $('[data-new-variant]')?.addEventListener('click',()=>{const ex=state.live[state.liveIndex];ex.variant=`New machine · ${state.units}`;ex.increment=2.5;closeSheet();toast('Machine variant saved for future workouts');render()});
  $('[data-search-exercises]')?.addEventListener('input',e=>{state.pickerQuery=e.target.value;renderExercisePicker(true)});
  $$('[data-filter]').forEach(b=>b.onclick=()=>{state.pickerFilter=b.dataset.filter;renderExercisePicker(true,`[data-filter="${state.pickerFilter}"]`)});
  $$('[data-pick]').forEach(b=>b.onclick=()=>{const id=b.dataset.pick;state.pickerSelection.has(id)?state.pickerSelection.delete(id):state.pickerSelection.add(id);renderExercisePicker(true,`[data-pick="${id}"]`)});
  $('[data-picker-done]')?.addEventListener('click',()=>{const selected=[...state.pickerSelection];selected.forEach(movement=>state.draft.exercises.push({movement,warmups:0,sets:3,rest:90}));if(!state.draft.name&&selected.length){const muscles=[...new Set(selected.map(id=>muscleCategory(mv(id))))];state.draft.name=muscles.slice(0,2).join(' & ')}closeSheet(true);state.pickerSelection.clear();state.pickerFilter='All';state.pickerQuery='';renderBuilderState()});
  $$('[data-use-session]').forEach(b=>b.onclick=()=>{const s=state.sessions[+b.dataset.useSession],matched=state.workouts.find(w=>w.name===s.name);let exercises;if(s.exercises)exercises=s.exercises.map(e=>{const working=e.sets.filter(x=>!x.warmup),first=working.find(x=>x.outcome)||working[0];return {movement:e.movement,warmups:e.sets.filter(x=>x.warmup).length,sets:working.length||1,weight:first?.weight??40,reps:first?.reps??10}});else exercises=JSON.parse(JSON.stringify(matched?.exercises||workoutSeed.exercises));state.draft.exercises=exercises;state.draft.dirty=true;if(!state.draft.name)state.draft.name=s.name;closeSheet(true);renderBuilderState()});
  $('[data-confirm-delete]')?.addEventListener('click',e=>{const id=e.currentTarget.dataset.confirmDelete,button=$$('[data-delete-workout]').find(item=>item.dataset.deleteWorkout===id),card=button?.closest('.workout-select-card');closeSheet(true);animateCardRemoval(card,()=>{state.workouts=state.workouts.filter(w=>w.id!==id);persistWorkouts()})});
  $$('[data-goal-kind]').forEach(b=>b.onclick=()=>{const kind=b.dataset.goalKind;openSheet(`<p class="eyebrow">NEW GOAL</p><h2>${kind}</h2><p>Adjust the target without opening a keyboard.</p><div class="stepper"><button data-goal-step="-1">−</button><div class="step-value"><strong data-goal-value>4</strong><span>target</span></div><button data-goal-step="1">+</button></div><div class="sheet-actions"><button class="primary" data-goal-save="${kind}">Save goal</button><button class="secondary" data-close>Cancel</button></div>`)});
  let gv=4;$$('[data-goal-step]').forEach(b=>b.onclick=()=>{gv=Math.max(1,gv+(+b.dataset.goalStep));$('[data-goal-value]').textContent=gv});$('[data-goal-save]')?.addEventListener('click',e=>{state.goals.push({kind:e.currentTarget.dataset.goalSave,current:0,target:gv});closeSheet();toast('Goal added');state.view='goals';render()});
  $('[data-restore-confirm]')?.addEventListener('click',()=>{closeSheet();toast('File picker would open on iPhone')});
}
render();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system'){applyTheme();render()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#overlay-root').children.length)closeSheet()});

function registerAgentTools(){
  const context=document.modelContext;
  if(!context?.registerTool)return;
  const register=tool=>Promise.resolve(context.registerTool(tool)).catch(()=>{});
  register({
    name:'start_saved_workout',
    title:'Start saved workout',
    description:'Start one of the saved Sevro workout routines and open the live workout shell.',
    inputSchema:{type:'object',properties:{workoutId:{type:'string',enum:state.workouts.map(w=>w.id)}},required:['workoutId'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute({workoutId}){if(!state.workouts.some(w=>w.id===workoutId))throw new Error('Unknown workout');startWorkout(workoutId);return {status:'started',workoutId,exerciseCount:state.live.length}}
  });
  register({
    name:'log_next_planned_set',
    title:'Log next planned set',
    description:'During a live workout, record the next set exactly at its planned target.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(){if(state.view!=='live')throw new Error('No workout is running');const ex=state.live[state.liveIndex],si=ex.sets.findIndex(s=>!s.outcome);if(si<0)throw new Error('The current exercise is complete');logSet(si);return {status:'recorded',exercise:ex.name,setId:ex.sets[si].id,outcome:ex.sets[si].outcome}}
  });
}
registerAgentTools();
