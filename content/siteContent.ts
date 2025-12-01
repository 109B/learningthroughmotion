export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export type ProgrammeDetail = {
  slug: string;
  title: string;
  excerpt: string;
  accent: string;
  heroImage?: string;
  paragraphs: string[];
  bulletHeading?: string;
  bullets?: string[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Maths Through Sport", href: "/maths-through-sport" },
  { label: "Sensory Redevelopment", href: "/sensory-redevelopment" },
  { label: "The Next Chapter", href: "/the-next-chapter" },
  { label: "Our Programmes", href: "/our-programmes" },
  { label: "Our Vision", href: "/our-vision" },
  { label: "Our Coaches", href: "/our-coaches" },
  { label: "Enquire now", href: "/enquire-now" },
];

export const PROGRAMME_PAGES: NavLink[] = [
  { label: "Maths Through Sport", href: "/maths-through-sport" },
  { label: "Sensory Redevelopment", href: "/sensory-redevelopment" },
  { label: "The Next Chapter", href: "/the-next-chapter" },
];

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Programmes",
    href: "/our-programmes",
    children: PROGRAMME_PAGES,
  },
  {
    label: "Impact",
    href: "/our-vision",
    children: [
      { label: "Our Vision", href: "/our-vision" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  { label: "Our Coaches", href: "/our-coaches" },
];

export const PROGRAMME_SHORTCUTS = PROGRAMME_PAGES;

export const CONTACT_DETAILS = {
  phone: "07356 074 072",
  email: "info@learningthroughmotion.co.uk",
  location: "Bolton based, working across Greater Manchester and Lancashire",
  socials: {
    linkedin: "https://www.linkedin.com/company/learning-through-motion",
    facebook: "https://www.facebook.com/profile.php?id=61582874526226",
    instagram: "https://www.instagram.com/learning_through_motion",
  },
};

export const HOME_HERO = {
  title: "Learning Through Motion",
  tagline: "Growing Towards Independence",
  description:
    "Cross-curricular learning delivered through movement, sport, and sensory experiences so every SEND pupil can thrive.",
};

export const VISION_PARAGRAPHS = [
  "Learning Through Motion, Growing Toward Independence.",
  "Our vision is to create a future where children with special educational needs and disabilities are empowered to learn, grow, and thrive through sport. We believe that sport is a powerful tool for development - not just physically, but emotionally, socially, and academically.",
  "Through inclusive sports experiences we provide children with opportunities to build confidence, communication, resilience, and key life skills. By integrating cross curricular learning into every session we meet each child where they are and support them in an environment that suits their needs and learning style.",
  "Our goal is to give every SEND child the best possible chance at leading an independent, fulfilling life. We celebrate every small win, nurture every unique ability, and walk alongside every child on their journey to becoming confident, capable, and independent.",
  "Every child deserves the chance to succeed - in their own way, at their own pace, and in an environment that celebrates who they are.",
];

export const HOME_VISION_STATEMENT = VISION_PARAGRAPHS[0];
export const HOME_VISION_SUPPORT = VISION_PARAGRAPHS[1];

export const HOME_ABOUT_PARAGRAPHS: string[] = [
  "At Learning Through Motion, we believe every child deserves a rich, inclusive learning experience that nurtures both their educational and personal development. That is why we specialise in delivering cross-curricular learning through sport, designed especially for children with special educational needs and disabilities (SEND).",
  "Our programmes blend physical activity with classroom topics such as mathematics, creating engaging, active environments where SEND students can thrive. By using sport as a dynamic teaching tool we foster academic growth alongside communication, coordination, and social interaction.",
  "Through carefully designed, inclusive sports experiences we provide opportunities for young people to build confidence, resilience, and key life skills. Whether it is improving fine and gross motor skills through team games, strengthening sensory systems, or reinforcing classroom subjects through physical challenges, our approach keeps learning fun, meaningful, and accessible.",
  "We work closely with schools, educators, and support staff to tailor each session to every child's needs and preferred learning approaches. By meeting each learner where they are, we celebrate their strengths and create an environment that amplifies their uniqueness.",
  "Inclusion is not an add-on for us - it is the foundation of every session. We are passionate about breaking down barriers and opening up new pathways for learning, helping every child reach their full potential through the power of sport.",
  "Our goal is to give every student the best possible chance at leading an independent, fulfilling life. We celebrate every small win, nurture every unique ability, and walk alongside each student on their journey toward becoming confident, capable, and independent. Every child deserves the chance to succeed at their own pace, in their own way.",
];

export const HERO_HIGHLIGHTS = [
  {
    title: "What we deliver",
    lines: [
      "Cross-curricular maths delivered through active movement, making abstract concepts tangible, engaging, and easier to retain.",
      "Sensory redevelopment journeys that rebuild emotional regulation, physical coordination, and focus in the classroom.",
      "Year 7 mentoring and transition support that makes the step to secondary school safe, confident, and successful for every child.",
    ],
  },
  {
    title: "Our approach",
    lines: [
      HOME_ABOUT_PARAGRAPHS[3],
      HOME_ABOUT_PARAGRAPHS[4],
      "Working with schools across Greater Manchester and Lancashire with bespoke support for each EHCP.",
    ],
  },
  {
    title: "Our vision",
    lines: VISION_PARAGRAPHS.slice(0, 3),
  },
];

export const HOME_ABOUT_CLUSTERS = [
  {
    title: "Inclusive learning journeys",
    paragraphs: HOME_ABOUT_PARAGRAPHS.slice(0, 2),
  },
  {
    title: "Confidence through motion",
    paragraphs: HOME_ABOUT_PARAGRAPHS.slice(2, 4),
  },
  {
    title: "Our promise to every child",
    paragraphs: HOME_ABOUT_PARAGRAPHS.slice(4),
  },
];

export const HOME_GALLERY = [
  {
    src: "https://files.websitebuilder.prositehosting.co.uk/ae/64/ae646bd3-1933-4338-8a5a-d352aca1f094.jpg",
    alt: "Coach supporting a pupil through an agility drill",
  },
  {
    src: "https://files.websitebuilder.prositehosting.co.uk/15/e7/15e79d3c-e414-4c25-9be7-30a97047ccf6.jpg",
    alt: "Learning Through Motion session using numeracy stations",
  },
  {
    src: "https://files.websitebuilder.prositehosting.co.uk/b6/71/b6716c98-d7e1-4d8a-b990-5d64f5dabf48.jpg",
    alt: "Group of pupils celebrating success outside",
  },
  {
    src: "https://files.websitebuilder.prositehosting.co.uk/da/0d/da0d3491-6e95-449d-b35e-be2b1b7570f3.jpeg",
    alt: "Balance and coordination activity on indoor equipment",
  },
];

export const PROGRAMMES: ProgrammeDetail[] = [
  {
    slug: "maths-through-sport",
    title: "Maths Through Sport",
    excerpt:
      "We make maths enjoyable by blending it into physical games and activities. Children practise counting, problem solving, and measuring through movement, which keeps them engaged and builds lasting confidence.",
    accent: "#0f6d63",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/45/39/45397caf-ca8f-482b-98e6-01ca8bf50395.png",
    paragraphs: [
      "Our Maths Through Sport programme transforms the way children with special educational needs experience learning. By embedding core maths concepts into movement, games, and sporting activities we create an environment where maths feels exciting, achievable, and fun.",
      "Children develop essential skills such as counting, addition, measurement, and problem solving - not through worksheets, but through active challenges that keep them engaged and motivated. Each activity is carefully designed to build confidence for children who learn differently, while also encouraging teamwork and physical development.",
      "Learners who may have once felt anxious about maths begin to approach it with enjoyment and success. Schools and parents see measurable progress as pupils reconnect with the subject and build a positive attitude toward learning.",
    ],
  },
  {
    slug: "sensory-redevelopment",
    title: "Sensory Redevelopment",
    excerpt:
      "We strengthen the foundations for learning by retraining the sensory system. Targeted activities improve balance, body awareness, and regulation so children feel ready to learn.",
    accent: "#c45f24",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/62/f8/62f87fc5-6c92-421c-93be-82a4720f8739.jpg",
    paragraphs: [
      "Our Sensory Redevelopment programme supports children with special educational needs and neurodivergent profiles by retraining the sensory nervous system - the foundation for movement, focus, and emotional regulation.",
      "Through carefully designed physical activities we strengthen key sensory systems such as balance, proprioception, fine motor control, and interoception. Sessions are engaging and accessible, gently guiding the brain and body to work together more smoothly.",
      "Over time children gain greater control, confidence, and the ability to participate more fully in both school and everyday life. The result is improved focus, calmer behaviour, and stronger building blocks for learning and wellbeing.",
    ],
    bulletHeading: "We target four core areas:",
    bullets: [
      "Balance and proprioception to build body awareness, coordination, and posture.",
      "Fine motor skills for writing, fastening clothing, and handling classroom tools.",
      "Interoception to help children recognise and respond to internal body signals.",
      "Regulation strategies that support calmness, focus, and readiness to learn.",
    ],
  },
  {
    slug: "the-next-chapter",
    title: "The Next Chapter",
    excerpt:
      "A transition and mentoring programme that provides a trusted adult, builds emotional resilience, and makes the move to secondary school feel safe and exciting.",
    accent: "#f4c95d",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/7e/44/7e446e97-fa38-4fda-902c-4a6346050a3f.jpg",
    paragraphs: [
      "The move from primary to secondary school marks an exciting new beginning, but it can also feel daunting for many students. The Next Chapter guides Year 7 pupils, particularly those with SEND or neurodivergent profiles, as they take their first steps into this new stage of learning and personal growth.",
      "Each student is paired with a dedicated mentor who becomes a trusted, familiar face throughout their transition - someone who listens, supports, and helps them find their place within the school community.",
      "Through a blend of team based physical activities, guided mentoring, and reflective discussions, students build the social, emotional, and sensory foundations needed for a successful start to secondary school.",
    ],
    bulletHeading: "We focus on:",
    bullets: [
      "Confidence and self esteem so pupils feel ready for new challenges.",
      "Social connection through inclusive group sessions and teamwork.",
      "Emotional regulation skills that help students manage anxiety and change.",
      "Communication and independence so every pupil can share their voice.",
    ],
  },
];

export const PROGRAMMES_PAGE_COPY = {
  intro: [
    "Our programmes are designed to support the holistic development of SEND pupils through sport, movement, and physical activity. We use play and purposeful movement as central tools for learning, working in line with the national curriculum to make education active, inclusive, and engaging.",
    "Activities are multisensory, adaptable, and inclusive. We foster communication, confidence, social interaction, and physical development while promoting engagement through fun, real life contexts. Flexible entry points align with individual learning plans and the outcomes outlined in EHCPs.",
  ],
  closing:
    "By integrating sport into everyday learning, our approach helps SEND pupils access the wider curriculum in motivating and accessible ways, empowering every child to progress at their own pace.",
};

export const COACHES = [
  {
    name: "Robbie Smith",
    role: "Head Coach",
    bio: "Robbie has been coaching children for more than eight years and previously worked in primary schools delivering PE. During this time he discovered a strong passion for supporting SEND children. By building meaningful relationships and watching their confidence grow through sport he was inspired to integrate classroom learning with physical activity and create truly engaging sessions.",
  },
  {
    name: "Julian Lewis-Coker",
    role: "Senior Coach",
    bio: "Julian has dedicated his career to working with children and has a lifelong passion for sport, particularly football. He has worked for several charities supporting children with a range of needs and finds real joy in helping others. Julian makes sure every child is heard and has a voice, creating an environment where they feel valued and supported.",
  },
];

export const TWO_COACHES_POINTS = [
  "Individual attention: two coaches can tailor support, adapt tasks, and provide consistent reassurance for children who thrive on familiarity.",
  "Collaborative planning: one coach can lead the main activity while the other adjusts pacing, models regulation strategies, or prepares resources.",
  "Clear communication: pupils who need extra processing time benefit from instructions being clarified or modelled simultaneously.",
  "Wellbeing and safety: a shared workload keeps coaches fresh and focused so they can monitor physical safety as well as emotional cues throughout the session.",
];

export const COACHING_APPROACH = TWO_COACHES_POINTS;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  school?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The impact on our Year 7 cohort has been remarkable. Students who were previously disengaged are now participating fully and showing real confidence.",
    author: "Sarah Jenkins",
    role: "SENCO",
    school: "Oakwood High School",
  },
  {
    quote: "Learning Through Motion has transformed how we support our neurodivergent students. The blend of sport and sensory work is exactly what they needed.",
    author: "David Thompson",
    role: "Headteacher",
    school: "St. Mary's Primary",
  },
  {
    quote: "Finally, a programme that understands the link between movement and learning. Our pupils are calmer, more focused, and happier.",
    author: "Rachel Adams",
    role: "Inclusion Lead",
  },
  {
    quote: "The coaches are fantastic. They built trust with our most anxious students incredibly quickly. A truly inclusive approach.",
    author: "Mark Davies",
    role: "PE Coordinator",
    school: "Westfield Academy",
  },
  {
    quote: "We've seen a significant improvement in emotional regulation since starting the Sensory Redevelopment programme.",
    author: "Emma Wilson",
    role: "Pastoral Manager",
  },
  {
    quote: "Maths Through Sport has been a game changer. Kids who 'hated' maths are now asking when the next session is!",
    author: "James Clarke",
    role: "Year 5 Teacher",
    school: "Riverside Primary",
  },
];

export const ENQUIRY_CONTENT = {
  heading: "Start a conversation",
  copy: [
    "Tell us a little about your school, setting, or young person and we will arrange a short call or visit. We tailor every programme so it aligns with your timetable, targets, and EHCP outcomes.",
    "Prefer to speak right away? Call or email us directly using the details below.",
  ],
};
