// ── Article data ──────────────────────────────────────────────────────────────
const articleData = {
    'nasa-breakthrough': {
        title: 'NASA Announces Breakthrough in Deep Space Exploration Technology',
        category: 'Science',
        author: 'By Sarah Mitchell',
        date: 'March 18, 2024',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
        paragraphs: [
            'NASA scientists have unveiled a revolutionary propulsion system capable of cutting Mars travel time by nearly half, marking one of the most significant advances in space exploration in decades. The ion-drive technology, developed in collaboration with engineers from the Jet Propulsion Laboratory, achieved sustained thrust levels previously thought impossible outside theoretical models.',
            'The new system relies on charged xenon particles accelerated through a magnetic field, producing continuous low-level thrust over months-long burns. During recent unmanned trials, the spacecraft prototype reached velocities 40 percent higher than those achievable with conventional chemical rockets, while consuming a fraction of the fuel. Engineers estimate a crewed mission to Mars could now complete the journey in roughly four months rather than the traditional seven.',
            '"This changes every assumption we have about what deep-space missions look like," said Dr. Elena Voss, the project\'s lead engineer. NASA plans to integrate the system into its Artemis programme and is already in talks with international partners about a joint crewed Mars mission no later than 2038. A full technical paper has been submitted to the journal Nature Aerospace.'
        ]
    },
    'markets-rally': {
        title: 'Global Markets Rally as Economic Outlook Improves',
        category: 'Business',
        author: 'By James Chen',
        date: 'March 18, 2024',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
        paragraphs: [
            'Stock markets across Europe, Asia, and North America surged on Monday after a trio of economic indicators pointed to stronger-than-expected growth heading into the second quarter. The S&P 500 closed up 1.9 percent, the FTSE 100 gained 1.4 percent, and Japan\'s Nikkei reached its highest close since 2021 as investor sentiment shifted decisively positive.',
            'The rally was underpinned by a labour-market report showing unemployment at a four-year low, a manufacturing PMI reading that returned to expansion territory, and an inflation print that fell for the third consecutive month. Analysts at Goldman Sachs revised their full-year GDP forecast upward by half a percentage point, while the Federal Reserve signalled it may consider rate cuts later in the year if the trend continues.',
            'Not all sectors shared equally in the gains. Energy stocks lagged as oil prices eased on news of rising OPEC output, while consumer discretionary and technology names led the advance. Market strategists cautioned investors to watch upcoming corporate earnings reports carefully, as revenue guidance will be the next key test for the rally\'s durability.'
        ]
    },
    'urban-architecture': {
        title: 'The Renaissance of Urban Architecture',
        category: 'Culture',
        author: 'By Maria Santos',
        date: 'March 17, 2024',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
        paragraphs: [
            'A new generation of architects is reimagining what cities can look like, blending biophilic design, adaptive reuse, and hyper-local cultural references into buildings that feel both innovative and deeply rooted. From Mexico City\'s reborn waterfront to Copenhagen\'s timber-frame residential towers, the shift is visible across every continent.',
            'Central to the movement is the idea that the most sustainable building is often the one already standing. Adaptive reuse projects — converting factories into schools, car parks into housing, office blocks into mixed-use neighbourhoods — now account for a growing share of award-winning commissions. The approach cuts embodied carbon dramatically while preserving the material memory of a place.',
            '"Architecture has to be in conversation with the street," says Pritzker Prize–shortlisted designer Kofi Mensah, whose practice has completed landmark community centres in Accra and São Paulo. Urban planners increasingly agree, pushing for zoning reforms that give architects more latitude to create porous, pedestrian-first ground floors. The result, early data suggests, is measurably safer and more economically vibrant neighbourhoods.'
        ]
    },
    'climate-bill': {
        title: 'Senate Passes Historic Climate Bill After Marathon Session',
        category: 'Politics',
        author: 'By Robert Walsh',
        date: 'March 18, 2024',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
        paragraphs: [
            'After a gruelling 19-hour session that stretched past midnight, the Senate passed a landmark climate package in a 56–44 vote, securing rare bipartisan backing for a bill that allocates $480 billion toward clean energy infrastructure, grid modernisation, and coastal resilience over the next decade. The bill now heads to the House, where early whip counts suggest comfortable passage.',
            'Key provisions include a nationwide clean-electricity standard requiring utilities to source 80 percent of power from zero-emission sources by 2035, a methane-reduction programme targeting oil and gas operations, and the largest federal investment in public transit since the interstate highway system. Supporters estimate the legislation will cut U.S. greenhouse-gas emissions by 45 percent below 2005 levels by 2030.',
            'Critics on both sides expressed reservations. Environmental groups argued the bill\'s permitting streamlining for new transmission lines could harm protected habitats, while conservative senators warned of cost impacts on households. The White House, however, called the vote "a generational turning point" and pledged swift executive action to begin implementation within 90 days of the President\'s signature.'
        ]
    },
    'ai-breakthrough': {
        title: 'AI Researchers Achieve Major Breakthrough in Natural Language Understanding',
        category: 'Technology',
        author: 'By Emily Park',
        date: 'March 18, 2024',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
        paragraphs: [
            'Researchers at three leading AI labs have independently reported language models that achieve near-human performance on a comprehensive suite of comprehension benchmarks, a milestone the field has been targeting for years. The models demonstrate nuanced understanding of sarcasm, cultural context, and long-form argument structure — tasks that have historically confounded machine-learning systems.',
            'What distinguishes the new architectures is a novel training approach that combines massive pre-training on multilingual corpora with targeted reinforcement learning from human feedback loops redesigned to reward reasoning depth rather than surface fluency. Early testers report that the models catch logical contradictions in lengthy documents and can summarise legal or scientific texts with a precision that experts find surprisingly reliable.',
            'The breakthroughs raise significant questions alongside the excitement. Ethicists warn that models capable of mimicking nuanced human writing at scale could be weaponised for disinformation at an unprecedented level. Several of the labs involved have committed to staged public releases and independent audits, though critics argue that voluntary safeguards are insufficient without binding regulation.'
        ]
    },
    'sports-upset': {
        title: 'Underdog Team Stuns Champions in Historic Playoff Upset',
        category: 'Sports',
        author: 'By David Kim',
        date: 'March 17, 2024',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
        paragraphs: [
            'In one of the most stunning upsets in recent playoff history, the Riverside Falcons — seeded eighth and given less than 3 percent odds of advancing — defeated the back-to-back champion Westside Thunder 114–98 in a performance that had the sold-out arena in disbelief. The Falcons\' collective 52-point fourth quarter erased a 17-point deficit and secured their first finals berth in three decades.',
            'Forward Marcus Bell was the catalytic force, finishing with 38 points, 11 rebounds, and 7 assists. His three consecutive three-pointers to open the fourth quarter silenced the Thunder\'s crowd and triggered a visible breakdown in the defending champions\' defensive rotations. Falcons head coach Diana Reyes, in her second season leading the squad, was visibly emotional at the final buzzer.',
            '"I told them at halftime: the scoreboard is wrong," Reyes said in her post-game press conference. "We were the better team and we just had to keep playing our game." The Falcons will face the North Bay Giants in the finals beginning Saturday. Ticket resale prices for Game 1 have already surpassed $2,000 as a fanbase that endured 30 lean years prepares to believe again.'
        ]
    },
    'mediterranean-diet': {
        title: 'New Study Reveals Surprising Benefits of Mediterranean Diet',
        category: 'Health',
        author: 'By Dr. Anna Liu',
        date: 'March 16, 2024',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=400&fit=crop',
        paragraphs: [
            'A landmark five-year study tracking 12,000 adults across eight countries has found that adherents of a traditional Mediterranean diet showed a 28 percent lower risk of cognitive decline and a 19 percent reduction in all-cause mortality compared with a matched control group following a standard Western diet. The findings, published in The Lancet, reinforce a growing body of evidence linking food patterns to long-term brain health.',
            'Participants who scored highest on a Mediterranean adherence index — characterised by high intake of olive oil, legumes, fish, whole grains, and fresh vegetables alongside moderate red wine consumption — also displayed lower markers of systemic inflammation. Researchers used advanced neuroimaging on a subset of 1,400 volunteers and found measurably greater grey-matter volume in regions associated with memory and executive function.',
            '"The results are strong enough that we would now consider this dietary pattern a first-line recommendation for cognitive health alongside physical exercise and sleep hygiene," said lead researcher Professor Yusuf Al-Hassan of the University of Barcelona. Nutritionists caution, however, that adherence is the key variable and that simply adding olive oil to an otherwise poor diet is insufficient to replicate the benefits observed in the study.'
        ]
    },
    'future-of-work': {
        title: 'The Future of Work Is Already Here',
        category: 'Opinion',
        author: 'By Michael Torres',
        date: 'March 15, 2024',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
        paragraphs: [
            'Four years after the pandemic forced millions of workers out of offices and into spare bedrooms, it is clear that the remote-work experiment was not an experiment at all — it was a permanent shift. Productivity data, employee-satisfaction surveys, and talent-acquisition trends all point in the same direction: the five-day in-office week is an artefact of the 20th century.',
            'Companies that have clung to mandatory full-time office attendance are now paying for it in attrition. A study from Stanford\'s Institute for Economic Policy Research found that firms requiring full in-office presence experienced 18 percent higher voluntary turnover than peers offering hybrid arrangements. Meanwhile, distributed teams at companies like Basecamp and GitLab have built extraordinary products without a single shared office.',
            'The deeper question is not where we work but how we redesign the structures of work for an era of flexibility. That means rethinking performance evaluation, communication norms, and the way managers build trust. The organisations that figure this out first will have an enormous and lasting competitive advantage in attracting the people who build the future.'
        ]
    },
    'urban-transportation': {
        title: 'Why We Need to Rethink Urban Transportation',
        category: 'Opinion',
        author: 'By Dr. Lisa Chen',
        date: 'March 14, 2024',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop',
        paragraphs: [
            'The 20th century gave us the automobile-centric city. The consequences — smog, sprawl, pedestrian deaths, and the slow suffocation of street life — are so normalised that we barely notice them anymore. But a reckoning is coming, and the cities that prepare for it now will thrive while the rest scramble.',
            'The evidence for change is overwhelming. Cities that have invested heavily in cycling infrastructure, such as Amsterdam and Seville, have seen road fatalities drop by over 40 percent and local business revenue rise as more pedestrians linger on streets no longer dominated by cars. Oslo went an entire year with zero pedestrian fatalities after implementing its car-free city centre. These are not accidents; they are design outcomes.',
            'The barriers are political, not technical. We know how to build great transit and protected bike lanes. What we lack is the willingness to reallocate road space from cars to people. Every parking lane converted to a protected cycleway is a statement that human life and public health outrank the convenience of single-occupancy vehicles. It is past time for more city leaders to make that statement.'
        ]
    },
    'climate-summit': {
        title: 'Climate Summit Reaches Unprecedented Agreement',
        category: 'Science',
        author: 'By The Chronicle',
        date: 'March 12, 2024',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
        paragraphs: [
            'World leaders concluded a three-day climate summit in Geneva with a landmark accord committing 148 nations to net-zero emissions targets enforceable under international law for the first time. The agreement, hailed by the UN Secretary-General as "the most consequential climate text since the Paris Agreement," includes a binding $200 billion annual fund to help developing nations transition away from fossil fuels.',
            'The centrepiece of the accord is a peer-review mechanism under which independent panels of scientists will assess each country\'s emissions progress every two years and publish findings publicly. Nations that fall more than 15 percent below their stated trajectory face trade consequences — a provision that analysts say gives the treaty real teeth compared to predecessor frameworks.',
            'Negotiators from small-island states, who have long argued that existing commitments are insufficient to prevent catastrophic sea-level rise, declared victory on a separate loss-and-damage clause that creates a compensation mechanism for climate-related disasters. Environmental NGOs gave the accord a cautious welcome, noting that implementation timelines remain the critical variable.'
        ]
    },
    'antitrust-tech': {
        title: 'Tech Giants Face New Antitrust Scrutiny',
        category: 'Technology',
        author: 'By The Chronicle',
        date: 'March 11, 2024',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        paragraphs: [
            'Regulators in the United States, the European Union, and the United Kingdom have launched coordinated antitrust investigations into four of the world\'s largest technology companies, targeting app-store policies, cloud-computing bundling, and digital-advertising practices. Legal experts describe the simultaneous multiregional probe as unprecedented in scale and a signal that governments are done negotiating.',
            'The EU investigation centres on whether a dominant search and advertising platform illegally suppressed rival ad-tech firms through contractual lock-ins with publishers. In the US, the focus is on app-store commission structures and whether platform owners can simultaneously operate a marketplace and compete in it — a question that a recent district court ruling left partially unanswered.',
            'Shares across the sector fell between two and six percent on the news, though analysts note that antitrust proceedings typically take years to resolve and rarely result in the kind of structural break-ups that would materially alter business models. Still, the reputational and compliance costs are already rising, and several companies have begun quietly adjusting policies ahead of formal charges.'
        ]
    },
    'art-digital': {
        title: "The Art World's Digital Revolution",
        category: 'Culture',
        author: 'By The Chronicle',
        date: 'March 10, 2024',
        image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&h=400&fit=crop',
        paragraphs: [
            'Digital art has graduated from curiosity to cultural force. Last month\'s marquee auction at Christie\'s featured a dedicated digital-art evening that grossed $34 million, while several blue-chip galleries now maintain dedicated NFT and generative-art programmes alongside their traditional rosters. The transition is no longer hypothetical: the money and the critical attention have both arrived.',
            'What drives the shift is partly technological and partly generational. A cohort of collectors under 40 has grown up with screens as primary aesthetic environments and sees no meaningful hierarchy between a painting on canvas and an artwork displayed on a calibrated monitor. Meanwhile, generative artists who work with code are producing work of genuine formal complexity that challenges traditional notions of authorship and originality.',
            'Not everyone in the art world is convinced. Some curators argue that the market\'s enthusiasm for digital work is driven more by speculative frenzy than genuine critical evaluation, and that the carbon footprint of certain blockchain-based platforms sits uncomfortably alongside art\'s claims to cultural seriousness. The debate is far from settled, but the question is now whether traditional institutions can adapt rather than whether digital art will endure.'
        ]
    },
    'space-tourism': {
        title: 'Space Tourism Takes Off',
        category: 'Science',
        author: 'By The Chronicle',
        date: 'March 9, 2024',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=400&fit=crop',
        paragraphs: [
            'The commercial space-tourism sector crossed a symbolic threshold last week when a private operator completed its 50th crewed flight, carrying a cumulative total of more than 300 paying passengers to altitudes above 80 kilometres. Ticket prices have fallen roughly 60 percent over three years as reusable-vehicle economics improve and competition between providers intensifies.',
            'Two companies now offer orbital experiences — multi-day stays in pressurised modules with views of the full curvature of the Earth — with prices starting at $1.2 million per seat, compared with $55 million for a seat on a government-funded spacecraft a decade ago. Industry forecasters project the sector will exceed $10 billion in annual revenue by 2030 if launch cadences continue to improve.',
            'Critics point to the obvious equity gap: access to space remains limited to the ultra-wealthy for the foreseeable future, and the carbon emissions per passenger on a rocket flight dwarf those of even a long-haul commercial flight. Proponents counter that every technology follows a cost-reduction curve and that space tourism funds the R&D that will eventually make access democratic. That argument is likely to remain contested for some time.'
        ]
    },
    'ev-sales': {
        title: 'Electric Vehicles Hit Record Sales',
        category: 'Business',
        author: 'By The Chronicle',
        date: 'March 8, 2024',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop',
        paragraphs: [
            'Global electric vehicle sales reached 14.2 million units in 2023, a 35 percent increase year-on-year and the highest total in the industry\'s history. China remained the dominant market, accounting for 60 percent of global volume, but Europe and North America both recorded their strongest years to date as government incentives, improved charging networks, and a broader model range drew in mainstream buyers.',
            'The milestone comes as several legacy automakers announce accelerated timelines for phasing out internal-combustion-engine platforms. Three of the five largest global manufacturers now plan to offer exclusively electric or fuel-cell powertrains by 2030 in key markets, a schedule most industry analysts would have considered unrealistically ambitious just five years ago.',
            'Supply-chain pressures on battery minerals — particularly lithium and cobalt — remain the principal constraint on further growth. Spot prices for lithium carbonate have stabilised after a volatile 2022, but analysts warn that demand for raw materials will outpace current mining and refining capacity by the late 2020s unless significant new investment is committed soon. Solid-state battery technology, if it scales as promised, could ease some of those pressures by reducing the quantity of minerals required per kilowatt-hour.'
        ]
    },
    'chip-shortage': {
        title: 'The Chip Shortage Finally Shows Signs of Easing',
        category: 'Technology',
        author: 'By Tech Desk',
        date: 'March 7, 2024',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
        paragraphs: [
            'After nearly three years of supply-chain disruption that rattled industries from automotive to consumer electronics, semiconductor lead times have fallen to their lowest level since early 2020. TSMC, Samsung, and Intel all reported this week that capacity utilisation across their most constrained nodes has stabilised, and several major customers confirmed that spot-market purchases — a reliable indicator of panic buying — have all but ceased.',
            'The improvement reflects a combination of factors: new fabs coming online in Arizona, Japan, and Germany; a moderation in consumer electronics demand following the pandemic-era surge; and efficiency gains from next-generation tooling. The CHIPS Act in the United States and equivalent legislation in the EU have also begun to unlock long-delayed investment decisions.',
            'Analysts caution against declaring full victory. Leading-edge capacity for the most advanced process nodes remains tight, and geopolitical risks around Taiwan — home to more than 60 percent of global advanced chip production — have not diminished. The strategic diversification now under way is prudent, but it will take the better part of a decade to fundamentally rebalance the industry\'s geographic concentration.'
        ]
    },
    'cybersecurity-threat': {
        title: 'Cybersecurity Experts Warn of New Threat Landscape',
        category: 'Technology',
        author: 'By Security Team',
        date: 'March 6, 2024',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
        paragraphs: [
            'A joint advisory from cybersecurity agencies in the United States, United Kingdom, and Australia has identified a new class of AI-augmented attacks targeting critical infrastructure that are significantly more sophisticated than anything previously documented. The threat actors, believed to be state-sponsored, are using large language models to craft phishing messages indistinguishable from legitimate correspondence and to accelerate zero-day vulnerability discovery.',
            'Energy grids, water treatment systems, and financial clearing networks have been the primary targets in a campaign that researchers have tracked for approximately 18 months. In several cases, attackers maintained persistent access within operational technology networks for over six months before being detected — a dwell time that security professionals describe as alarming given the potential for sabotage.',
            'The advisory urges organisations to prioritise network segmentation, multi-factor authentication on all externally facing systems, and tabletop exercises that specifically model AI-assisted attack scenarios. "The pace of attacker innovation is outrunning the pace of defender investment," said one senior official who spoke on condition of anonymity. "We need to close that gap urgently."'
        ]
    },
    'bigdata-healthcare': {
        title: 'How Big Data Is Transforming Healthcare',
        category: 'Technology',
        author: 'By Health Tech',
        date: 'March 5, 2024',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
        paragraphs: [
            'Hospitals and research institutions are quietly undergoing one of the most consequential transformations in medicine\'s history as vast datasets — electronic health records, genomic sequences, medical imaging, and wearable-device streams — are combined and analysed at scale for the first time. Early results suggest that data-driven approaches can identify disease risk years before symptoms emerge and personalise treatment in ways that population-level clinical trials never could.',
            'A consortium of twelve hospitals in the UK recently published findings showing that a machine-learning model trained on anonymised patient records predicted sepsis onset 12 hours before clinical recognition in 74 percent of cases — time that, if acted upon, could prevent thousands of deaths annually. Similar models are being developed for early Alzheimer\'s detection, cancer screening, and post-surgical complication risk.',
            'The promise is enormous, but so are the ethical and governance challenges. Questions around data ownership, patient consent, algorithmic bias, and the risk of de-anonymisation remain largely unresolved. Healthcare data is uniquely sensitive, and breaches carry consequences far beyond financial loss. Regulators in Europe and North America are working to develop frameworks that enable innovation without sacrificing the trust that the entire healthcare system depends on.'
        ]
    }
};

// ── Modal ─────────────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById('articleModal');
const modalClose   = document.getElementById('modalClose');
const modalImage   = document.getElementById('modalImage');
const modalCat     = document.getElementById('modalCategory');
const modalTitle   = document.getElementById('modalTitle');
const modalAuthor  = document.getElementById('modalAuthor');
const modalDate    = document.getElementById('modalDate');
const modalContent = document.getElementById('modalContent');

function openArticleModal(articleId) {
    const article = articleData[articleId];
    if (!article) return;

    modalImage.src = article.image;
    modalImage.alt = article.title;
    modalCat.textContent = article.category;
    modalTitle.textContent = article.title;
    modalAuthor.textContent = article.author;
    modalDate.textContent = article.date;
    modalContent.innerHTML = article.paragraphs.map(p => `<p>${p}</p>`).join('');

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeArticleModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeArticleModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeArticleModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArticleModal();
});

// Handle article clicks
document.querySelectorAll('[data-article]').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        openArticleModal(this.getAttribute('data-article'));
    });
});

// ── Search ────────────────────────────────────────────────────────────────────
const searchBar    = document.getElementById('searchBar');
const searchInput  = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchClose  = document.getElementById('searchClose');
const searchBtn    = document.querySelector('.btn-search');

function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        // Show all
        document.querySelectorAll('[data-article]').forEach(el => el.style.display = '');
        removeNoResultsMsg();
        return;
    }

    let visibleCount = 0;
    document.querySelectorAll('[data-article]').forEach(el => {
        const id    = el.getAttribute('data-article');
        const data  = articleData[id] || {};
        const text  = ((data.title || '') + ' ' + (data.category || '') + ' ' +
                       el.textContent).toLowerCase();
        const show  = text.includes(q);
        el.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    if (visibleCount === 0) {
        showNoResultsMsg(query);
    } else {
        removeNoResultsMsg();
    }
}

function showNoResultsMsg(query) {
    removeNoResultsMsg();
    const msg = document.createElement('p');
    msg.id = 'noResultsMsg';
    msg.className = 'search-no-results';
    msg.style.display = 'block';
    msg.textContent = `No articles found for "${query}".`;
    const latest = document.querySelector('.latest') || document.querySelector('.main');
    if (latest) latest.prepend(msg);
}

function removeNoResultsMsg() {
    const existing = document.getElementById('noResultsMsg');
    if (existing) existing.remove();
}

function openSearchBar() {
    searchBar.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
}

function closeSearchBar() {
    searchBar.classList.remove('open');
    // Restore all articles
    document.querySelectorAll('[data-article]').forEach(el => el.style.display = '');
    removeNoResultsMsg();
}

searchBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openSearchBar();
});

searchSubmit.addEventListener('click', () => runSearch(searchInput.value));
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch(searchInput.value);
    if (e.key === 'Escape') closeSearchBar();
});
searchClose.addEventListener('click', closeSearchBar);

// ── Newsletter form ───────────────────────────────────────────────────────────
const newsletterForm    = document.querySelector('.newsletter-form');
const newsletterSuccess = document.getElementById('newsletterSuccess');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const email = input.value.trim();
    if (!email || !email.includes('@')) return;

    newsletterSuccess.style.display = 'block';
    input.value = '';

    setTimeout(() => {
        newsletterSuccess.style.display = 'none';
    }, 5000);
});

// ── Subscribe button (header) → scroll to newsletter ─────────────────────────
const subscribeBtn = document.querySelector('.btn-subscribe');
subscribeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const section = document.querySelector('.newsletter');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ── Scroll-reveal animations ──────────────────────────────────────────────────
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll(
    '.featured-main, .article-card, .article-row, .sidebar-section'
);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.05}s, transform 0.5s ease ${(index % 4) * 0.05}s`;
    observer.observe(el);
});

const revealStyle = document.createElement('style');
revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(revealStyle);

// ── Current date ──────────────────────────────────────────────────────────────
const dateElement = document.querySelector('.header-date');
if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// ── Smooth scroll for internal links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Image lazy-load fade ──────────────────────────────────────────────────────
document.querySelectorAll('.article-image img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
});
