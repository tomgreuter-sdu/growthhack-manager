import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, MessageSquare, Settings, Home, Bell, ChevronRight, Users, AlertCircle, CheckCircle, Clock, BookOpen, Zap, X, Award } from 'lucide-react';
import InstallPrompt from './components/InstallPrompt.tsx';

const GrowthHackManager = ({ userName }) => {
    const [currentView, setCurrentView] = useState('home');
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [showStreakInfo, setShowStreakInfo] = useState(false);

    const [user, setUser] = useState({
        name: userName || 'Laura Hendriks',
        role: 'Lead Developer & Engineering Manager',
        level: 4,
        xp: 1250,
        xpToNext: 1500,
        streak: 12,
        age: 38,
        experience: '15 jaar',
        teamSize: 12,
        yearsInLeadership: 10
    });

    const [growthPlan, setGrowthPlan] = useState({
        goals: [
            {
                id: 1,
                title: 'Delegeren & loslaten',
                progress: 70,
                category: 'Leiderschap',
                completed: false,
                smart: {
                    specific: 'Ik wil meer loslaten en mijn teamleden meer verantwoordelijkheid geven, zodat ik tijd heb voor strategisch werk.',
                    measurable: 'Dit meet ik door: (1) 80% van dagelijkse beslissingen delegeren, (2) Teamleden leiden 3 projecten zelfstandig, (3) Team feedback score 8+ op empowerment.',
                    achievable: 'Ik heb een sterk team van 12 developers. Ik krijg coaching van mijn manager op dit gebied.',
                    relevant: 'Dit is cruciaal voor mijn groei als leider en om tijd vrij te maken voor strategische visie.',
                    timeBound: 'Ik wil dit doel bereiken binnen 4 maanden (april 2025).'
                }
            },
            {
                id: 2,
                title: 'Strategisch denken ontwikkelen',
                progress: 45,
                category: 'Strategisch',
                completed: false,
                smart: {
                    specific: 'Ik wil minder in dagelijkse details en meer bezig met langetermijnvisie voor mijn teams.',
                    measurable: 'Dit meet ik door: (1) Quarterly roadmap presenteren aan leadership, (2) Leiden van 2 strategische initiatieven, (3) 50% van mijn tijd aan strategisch werk besteden.',
                    achievable: 'Ik krijg support van senior leadership en kan deelnemen aan strategy sessies. Als ik beter delegeer komt tijd vrij.',
                    relevant: 'Strategisch denken is essentieel voor doorgroei naar head of engineering of director niveau.',
                    timeBound: 'Binnen 6 maanden (juni 2025) wil ik dit bereiken.'
                }
            },
            {
                id: 3,
                title: 'Feedback cultuur versterken',
                progress: 60,
                category: 'Team Culture',
                completed: false,
                smart: {
                    specific: 'Ik wil dat het team elkaar meer feedback geeft zonder dat ik altijd tussenpersoon ben.',
                    measurable: 'Dit meet ik door: (1) Team geeft maandelijks peer feedback, (2) Feedback frequency stijgt met 50%, (3) Psychological safety score 8+.',
                    achievable: 'Ik kan feedback training organiseren en GrowthHack helpt met structuur. Team is open voor groei.',
                    relevant: 'Sterke feedback cultuur maakt mijn teams zelfsturend en verbetert ontwikkeling van iedereen.',
                    timeBound: 'Binnen 5 maanden (mei 2025) wil ik dit geïmplementeerd hebben.'
                }
            },
            {
                id: 4,
                title: 'Technisch scherp blijven',
                progress: 55,
                category: 'Technisch',
                completed: false,
                smart: {
                    specific: 'Ik wil balance vinden tussen leidinggeven en technisch scherp blijven als developer.',
                    measurable: 'Dit meet ik door: (1) 20% van mijn tijd aan hands-on development, (2) Bijdragen aan 2 technische beslissingen per maand, (3) Up-to-date blijven met nieuwe tech (wekelijks 3 uur).',
                    achievable: 'Ik kan tijd blokkeren voor development en heb goede technische basis na 15 jaar ervaring.',
                    relevant: 'Technische credibiliteit is belangrijk voor mijn rol en helpt me betere technische beslissingen te nemen.',
                    timeBound: 'Dit is een ongoing doel, maar ik wil binnen 3 maanden (maart 2025) een werkbare balans hebben.'
                }
            }
        ],
        skills: [
            { name: 'Delegeren & Empowerment', level: 7, maxLevel: 10, baseline: 5 },
            { name: 'Strategic Thinking', level: 5, maxLevel: 10, baseline: 4 },
            { name: 'Feedback Cultuur Bouwen', level: 6, maxLevel: 10, baseline: 5 },
            { name: 'Technical Leadership', level: 7, maxLevel: 10, baseline: 6 },
            { name: 'Coaching & Mentoring', level: 8, maxLevel: 10, baseline: 6 }
        ]
    });

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            from: 'Head of Engineering',
            date: '2024-12-10',
            type: 'positief',
            text: 'Laura is een toegankelijke en betrokken lead. Ze kent haar teamleden goed en investeert in hun ontwikkeling. Sterke coaching vaardigheden.',
            tags: ['Leiderschap', 'Coaching'],
            context: 'Tijdens quarterly review'
        },
        {
            id: 2,
            from: 'Sophie (Teamlid)',
            date: '2024-12-05',
            type: 'positief',
            text: 'Laura neemt echt tijd voor 1-op-1s en ontwikkeling. Ze stelt goede vragen en helpt me zelf tot inzichten te komen. Ik voel me gehoord.',
            tags: ['Coaching', '1-on-1s'],
            context: 'Maandelijkse feedback sessie'
        },
        {
            id: 3,
            from: 'Product Manager',
            date: '2024-11-28',
            type: 'ontwikkeling',
            text: 'Laura is transparant over verwachtingen en zeer betrokken. Zou soms meer delegeren kunnen - ze lost nog vaak zelf dingen op.',
            tags: ['Delegeren', 'Leiderschap'],
            context: 'Cross-functional retrospective'
        },
        {
            id: 4,
            from: 'Peer Engineering Manager',
            date: '2024-11-20',
            type: 'positief',
            text: 'Laura deelt graag haar learnings met andere leads. Ze experimenteert met nieuwe aanpakken en is open over wat werkt en niet werkt.',
            tags: ['Knowledge Sharing', 'Innovatie'],
            context: 'Engineering managers meetup'
        }
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'groei-checkin', message: 'Tijd voor je maandelijkse groei check-in! 🌱', date: new Date(), read: false },
        { id: 2, type: 'ai-insight', message: 'Tips & tricks: Ontdek boeken, podcasts en artikelen voor team leads', date: new Date(), read: false }
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
            title: 'Coaching is je superpower',
            insight: 'Je coaching vaardigheden worden consistent genoemd als sterke punt. Zowel teamleden als senior leadership waarderen hoe je mensen ontwikkelt. Dit is een belangrijke kracht!',
            action: 'Deel je coaching aanpak met andere leads in de organisatie. Overweeg een internal workshop te geven.'
        },
        {
            type: 'advies',
            title: 'Meer delegeren = meer impact',
            insight: 'Feedback laat zien dat je soms nog dingen zelf oplost. Voor strategisch werk moet je meer loslaten en je team empoweren.',
            action: 'Kies deze week 3 beslissingen die je normaal zelf neemt en delegeer ze aan je teamleden. Coach ze door het proces.'
        },
        {
            type: 'groei',
            title: 'Klaar voor next level leadership',
            insight: 'Je bent op 70% van je delegeren-doel en 60% van feedback cultuur. Je bent bijna klaar voor head of engineering niveau.',
            action: 'Plan een gesprek met je manager over career path en strategische projecten die je kan leiden.'
        },
        {
            type: 'balans',
            title: 'Tech tijd beschermen',
            insight: 'Je wilt technisch scherp blijven maar management neemt veel tijd. GrowthHack bespaart je 4-6 uur per week - gebruik dit voor development.',
            action: 'Blokkeer elke vrijdag 4 uur voor hands-on coding of tech exploration.'
        }
    ]);

    const Logo = () => (
        <svg width="24" height="24" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128.44 61H110.728V148.041H164.932V133.198H128.44V61Z" fill="currentColor" />
            <path d="M81.4917 133.198H45V148.041H99.3108V61H81.4917V133.198Z" fill="currentColor" />
            <path d="M185.501 208.61L20.8013 201.91C13.6013 201.61 7.9013 195.61 8.0013 188.41V20.3096C8.1013 13.5096 14.8013 7.90956 21.5013 7.60956L186.201 1.00956C194.701 0.709559 201.801 7.50956 201.801 16.0096V192.91C201.801 201.81 194.401 208.91 185.501 208.61ZM27.1013 186.61L181.001 191.11C183.201 191.11 185.101 189.41 185.101 187.11V21.1096C185.101 19.0096 183.501 17.3096 181.401 17.4096L27.2013 22.9096C24.4013 22.9096 22.2013 25.3096 22.2013 28.0096V181.51C22.2013 184.21 24.4013 186.41 27.1013 186.51V186.61Z" fill="currentColor" />
        </svg>
    );

    const teamMembers = [
        {
            id: 1,
            name: 'Sophie',
            fullName: 'Sophie de Vries',
            role: 'Medior Software Developer',
            avatar: 'S',
            color: 'bg-purple-500',
            status: 'active',
            alerts: 1,
            experience: '5 jaar',
            goals: {
                completed: true,
                progress: 5,
                activeGoals: 5,
                message: 'Goed bezig met senior transitie - 5 actieve doelen'
            },
            requests: [
                {
                    id: 1,
                    type: 'feedback',
                    title: 'Feedback gevraagd op architectuur presentatie',
                    date: '3 dagen geleden',
                    status: 'pending',
                    context: 'Sophie heeft een presentatie gegeven over Clean Architecture en vraagt specifieke feedback op haar uitleg en stakeholder communicatie.'
                }
            ],
            aiInsights: [
                {
                    type: 'strength',
                    title: 'Sterke communicatie vaardigheden',
                    insight: 'Sophie\'s feedback laat zien dat haar communicatie skills consistent worden gewaardeerd. Haar code reviews zijn helder en haar technische uitleg naar stakeholders is excellent.',
                    action: 'Moedig Sophie aan om een tech blog post te schrijven of een knowledge sharing sessie te leiden. Dit vergroot haar zichtbaarheid voor senior promotie.'
                },
                {
                    type: 'development',
                    title: 'Focus op systeemdenken',
                    insight: 'Sophie scoort sterk op code reviews (7/10) maar heeft nog ruimte voor groei in systeemdenken (5/10). Dit is belangrijk voor senior niveau.',
                    action: 'Koppel Sophie aan een senior architect voor system design mentoring. Laat haar deelnemen aan architectuur review sessies.'
                },
                {
                    type: 'conversation',
                    title: 'Senior promotie gesprek voorbereiden',
                    insight: 'Sophie is proactief bezig met haar ontwikkeling en logt consistent haar voortgang. Ze is op 55% van haar senior-doel. Dit is een goed moment om haar senior transitie te bespreken.',
                    action: 'Plan een gesprek over senior competenties, tijdlijn en concrete stappen. Bespreek wat ze nog moet demonstreren.'
                }
            ],
            recentActivity: [
                { type: 'feedback', text: 'Feedback gevraagd na architectuur presentatie', date: '3 dagen geleden' },
                { type: 'goal', text: 'Architectuur doel voortgang: 65%', date: '5 dagen geleden' },
                { type: 'skill', text: 'Code Review skill gestegen naar 7/10', date: '1 week geleden' }
            ],
            strengths: [
                'Communicatie naar stakeholders',
                'Code review kwaliteit',
                'Proactief in ontwikkeling'
            ],
            developmentAreas: [
                'Systeemdenken & architectuur',
                'Zichtbaarheid (tech blogs, presentations)'
            ]
        },
        {
            id: 2,
            name: 'Ernst',
            fullName: 'Ernst van Dijk',
            role: 'Junior Software Developer',
            avatar: 'E',
            color: 'bg-green-500',
            status: 'active',
            alerts: 2,
            experience: '1 jaar',
            goals: {
                completed: true,
                progress: 3,
                activeGoals: 3,
                message: 'Goede start - 3 actieve ontwikkeldoelen'
            },
            requests: [],
            aiInsights: [
                {
                    type: 'strength',
                    title: 'Leergierig en proactief',
                    insight: 'Ernst stelt veel vragen en neemt actief deel aan code reviews. Hij heeft een sterke leerhonger en is niet bang om om hulp te vragen. Dit is een belangrijke kwaliteit voor een junior developer.',
                    action: 'Moedig Ernst aan om meer te blijven vragen. Koppel hem aan Sophie als buddy voor code review skills en architectuur basics.'
                },
                {
                    type: 'development',
                    title: 'Technische basis versterken',
                    insight: 'Ernst heeft nog ruimte om zijn fundamentele programmeervaardigheden te ontwikkelen. Hij loopt soms vast op basics zoals debugging, git workflows en testing.',
                    action: 'Stel een leerpad op: 1) Git & version control mastery, 2) Unit testing best practices, 3) Debugging technieken. Plan wekelijkse pair programming sessies.'
                },
                {
                    type: 'conversation',
                    title: 'Zelfvertrouwen opbouwen',
                    insight: 'Ernst vergelijkt zichzelf vaak met medior/senior developers en kan onzeker zijn over zijn bijdragen. Hij heeft positieve feedback nodig om zijn zelfvertrouwen op te bouwen.',
                    action: 'Wijs expliciet op zijn vooruitgang. Vier kleine wins. Laat hem een klein feature end-to-end builden om ownership te ervaren.'
                },
                {
                    type: 'development',
                    title: 'Code review skills ontwikkelen',
                    insight: 'Ernst doet zijn eerste stappen in code reviews maar is nog voorzichtig met feedback geven. Dit is een belangrijke skill om te ontwikkelen.',
                    action: 'Train Ernst in constructieve code review. Laat hem eerst samen met jou reviews doen, daarna zelfstandig kleine PRs reviewen.'
                }
            ],
            recentActivity: [
                { type: 'goal', text: 'Git workflow doel voortgang: 40%', date: '2 dagen geleden' },
                { type: 'feedback', text: 'Feedback gevraagd aan Sophie over code review', date: '5 dagen geleden' },
                { type: 'skill', text: 'Testing skill gestegen naar 3/10', date: '1 week geleden' }
            ],
            strengths: [
                'Leergierigheid en vraagstellen',
                'Team spirit en samenwerking',
                'Proactieve houding'
            ],
            developmentAreas: [
                'Fundamentele programming skills',
                'Zelfvertrouwen opbouwen',
                'Code review vaardigheden'
            ]
        }
    ];

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

    const HomeView = () => (
        <div className="space-y-4">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Hoi {userName}! 👋</h2>
                        <p className="text-purple-100">Level {user.level} Team Lead • {teamMembers.length} developers</p>
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
                        <span className="text-sm font-medium">Voortgang naar Level {user.level + 1}</span>
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
                        <p className="text-sm text-gray-700">
                            Minstens 1 aantekening toegevoegd of actie uitgevoerd in de afgelopen 7 dagen. Blijf actief om je streak te behouden!
                        </p>
                    </div>
                </div>
            )}

            {/* Team Summary */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">Team Overzicht</h3>
                    <button
                        onClick={() => setCurrentView('team')}
                        className="text-purple-600 text-sm font-semibold flex items-center gap-1"
                    >
                        Bekijk <ChevronRight size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">2</div>
                        <div className="text-xs text-gray-600">Teamleden</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-500">3</div>
                        <div className="text-xs text-gray-600">Acties</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">5</div>
                        <div className="text-xs text-gray-600">Team doelen</div>
                    </div>
                </div>
            </div>

            {/* Quick Stats - Own Goals */}
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
                    <p className="text-sm text-gray-600">Mijn doelen</p>
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
                    <p className="text-sm text-gray-600">Mijn feedback</p>
                </button>
            </div>

            {/* AI Insights - Own Development */}
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

            {/* Team Action Items */}
            <div className="bg-white rounded-xl border-2 border-orange-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="text-orange-500" size={20} />
                    <h3 className="font-bold text-gray-900">Team Actiepunten</h3>
                </div>
                <div className="space-y-2">
                    <button
                        onClick={() => {
                            setSelectedTeamMember(teamMembers[0]);
                            setCurrentView('team-member');
                        }}
                        className="w-full bg-blue-50 rounded-lg p-3 text-left active:bg-blue-100 transition-colors"
                    >
                        <p className="text-sm font-semibold text-gray-900">Sophie - Feedback verzoek</p>
                        <p className="text-xs text-gray-600 mt-1">Vraagt feedback op architectuur presentatie</p>
                    </button>
                    <button
                        onClick={() => {
                            setSelectedTeamMember(teamMembers[1]);
                            setCurrentView('team-member');
                        }}
                        className="w-full bg-orange-50 rounded-lg p-3 text-left active:bg-orange-100 transition-colors"
                    >
                        <p className="text-sm font-semibold text-gray-900">Ernst - Buddy koppeling</p>
                        <p className="text-xs text-gray-600 mt-1">Koppel aan Sophie voor mentoring en code reviews</p>
                    </button>
                    <button
                        onClick={() => {
                            setSelectedTeamMember(teamMembers[1]);
                            setCurrentView('team-member');
                        }}
                        className="w-full bg-blue-50 rounded-lg p-3 text-left active:bg-blue-100 transition-colors"
                    >
                        <p className="text-sm font-semibold text-gray-900">Ernst - Leerpad opstellen</p>
                        <p className="text-xs text-gray-600 mt-1">Git, testing en debugging fundamentals plannen</p>
                    </button>
                </div>
            </div>

            {/* Notifications */}
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
                <h2 className="text-xl font-bold mb-4 text-gray-900">Mijn Skills</h2>

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

                            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                                Nulmeting: {skill.baseline}
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
                    Je Coaching skill (8/10) is excellent! Focus op Strategisch Denken (5/10) voor next-level leadership.
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
                <h2 className="text-xl font-bold mb-2 text-gray-900">Mijn 360° Feedback</h2>
                <p className="text-sm text-gray-600 mb-4">Feedback van team, leadership en peers</p>

                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold w-full mb-4 flex items-center justify-center gap-2 active:opacity-90 transition-opacity">
                    <MessageSquare size={20} />
                    Vraag nieuwe feedback aan
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
                        <p className="text-xs font-semibold text-blue-900 mb-1">🔍 Patroon gedetecteerd</p>
                        <p className="text-xs text-gray-700">
                            {aiInsights[0].insight}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                        <p className="text-xs font-semibold text-blue-900 mb-1">💡 Aanbeveling</p>
                        <p className="text-xs text-gray-700">
                            {aiInsights[0].action}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const GoalsView = () => (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-900">Mijn Groeidoelen</h2>
                <p className="text-sm text-gray-600 mb-4">Van Lead naar Head of Engineering niveau</p>

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
                    <h2 className="text-xl font-bold text-gray-900">Mijn AI Insights</h2>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                    Op basis van je voortgang, feedback en doelen genereert AI persoonlijke inzichten en aanbevelingen.
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
                                        {insight.type === 'balans' && '⚖️ Balans'}
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
                    <p className="text-sm text-gray-600 mb-6">Plan een afspraak met je manager voor leiderschap ontwikkeling</p>

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
                                placeholder="Bijv. Delegeren strategie, strategische projecten bespreken, feedback cultuur..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                                📅 Deze afspraak wordt verstuurd naar je manager via Outlook calendar
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
                            <p className="text-gray-600">Je manager ontvangt de uitnodiging</p>
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
                    <Settings className="text-purple-600" size={24} />
                    <h2 className="text-xl font-bold text-gray-900">Privacy Instellingen</h2>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                    Bepaal zelf wat je manager kan zien. Jouw groei, jouw controle.
                </p>

                <div className="space-y-4">
                    <PrivacyToggle
                        label="Groeidoelen delen"
                        description="Laat je manager je gestelde doelen en voortgang zien"
                        value={privacySettings.shareGoals}
                        onChange={(val) => setPrivacySettings({ ...privacySettings, shareGoals: val })}
                    />

                    <PrivacyToggle
                        label="Feedback delen"
                        description="Geef toegang tot ontvangen 360° feedback"
                        value={privacySettings.shareFeedback}
                        onChange={(val) => setPrivacySettings({ ...privacySettings, shareFeedback: val })}
                    />

                    <PrivacyToggle
                        label="Skills & niveaus delen"
                        description="Toon je huidige skill levels en groei"
                        value={privacySettings.shareSkills}
                        onChange={(val) => setPrivacySettings({ ...privacySettings, shareSkills: val })}
                    />

                    <PrivacyToggle
                        label="Algemene voortgang delen"
                        description="Deel overzicht van activiteit en streaks"
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
                            Al je persoonlijke ontwikkeldata blijft privé tenzij je actief kiest om het te delen met je manager.
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

    const TeamView = () => (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Mijn Team</h2>

                <div className="space-y-3">
                    {teamMembers.map(member => (
                        <button
                            key={member.id}
                            onClick={() => {
                                setSelectedTeamMember(member);
                                setCurrentView('team-member');
                            }}
                            className="w-full bg-gray-50 rounded-xl p-4 text-left active:bg-gray-100 transition-colors border-2 border-transparent hover:border-purple-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                                        {member.alerts > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                                {member.alerts}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                    {member.goals.activeGoals && (
                                        <p className="text-xs text-purple-600 font-medium mt-1">
                                            {member.goals.activeGoals} actieve doelen
                                        </p>
                                    )}
                                </div>
                                <ChevronRight className="text-gray-400" size={20} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const TeamMemberView = () => {
        if (!selectedTeamMember) return null;
        const member = selectedTeamMember;

        return (
            <div className="space-y-4">
                {/* Header */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                            {member.avatar}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                            <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        {member.goals.completed ? (
                            <CheckCircle className="text-green-500" size={20} />
                        ) : (
                            <AlertCircle className="text-orange-500" size={20} />
                        )}
                        <p className="text-sm text-gray-700">{member.goals.message}</p>
                    </div>
                </div>

                {/* Requests */}
                {member.requests.length > 0 && (
                    <div className="bg-white rounded-xl border-2 border-orange-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="text-orange-500" size={20} />
                            <h3 className="font-bold text-gray-900">Openstaande Verzoeken</h3>
                        </div>
                        <div className="space-y-3">
                            {member.requests.map(request => (
                                <div key={request.id} className="bg-orange-50 rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                        <BookOpen className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 text-sm mb-1">{request.title}</p>
                                            <p className="text-xs text-gray-600 mb-3">{request.date}</p>
                                            <div className="flex gap-2">
                                                <button className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold active:bg-purple-600 transition-colors">
                                                    Goedkeuren
                                                </button>
                                                <button className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold active:bg-gray-300 transition-colors">
                                                    Bekijken
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Insights for Manager */}
                <div className="bg-white rounded-xl border-2 border-purple-200 p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="text-purple-500" size={20} />
                        <h3 className="font-bold text-gray-900">AI Coaching Tips</h3>
                    </div>
                    <div className="space-y-3">
                        {member.aiInsights.map((insight, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="text-white" size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-purple-900 mb-1 text-sm">{insight.title}</p>
                                        <span className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                                            {insight.type === 'development' && '📈 Ontwikkeling'}
                                            {insight.type === 'conversation' && '💬 Gesprek'}
                                            {insight.type === 'strength' && '⭐ Sterkte'}
                                            {insight.type === 'engagement' && '🎯 Betrokkenheid'}
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

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Recente Activiteit</h3>
                    <div className="space-y-2">
                        {member.recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-900">{activity.text}</p>
                                    <p className="text-xs text-gray-500">{activity.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold active:bg-purple-600 transition-colors">
                        Plan Gesprek
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold active:bg-gray-300 transition-colors">
                        Feedback Geven
                    </button>
                </div>

                <button
                    onClick={() => setCurrentView('team')}
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold active:bg-gray-50 transition-colors"
                >
                    ← Terug naar Team
                </button>
            </div>
        );
    };

    const Navigation = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-2 py-3 max-w-md mx-auto">
            <div className="flex justify-around items-center">
                <NavButton icon={Home} label="Home" view="home" />
                <NavButton icon={TrendingUp} label="Skills" view="skills" />
                <NavButton icon={MessageSquare} label="Feedback" view="feedback" />
                <NavButton icon={Users} label="Team" view="team" badge={teamMembers.reduce((acc, m) => acc + m.alerts, 0)} />
                <NavButton icon={Settings} label="Settings" view="privacy" />
            </div>
        </div>
    );

    const NavButton = ({ icon: Icon, label, view, badge }) => (
        <button
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors relative ${currentView === view
                ? 'text-purple-600'
                : 'text-gray-400'
                }`}
        >
            <Icon size={22} />
            {badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">
                    {badge}
                </span>
            )}
            <span className="text-[10px] font-medium">{label}</span>
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
                                <p className="text-sm text-purple-100">Team Lead Dashboard</p>
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
                    {currentView === 'skills' && <SkillsView />}
                    {currentView === 'feedback' && <FeedbackView />}
                    {currentView === 'goals' && <GoalsView />}
                    {currentView === 'team' && <TeamView />}
                    {currentView === 'team-member' && <TeamMemberView />}
                    {currentView === 'privacy' && <PrivacyView />}
                    {currentView === 'notifications' && <NotificationsView />}
                    {currentView === 'ai-insights' && <AIInsightsView />}
                    {currentView === 'appointment' && <AppointmentView />}
                </div>

                {/* Navigation */}
                <Navigation />
            </div>
        </div>
    );
};

export default GrowthHackManager;
