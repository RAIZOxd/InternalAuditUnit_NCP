document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'si';

    const translations = {
        en: {
            'title': 'Internal Affairs Unit (IAU)',
            'subtitle': 'North Central Provincial Council',
            'nav-home': 'Home',
            'nav-objectives': 'Main Objectives',
            'nav-functions': 'Responsibilities & Functions',
            'nav-team': 'Composition',
            'home-title': 'Introduction',
            'home-intro': 'As a major initiative in the process of combating corruption in the public sector, it has been decided to establish Internal Affairs Units (IAUs) in all government institutions to create a culture that fosters transparency, accountability, and integrity throughout the public sector and to provide government services effectively to all citizens.',
            'contact-title': 'Contact Information',
            'contact-email': '<b>Email:</b> iaunitncp@gmail.com',
            'contact-phone': '<b>Telephone:</b> 025 222 2736',
            'contact-fax': '<b>Fax:</b> 025 222 4914',
            'officers-title': 'Key Officers',
            'unit-head': '<b>Unit Head:</b> Mrs. R. M. D. P. Pushpa Kumari (Secretary, Provincial Ministry of Health) <br><b>Telephone:</b> 025 2222175',
            'subject-officer': '<b>Subject Officer:</b> Mrs. H. G. T. H. Anuradha (Development Officer) <br><b>Telephone:</b> 025 2222736',
            'objectives-title': 'Main Objectives of the Internal Affairs Unit',
            'objectives-list': [
                'To prevent corruption and develop a culture of integrity within the institution.',
                'To ensure transparency and accountability in all activities of the institution and to ensure public access to information on institutional activities and decisions.',
                'To promote ethical governance within the institution.',
                'To develop a safe and accessible mechanism to encourage reporting of misconduct, protect whistleblowers, and maintain confidentiality.',
                'To assist in law enforcement in collaboration with law enforcement agencies and the Commission to Investigate Allegations of Bribery or Corruption.'
            ],
            'functions-title': 'Responsibilities and Functions of the Internal Affairs Unit',
            'functions-intro': 'The following specific responsibilities and functions are assigned to the Internal Affairs Unit to ensure proactive, clear, and focused anti-corruption efforts, targeting the main elements of corporate integrity.',
            'functions-list': [
                'Reviewing current procedures and circulars to identify systemic bottlenecks within the institution and simplifying them to enhance operational efficiency.',
                'Conducting Corruption Risk Assessments to identify areas within the institution that are vulnerable to corruption and unethical behavior and taking targeted preventive measures.',
                'Preparing and implementing a corporate integrity action plan that includes specific anti-corruption objectives and strategies tailored to the needs of the institution.',
                'Complying with national anti-corruption strategies by aligning corporate policies and practices with the National Anti-Corruption Action Plan.',
                'Conducting Compliance Assessments to evaluate the institution\'s compliance with national and international anti-corruption laws, including the Anti-Corruption Act No. 9 of 2023, and identifying areas for improvement.',
                'Ensuring compliance with asset declaration requirements for all public officials and employees and managing conflicts of interest in accordance with the orders of the Commission to Investigate Allegations of Bribery or Corruption and the Anti-Corruption Act No. 9 of 2023.',
                'Establishing a secure system for receiving and managing complaints related to corruption and unethical behavior within the institution, ensuring that such complaints are promptly handled by the relevant officers or units, and providing regular updates to the concerned parties while ensuring transparency and accountability. As necessary, referring relevant matters, findings, or information to the Commission to Investigate Allegations of Bribery or Corruption for investigation under the Anti-Corruption Act.',
                'Developing and publishing a citizen\'s charter detailing the services provided by the institution.',
                'Establishing and enforcing policies that promote ethical governance, including a standardized code of ethics to be followed by public officials.',
                'Training and awareness-raising for staff and taking other measures as an incentive to remain committed to anti-corruption principles.',
                'Acting as the institutional focal point for the National Anti-Corruption Integrity Assessment, ensuring that the institution participates in and aligns with the integrity assessment processes led by the Commission to Investigate Allegations of Bribery or Corruption and the national anti-corruption framework.',
                'Maintaining contact with the Commission to Investigate Allegations of Bribery or Corruption to obtain continuous guidance and support in the performance of the unit\'s duties.',
                'Preparing periodic and annual reports summarizing the activities of the Internal Affairs Unit, the progress of anti-corruption initiatives, challenges faced, and recommendations for future action.',
                'Formulating and implementing plans to promote integrity with the participation of private sector stakeholders.'
            ],
            'team-title': 'Composition of the Internal Affairs Unit',
            'th-designation': 'Designation',
            'th-name': 'Officer\'s Name',
            'team-table-body': [
                ['Unit Head', 'Mrs. R. M. D. P. Pushpa Kumari, Secretary'],
                ['Integrity Officer', 'Mr. W.M. Gayan Indika, Provincial Director of Sports']
            ],
            'footer-text': '&copy; 2025 Internal Affairs Unit, North Central Provincial Council. All Rights Reserved.',
            'lang-toggle': 'Switch to Sinhala'
        },
        si: {
            'title': 'අභ්‍යන්තර කටයුතු ඒකකය (IAU)',
            'subtitle': 'උතුරු මැද පළාත් සභාව',
            'nav-home': 'මුල් පිටුව',
            'nav-objectives': 'ප්‍රධාන අරමුණු',
            'nav-functions': 'වගකීම් සහ කාර්යයන්',
            'nav-team': 'සංයුතිය',
            'home-title': 'හැඳින්වීම',
            'home-intro': 'රාජ්‍ය අංශය තුළ දූෂණය මැඩලීමේ ක්‍රියාවලියේ ප්‍රධාන මුල පිරීමක් ලෙස රාජ්‍ය අංශය පුරා විනිවිද භාවය, වග වීම සහ සුපිළිපන්න භාවය පෝෂණය කරන සංස්කෘතියක් නිර්මාණය කර රජයේ සේවාවන් සියලුම පුරවැසියන්ට ඵලදායි ලෙස සැපයීම සඳහා සියලුම රජයේ ආයතන තුළ අභ්‍යන්තර කටයුතු ඒකක (Internal Affairs Unit - IAU) පිහිටුවීමට තීරණය කර ඇත.',
            'contact-title': 'සම්බන්ධතා තොරතුරු',
            'contact-email': '<b>විද්‍යුත් තැපෑල:</b> iaunitncp@gmail.com',
            'contact-phone': '<b>දුරකථන:</b> 025 222 2736',
            'contact-fax': '<b>ෆැක්ස්:</b> 025 222 4914',
            'officers-title': 'ප්‍රධාන නිලධාරීන්',
            'unit-head': '<b>ඒකක ප්‍රධානි:</b> ආර්. එම්. ඩී. පී. පුෂ්ප කුමාරි මිය. (ලේකම්, පළාත් සෞඛ්‍ය අමාත්‍යාංශය) <br><b>දුරකථන:</b> 025 2222175',
            'subject-officer': '<b>විෂය නිලධාරි:</b> එච්. ජී. ටී. එච්. අනුරාධා මිය (සංවර්ධන නිලධාරි) <br><b>දුරකථන:</b> 025 2222736',
            'objectives-title': 'අභ්‍යන්තර කටයුතු ඒකකයේ ප්‍රධාන අරමුණු',
            'objectives-list': [
                'ආයතනය තුළ දූෂණය වැළැක්වීම සහ සුපිළිපන්න සංස්කෘතියක් වර්ධනය කිරීම.',
                'ආයතනයේ සියලුම ක්‍රියාකාරකම්වල විනිවිධ භාවය සහ වගවීම සහතික කිරීම සහ ආයතනික ක්‍රියාකාරකම් සහ තීරණ සම්බන්ධ තොරතුරු වෙත මහජන ප්‍රවේශය සහතික කිරීම.',
                'ආයතනය තුළ සදාචාරාත්මක පාලනයක් ප්‍රවර්ධනය කිරීම.',
                'විෂමාචාර වාර්තා කිරීම දිරි ගැන්වීම, තොරතුරු හෙළි කරන්නන් ආරක්ෂා කිරීම සහ රහස්‍යභාවය පවත්වා ගැනීම සඳහා ආරක්ෂිත සහ ප්‍රවේශ විය හැකි ක්‍රම වේදයක් සකස් කිරීම.',
                'නීතිය ක්‍රියාත්මක කරන ආයතන සහ අල්ලස් හෝ දූෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සමඟ සහයෝගයෙන් නීති බලාත්මක කිරීමට සහය වීම.'
            ],
            'functions-title': 'අභ්‍යන්තර කටයුතු ඒකකයෙහි වගකීම සහ කාර්යයන්',
            'functions-intro': 'ආයතනික සුපිළිපන්න භාවයේ ප්‍රධාන අංග ඉලක්ක කර ගනිමින් ක්‍රියාශීලී, පැහැදිලි සහ කේන්ද්‍රගත දුෂණ විරෝධී ප්‍රයත්නයන් තහවුරු කිරීම සඳහා පහත සඳහන් නිශ්චිත වගකීම් සහ කාර්යයන් අභ්‍යන්තර කටයුතු ඒකකය වෙත පැවරී ඇත.',
            'functions-list': [
                'ආයතනය තුළ පවතින පද්ධතිමය බාධාවන් (systemic bottlenecks) හඳුනා ගැනීම සඳහා වත්මන් ක්‍රියා පටිපාටි සහ වක්‍ර ලේඛ පරීක්ෂා කිරීම සහ මෙහෙයුම් කාර්යක්ෂමතාව ඉහළ නැංවීම සඳහා ඒවා සරල කිරීම.',
                'දුෂණ අවදානම් ඇගයීම් (Corruption Risk Assessment) සිදු කිරීම මඟින් ආයතනය තුළ දූෂණයට හා සදාචාර විරෝධී හැසිරීම් වලට ගොදුරු විය හැකි ක්ෂේත්‍ර හඳුනා ගැනීම සහ ඉලක්කගත වැළැක්වීමේ පියවර ගැනීම.',
                'ආයතනයේ අවශ්‍යතා වලට ගැළපෙන පරිදි සකස් කරන ලද නිෂ්චිත දුෂණ විරෝධී අරමුණු සහ උපාය මාර්ග ඇතුළත් ආයතනික සුපිළිපන්න ක්‍රියාකාරී සැලැස්මක් සකස් කර ක්‍රියාත්මක කිරීම.',
                'ජාතික දූෂණ විරෝධී ක්‍රියාකාරී සැලැස්ම සමඟ ආයතනික ප්‍රතිපත්ති සහ භාවිතයන් පෙළගස්වමින් ජාතික දුෂණ විරෝධී උපාය මාර්ග වලට අනුකූල වීම.',
                '2023 අංක 9 දරන දුෂණ විරෝධී පනත ඇතුළු ජාතික හා ජාත්‍යන්තර දුෂණ විරෝධී නීති සමග ආයතනයේ අනුකූලතාව ඇගයීම සඳහා අනුකුලතා සමාලෝචන (Compliance Assessments) සිදු කිරීම සහ වැඩි දියුණු කළ යුතු ක්ෂේත්‍ර හදුනා ගැනීම.',
                'සියලුම රාජ්‍ය නිලධාරීන් සහ සේවා නියුක්තිකයින් සඳහා වත්කම් ප්‍රකාශන අවශ්‍යතාවලට අනුකූල වීම සහතික කිරීම සහ අල්ලස් හෝ දූෂණ චෝදනා විමර්ශන කොමිෂන් සභා නියෝග සහ 2023 අංක 9 දරන දුෂණ විරෝධී පනතට අනුකූලව බැඳියාවන් අතර ගැටුම් කළමනා කරණය කිරීම.',
                'ආයතනය තුළ දූෂණ සහ සදාචාර විරෝධී හැසිරීම් සම්බන්ධ පැමිණිලි භාර ගැනීම සහ කළමනා කරණය කිරීම සඳහා ආරක්ෂිත පද්ධතියක් ස්ථාපිත කිරීම, එවැනි සියලුම පැමිණිලි සම්බන්ධයෙන් අදාළ නිලධාරීන් හෝ ඒකක විසින් කඩිනමින් කටයුතු කරන බවට සහතික වීම සහ විනිවිදභාවය සහ වගවීම සහතික කරමින් විමසීම් සිදු කරන අදාළ පාර්ශ්වකරුවන් වෙත නිරන්තර යාවත්කාලීන කිරීම් ලබා දීම. අවශ්‍ය පරිදි, දූෂණ විරෝධී පනත යටතේ විමර්ශනය සඳහා අදාළ කරුණු, සොයා ගැනීම් හෝ තොරතුරු අල්ලස් හෝ දූෂණ චෝදනා විමර්ශන කොමිෂන් සභාව වෙත යොමු කිරීම.',
                'ආයතනය විසින් සපයනු ලබන සේවාවන් විස්තර කෙරෙන පුරවැසි ප්‍රඥප්තියක් සංවර්ධනය කර ප්‍රකාශයට පත් කිරීම.',
                'රාජ්‍ය නිලධාරීන් විසින් පිළිපැදිය යුතු ප්‍රමිතිගත ආචාර ධර්ම සංග්‍රහයක් ඇතුළුව, සදාචාරාත්මක පාලනය ප්‍රවර්ධනය කරන ප්‍රතිපත්ති ස්ථාපිත කිරීම සහ බලාත්මක කිරීම.',
                'දුෂණ විරෝධී මූල ධර්ම වලට කැපවී සිටීමට අභිප්‍රේරණයක් ලෙස කාර්ය මණ්ඩලය පුහුණු කිරීම සහ දැනුවත් කිරීම ඇතුළු අනෙකුත් ක්‍රියාමාර්ග ගැනීම.',
                'අල්ලස් හෝ දුෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සහ ජාතික දූෂණ විරෝධී රාමුව මඟින් මෙහෙයවනු ලබන සුපිළිපන්න ඇගයීම් ක්‍රියාවලින් සඳහා ආයතනය සහභාගී වන බව සහ ඒ සමඟ පෙළ ගැසෙන බව සහතික කරමින්, ජාතික දූෂණ විරෝධී සුපිළිපන්න ඇගයීම (National Anti-Corruption Integrity Assessment) සඳහා ආයතනික කේන්ද්‍රස්ථානය ලෙස ක්‍රියා කිරීම.',
                'ඒකකයේ රාජකාරි ක්‍රියාත්මක කිරීමේදී අඛණ්ඩ මගපෙන්වීම් සහ සහාය ලබා ගැනීම සඳහා අල්ලස් හෝ දුෂණ චෝදනා විමර්ශන කොමිෂන් සභාව සමඟ සම්බන්ධතා පවත්වා ගැනීම.',
                'අභ්‍යන්තර කටයුතු ඒකකයෙහි ක්‍රියාකාරකම්, දුෂණ විරෝධී මුලපිරීම්වල ප්‍රගතිය, මුහුණ දෙන අභියෝග සහ ඉදිරි ක්‍රියාමාර්ග සඳහා නිර්දේශ සාරාංශගත කරමින් කාලානුරූපී සහ වාර්ෂික වාර්තා සකස් කිරීම.',
                'පුද්ගලික අංශයේ පාර්ශවකරුවන්ගේ සහභාගීත්වයෙන් සුපිළිපන්නතාවය වර්ධනය කිරීම සඳහා වන සැලසුම් සකස් කිරීම හා ක්‍රියාත්මක කිරීම.'
            ],
            'team-title': 'අභ්‍යන්තර කටයුතු ඒකකයේ සංයුතිය',
            'th-designation': 'තනතුර',
            'th-name': 'නිලධාරියාගේ නම',
            'team-table-body': [
                ['ඒකකයේ ප්‍රධානී', 'ආර්. එම්. ඩී. පී. පුෂ්ප කුමාරි මිය, ලේකම්'],
                ['සුපිළිපන්න නිලධාරියා', 'ඩබ්.එම්.ගයාන් ඉන්දික මයා, පළාත් ක්‍රීඩා අධ්‍යක්ෂ']
            ],
            'footer-text': '&copy; 2025 අභ්‍යන්තර කටයුතු ඒකකය, උතුරු මැද පළාත් සභාව. සියලුම හිමිකම් ඇවිරිණි.',
            'lang-toggle': 'Switch to English'
        }
    };

    function updateContent(lang) {
        document.documentElement.lang = lang;
        for (const id in translations[lang]) {
            const element = document.getElementById(id);
            if (element) {
                const content = translations[lang][id];
                if (Array.isArray(content)) {
                    if (id === 'team-table-body') {
                        element.innerHTML = content.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
                    } else {
                        element.innerHTML = content.map(item => `<li>${item}</li>`).join('');
                    }
                } else {
                    element.innerHTML = content;
                }
            }
        }
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'si' ? 'en' : 'si';
        updateContent(currentLang);
    });

    // Initial load
    updateContent(currentLang);
});
