export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export type ProgrammeSection = {
  heading?: string;
  content?: string;
  bullets?: string[];
  subsections?: {
    heading: string;
    content?: string;
    bullets?: string[];
  }[];
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
  // New structured content for redesigned pages
  sections?: ProgrammeSection[];
  sessionDetails?: {
    location?: string;
    times?: string[];
    dates?: string;
    groupSize?: string;
    coaches?: string;
    equipment?: string;
    parentInvolvement?: string;
    blockStructure?: string;
  };
  pricing?: {
    registration?: number;
    perSession?: number;
    notes?: string[];
  };
  trialInfo?: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Maths Through Sport", href: "/maths-through-sport" },
  { label: "Sensory Redevelopment", href: "/sensory-redevelopment" },
  { label: "The Next Chapter", href: "/the-next-chapter" },
  { label: "Our Programmes", href: "/our-programmes" },
  { label: "Gallery", href: "/gallery" },
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
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Our Coaches", href: "/our-coaches" },
    ],
  },
  {
    label: "Programmes",
    href: "/our-programmes",
    children: PROGRAMME_PAGES,
  },
  { label: "Weekend Sessions", href: "/shop/sessions" },
  { label: "Our Vision", href: "/our-vision" },
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
      "Maths Through Sport helps neurodiverse children learn maths through movement, games, and sport. By turning maths into active, fun challenges, children build confidence, stay engaged, and enjoy learning in a way that works for them.",
    accent: "#1e3a5f",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/45/39/45397caf-ca8f-482b-98e6-01ca8bf50395.png",
    paragraphs: [
      "Our Maths Through Sport programme transforms the way neurodiverse children experience learning. By embedding core maths concepts into movement, games, and sporting activities, we create an environment where maths feels exciting, achievable, and fun.",
      "Children develop essential skills such as counting, addition, measurement, and problem solving not through worksheets, but through active challenges that keep them engaged and motivated. Each activity is carefully designed to build confidence for children who learn differently, while also encouraging teamwork and physical development.",
      "Learners who may have once felt anxious about maths begin to approach it with enjoyment and success. Schools and parents see measurable progress as pupils reconnect with the subject and build a positive attitude toward learning.",
    ],
  },
  {
    slug: "sensory-redevelopment",
    title: "Sensory Sessions",
    excerpt:
      "Our Sensory Redevelopment Programme helps neurodivergent children build focus, coordination, and emotional regulation through carefully designed physical activities. By strengthening key sensory systems, children gain confidence, control, and a stronger foundation for learning and everyday life.",
    accent: "#8b6914",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/62/f8/62f87fc5-6c92-421c-93be-82a4720f8739.jpg",
    paragraphs: [
      "Our Sensory Development Programme supports children with special educational needs and neurodivergent profiles by retraining the sensory nervous system, which forms the foundation for movement, focus, and emotional regulation.",
      "Through carefully designed physical activities, we strengthen key sensory systems. Each activity is engaging and accessible, gently guiding the brain and body to work together more smoothly.",
      "Over time, children gain greater control, confidence, and the ability to participate more fully in both school and everyday life. The result is improved focus, calmer behaviour, and stronger foundations for learning, development, and overall wellbeing.",
    ],
    bulletHeading: "Key sensory systems we strengthen:",
    bullets: [
      "Balance and proprioception, building body awareness, coordination, and control over gross motor skills including running, jumping, and posture.",
      "Fine motor skills, refining smaller and more precise movements such as writing, buttoning, and manipulating objects.",
      "Interoception, helping children recognise and respond to signals from inside their body.",
      "Regulation, supporting calmness, focus, and readiness to learn.",
    ],
    // New structured content
    sections: [
      {
        heading: "What Are Sensory Sessions?",
        content:
          "Our Weekend Sensory Sessions provide small, supportive group experiences for neurodivergent children, working alongside each child's EHCP or IEP. With a maximum of six children per group, sessions offer focused support, meaningful interaction, and a calm environment where children can grow in confidence and regulation.",
      },
      {
        heading: "Key Areas We Work On",
        bullets: [
          "Proprioception, supporting body awareness, coordination, and movement control",
          "Interoception, helping children recognise and respond to signals from within their body",
          "Regulation, supporting calmness, focus, and emotional readiness for learning",
        ],
      },
      {
        heading: "Why Attendance Matters",
        bullets: [
          "Builds consistency and routine, helping children feel safe and settled",
          "Allows sensory systems to develop gradually and effectively over time",
          "Supports progress in regulation, focus, and body awareness",
          "Helps children gain confidence as skills are practised and reinforced",
          "Creates stronger connections with coaches and familiar peers",
        ],
      },
      {
        heading: "What Your Child Gains",
        bullets: [
          "Improved body awareness, coordination, and movement confidence, aligned with their EHCP or IEP goals",
          "Greater emotional regulation and ability to stay calm and focused, supporting personalised targets",
          "Increased confidence through positive, supported experiences tailored to individual needs",
          "Stronger social skills and comfort interacting with others, reinforcing personalised learning objectives",
          "A sense of achievement and readiness for learning and everyday life, in line with each child's EHCP or IEP",
        ],
      },
    ],
    sessionDetails: {
      location: "Bishop Bridgeman C.E. Primary School",
      times: ["9:00 – 9:45", "9:45 – 10:30", "10:30 – 11:15", "11:15 – 12:00"],
      dates: "First block: 11th January to 22nd February",
      groupSize: "Small groups of up to 6 children for personalised attention",
      coaches: "Two experienced coaches to guide and support every child",
      equipment: "Variety of equipment to develop sensory, motor, and coordination skills",
      parentInvolvement:
        "Parents are involved in the sessions to support learning and reinforce skills at home",
      blockStructure:
        "Sessions run in half-termly blocks (6, 7, or 8 weeks depending on school holidays)",
    },
    pricing: {
      registration: 15,
      perSession: 15,
      notes: [
        "£15 registration at the start of each block",
        "£15 per session from then on with blocks of 6/7 weeks",
      ],
    },
    trialInfo:
      "Free taster session available. If you decide to sign up afterwards, this session will not be charged, and your child will be placed in a group that best suits their needs.",
  },
  {
    slug: "the-next-chapter",
    title: "The Next Chapter",
    excerpt:
      "The Next Chapter supports Year 7 students as they transition from primary to secondary school, with a strong focus on building friendships and belonging. Through shared activities, mentoring, and reflection, students form meaningful connections while developing confidence, emotional regulation, and readiness for this new stage of learning.",
    accent: "#2d4a6f",
    heroImage:
      "https://files.websitebuilder.prositehosting.co.uk/7e/44/7e446e97-fa38-4fda-902c-4a6346050a3f.jpg",
    paragraphs: [
      "The move from primary to secondary school marks an exciting new beginning, but it can also feel daunting for many students. The Next Chapter is designed to guide Year 7 students, particularly those with SEND or neurodivergent profiles, as they take their first steps into this new stage of learning and personal growth.",
      "In primary school, children spend most of their time with one teacher for five full days a week, creating a strong sense of safety and consistency. In secondary school, that structure changes. New teachers, subjects, and routines appear all at once, and for some students this shift can feel overwhelming.",
      "That is where The Next Chapter comes in. Each student is paired with a dedicated mentor who becomes a trusted and familiar face throughout their transition. Alongside this support, the programme places strong emphasis on friendship, helping students feel connected, accepted, and part of the school community from the very start.",
      "Through a blend of team-based physical activities, guided mentoring, and reflective discussions, students are given opportunities to interact naturally, work together, and form friendships in a relaxed and supportive environment. These shared experiences allow relationships to grow at a comfortable pace, reducing pressure and building trust.",
      "By combining movement, mentoring, and mindfulness, The Next Chapter helps students strengthen the social, emotional, and sensory foundations needed for a successful start to secondary school. The result is a smoother transition, stronger friendships, and a confident, supported beginning to the next chapter in learning and life.",
    ],
    bulletHeading: "Students develop essential skills such as:",
    bullets: [
      "Confidence and self-esteem, building a sense of belonging and readiness for new challenges.",
      "Friendship and social connection, forming meaningful relationships and learning teamwork through inclusive and active sessions.",
      "Emotional regulation, managing change, anxiety, and new routines with calm and confidence.",
      "Communication and independence, empowering students to express themselves and take ownership of their journey.",
    ],
    // New structured content
    sections: [
      {
        heading: "Supporting the Transition to Secondary School",
        content:
          "Starting secondary school is an exciting step but it can also be challenging. Students face new teachers, classrooms, subjects, and responsibilities. For some, this change can create social pressures and make it harder to settle in or feel confident.",
      },
      {
        content:
          "The Next Chapter helps students navigate these challenges by giving them the skills and support they need to engage fully in school and have the best start possible. We do this through fun, active sessions and sport-based activities that encourage teamwork, communication, and social connection.",
      },
      {
        heading: "Our Approach",
        subsections: [
          {
            heading: "Trusted Mentor Support",
            content:
              "Each student is paired with a mentor who becomes a consistent, supportive adult during the transition. Mentors provide guidance, reassurance, and help students feel safe, understood, and valued within the school community.",
          },
          {
            heading: "Activities and Sport",
            content:
              "Team games and active challenges give students opportunities to:",
            bullets: [
              "Practice communication skills",
              "Work together with peers",
              "Develop friendships and social confidence",
              "Experience success and build self-esteem in a supportive environment",
            ],
          },
          {
            heading: "Guided Mentoring and Reflection",
            content: "Through structured conversations and reflection, students learn to:",
            bullets: [
              "Navigate new social situations",
              "Maintain meaningful friendships",
              "Manage social pressures and responsibilities",
              "Express themselves confidently",
            ],
          },
        ],
      },
      {
        heading: "Why The Next Chapter Helps",
        content:
          "Starting secondary school brings new social expectations and responsibilities. Students must navigate:",
        bullets: [
          "Larger peer groups and changing friendship dynamics",
          "Increased independence and personal responsibility",
          "Unfamiliar routines and rules",
          "Social pressures that can affect confidence and engagement",
        ],
      },
      {
        content:
          "Friendships in secondary school are especially important because they shape a student's overall school experience and can influence their future social and emotional development. Positive friendships help students feel safe, included, and confident, while supportive peer relationships can make the difference between a negative experience and a positive, fulfilling school life.",
      },
      {
        content:
          "The Next Chapter uses activities and sport to teach these essential skills in a practical, enjoyable way. This helps students build meaningful friendships, feel included, and remain engaged in school.",
      },
      {
        heading: "What Students Gain",
        bullets: [
          "Stronger friendships and social connections",
          "Improved communication skills",
          "Greater confidence and self-esteem",
          "Better emotional regulation",
          "A sense of belonging and security in secondary school",
        ],
      },
      {
        content:
          "By focusing on social skills, confidence, and friendship through activities and sport, The Next Chapter helps students engage fully in school and start secondary education on a positive, supported path that can shape their future well-being.",
      },
    ],
    trialInfo:
      "Contact us to arrange a free trial session. After the trial, we will place your child in the group that best suits their needs.",
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
    quote: "He came back to class really enthusiastic about the session and remarked that he now knows his 3 times tables. He was really pleased with himself, which was wonderful to see. He said he loves maths.",
    author: "Miss Clarke",
    role: "Class Teacher",
    school: "Bishop Bridgeman CE Primary School",
  },
  {
    quote: "Learning Through Motion has been a fantastic addition to our school. They work closely with me to understand what we are focusing on in class and then plan practical, engaging sessions that support our children with SEN. Their sensory-based activities not only meet the pupils' sensory needs but also help them maintain attention, regulate themselves, and retain key information. The children absolutely love their sessions and look forward to them each week. It has been wonderful to see how much confidence and enjoyment the pupils gain from Learning Through Motion. Robbie and Julian are professional, thoughtful, and genuinely committed to supporting every child. I can't recommend them highly enough.",
    author: "Mrs Rout",
    role: "Teaching Assistant / SNA",
    school: "Bishop Bridgeman CE Primary School",
  },
  {
    quote: "The sessions were engaging and fun. The children made great progress and learned without even realising. The staff supported the children to be resilient and taught them so many new skills. I would recommend Learning Through Motion to any school who want support inclusion.",
    author: "Mike Lonsdale",
    role: "Headteacher",
    school: "Bishop Bridgeman CE Primary School",
  },
  {
    quote: "I took my son for two sessions in November and he loved it. Robbie and Julian were very understanding with his needs and did not pressure him. They let him be himself. They come round and talk to the parents and also take time to play with the children. I would definitely recommend.",
    author: "Parent",
    role: "Parent of SEND child",
  },
  {
    quote: "Hi guys. I just wanted to say a big thank you for having D at the sessions. He loved them. They give him freedom without intense structure, which allows him to be himself. He feels included, which is amazing for him. He loves the games, especially throwing balls at a wall and catching them in nets. It has also been lovely for me as a SEN parent to be around other parents who understand and don't have unrealistic expectations of my child. We will definitely be at the next sessions. Thank you for everything you do.",
    author: "Parent",
    role: "Parent of SEND child",
  },
];

export const ENQUIRY_CONTENT = {
  heading: "Start a conversation",
  copy: [
    "Tell us a little about your school, setting, or young person and we will arrange a short call or visit. We tailor every programme so it aligns with your timetable, targets, and EHCP outcomes.",
    "Prefer to speak right away? Call or email us directly using the details below.",
  ],
};
