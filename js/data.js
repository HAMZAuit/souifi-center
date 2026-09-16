/* ================= DATA (per-language) ================= */
var PROGRAMS = [
 {code:"CS-PRI",seed:"centre-souifi-prim",
  en:{title:"Primary · CP → CM2",meta:"EVENING SESSIONS",tag:"Solid foundations for a big life.",desc:"Homework help, mathematics, French and scientific discovery — small groups, gentle methodology, and homework finished and understood before home.",days:"Set with the teacher",length:"All school year",level:"CP – CM2",fee:"250 MAD / month",teacher:"Nadia Tazi & team"},
  fr:{title:"Primaire · CP → CM2",meta:"SÉANCES DU SOIR",tag:"Des bases solides pour une grande vie !",desc:"Aide aux devoirs, mathématiques, français et éveil scientifique — petits groupes, méthodologie en douceur, et des devoirs terminés et compris avant la maison.",days:"À définir avec le prof",length:"Toute l'année scolaire",level:"CP – CM2",fee:"250 MAD / mois",teacher:"Nadia Tazi & l'équipe"},
  ar:{title:"الابتدائي · من الأولى إلى السادسة",meta:"حصص مسائية",tag:"أساس متين لحياة كبيرة.",desc:"مساعدة في الواجبات والرياضيات والفرنسية والاكتشاف العلمي — مجموعات صغيرة ومنهجية لطيفة، وواجبات منجزة ومفهومة قبل العودة إلى البيت.",days:"تُحدد مع الأستاذ",length:"السنة الدراسية كاملة",level:"الابتدائي · 1 – 6",fee:"250 درهم / شهريًا",teacher:"نادية التازي والفريق"}},
 {code:"CS-COL",seed:"centre-souifi-col",
  en:{title:"Collège · 1st → 3rd year",meta:"EVENING SESSIONS",tag:"Progress today, succeed tomorrow.",desc:"Mathematics, physical sciences, SVT, French and English — plus methodology & organisation and steady preparation for the 3rd-year regional exam.",days:"Set with the teacher",length:"All school year",level:"1ère – 3ème AC",fee:"300 MAD / month",teacher:"Omar Chraibi"},
  fr:{title:"Collège · De la 1ère à la 3ème",meta:"SÉANCES DU SOIR",tag:"Progresser aujourd'hui, réussir demain !",desc:"Mathématiques, sciences physiques, SVT, français et anglais — plus méthodologie & organisation et une préparation solide à l'examen régional de la 3ème année.",days:"À définir avec le prof",length:"Toute l'année scolaire",level:"1ère – 3ème AC",fee:"300 MAD / mois",teacher:"Omar Chraibi"},
  ar:{title:"الإعدادي · من الأولى إلى الثالثة",meta:"حصص مسائية",tag:"تقدّم اليوم، انجح غدًا.",desc:"الرياضيات والعلوم الفيزيائية وعلوم الحياة والأرض والفرنسية والإنكليزية — مع المنهجية والتنظيم وتحضير متين للامتحان الجهوي للثالثة إعدادي.",days:"تُحدد مع الأستاذ",length:"السنة الدراسية كاملة",level:"الأولى – الثالثة إعدادي",fee:"300 درهم / شهريًا",teacher:"عمر الشرايبي"}},
 {code:"CS-LYC",seed:"centre-souifi-lyc",
  en:{title:"Lycée · TC → 2BAC",meta:"EVENING SESSIONS",tag:"Ambition today, achievement tomorrow.",desc:"Maths, Physics-Chemistry, SVT, Economics & Management, Philosophy, French and English — with preparation for the 1BAC regional and 2BAC national exams, plus orientation and confidence.",days:"Set with the teacher",length:"All school year",level:"TC – 2BAC",fee:"350 MAD / month",teacher:"Salma Benkirane"},
  fr:{title:"Lycée · Seconde → Terminale",meta:"SÉANCES DU SOIR",tag:"Ambition aujourd'hui, réussite demain !",desc:"Maths, Physique-Chimie, SVT, Économie & Gestion, Philosophie, français et anglais — avec préparation au régional de 1BAC et au national de 2BAC, orientation et confiance.",days:"À définir avec le prof",length:"Toute l'année scolaire",level:"TC – 2BAC",fee:"350 MAD / mois",teacher:"Salma Benkirane"},
  ar:{title:"التأهيلي · الجذع – الثانية باك",meta:"حصص مسائية",tag:"طموح اليوم، نجاح الغد.",desc:"الرياضيات والفيزياء-الكيمياء وعلوم الحياة والأرض والاقتصاد والتدبير والفلسفة واللغات — مع التحضير للجهوي الأولى باك والوطني الثانية باك، والتوجيه والثقة.",days:"تُحدد مع الأستاذ",length:"السنة الدراسية كاملة",level:"الجذع المشترك – 2باك",fee:"350 درهم / شهريًا",teacher:"سلمى بنكيران"}},
 {code:"CS-LNG",seed:"centre-souifi-lang",
  en:{title:"Languages · FR · EN · AR",meta:"EVENING SESSIONS",tag:"Speak a language, open the world.",desc:"French, English and Arabic in small level-matched groups — conversation first, grammar quietly comes along.",days:"Set with the teacher",length:"All school year",level:"All levels",fee:"250 MAD / month",teacher:"Nadia Tazi"},
  fr:{title:"Langues · Français · Anglais · Arabe",meta:"SÉANCES DU SOIR",tag:"Parler une langue, ouvrir le monde.",desc:"Français, anglais et arabe en petits groupes par niveau — la conversation d'abord, la grammaire suit en silence.",days:"À définir avec le prof",length:"Toute l'année scolaire",level:"Tous niveaux",fee:"250 MAD / mois",teacher:"Nadia Tazi"},
  ar:{title:"اللغات · الفرنسية · الإنكليزية · العربية",meta:"حصص مسائية",tag:"أتقن لغة، افتح العالم.",desc:"الفرنسية والإنكليزية والعربية في مجموعات صغيرة حسب المستوى — المحادثة أولًا، والقواعد تأتي خلسة.",days:"تُحدد مع الأستاذ",length:"السنة الدراسية كاملة",level:"كل المستويات",fee:"250 درهم / شهريًا",teacher:"نادية التازي"}},
 {code:"CS-ETD",seed:"centre-souifi-etude",
  en:{title:"Supervised Study",meta:"EVERY EVENING",tag:"Homework done — and understood.",desc:"A quiet room, a teacher walking between the desks, and progress tracked for every pupil. Open to all levels.",days:"Every evening",length:"All school year",level:"All levels",fee:"200 MAD / month",teacher:"Rotating teachers"},
  fr:{title:"Étude surveillée",meta:"TOUS LES SOIRS",tag:"Les devoirs faits — et compris.",desc:"Une salle calme, un enseignant qui circule entre les tables, et un suivi des progrès pour chaque élève. Ouvert à tous les niveaux.",days:"Tous les soirs",length:"Toute l'année scolaire",level:"Tous niveaux",fee:"200 MAD / mois",teacher:"Enseignants en rotation"},
  ar:{title:"الدراسة الموجّهة",meta:"كل مساء",tag:"الواجبات منجزة — ومفهومة.",desc:"قاعة هادئة، وأستاذ يتنقل بين المكاتب، وتتبع لتقدم كل تلميذ. مفتوحة لجميع المستويات.",days:"كل مساء",length:"السنة الدراسية كاملة",level:"كل المستويات",fee:"200 درهم / شهريًا",teacher:"أساتذة بالتناوب"}},
 {code:"CS-EXM",seed:"centre-souifi-exam",
  en:{title:"Exam Prep · Regional & National",meta:"BEFORE EACH EXAM",tag:"Six weeks before the exam. Together.",desc:"Before every official exam — 3AC regional, 1BAC regional, 2BAC national — a six-week sprint: past papers, mock exams under real conditions, and a revision plan your child actually follows.",days:"6 weeks before the exam",length:"6-week sprints",level:"3AC · 1BAC · 2BAC",fee:"400 MAD / sprint",teacher:"The full team"},
  fr:{title:"Préparation aux examens · Régional & National",meta:"AVANT CHAQUE EXAMEN",tag:"Six semaines avant l'examen. Ensemble.",desc:"Avant chaque examen officiel — régional 3AC, régional 1BAC, national 2BAC — un sprint de six semaines : annales, examens blancs en conditions réelles, et un plan de révision que votre enfant suit vraiment.",days:"6 semaines avant l'examen",length:"Sprints de 6 semaines",level:"3AC · 1BAC · 2BAC",fee:"400 MAD / sprint",teacher:"Toute l'équipe"},
  ar:{title:"التحضير للامتحانات · الجهوي والوطني",meta:"قبل كل امتحان",tag:"ستة أسابيع قبل الامتحان. معًا.",desc:"قبل كل امتحان رسمي — الجهوي الثالثة إعدادي، الجهوي الأولى باك، الوطني الثانية باك — ستة أسابيع مكثفة: امتحانات سابقة، اختبارات تجريبية بشروط حقيقية، وخطة مراجعة يلتزم بها ابنك فعلًا.",days:"6 أسابيع قبل الامتحان",length:"6 أسابيع مكثفة",level:"3إعدادي · 1باك · 2باك",fee:"400 درهم / أسابيع",teacher:"الفريق كاملًا"}}
];
var LI = {en:0,fr:1,ar:2};
var QUOTES = [
 {en:{q:"My son went from hiding at the back of the class to raising his hand. That is worth more than any mark.",n:"Khadija",m:"Mother of a 2AC pupil"},
  fr:{q:"Mon fils est passé du fond de la classe à la main levée. Ça vaut plus que n'importe quelle note.",n:"Khadija",m:"Mère d'un élève de 2AC"},
  ar:{q:"ابني انتقل من الاختباء في مؤخرة القسم إلى رفع يده. وهذا أثمن من أي نقطة.",n:"خديجة",m:"والد تلميذ في الثانية إعدادي"}},
 {en:{q:"I used to copy homework without understanding. Now I'm the one explaining the exercise to my classmates.",n:"Omar, 15",m:"3AC — regional exam year"},
  fr:{q:"Avant, je copiais les devoirs sans comprendre. Maintenant, c'est moi qui explique l'exercice aux autres.",n:"Omar, 15",m:"3AC — année du régional"},
  ar:{q:"كنت أنسخ الواجبات دون فهم. واليوم أنا من يشرح التمرين لزملائي.",n:"عمر، 15 سنة",m:"الثالثة إعدادي — سنة الجهوي"}},
 {en:{q:"The regional exam looked like a mountain. We climbed it together, chapter by chapter.",n:"Salma, 17",m:"1BAC Sciences"},
  fr:{q:"Le régional ressemblait à une montagne. On l'a gravie ensemble, chapitre par chapitre.",n:"Salma, 17",m:"1BAC Sciences"},
  ar:{q:"كان الامتحان الجهوي يبدو جبلًا. تسلّقناه معًا، فصلًا بعد فصل.",n:"سلمى، 17 سنة",m:"الأولى باك علوم"}},
 {en:{q:"Two evenings a week here, and his maths average went from 8 to 13. I checked the grade sheet myself.",n:"Mustapha",m:"Father of a 1BAC pupil"},
  fr:{q:"Deux soirs par semaine ici, et sa moyenne de maths est passée de 8 à 13. J'ai vérifié la copie moi-même.",n:"Mustapha",m:"Père d'un élève de 1BAC"},
  ar:{q:"مساءان في الأسبوع هنا، وصعد معدله في الرياضيات من 8 إلى 13. تحققت من ورقة النقاط بنفسي.",n:"مصطفى",m:"والد تلميذ في الأولى باك"}}
];

/* ---- ROOMS (the 4 salles — profs pick whichever they want) ----
   images: placeholder seeds now. When you have real photos, replace each entry
   with your file path, e.g. images:"salle1.jpg" → "images/salle1-1.jpg"
   (any entry containing "/" is used as a direct path, no code change needed). */
var ROOMS_DATA = [
 {num:"01",images:["cs-room1-a","cs-room1-b","cs-room1-c","cs-room1-d"],
  name:{en:"The big room",fr:"La grande salle",ar:"القاعة الكبرى"},
  tag:{en:"Main classes · all levels",fr:"Cours principaux · tous niveaux",ar:"الدروس الرئيسية · كل المستويات"}},
 {num:"02",images:["cs-room2-a","cs-room2-b","cs-room2-c","cs-room2-d"],
  name:{en:"The quiet room",fr:"La salle calme",ar:"القاعة الهادئة"},
  tag:{en:"Small groups · homework help",fr:"Petits groupes · aide aux devoirs",ar:"مجموعات صغيرة · دعم الواجبات"}},
 {num:"03",images:["cs-room3-a","cs-room3-b","cs-room3-c","cs-room3-d"],
  name:{en:"The languages room",fr:"La salle des langues",ar:"قاعة اللغات"},
  tag:{en:"Conversation · FR · EN · AR",fr:"Conversation · FR · EN · AR",ar:"محادثة · فر · إنج · ع"}},
 {num:"04",images:["cs-room4-a","cs-room4-b","cs-room4-c","cs-room4-d"],
  name:{en:"The lycée room",fr:"La salle du lycée",ar:"قاعة التأهيلي"},
  tag:{en:"TC – 2BAC sessions",fr:"Séances TC – 2BAC",ar:"حصص الجذع – 2باك"}}
];

/* ---- TEACHERS (demo names — replace with the real profs) ----
   whatsapp: teacher's own number, digits only — used ONLY if direct:true
   direct:   true = publish teacher's number (consented) · false = route via the centre   */
var TEACHERS = [
 {seed:"souifi-prof-yassine", levels:["college","lycee"], direct:false, whatsapp:"",
  name:{en:"Yassine El Amrani",fr:"Yassine El Amrani",ar:"ياسين العمراني"},
  subject:{en:"Mathematics",fr:"Mathématiques",ar:"الرياضيات"},
  bio:{en:"Fifteen years in a public collège; by evening, makes the formulas finally click.",fr:"Quinze ans dans un collège public ; le soir, il fait enfin cliquer les formules.",ar:"خمسة عشر عامًا في إعدادي عمومي؛ ومساءً يشرح حتى تترسخ الصيغ أخيرًا."},
  badge:{en:"School teacher",fr:"Enseignant titulaire",ar:"أستاذ معتمد"},
  exp:{en:"15 years",fr:"15 ans",ar:"15 سنة"}},
 {seed:"souifi-prof-salma", levels:["lycee"], direct:false, whatsapp:"",
  name:{en:"Salma Benkirane",fr:"Salma Benkirane",ar:"سلمى بنكيران"},
  subject:{en:"Physics-Chemistry",fr:"Physique-Chimie",ar:"الفيزياء والكيمياء"},
  bio:{en:"Her rule: understand first, memorize never.",fr:"Sa règle : comprendre d'abord, mémoriser jamais.",ar:"قاعدتها: افهم أولًا، ولا تحفظ أبدًا."},
  badge:{en:"School teacher",fr:"Enseignante titulaire",ar:"أستاذة معتمدة"},
  exp:{en:"10 years",fr:"10 ans",ar:"10 سنوات"}},
 {seed:"souifi-prof-omar", levels:["college"], direct:false, whatsapp:"",
  name:{en:"Omar Chraibi",fr:"Omar Chraibi",ar:"عمر الشرايبي"},
  subject:{en:"SVT & Sciences",fr:"SVT & Sciences",ar:"علوم الحياة والأرض"},
  bio:{en:"Turns every chapter into a story you can retell at dinner.",fr:"Transforme chaque chapitre en une histoire qu'on peut raconter au dîner.",ar:"يحوّل كل درس إلى حكاية يمكنك إعادتها على العشاء."},
  badge:{en:"School teacher",fr:"Enseignant titulaire",ar:"أستاذ معتمد"},
  exp:{en:"8 years",fr:"8 ans",ar:"8 سنوات"}},
 {seed:"souifi-prof-nadia", levels:["primary","college"], direct:true, whatsapp:"212600000000",
  name:{en:"Nadia Tazi",fr:"Nadia Tazi",ar:"نادية التازي"},
  subject:{en:"Languages · FR · EN · AR",fr:"Langues · FR · EN · AR",ar:"اللغات: الفرنسية · الإنكليزية · العربية"},
  bio:{en:"Conversation first. Grammar quietly comes along.",fr:"La conversation d'abord. La grammaire suit en silence.",ar:"المحادثة أولًا. والقواعد تأتي خلسة."},
  badge:{en:"School teacher",fr:"Enseignante titulaire",ar:"أستاذة معتمدة"},
  exp:{en:"11 years",fr:"11 ans",ar:"11 سنة"}},
 {seed:"souifi-prof-rachid", levels:["primary","college","lycee"], direct:false, whatsapp:"",
  name:{en:"Rachid Bennis",fr:"Rachid Bennis",ar:"رشيد بنيس"},
  subject:{en:"Arabic & Study Methods",fr:"Arabe & Méthodologie",ar:"العربية ومناهج المذاكرة"},
  bio:{en:"Teaches how to learn, not just what to learn.",fr:"Enseigne comment apprendre, pas seulement quoi apprendre.",ar:"يعلّم كيف تتذاكر، لا ماذا تذاكر فقط."},
  badge:{en:"Former school director",fr:"Ex-directeur d'école",ar:"مدير مدرسة سابق"},
  exp:{en:"22 years",fr:"22 ans",ar:"22 سنة"}}
];
function pic(seed) { return "https://picsum.photos/seed/" + seed + "/640/420.jpg"; }
