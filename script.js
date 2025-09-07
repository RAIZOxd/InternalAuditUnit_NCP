document.addEventListener('DOMContentLoaded', () => {
    // Critical: Immediately prevent layout shifts on refresh
    document.body.classList.remove('page-loading');
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.body.style.transform = 'none';
    
    // Detect if this is a page refresh
    const isRefresh = (performance.navigation && performance.navigation.type === 1) || 
                     (window.performance && window.performance.navigation && window.performance.navigation.type === 1) ||
                     document.referrer === window.location.href;
    
    if (isRefresh) {
        document.body.classList.add('refreshing');
    }
    
    // Handle font loading to prevent layout shifts
    if (document.fonts) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    } else {
        // Fallback for browsers without font loading API
        setTimeout(() => {
            document.body.classList.add('fonts-loaded');
        }, 50);
    }
    
    // Immediately reset any persisted states that could cause alignment issues
    resetPageState();
    
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Function to reset page state on load/refresh
    function resetPageState() {
        // Critical: Force reset mobile menu state immediately
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-active');
            document.body.style.overflow = '';
            
            // Force reset positioning
            navMenu.style.transform = 'translateY(-100vh)';
            navMenu.style.opacity = '0';
            navMenu.style.visibility = 'hidden';
        }
        
        // Reset any transform or opacity issues on elements
        document.querySelectorAll('.objective-card, .function-item, .team-member-card, .contact-card, .officer-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
        
        // Ensure navbar is in correct state
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'none';
            navbar.style.opacity = '1';
            navbar.classList.remove('scrolled');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            }
        }
        
        // Reset hero section if it exists
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
            hero.style.opacity = '1';
        }
        
        // Force layout reflow
        document.body.offsetHeight;
    }
    
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Improved hamburger click handler with better state management
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-active');
                document.body.style.overflow = '';
            } else {
                // Open menu
                navMenu.classList.add('active');
                hamburger.classList.add('active');
                document.body.classList.add('menu-active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Enhanced nav links click handling
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            // Add click ripple effect
            link.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('nav-ripple');
                
                link.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-active');
                    document.body.style.overflow = '';
                }
            });
            
            // Add modern hover sound effect simulation and visual feedback
            link.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    link.style.setProperty('--hover-scale', '1.05');
                }
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.setProperty('--hover-scale', '1');
            });
        });
        
        // Enhanced outside click handler
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-active');
                document.body.style.overflow = '';
            }
        });
    }

    // Language toggle functionality with better state management
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('language') || 'si';

    // Ensure consistent language state on page load
    if (document.documentElement.lang !== currentLang) {
        document.documentElement.lang = currentLang;
    }

    const translations = {
        en: {
            // Navigation
            'nav-title': 'Internal Affairs Unit',
            'nav-subtitle': 'North Central Provincial Council',
            'nav-home': 'Home',
            'nav-objectives': 'Main Objectives',
            'nav-functions': 'Responsibilities & Functions',
            'nav-team': 'Composition',
            'lang-toggle': 'සිංහල',

            // Home Page
            'hero-title': 'Internal Affairs Unit',
            'hero-subtitle': 'North Central Provincial Council',
            'hero-description': 'Promoting transparency, accountability and integrity to improve public services',
            'hero-btn1': 'View Objectives',
            'hero-btn2': 'View Functions',
            'intro-title': 'Introduction',
            'intro-text': 'As a major initiative in the process of combating corruption in the public sector, it has been decided to establish Internal Affairs Units (IAUs) in all government institutions to create a culture that fosters transparency, accountability, and integrity throughout the public sector and to provide government services effectively to all citizens.',
            'contact-title': 'Contact Information',
            'email-label': 'Email',
            'phone-label': 'Telephone',
            'fax-label': 'Fax',
            'officers-title': 'Key Officers',
            'unit-head-title': 'Unit Head',
            'unit-head-name': 'Mrs. R. M. D. P. Pushpa Kumari',
            'unit-head-position': 'Secretary, Provincial Ministry of Health',
            'unit-head-phone': 'Telephone: 025 2222175',
            'subject-officer-title': 'Subject Officer',
            'subject-officer-name': 'Mrs. H. G. T. H. Anuradha',
            'subject-officer-position': 'Development Officer',
            'subject-officer-phone': 'Telephone: 025 2222736',

            // Objectives Page
            'page-title': 'Main Objectives',
            'breadcrumb-home': 'Home',
            'breadcrumb-current': 'Main Objectives',
            'objectives-title': 'Main Objectives of the Internal Affairs Unit',
            'objectives-intro': 'The Internal Affairs Unit has established the following main objectives to promote transparency, accountability and integrity within the public sector.',
            'objective-1-title': 'Prevent Corruption',
            'objective-1-desc': 'To prevent corruption and develop a culture of integrity within the institution.',
            'objective-2-title': 'Transparency & Accountability',
            'objective-2-desc': 'To ensure transparency and accountability in all activities of the institution and to ensure public access to information on institutional activities and decisions.',
            'objective-3-title': 'Ethical Governance',
            'objective-3-desc': 'To promote ethical governance within the institution.',
            'objective-4-title': 'Secure Reporting',
            'objective-4-desc': 'To develop a safe and accessible mechanism to encourage reporting of misconduct, protect whistleblowers, and maintain confidentiality.',
            'objective-5-title': 'Law Enforcement',
            'objective-5-desc': 'To assist in law enforcement in collaboration with law enforcement agencies and the Commission to Investigate Allegations of Bribery or Corruption.',
            'cta-title': 'Learn About Functions and Responsibilities',
            'cta-desc': 'Get detailed information about the functions and responsibilities of the Internal Affairs Unit.',
            'cta-button': 'View Functions',

            // Functions Page
            'functions-title': 'Responsibilities and Functions of the Internal Affairs Unit',
            'functions-intro': 'The following specific responsibilities and functions are assigned to the Internal Affairs Unit to ensure proactive, clear, and focused anti-corruption efforts, targeting the main elements of corporate integrity.',
            'function-1-title': 'Procedure Review',
            'function-1-desc': 'Reviewing current procedures and circulars to identify systemic bottlenecks within the institution and simplifying them to enhance operational efficiency.',
            'function-2-title': 'Corruption Risk Assessment',
            'function-2-desc': 'Conducting Corruption Risk Assessments to identify areas within the institution that are vulnerable to corruption and unethical behavior and taking targeted preventive measures.',
            'function-3-title': 'Integrity Action Plan',
            'function-3-desc': 'Preparing and implementing a corporate integrity action plan that includes specific anti-corruption objectives and strategies tailored to the needs of the institution.',
            'function-4-title': 'National Strategy Compliance',
            'function-4-desc': 'Complying with national anti-corruption strategies by aligning corporate policies and practices with the National Anti-Corruption Action Plan.',
            'function-5-title': 'Compliance Assessment',
            'function-5-desc': 'Conducting Compliance Assessments to evaluate the institution\'s compliance with national and international anti-corruption laws, including the Anti-Corruption Act No. 9 of 2023, and identifying areas for improvement.',
            'function-6-title': 'Asset Declaration & Conflict Management',
            'function-6-desc': 'Ensuring compliance with asset declaration requirements for all public officials and employees and managing conflicts of interest in accordance with the orders of the Commission to Investigate Allegations of Bribery or Corruption and the Anti-Corruption Act No. 9 of 2023.',
            'function-7-title': 'Complaint Management System',
            'function-7-desc': 'Establishing a secure system for receiving and managing complaints related to corruption and unethical behavior within the institution, ensuring that such complaints are promptly handled by the relevant officers or units.',
            'function-8-title': 'Citizen\'s Charter',
            'function-8-desc': 'Developing and publishing a citizen\'s charter detailing the services provided by the institution.',
            'function-9-title': 'Ethical Policies',
            'function-9-desc': 'Establishing and enforcing policies that promote ethical governance, including a standardized code of ethics to be followed by public officials.',
            'function-10-title': 'Training & Awareness',
            'function-10-desc': 'Training and awareness-raising for staff and taking other measures as an incentive to remain committed to anti-corruption principles.',
            'function-11-title': 'National Integrity Assessment',
            'function-11-desc': 'Acting as the institutional focal point for the National Anti-Corruption Integrity Assessment, ensuring that the institution participates in and aligns with the integrity assessment processes led by the Commission to Investigate Allegations of Bribery or Corruption.',
            'function-12-title': 'Commission Liaison',
            'function-12-desc': 'Maintaining contact with the Commission to Investigate Allegations of Bribery or Corruption to obtain continuous guidance and support in the performance of the unit\'s duties.',
            'function-13-title': 'Report Preparation',
            'function-13-desc': 'Preparing periodic and annual reports summarizing the activities of the Internal Affairs Unit, the progress of anti-corruption initiatives, challenges faced, and recommendations for future action.',
            'function-14-title': 'Private Sector Collaboration',
            'function-14-desc': 'Formulating and implementing plans to promote integrity with the participation of private sector stakeholders.',

            // Team Page
            'team-title': 'Composition of the Internal Affairs Unit',
            'member-1-name': 'Mrs. R. M. D. P. Pushpa Kumari',
            'member-1-position': 'Unit Head',
            'member-1-designation': 'Secretary, Provincial Ministry of Health',
            'member-2-name': 'Mr. W.M. Gayan Indika',
            'member-2-position': 'Integrity Officer',
            'member-2-designation': 'Provincial Director of Sports',
            'table-title': 'Composition - Summary',
            'table-th-position': 'Position',
            'table-th-name': 'Officer Name',
            'table-th-designation': 'Additional Position',
            'table-th-contact': 'Contact',
            'row-1-position': 'Unit Head',
            'row-1-name': 'Mrs. R. M. D. P. Pushpa Kumari',
            'row-1-designation': 'Secretary, Provincial Ministry of Health',
            'row-1-contact': '025 2222175',
            'row-2-position': 'Integrity Officer',
            'row-2-name': 'Mr. W.M. Gayan Indika',
            'row-2-designation': 'Provincial Director of Sports',
            'row-2-contact': '025 2222736',
            'contact-section-title': 'Contact the Unit',
            'email-title': 'Email',
            'main-phone-title': 'Main Telephone',
            'fax-title': 'Fax',
            'cta-btn-1': 'View Objectives',
            'cta-btn-2': 'View Functions',

            // Footer
            'footer-title': 'Internal Affairs Unit',
            'footer-subtitle': 'North Central Provincial Council',
            'footer-nav-title': 'Navigation',
            'footer-home': 'Home',
            'footer-objectives': 'Main Objectives',
            'footer-functions': 'Responsibilities & Functions',
            'footer-team': 'Composition',
            'footer-contact-title': 'Contact Us',
            'footer-copyright': '&copy; 2025 Internal Affairs Unit, North Central Provincial Council. All Rights Reserved.'
        },
        si: {
            // Navigation
            'nav-title': 'අභ්‍යන්තර කටයුතු ඒකකය',
            'nav-subtitle': 'උතුරු මැද පළාත් සභාව',
            'nav-home': 'මුල් පිටුව',
            'nav-objectives': 'ප්‍රධාන අරමුණු',
            'nav-functions': 'වගකීම් සහ කාර්යයන්',
            'nav-team': 'සංයුතිය',
            'lang-toggle': 'English',

            // Home Page
            'hero-title': 'අභ්‍යන්තර කටයුතු ඒකකය',
            'hero-subtitle': 'උතුරු මැද පළාත් සභාව',
            'hero-description': 'විනිවිද භාවය, වගකීම සහ සුපිළිපන්න භාවය ප්‍රවර්ධනය කරමින් රාජ්‍ය සේවා වැඩිදියුණු කිරීම',
            'hero-btn1': 'අරමුණු බලන්න',
            'hero-btn2': 'කාර්යයන් බලන්න',
            'intro-title': 'හැඳින්වීම',
            'intro-text': 'රාජ්‍ය අංශය තුළ දූෂණය මැඩලීමේ ක්‍රියාවලියේ ප්‍රධාන මුල පිරීමක් ලෙස රාජ්‍ය අංශය පුරා විනිවිද භාවය, වග වීම සහ සුපිළිපන්න භාවය පෝෂණය කරන සංස්කෘතියක් නිර්මාණය කර රජයේ සේවාවන් සියලුම පුරවැසියන්ට ඵලදායි ලෙස සැපයීම සඳහා සියලුම රජයේ ආයතන තුළ අභ්‍යන්තර කටයුතු ඒකක (Internal Affairs Unit - IAU) පිහිටුවීමට තීරණය කර ඇත.',
            'contact-title': 'සම්බන්ධතා තොරතුරු',
            'email-label': 'විද්‍යුත් තැපෑල',
            'phone-label': 'දුරකථන',
            'fax-label': 'ෆැක්ස්',
            'officers-title': 'ප්‍රධාන නිලධාරීන්',
            'unit-head-title': 'ඒකක ප්‍රධානි',
            'unit-head-name': 'ආර්. එම්. ඩී. පී. පුෂ්ප කුමාරි මිය.',
            'unit-head-position': 'ලේකම්, පළාත් සෞඛ්‍ය අමාත්‍යාංශය',
            'unit-head-phone': 'දුරකථන: 025 2222175',
            'subject-officer-title': 'විෂය නිලධාරි',
            'subject-officer-name': 'එච්. ජී. ටී. එච්. අනුරාධා මිය',
            'subject-officer-position': 'සංවර්ධන නිලධාරි',
            'subject-officer-phone': 'දුරකථන: 025 2222736',

            // Objectives Page
            'page-title': 'ප්‍රධාන අරමුණු',
            'breadcrumb-home': 'මුල් පිටුව',
            'breadcrumb-current': 'ප්‍රධාන අරමුණු',
            'objectives-title': 'අභ්‍යන්තර කටයුතු ඒකකයේ ප්‍රධාන අරමුණු',
            'objectives-intro': 'අභ්‍යන්තර කටයුතු ඒකකය රාජ්‍ය අංශය තුළ විනිවිද භාවය, වගවීම සහ සුපිළිපන්න භාවය ප්‍රවර්ධනය කිරීම සඳහා පහත ප්‍රධාන අරමුණු සකස් කර ගෙන ඇත.',
            'objective-1-title': 'දූෂණය වැළැක්වීම',
            'objective-1-desc': 'ආයතනය තුළ දූෂණය වැළැක්වීම සහ සුපිළිපන්න සංස්කෘතියක් වර්ධනය කිරීම.',
            'objective-2-title': 'විනිවිද භාවය සහ වගවීම',
            'objective-2-desc': 'ආයතනයේ සියලුම ක්‍රියාකාරකම්වල විනිවිධ භාවය සහ වගවීම සහතික කිරීම සහ ආයතනික ක්‍රියාකාරකම් සහ තීරණ සම්බන්ධ තොරතුරු වෙත මහජන ප්‍රවේශය සහතික කිරීම.',
            'objective-3-title': 'සදාචාරාත්මක පාලනය',
            'objective-3-desc': 'ආයතනය තුළ සදාචාරාත්මක පාලනයක් ප්‍රවර්ධනය කිරීම.',
            'objective-4-title': 'ආරක්ෂිත වාර්තා කිරීම',
            'objective-4-desc': 'විෂමාචාර වාර්තා කිරීම දිරි ගැන්වීම, තොරතුරු හෙළි කරන්නන් ආරක්ෂා කිරීම සහ රහස්‍යභාවය පවත්වා ගැනීම සඳහා ආරක්ෂිත සහ ප්‍රවේශ විය හැකි ක්‍රම වේදයක් සකස් කිරීම.',
            'objective-5-title': 'නීති ක්‍රියාත්මක කිරීම',
            'objective-5-desc': 'නීතිය ක්‍රියාත්මක කරන ආයතන සහ අල්ලස් හෝ දූෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සමඟ සහයෝගයෙන් නීති බලාත්මක කිරීමට සහය වීම.',
            'cta-title': 'කාර්යයන් සහ වගකීම් දැන ගන්න',
            'cta-desc': 'අභ්‍යන්තර කටයුතු ඒකකයේ විස්තරාත්මක කාර්යයන් සහ වගකීම් පිළිබඳ වැඩි විස්තර ලබා ගන්න.',
            'cta-button': 'කාර්යයන් බලන්න',

            // Functions Page
            'functions-title': 'අභ්‍යන්තර කටයුතු ඒකකයෙහි වගකීම සහ කාර්යයන්',
            'functions-intro': 'ආයතනික සුපිළිපන්න භාවයේ ප්‍රධාන අංග ඉලක්ක කර ගනිමින් ක්‍රියාශීලී, පැහැදිලි සහ කේන්ද්‍රගත දුෂණ විරෝධී ප්‍රයත්නයන් තහවුරු කිරීම සඳහා පහත සඳහන් නිශ්චිත වගකීම් සහ කාර්යයන් අභ්‍යන්තර කටයුතු ඒකකය වෙත පැවරී ඇත.',
            'function-1-title': 'ක්‍රියා පටිපාටි සමාලෝචනය',
            'function-1-desc': 'ආයතනය තුළ පවතින පද්ධතිමය බාධාවන් (systemic bottlenecks) හඳුනා ගැනීම සඳහා වත්මන් ක්‍රියා පටිපාටි සහ වක්‍ර ලේඛ පරීක්ෂා කිරීම සහ මෙහෙයුම් කාර්යක්ෂමතාව ඉහළ නැංවීම සඳහා ඒවා සරල කිරීම.',
            'function-2-title': 'දුෂණ අවදානම් ඇගයීම',
            'function-2-desc': 'දුෂණ අවදානම් ඇගයීම් (Corruption Risk Assessment) සිදු කිරීම මඟින් ආයතනය තුළ දූෂණයට හා සදාචාර විරෝධී හැසිරීම් වලට ගොදුරු විය හැකි ක්ෂේත්‍ර හඳුනා ගැනීම සහ ඉලක්කගත වැළැක්වීමේ පියවර ගැනීම.',
            'function-3-title': 'සුපිළිපන්න ක්‍රියාකාරී සැලැස්ම',
            'function-3-desc': 'ආයතනයේ අවශ්‍යතා වලට ගැළපෙන පරිදි සකස් කරන ලද නිෂ්චිත දුෂණ විරෝධී අරමුණු සහ උපාය මාර්ග ඇතුළත් ආයතනික සුපිළිපන්න ක්‍රියාකාරී සැලැස්මක් සකස් කර ක්‍රියාත්මක කිරීම.',
            'function-4-title': 'ජාතික උපාය මාර්ග අනුකූලතාව',
            'function-4-desc': 'ජාතික දූෂණ විරෝධී ක්‍රියාකාරී සැලැස්ම සමඟ ආයතනික ප්‍රතිපත්ති සහ භාවිතයන් පෙළගස්වමින් ජාතික දුෂණ විරෝධී උපාය මාර්ග වලට අනුකූල වීම.',
            'function-5-title': 'අනුකුලතා සමාලෝචන',
            'function-5-desc': '2023 අංක 9 දරන දුෂණ විරෝධී පනත ඇතුළු ජාතික හා ජාත්‍යන්තර දුෂණ විරෝධී නීති සමග ආයතනයේ අනුකූලතාව ඇගයීම සඳහා අනුකුලතා සමාලෝචන (Compliance Assessments) සිදු කිරීම සහ වැඩි දියුණු කළ යුතු ක්ෂේත්‍ර හදුනා ගැනීම.',
            'function-6-title': 'වත්කම් ප්‍රකාශන සහ ගැටුම් කළමනාකරණය',
            'function-6-desc': 'සියලුම රාජ්‍ය නිලධාරීන් සහ සේවා නියුක්තිකයින් සඳහා වත්කම් ප්‍රකාශන අවශ්‍යතාවලට අනුකූල වීම සහතික කිරීම සහ අල්ලස් හෝ දූෂණ චෝදනා විමර්ශන කොමිෂන් සභා නියෝග සහ 2023 අංක 9 දරන දුෂණ විරෝධී පනතට අනුකූලව බැඳියාවන් අතර ගැටුම් කළමනා කරණය කිරීම.',
            'function-7-title': 'පැමිණිලි කළමනාකරණ පද්ධතිය',
            'function-7-desc': 'ආයතනය තුළ දූෂණ සහ සදාචාර විරෝධී හැසිරීම් සම්බන්ධ පැමිණිලි භාර ගැනීම සහ කළමනා කරණය කිරීම සඳහා ආරක්ෂිත පද්ධතියක් ස්ථාපිත කිරීම, එවැනි සියලුම පැමිණිලි සම්බන්ධයෙන් අදාළ නිලධාරීන් හෝ ඒකක විසින් කඩිනමින් කටයුතු කරන බවට සහතික වීම.',
            'function-8-title': 'පුරවැසි ප්‍රඥප්තිය',
            'function-8-desc': 'ආයතනය විසින් සපයනු ලබන සේවාවන් විස්තර කෙරෙන පුරවැසි ප්‍රඥප්තියක් සංවර්ධනය කර ප්‍රකාශයට පත් කිරීම.',
            'function-9-title': 'සදාචාරාත්මක ප්‍රතිපත්ති',
            'function-9-desc': 'රාජ්‍ය නිලධාරීන් විසින් පිළිපැදිය යුතු ප්‍රමිතිගත ආචාර ධර්ම සංග්‍රහයක් ඇතුළුව, සදාචාරාත්මක පාලනය ප්‍රවර්ධනය කරන ප්‍රතිපත්ති ස්ථාපිත කිරීම සහ බලාත්මක කිරීම.',
            'function-10-title': 'පුහුණුව සහ දැනුවත් කිරීම',
            'function-10-desc': 'දුෂණ විරෝධී මූල ධර්ම වලට කැපවී සිටීමට අභිප්‍රේරණයක් ලෙස කාර්ය මණ්ඩලය පුහුණු කිරීම සහ දැනුවත් කිරීම ඇතුළු අනෙකුත් ක්‍රියාමාර්ග ගැනීම.',
            'function-11-title': 'ජාතික සුපිළිපන්න ඇගයීම',
            'function-11-desc': 'අල්ලස් හෝ දුෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සහ ජාතික දූෂණ විරෝධී රාමුව මඟින් මෙහෙයවනු ලබන සුපිළිපන්න ඇගයීම් ක්‍රියාවලින් සඳහා ආයතනය සහභාගී වන බව සහ ඒ සමඟ පෙළ ගැසෙන බව සහතික කරමින්, ජාතික දූෂණ විරෝධී සුපිළිපන්න ඇගයීම (National Anti-Corruption Integrity Assessment) සඳහා ආයතනික කේන්ද්‍රස්ථානය ලෙස ක්‍රියා කිරීම.',
            'function-12-title': 'කොමිෂන් සභාව සමඟ සම්බන්ධතා',
            'function-12-desc': 'ඒකකයේ රාජකාරි ක්‍රියාත්මක කිරීමේදී අඛණ්ඩ මගපෙන්වීම් සහ සහාය ලබා ගැනීම සඳහා අල්ලස් හෝ දුෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සමඟ සම්බන්ධතා පවත්වා ගැනීම.',
            'function-13-title': 'වාර්තා සකස් කිරීම',
            'function-13-desc': 'අභ්‍යන්තර කටයුතු ඒකකයෙහි ක්‍රියාකාරකම්, දුෂණ විරෝධී මුලපිරීම්වල ප්‍රගතිය, මුහුණ දෙන අභියෝග සහ ඉදිරි ක්‍රියාමාර්ග සඳහා නිර්දේශ සාරාංශගත කරමින් කාලානුරූපී සහ වාර්ෂික වාර්තා සකස් කිරීම.',
            'function-14-title': 'පුද්ගලික අංශය සමඟ සහයෝගීතාව',
            'function-14-desc': 'පුද්ගලික අංශයේ පාර්ශවකරුවන්ගේ සහභාගීත්වයෙන් සුපිළිපන්නතාවය වර්ධනය කිරීම සඳහා වන සැලසුම් සකස් කිරීම හා ක්‍රියාත්මක කිරීම.',

            // Team Page
            'team-title': 'අභ්‍යන්තර කටයුතු ඒකකයේ සංයුතිය',
            'member-1-name': 'ආර්. එම්. ඩී. පී. පුෂ්ප කුමාරි මිය.',
            'member-1-position': 'ඒකකයේ ප්‍රධානී',
            'member-1-designation': 'ලේකම්, පළාත් සෞඛ්‍ය අමාත්‍යාංශය',
            'member-2-name': 'ඩබ්.එම්.ගයාන් ඉන්දික මයා',
            'member-2-position': 'සුපිළිපන්න නිලධාරියා',
            'member-2-designation': 'පළාත් ක්‍රීඩා අධ්‍යක්ෂ',
            'table-title': 'සංයුතිය - සාරාංශය',
            'table-th-position': 'තනතුර',
            'table-th-name': 'නිලධාරියාගේ නම',
            'table-th-designation': 'අමතර තනතුර',
            'table-th-contact': 'සම්බන්ධතාව',
            'row-1-position': 'ඒකකයේ ප්‍රධානී',
            'row-1-name': 'ආර්. එම්. ඩී. පී. පුෂ්ප කුමාරි මිය.',
            'row-1-designation': 'ලේකම්, පළාත් සෞඛ්‍ය අමාත්‍යාංශය',
            'row-1-contact': '025 2222175',
            'row-2-position': 'සුපිළිපන්න නිලධාරියා',
            'row-2-name': 'ඩබ්.එම්.ගයාන් ඉන්දික මයා',
            'row-2-designation': 'පළාත් ක්‍රීඩා අධ්‍යක්ෂ',
            'row-2-contact': '025 2222736',
            'contact-section-title': 'ඒකකය සමඟ සම්බන්ධ වන්න',
            'email-title': 'විද්‍යුත් තැපෑල',
            'main-phone-title': 'ප්‍රධාන දුරකථන',
            'fax-title': 'ෆැක්ස්',
            'cta-btn-1': 'අරමුණු බලන්න',
            'cta-btn-2': 'කාර්යයන් බලන්න',

            // Footer
            'footer-title': 'අභ්‍යන්තර කටයුතු ඒකකය',
            'footer-subtitle': 'උතුරු මැද පළාත් සභාව',
            'footer-nav-title': 'සැරිසැරීම',
            'footer-home': 'මුල් පිටුව',
            'footer-objectives': 'ප්‍රධාන අරමුණු',
            'footer-functions': 'වගකීම් සහ කාර්යයන්',
            'footer-team': 'සංයුතිය',
            'footer-contact-title': 'සම්බන්ධ වන්න',
            'footer-copyright': '&copy; 2025 අභ්‍යන්තර කටයුතු ඒකකය, උතුරු මැද පළාත් සභාව. සියලුම හිමිකම් ඇවිරිණි.'
        }
    };

    function updateContent(lang) {
        document.documentElement.lang = lang;
        for (const id in translations[lang]) {
            const element = document.getElementById(id);
            if (element) {
                const content = translations[lang][id];
                // Prevent layout shift during content updates
                const originalHeight = element.offsetHeight;
                element.innerHTML = content;
                // Force reflow if needed
                if (Math.abs(element.offsetHeight - originalHeight) > 5) {
                    element.style.minHeight = originalHeight + 'px';
                    setTimeout(() => {
                        element.style.minHeight = '';
                    }, 300);
                }
            }
        }
        localStorage.setItem('language', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'si' ? 'en' : 'si';
            updateContent(currentLang);
        });
    }

    // Initial load with stored language preference
    updateContent(currentLang);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll effect to navbar with modern styling
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Footer animation on scroll
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe footer sections
    document.querySelectorAll('.footer-section').forEach(section => {
        footerObserver.observe(section);
    });

    // Enhanced navbar background blur on scroll with progress bar
    let ticking = false;
    function updateNavbar() {
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar');
        const progressBar = document.querySelector('.scroll-progress');
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / docHeight) * 100;
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
        
        // Update navbar styling
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Enhanced loading animation for dynamic content with better refresh handling
    const cards = document.querySelectorAll('.objective-card, .function-item, .team-member-card, .contact-card, .officer-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !isRefresh) {
                // Only animate if page is not being refreshed
                const animationDelay = document.body.classList.contains('loaded') ? index * 100 : 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                }, animationDelay);
                observer.unobserve(entry.target);
            } else if (isRefresh) {
                // Skip animation on refresh, just ensure visibility
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
                entry.target.style.transition = 'none';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only set initial animation state if not refreshing and not already visible
    cards.forEach(card => {
        if (isRefresh) {
            // On refresh, ensure immediate visibility
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0)';
            card.style.transition = 'none';
        } else {
            const isVisible = card.offsetParent !== null;
            if (isVisible && window.scrollY === 0) {
                // If at top of page and card is visible, don't animate
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            } else {
                // Set up for animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) rotateX(10deg)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(card);
            }
        }
    });

    // Add modern ripple effect to buttons
    document.querySelectorAll('.btn, .lang-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Modern page transition effect with safeguards against refresh issues
    window.addEventListener('beforeunload', (e) => {
        // Only apply transition if not refreshing and not navigating within same domain
        const isInternalNavigation = e.target.activeElement && 
            e.target.activeElement.href && 
            e.target.activeElement.href.includes(window.location.hostname);
        
        if (!isInternalNavigation) {
            document.body.style.opacity = '0.8';
            document.body.style.transform = 'scale(0.98)';
        }
    });
    
    // Critical: Handle page show event (for back/forward navigation and refresh)
    window.addEventListener('pageshow', (event) => {
        // Reset states regardless of cache
        resetPageState();
        document.body.style.opacity = '1';
        document.body.style.transform = 'none';
        document.body.style.visibility = 'visible';
        
        // Remove refreshing class after a brief delay
        setTimeout(() => {
            document.body.classList.remove('refreshing');
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // Additional safeguard for page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Page became visible, ensure proper state
            resetPageState();
        }
    });
});
