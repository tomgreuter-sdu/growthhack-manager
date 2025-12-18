import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, MessageSquare, Settings, Home, Bell, ChevronRight, X, CheckCircle, Zap, Lock } from 'lucide-react';
import InstallPrompt from './components/InstallPrompt.tsx';

const GrowthHackApp = ({ userName }) => {
  const [currentView, setCurrentView] = useState('home');
  const [showStreakInfo, setShowStreakInfo] = useState(false);
  const [user, setUser] = useState({
    name: userName,
    role: 'Medior Software Developer',
    level: 3,
    xp: 850,
    xpToNext: 1000,
    streak: 7,
    age: 29,
    experience: '5 jaar'
  });

  const [growthPlan, setGrowthPlan] = useState({
    goals: [
      {
        id: 1,
        title: 'Technisch leiderschap & code reviews',
        progress: 65,
        category: 'Technisch Leiderschap',
        completed: false,
        smart: {
          specific: 'Ik wil code reviews kunnen begeleiden en architectuurbeslissingen onderbouwen richting team en stakeholders.',
          measurable: 'Dit meet ik aan de hand van: (1) Leiden van 5 architectuur review sessies, (2) Scoren 8+ op code review kwaliteit feedback, (3) Presenteren van 2 technische beslissingen aan team.',
          achievable: 'Ik heb al goede technische basis en krijg support van mijn tech lead. Ik plan wekelijks tijd voor review sessions.',
          relevant: 'Dit is cruciaal voor doorgroei naar senior developer en wordt verwacht voor die rol.',
          timeBound: 'Ik wil dit doel bereiken binnen 6 maanden (juni 2025).'
        }
      },
      {
        id: 2,
        title: 'Stakeholder management verbeteren',
        progress: 45,
        category: 'Communicatie',
        completed: false,
        smart: {
          specific: 'Ik wil effectiever communiceren met product en business stakeholders over technische onderwerpen.',
          measurable: 'Dit meet ik door: (1) Leiden van 3 stakeholder presentaties, (2) Feedback van Martijn (PO) score 8+, (3) Succesvol uitleggen van 5 technische trade-offs.',
          achievable: 'Ik krijg al positieve feedback over mijn uitleg vaardigheden. Ik kan shadowing doen bij senior developers.',
          relevant: 'Senior developers moeten techniek vertalen naar business waarde.',
          timeBound: 'Binnen 5 maanden (mei 2025) wil ik dit onder de knie hebben.'
        }
      },
      {
        id: 3,
        title: 'Systeemdenken & architectuur',
        progress: 55,
        category: 'Technisch',
        completed: false,
        smart: {
          specific: 'Ik wil overzicht krijgen over grotere systemen en technische debt kunnen managen.',
          measurable: 'Dit meet ik door: (1) Voltooien van system design cursus, (2) Leiden van 1 refactoring initiative, (3) Creëren van architectuur documentatie voor 2 systemen.',
          achievable: 'Ik heb microservices ervaring en krijg tijd om architectuur te bestuderen.',
          relevant: 'Systeemdenken is een core competentie voor senior developers.',
          timeBound: 'Binnen 8 maanden (augustus 2025) wil ik dit bereiken.'
        }
      },
      {
        id: 4,
        title: 'Mentorschap junior developers',
        progress: 40,
        category: 'Leiderschap',
        completed: false,
        smart: {
          specific: 'Ik wil actief junior developers begeleiden in hun ontwikkeling en growth.',
          measurable: 'Dit meet ik door: (1) Mentor worden van 1 junior, (2) Maandelijkse feedback sessies, (3) Junior laat meetbare groei zien (feedback score).',
          achievable: 'Ik heb ervaring met pair programming en code reviews. HR ondersteunt met mentorship training.',
          relevant: 'Mentoring is een verwachte competentie voor senior developers.',
          timeBound: 'Ik start in januari 2025 en wil na 4 maanden een actieve mentor zijn.'
        }
      },
      {
        id: 5,
        title: 'Zichtbaarheid & knowledge sharing',
        progress: 30,
        category: 'Zichtbaarheid',
        completed: false,
        smart: {
          specific: 'Ik wil mijn kennis en expertise meer zichtbaar maken binnen en buiten het team.',
          measurable: 'Dit meet ik door: (1) Schrijven van 2 tech blog posts, (2) Leiden van 3 knowledge sharing sessies, (3) Presenteren op 1 internal tech event.',
          achievable: 'Ik heb goede communicatie skills (feedback bevestigt dit). Bedrijf stimuleert knowledge sharing.',
          relevant: 'Zichtbaarheid helpt bij senior promotie en career growth.',
          timeBound: 'Binnen 6 maanden (juni 2025) wil ik dit gerealiseerd hebben.'
        }
      }
    ],
    skills: [
      { name: 'Code Review Kwaliteit', level: 7, maxLevel: 10, baseline: 5 },
      { name: 'Architectuur Kennis', level: 6, maxLevel: 10, baseline: 4 },
      { name: 'Stakeholder Communicatie', level: 6, maxLevel: 10, baseline: 4 },
      { name: 'Systeemdenken', level: 5, maxLevel: 10, baseline: 3 },
      { name: 'Mentoring/Coaching', level: 5, maxLevel: 10, baseline: 3 }
    ]
  });

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      from: 'Tech Lead',
      date: '2024-12-10',
      type: 'positief',
      text: `${userName}'s code reviews zijn zeer waardevol. Ze stelt de juiste vragen en helpt het team beter te worden. Haar technische uitleg is helder.`,
      tags: ['Code Review', 'Technisch Leiderschap'],
      context: 'Tijdens architectuur review sessie'
    },
    {
      id: 2,
      from: 'Martijn (Product Owner)',
      date: '2024-12-05',
      type: 'positief',
      text: `${userName} denkt goed mee over technische oplossingen en legt deze helder uit. Ze maakt complexe techniek begrijpelijk voor business.`,
      tags: ['Communicatie', 'Stakeholder Management'],
      context: 'Na sprint planning meeting'
    },
    {
      id: 3,
      from: 'Junior Developer (mentee)',
      date: '2024-11-28',
      type: 'positief',
      text: `${userName} neemt echt tijd voor uitleg tijdens pair programming. Ze helpt me begrijpen waarom bepaalde keuzes gemaakt worden.`,
      tags: ['Mentoring', 'Knowledge Sharing'],
      context: 'Maandelijkse feedback sessie'
    },
    {
      id: 4,
      from: 'Collega Developer',
      date: '2024-11-20',
      type: 'ontwikkeling',
      text: 'Code reviews zijn top. Voor senior niveau: misschien meer focus op system design patterns en technical debt management?',
      tags: ['Code Review', 'Architectuur'],
      context: 'Peer feedback tijdens retrospective'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'groei-checkin', message: 'Tijd voor je maandelijkse groei check-in met je tech lead! 🌱', date: new Date(), read: false },
    { id: 2, type: 'ai-insight', message: 'Tips & tricks: System Design resources voor senior developer transitie', date: new Date(), read: false }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    shareGoals: true,
    shareFeedback: false,
    shareSkills: true,
    shareProgress: true
  });

  const [aiInsights, setAiInsights] = useState([
    {
      type: 'patroon',
      title: 'Sterke communicatie skills gedetecteerd',
      insight: 'Je communicatieve vaardigheden worden consistent genoemd als sterke punt. Zowel tech lead als Martijn (PO) waarderen hoe je technische concepten uitlegt. Dit is cruciaal voor senior niveau!',
      action: 'Vergroot je zichtbaarheid: geef een presentatie over een recent architectuurbesluit tijdens team knowledge sharing.'
    },
    {
      type: 'advies',
      title: 'Volgende stap naar senior: System design',
      insight: 'Je code review skills zijn sterk (7/10), maar voor senior moet je systeemdenken nog ontwikkelen (nu 5/10). Focus hierop voor je doorgroei.',
      action: 'Start met System Design cursus en plan een architecture review session met een senior architect.'
    },
    {
      type: 'groei',
      title: 'Mentorship opportuniteit',
      insight: 'Je hebt al ervaring met kennisdeling tijdens pair programming. Een junior developer geeft positieve feedback. Dit is een perfecte base voor formeel mentorschap.',
      action: 'Vraag HR naar mentorship training en wordt mentor van een junior developer in je team.'
    },
    {
      type: 'zichtbaarheid',
      title: 'Vergroot je impact & zichtbaarheid',
      insight: 'Voor senior promotie moet je expertise zichtbaar zijn. Je hebt nu 30% van je zichtbaarheid doel bereikt.',
      action: 'Plan je eerste tech blog post over een recent project of schrijf documentatie voor een architectuur beslissing.'
    }
  ]);

  const [feedbackQuestions] = useState([
    {
      category: 'Architectuur',
      questions: [
        'Hoe ervaar je mijn bijdrage tijdens onze architectuurdiscussies? Waar kan ik meer waarde toevoegen?',
        'Communiceer ik technische trade-offs helder genoeg? Mis je soms context?'
      ]
    },
    {
      category: 'Stakeholder Management',
      questions: [
        'Martijn, communiceer ik requirements helder genoeg terug? Mis je soms technische context?',
        'Hoe ervaar je mijn uitleg van technische concepten? Waar kan ik dit verbeteren?'
      ]
    },
    {
      category: 'Code Review',
      questions: [
        'Hoe ervaar je de code reviews die ik geef? Zijn ze constructief en leerzaam?',
        'Welke aspecten van mijn reviews vind je het meest waardevol?'
      ]
    },
    {
      category: 'Mentoring',
      questions: [
        'Als mijn mentee: voel je je goed begeleid in je ontwikkeling?',
        'Wat kan ik verbeteren in mijn coaching/mentoring aanpak?'
      ]
    },
    {
      category: 'Algemeen',
      questions: [
        'Welke situatie deze sprint vond je dat ik goed/minder goed heb aangepakt?',
        'Waar zie je de meeste groei bij mij de afgelopen maand?'
      ]
    }
  ]);

  const handleNotificationClick = (notification) => {
    if (notification.type === 'groei-checkin') {
      setCurrentView('appointment');
    } else if (notification.type === 'ai-insight') {
      setCurrentView('ai-insights');
    }
    setNotifications(prev => prev.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));
  };

  const Logo = () => (
    <svg width="24" height="24" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M128.44 61H110.728V148.041H164.932V133.198H128.44V61Z" fill="currentColor" />
      <path d="M81.4917 133.198H45V148.041H99.3108V61H81.4917V133.198Z" fill="currentColor" />
      <path d="M185.501 208.61L20.8013 201.91C13.6013 201.61 7.9013 195.61 8.0013 188.41V20.3096C8.1013 13.5096 14.8013 7.90956 21.5013 7.60956L186.201 1.00956C194.701 0.709559 201.801 7.50956 201.801 16.0096V192.91C201.801 201.81 194.401 208.91 185.501 208.61ZM27.1013 186.61L181.001 191.11C183.201 191.11 185.101 189.41 185.101 187.11V21.1096C185.101 19.0096 183.501 17.3096 181.401 17.4096L27.2013 22.9096C24.4013 22.9096 22.2013 25.3096 22.2013 28.0096V181.51C22.2013 184.21 24.4013 186.41 27.1013 186.51V186.61Z" fill="currentColor" />
    </svg>
  );

  const HomeView = () => (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Hoi {userName}! 👋</h2>
            <p className="text-purple-100">Level {user.level} Growth Hacker</p>
          </div>
          <button
            onClick={() => setShowStreakInfo(!showStreakInfo)}
            className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold relative"
          >
            🔥 {user.streak} weken streak
          </button>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-xl p-4 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Op weg naar Level 4 Growth Hacker 🎯</span>
            <span className="text-sm font-bold">{user.xp} / {user.xpToNext} XP</span>
          </div>
          <div className="bg-white/30 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(user.xp / user.xpToNext) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streak Info Modal */}
      {showStreakInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStreakInfo(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">🔥 Streak Uitleg</h3>
              <button onClick={() => setShowStreakInfo(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Je bent al {user.streak} weken actief bezig met je ontwikkeling!
            </p>
            <p className="text-sm text-gray-600">
              Minstens 1 aantekening toegevoegd of actie uitgevoerd per week. Blijf actief om je streak te behouden!
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats with Gradient Border */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCurrentView('goals')}
          className="bg-white rounded-xl p-4 text-left active:scale-95 transition-transform relative overflow-hidden"
          style={{
            background: 'white',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #9646dc, #ffb114)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}
        >
          <Target size={24} className="mb-2 text-[#9646dc]" />
          <p className="text-2xl font-bold text-gray-900">{growthPlan.goals.length}</p>
          <p className="text-sm text-gray-600">Actieve doelen</p>
          <p className="text-xs text-purple-600 mt-1 font-medium">Senior transitie</p>
        </button>
        <button
          onClick={() => setCurrentView('feedback')}
          className="bg-white rounded-xl p-4 text-left active:scale-95 transition-transform relative overflow-hidden"
          style={{
            background: 'white',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #ffb114, #9646dc)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
          }}
        >
          <MessageSquare size={24} className="mb-2 text-[#ffb114]" />
          <p className="text-2xl font-bold text-gray-900">{feedback.length}</p>
          <p className="text-sm text-gray-600">Feedback items</p>
          <p className="text-xs text-orange-600 mt-1 font-medium">360° reviews</p>
        </button>
      </div>

      {/* AI Insights - Compact */}
      <div className="bg-white rounded-xl border-2 border-purple-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-500" size={20} />
            <h3 className="font-bold text-gray-900">AI Insights voor jou</h3>
          </div>
          <button
            onClick={() => setCurrentView('ai-insights')}
            className="text-purple-600 text-sm font-semibold flex items-center gap-1"
          >
            Alles <ChevronRight size={16} />
          </button>
        </div>
        {aiInsights.slice(0, 2).map((insight, idx) => (
          <div key={idx} className="bg-purple-50 rounded-lg p-3 mb-2 last:mb-0">
            <p className="text-sm font-semibold text-purple-900 mb-1 truncate">{insight.title}</p>
            <p className="text-xs text-gray-700 mb-2 line-clamp-1">{insight.insight}</p>
            <p className="text-xs text-purple-600 font-medium truncate flex items-center gap-1">
              <Zap size={12} className="flex-shrink-0" />
              <span className="truncate">{insight.action}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Notifications - Clickable */}
      {notifications.filter(n => !n.read).length > 0 && (
        <div className="space-y-2">
          {notifications.filter(n => !n.read).map(notification => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-left active:bg-blue-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Bell className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-blue-900 mb-1">Nieuwe notificatie</p>
                  <p className="text-sm text-blue-700">{notification.message}</p>
                  <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
                    {notification.type === 'groei-checkin' ? 'Maak afspraak' : 'Bekijk'} <ChevronRight size={14} />
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const SkillsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Jouw Skills</h2>
        <p className="text-sm text-gray-600 mb-4">Senior competenties voor developer transitie</p>

        {growthPlan.skills.map((skill, idx) => (
          <div key={idx} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{skill.name}</span>
              <div className="flex items-center gap-2">
                {skill.level > skill.baseline && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    +{skill.level - skill.baseline} 📈
                  </span>
                )}
                <span className="text-sm font-bold text-purple-600">
                  {skill.level}/{skill.maxLevel}
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-400 z-10"
                style={{ left: `${(skill.baseline / skill.maxLevel) * 100}%` }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-400 rounded-full" />
              </div>

              {/* Senior target indicator at 7/10 */}
              <div
                className="absolute top-0 h-full w-0.5 bg-purple-400 z-10"
                style={{ left: '70%' }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
              </div>

              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                Start: {skill.baseline}
              </span>
              <span className="text-xs text-purple-600 font-medium">
                Senior target: 7
              </span>
              <span className="text-xs text-gray-500">
                Groei: {((skill.level - skill.baseline) / skill.baseline * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-purple-500" size={20} />
          <h3 className="font-semibold text-purple-900">AI Groei-advies</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Je Code Review skill (7/10) heeft senior niveau bereikt! Focus nu op Systeemdenken (5/10) voor je volgende stap.
        </p>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full active:bg-purple-600 transition-colors">
          Bekijk vervolgacties
        </button>
      </div>
    </div>
  );

  const FeedbackView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900">360° Feedback</h2>
        <p className="text-sm text-gray-600 mb-4">Gerichte feedback van team, stakeholders en mentee</p>

        <button
          onClick={() => setCurrentView('feedback-questions')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold w-full mb-4 flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          <MessageSquare size={20} />
          Vraag gerichte feedback aan
        </button>

        <div className="space-y-3">
          {feedback.map(item => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-400">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{item.from}</p>
                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('nl-NL')}</p>
                  {item.context && (
                    <p className="text-xs text-purple-600 mt-1">📍 {item.context}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${item.type === 'positief'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
                  }`}>
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{item.text}</p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-900">AI Feedback Analyse</h3>
        </div>
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-1">🔍 Rode draad gedetecteerd</p>
            <p className="text-xs text-gray-700">
              Communicatie is je sterkte punt (4x genoemd). Tech lead, PO én mentee waarderen je uitleg vaardigheden. Dit is senior-niveau!
            </p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-1">💡 Ontwikkelpunt</p>
            <p className="text-xs text-gray-700">
              Focus op system design patterns en technical debt voor volgende stap naar senior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const FeedbackQuestionsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Gerichte Feedbackvragen</h2>
        <p className="text-sm text-gray-600 mb-4">
          Gebruik deze vragen om specifieke feedback te vragen aan je team
        </p>

        {feedbackQuestions.map((category, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.questions.map((question, qIdx) => (
                <div key={qIdx} className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-400">
                  <p className="text-sm text-gray-700">{question}</p>
                  <button className="text-xs text-purple-600 font-medium mt-2">
                    Kopieer vraag →
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800 mb-2">
          💡 <strong>Tip:</strong> Vraag feedback altijd na een concrete situatie
        </p>
        <p className="text-xs text-blue-700">
          Bijvoorbeeld: na een architectuur review, presentatie, of code review sessie.
        </p>
      </div>

      <button
        onClick={() => setCurrentView('feedback')}
        className="w-full bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold active:bg-purple-600 transition-colors"
      >
        ← Terug naar Feedback
      </button>
    </div>
  );

  const GoalsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Jouw Groeidoelen</h2>
        <p className="text-sm text-gray-600 mb-4">Senior Developer transitie binnen 12-18 maanden</p>

        {growthPlan.goals.map(goal => (
          <div key={goal.id} className="mb-6 last:mb-0 bg-gray-50 rounded-xl p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{goal.title}</h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {goal.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{goal.progress}%</div>
                <div className="text-xs text-gray-500">voortgang</div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-purple-900 mb-1">🎯 Specifiek</p>
                <p className="text-gray-700">{goal.smart.specific}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-1">📊 Meetbaar</p>
                <p className="text-gray-700">{goal.smart.measurable}</p>
              </div>
              <div>
                <p className="font-semibold text-green-900 mb-1">✅ Haalbaar</p>
                <p className="text-gray-700">{goal.smart.achievable}</p>
              </div>
              <div>
                <p className="font-semibold text-orange-900 mb-1">🔗 Relevant</p>
                <p className="text-gray-700">{goal.smart.relevant}</p>
              </div>
              <div>
                <p className="font-semibold text-red-900 mb-1">⏰ Tijdsgebonden</p>
                <p className="text-gray-700">{goal.smart.timeBound}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentView('home')}
        className="w-full bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold active:bg-purple-600 transition-colors"
      >
        ← Terug naar Home
      </button>
    </div>
  );

  const NotificationsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-purple-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Notificaties</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Al je notificaties op één plek
        </p>

        <div className="space-y-3">
          {notifications.map(notification => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full rounded-xl p-4 text-left border-2 transition-colors ${notification.read
                ? 'bg-gray-50 border-gray-200'
                : 'bg-blue-50 border-blue-200 active:bg-blue-100'
                }`}
            >
              <div className="flex items-start gap-3">
                <Bell className={`mt-1 flex-shrink-0 ${notification.read ? 'text-gray-400' : 'text-blue-500'}`} size={20} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-blue-900'}`}>
                      {notification.type === 'groei-checkin' ? 'Groei Check-in' : 'Tips & Tricks'}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-blue-700'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.date).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {notifications.every(n => n.read) && (
          <div className="text-center py-8">
            <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
            <p className="text-gray-600 font-medium">Je bent helemaal bij!</p>
            <p className="text-sm text-gray-500 mt-1">Geen nieuwe notificaties</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentView('home')}
        className="w-full bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold active:bg-purple-600 transition-colors"
      >
        ← Terug naar Home
      </button>
    </div>
  );

  const AIInsightsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Op basis van je voortgang, feedback en senior competenties genereert AI persoonlijke inzichten.
        </p>

        <div className="space-y-3">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-400">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-purple-900 mb-1">{insight.title}</p>
                  <span className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                    {insight.type === 'patroon' && '🔍 Patroon'}
                    {insight.type === 'advies' && '💡 Advies'}
                    {insight.type === 'groei' && '📈 Groei'}
                    {insight.type === 'zichtbaarheid' && '👀 Zichtbaarheid'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
              <div className="bg-white rounded-lg p-3 border-l-4 border-orange-400">
                <p className="text-xs font-semibold text-gray-900 mb-1">Aanbevolen actie:</p>
                <p className="text-sm text-gray-700">{insight.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrentView('home')}
        className="w-full bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold active:bg-purple-600 transition-colors"
      >
        ← Terug naar Home
      </button>
    </div>
  );

  const AppointmentView = () => {
    const [appointmentData, setAppointmentData] = useState({
      date: '',
      time: '',
      duration: '30',
      notes: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSend = () => {
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setCurrentView('home');
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Maandelijkse groei check-in</h2>
          <p className="text-sm text-gray-600 mb-6">Plan een afspraak met je tech lead voor ontwikkeling bespreking</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Datum *
              </label>
              <input
                type="date"
                value={appointmentData.date}
                onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tijd *
              </label>
              <input
                type="time"
                value={appointmentData.time}
                onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duur
              </label>
              <select
                value={appointmentData.duration}
                onChange={(e) => setAppointmentData({ ...appointmentData, duration: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="15">15 minuten</option>
                <option value="30">30 minuten</option>
                <option value="45">45 minuten</option>
                <option value="60">60 minuten</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gespreksonderwerpen (optioneel)
              </label>
              <textarea
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                placeholder="Bijv. Voortgang architectuur doel, feedback op code reviews, senior promotie tijdlijn..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                📅 Deze afspraak wordt verstuurd naar je tech lead via Outlook calendar
              </p>
            </div>
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verzonden! ✨</h3>
              <p className="text-gray-600">Je tech lead ontvangt de uitnodiging</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold active:bg-gray-300 transition-colors"
          >
            Annuleren
          </button>
          <button
            onClick={handleSend}
            disabled={!appointmentData.date || !appointmentData.time}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold active:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verzenden
          </button>
        </div>
      </div>
    );
  };

  const PrivacyView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-purple-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Privacy Instellingen</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Bepaal zelf wat je tech lead kan zien. Jouw groei, jouw controle.
        </p>

        <div className="space-y-4">
          <PrivacyToggle
            label="Groeidoelen delen"
            description="Laat je tech lead je senior transitie doelen en voortgang zien"
            value={privacySettings.shareGoals}
            onChange={(val) => setPrivacySettings({ ...privacySettings, shareGoals: val })}
          />

          <PrivacyToggle
            label="Feedback delen"
            description="Geef toegang tot ontvangen 360° feedback van team"
            value={privacySettings.shareFeedback}
            onChange={(val) => setPrivacySettings({ ...privacySettings, shareFeedback: val })}
          />

          <PrivacyToggle
            label="Skills & niveaus delen"
            description="Toon je huidige senior competentie levels en groei"
            value={privacySettings.shareSkills}
            onChange={(val) => setPrivacySettings({ ...privacySettings, shareSkills: val })}
          />

          <PrivacyToggle
            label="Algemene voortgang delen"
            description="Deel overzicht van activiteit en wekelijkse streaks"
            value={privacySettings.shareProgress}
            onChange={(val) => setPrivacySettings({ ...privacySettings, shareProgress: val })}
          />
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-green-900 mb-1">Jouw data, jouw controle</p>
            <p className="text-sm text-green-700">
              Al je persoonlijke ontwikkeldata blijft privé tenzij je actief kiest om het te delen met je tech lead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyToggle = ({ label, description, value, onChange }) => (
    <div className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-purple-500' : 'bg-gray-300'
          }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'
            }`}
        />
      </button>
    </div>
  );

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-3 max-w-md mx-auto">
      <div className="flex justify-around items-center">
        <NavButton icon={Home} label="Home" view="home" />
        <NavButton icon={TrendingUp} label="Skills" view="skills" />
        <NavButton icon={MessageSquare} label="Feedback" view="feedback" />
        <NavButton icon={Settings} label="Privacy" view="privacy" />
      </div>
    </div>
  );

  const NavButton = ({ icon: Icon, label, view }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${currentView === view
        ? 'text-purple-600'
        : 'text-gray-400'
        }`}
    >
      <Icon size={24} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <InstallPrompt />
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <h1 className="text-2xl font-bold">GrowthHack</h1>
                <p className="text-sm text-purple-100">Jouw persoonlijke groeicoach</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('notifications')}
              className="relative"
            >
              <Bell size={24} />
              {notifications.filter(n => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {notifications.filter(n => !n.read).length}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-24">
          {currentView === 'home' && <HomeView />}
          {currentView === 'notifications' && <NotificationsView />}
          {currentView === 'goals' && <GoalsView />}
          {currentView === 'appointment' && <AppointmentView />}
          {currentView === 'skills' && <SkillsView />}
          {currentView === 'feedback' && <FeedbackView />}
          {currentView === 'feedback-questions' && <FeedbackQuestionsView />}
          {currentView === 'privacy' && <PrivacyView />}
          {currentView === 'ai-insights' && <AIInsightsView />}
        </div>

        {/* Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default GrowthHackApp;