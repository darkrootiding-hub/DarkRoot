// =============================================================
// SINGLE SOURCE OF TRUTH — DarkRoot Organizations
// Edit everything here. No build step: just save and refresh.
// =============================================================

const CONFIG = {
  brand: {
    name: 'DarkRoot',
    fullName: 'DarkRoot Organizations',
    tagline: 'Building the future with AI',
    email: 'contact@darkroot.dev',
    location: 'Remote-first · Worldwide',
    discord: 'https://discord.gg/darkroot',
    github: 'https://github.com/darkrootiding-hub',
    linkedin: 'https://linkedin.com/company/darkroot',
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Departments', href: '#departments' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    titleLines: ['BUILDING THE FUTURE', 'WITH AI'],
    subtitle: 'DarkRoot Organizations designs and ships intelligent software — from AI research to production-grade platforms — for teams who refuse to build something ordinary.',
  },

  about: {
    mission: 'To build technology that meaningfully expands what small teams can accomplish — combining AI, clean engineering, and thoughtful design.',
    vision: 'A future where intelligent software is a default expectation, not a premium feature — accessible, transparent, and genuinely useful.',
    values: [
      { title: 'Craft over speed', text: 'We ship fast, but never at the cost of quality we\u2019d be embarrassed by.' },
      { title: 'Open by default', text: 'Most of what we build starts, or ends up, open-source.' },
      { title: 'Rigor in AI', text: 'We treat AI systems like engineering, not magic — tested, measured, honest about limits.' },
    ],
    timeline: [
      { year: '2022', text: 'DarkRoot founded as a small open-source collective.' },
      { year: '2023', text: 'First AI-powered products shipped to production.' },
      { year: '2024', text: 'Grew into a distributed team across multiple continents.' },
      { year: '2025', text: 'Launched our Cloud & Security divisions.' },
      { year: '2026', text: 'Serving teams and users in 40+ countries.' },
    ],
    stats: [
      { label: 'Projects Shipped', value: 48, suffix: '+' },
      { label: 'Team Members', value: 24, suffix: '+' },
      { label: 'Open Repositories', value: 65, suffix: '+' },
      { label: 'Downloads', value: 120, suffix: 'K+' },
      { label: 'Active Users', value: 35, suffix: 'K+' },
      { label: 'Countries Reached', value: 42, suffix: '' },
    ],
  },

  departments: [
    { name: 'AI Research', icon: 'brain', desc: 'Applied research in language models, retrieval, and reasoning systems.' },
    { name: 'Software Engineering', icon: 'code', desc: 'Core platform and infrastructure powering every DarkRoot product.' },
    { name: 'Web Development', icon: 'globe', desc: 'Fast, accessible, beautifully-built web applications.' },
    { name: 'Mobile Development', icon: 'mobile', desc: 'Native and cross-platform apps for iOS and Android.' },
    { name: 'Cyber Security', icon: 'shield', desc: 'Threat modeling, audits, and secure-by-design architecture.' },
    { name: 'Cloud Computing', icon: 'cloud', desc: 'Scalable infrastructure, deployment pipelines, and observability.' },
    { name: 'UI / UX', icon: 'layout', desc: 'Interface design systems that feel intentional and alive.' },
    { name: 'DevOps', icon: 'terminal', desc: 'CI/CD, automation, and reliability engineering.' },
    { name: 'Machine Learning', icon: 'cpu', desc: 'Production ML systems, from training to deployment.' },
    { name: 'Blockchain', icon: 'link', desc: 'Decentralized systems and smart-contract engineering.' },
  ],

  projects: [
    { id: 'aurora-ai', title: 'Aurora AI', description: 'A multi-model AI orchestration platform for building production LLM workflows.', tags: ['Python', 'React', 'OpenAI API'], image: 'assets/projects/aurora-ai.jpg', github: 'https://github.com/darkrootiding-hub/aurora-ai', demo: 'https://aurora.darkroot.dev' },
    { id: 'nexus-cloud', title: 'Nexus Cloud', description: 'Developer-first cloud deployment platform with one-click scaling.', tags: ['Node', 'Docker', 'AWS'], image: 'assets/projects/nexus-cloud.jpg', github: 'https://github.com/darkrootiding-hub/nexus-cloud', demo: 'https://nexus.darkroot.dev' },
    { id: 'sentinel-sec', title: 'Sentinel', description: 'Automated security auditing and vulnerability scanning for web apps.', tags: ['Python', 'Security', 'CLI'], image: 'assets/projects/sentinel-sec.jpg', github: 'https://github.com/darkrootiding-hub/sentinel', demo: 'https://sentinel.darkroot.dev' },
    { id: 'rootchain', title: 'RootChain', description: 'A lightweight smart-contract framework for rapid prototyping.', tags: ['Solidity', 'TypeScript'], image: 'assets/projects/rootchain.jpg', github: 'https://github.com/darkrootiding-hub/rootchain', demo: 'https://rootchain.darkroot.dev' },
    { id: 'visionx', title: 'VisionX', description: 'Real-time computer vision toolkit for edge devices.', tags: ['Python', 'TensorFlow', 'Edge AI'], image: 'assets/projects/visionx.jpg', github: 'https://github.com/darkrootiding-hub/visionx', demo: 'https://visionx.darkroot.dev' },
    { id: 'pulseml', title: 'PulseML', description: 'A no-code interface for training and deploying ML models.', tags: ['React', 'Python', 'ML'], image: 'assets/projects/pulseml.jpg', github: 'https://github.com/darkrootiding-hub/pulseml', demo: 'https://pulseml.darkroot.dev' },
  ],

  team: [
    { name: 'David Shrestha', role: 'Founder & CEO', photo: 'assets/team/member1.jpg', skills: [{n:'Leadership',v:96},{n:'Strategy',v:90}], socials: { github: '#', linkedin: '#', x: '#' } },
    { name: 'Nischal Neupane', role: 'DatkRoot M.D', photo: 'assets/team/member2.jpg', skills: [{n:'Prompt Engineering Learning',v:94},{n:'Python',v:92}], socials: { github: '#', linkedin: '#', x: '#' } },
    { name: 'Manish Aryal', role: 'Head of Design', photo: 'assets/team/member3.jpg', skills: [{n:'UI/UX',v:95},{n:'Motion Design',v:88}], socials: { github: '#', linkedin: '#', x: '#' } },
    { name: 'Susil Nesur', role: 'Tester', photo: 'assets/team/member4.jpg', skills: [{n:'App Testing',v:93},{n:'Web Testing',v:90}], socials: { github: '#', linkedin: '#', x: '#' } },
     ],

  techStack: [
    'HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Node', 'Express',
    'MongoDB', 'Firebase', 'Docker', 'GitHub', 'TensorFlow', 'OpenAI API',
    'Gemini API', 'AI Models',
  ],

  gallery: [
    'assets/gallery/g1.jpg', 'assets/gallery/g2.jpg', 'assets/gallery/g3.jpg', 'assets/gallery/g4.jpg',
    'assets/gallery/g5.jpg', 'assets/gallery/g6.jpg', 'assets/gallery/g7.jpg', 'assets/gallery/g8.jpg',
  ],

  careers: {
    intro: 'We\u2019re a small, distributed team that hires slowly and cares deeply about craft. If that sounds like your kind of place, we\u2019d love to hear from you.',
    timeline: [
      { step: '1. Apply', text: 'Send your resume and a note about what you want to build.' },
      { step: '2. Intro call', text: 'A relaxed 30-minute conversation — no whiteboard tricks.' },
      { step: '3. Paid trial project', text: 'A short, paid piece of real work so both sides can see the fit.' },
      { step: '4. Offer', text: 'If it\u2019s a match on both sides, we move fast on an offer.' },
    ],
    benefits: [
      'Fully remote, async-friendly', 'Flexible hours', 'Equity for early hires',
      'Learning & conference budget', 'Open-source contribution time', 'Top-tier equipment stipend',
    ],
    openPositions: [
      { title: 'Senior AI Engineer', type: 'Full-time · Remote', description: 'Design and ship production LLM-powered features across our product line.' },
      { title: 'Frontend Engineer (React)', type: 'Full-time · Remote', description: 'Build fast, accessible interfaces for our core platforms.' },
      { title: 'DevOps / Platform Engineer', type: 'Contract · Remote', description: 'Own CI/CD, infra-as-code, and observability across our services.' },
      { title: 'Product Designer', type: 'Full-time · Remote', description: 'Shape the design system and craft key user flows end to end.' },
    ],
  },

  faq: [
    { q: 'Is DarkRoot a registered company?', a: 'DarkRoot Organizations operates as a distributed studio, currently structured as an independent collective with plans to formalize as we scale.' },
    { q: 'Do you take on client work?', a: 'Selectively — we partner with a small number of teams each quarter where our AI and engineering expertise is a strong fit.' },
    { q: 'Are your projects open-source?', a: 'Most of them, yes. We believe in building in public wherever it doesn\u2019t conflict with client confidentiality.' },
    { q: 'How can I contribute?', a: 'Check our GitHub — most repositories welcome issues and pull requests. We also post open roles under Careers.' },
    { q: 'Do you offer internships?', a: 'Yes, periodically. Open positions are listed in the Careers section when available.' },
  ],
};