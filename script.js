document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'si';

    const translations = {
        en: {
            'title': 'Internal Audit Unit - North Central Province',
            'subtitle': 'අභ්‍යන්තර විගණන ඒකකය - උතුරු මැද පළාත',
            'nav-about': 'About Us',
            'nav-functions': 'Functions',
            'nav-team': 'Our Team',
            'nav-contact': 'Contact Us',
            'about-title': 'About Us',
            'about-text': 'This Internal Audit Unit (IAU) has been established to assist the Chief Secretary and all Secretaries of Ministries, Heads of Departments and District Secretaries in the effective discharge of their responsibilities by furnishing them with analysis, appraisals, recommendations, counsel, and information concerning the activities reviewed.',
            'functions-title': 'Functions Performed by the Internal Audit Division',
            'functions-list': [
                'Identifying the strengths and weaknesses of the existing methodologies and internal control system in the organizational system.',
                'Conducting Corruption Risk Assessments.',
                'Conducting Compliance Audits.',
                'Conducting Performance Audits.',
                'Conducting Special Investigations.',
                'Conducting Systemic Bottleneck Studies.',
                'Conducting IT Audits.',
                'Acting in accordance with the National Action Plan for Prevention of Corruption.'
            ],
            'team-title': 'Composition of the Internal Audit Unit',
            'th-name': 'Name and Designation of the Officer',
            'th-phone': 'Telephone Number',
            'team-table-body': [
                ['Mr. A.M.D.B. Weerasekara, Director', '025-2222736'],
                ['Mr. D.M.S. Dissanayake, Deputy Director', '025-2224914'],
                ['Mr. W.M.P.S.B. Wijekoon, Development Officer', '-'],
                ['Mrs. A.M.D.S. Adhikari, Development Officer', '-'],
                ['Mr. D.M.S. Dissanayake, Public Management Assistant', '-'],
                ['Mr. K.A.H.L. Karunarathna, Development Officer', '-'],
                ['Mrs. H.M.S. Herath, Development Officer', '-'],
                ['Mrs. M.D.N. Priyadarshani, Development Officer', '-'],
                ['Mrs. W.A.M. Chathurika, Development Officer', '-'],
                ['Mr. K.G.H.M. Gunathilaka, Development Officer', '-'],
                ['Mr. D.M.D.H. Dissanayaka, Development Officer', '-']
            ],
            'contact-title': 'Contact Us',
            'contact-email': '<b>Email:</b> iaunorthcp@gmail.com',
            'contact-phone': '<b>Telephone:</b> 025 222 2736 / 025 222 4914',
            'contact-fax': '<b>Fax:</b> 025 222 2736',
            'contact-address': '<b>Address:</b> Chief Secretary\'s Secretariat, North Central Province, Anuradhapura.',
            'footer-text': '&copy; 2025 Internal Audit Unit, North Central Province. All Rights Reserved.',
            'lang-toggle': 'Switch to Sinhala'
        },
        si: {
            'title': 'අභ්‍යන්තර විගණන ඒකකය - උතුරු මැද පළාත',
            'subtitle': 'Internal Audit Unit - North Central Province',
            'nav-about': 'පිළිබඳව',
            'nav-functions': 'කාර්යයන්',
            'nav-team': 'අපේ කණ්ඩායම',
            'nav-contact': 'අප අමතන්න',
            'about-title': 'අප පිළිබඳව',
            'about-text': 'ප්‍රධාන ලේකම් ඇතුළු සියලුම අමාත්‍යාංශ ලේකම්වරුන්, දෙපාර්තමේන්තු ප්‍රධානීන් සහ දිස්ත්‍රික් ලේකම්වරුන් වෙත ඔවුන්ගේ වගකීම් ඵලදායී ලෙස ඉටු කිරීම සඳහා විශ්ලේෂණ, ඇගයීම්, නිර්දේශ, උපදේශන සහ තොරතුරු ලබා දීමෙන් සහාය වීම සඳහා මෙම අභ්‍යන්තර විගණන ඒකකය (IAU)จัดตั้ง කර ඇත.',
            'functions-title': 'අභ්‍යන්තර විගණන අංශයෙන් ඉටුකරනු ලබන කාර්යයන්',
            'functions-list': [
                'ආයතනික පද්ධතියේ පවතින ක්‍රමවේදයන්ගේ සහ අභ්‍යන්තර පාලන පද්ධතියේ ශක්තීන් හා දුර්වලතාවයන් හඳුනා ගැනීම.',
                'දූෂණ අවදානම් තක්සේරුව (Corruption Risk Assessment) සිදු කිරීම.',
                'අනුකූලතා විගණන (Compliance Audits) සිදු කිරීම.',
                'කාර්ය සාධන විගණන (Performance Audits) සිදු කිරීම.',
                'විශේෂ විමර්ශන සිදු කිරීම.',
                'පද්ධති අධ්‍යයනයන් (Systemic bottlenecks) සිදු කිරීම.',
                'IT විගණන සිදු කිරීම.',
                'දූෂණ වැළැක්වීමේ ජාතික ක්‍රියාකාරී සැලැස්මට අදාළව කටයුතු කිරීම.'
            ],
            'team-title': 'අභ්‍යන්තර විගණන ඒකකයේ සංයුතිය',
            'th-name': 'නිලධාරියාගේ නම සහ තනතුර',
            'th-phone': 'දුරකථන අංකය',
            'team-table-body': [
                ['ඒ.එම්.ඩී.බී. වීරසේකර මයා, අධ්‍යක්ෂ', '025-2222736'],
                ['ඩී.එම්.එස්. දිසානායක මයා, නියෝජ්‍ය අධ්‍යක්ෂ', '025-2224914'],
                ['ඩබ්.එම්.පී.එස්.බී. විජේකෝන් මයා, සංවර්ධන නිලධාරী', '-'],
                ['ඒ.එම්.ඩී.එස්. අධිකාරී මිය, සංවර්ධන නිලධාරී', '-'],
                ['ඩී.එම්.එස්. දිසානායක මයා, රාජ්‍ය කළමනාකරණ ಸಹකාර', '-'],
                ['කේ.ඒ.එච්.එල්. கருணாரத்ன මයා, සංවර්ධන නිලධාරී', '-'],
                ['එච්.එම්.එස්. හේරත් මිය, සංවර්ධන නිලධාරී', '-'],
                ['එම්.ඩී.එನ್. ප්‍රියദರ್ಶනී මිය, සංවර්ධන නිලධාරී', '-'],
                ['ඩබ්.ඒ.එම්. චතුරිකා මිය, සංවර්ධන නිලධාරී', '-'],
                ['කේ.ජී.එච්.එම්. ගුණතිලක මයා, සංවර්ධන නිලධාරී', '-'],
                ['ඩී.එම්.ඩී.එච්. திசாநாயக்க මයා, සංවර්ධන නිලධාරී', '-']
            ],
            'contact-title': 'අප අමතන්න',
            'contact-email': '<b>විද්‍යුත් තැපෑල:</b> iaunorthcp@gmail.com',
            'contact-phone': '<b>දුරකථන:</b> 025 222 2736 / 025 222 4914',
            'contact-fax': '<b>ෆැක්ස්:</b> 025 222 2736',
            'contact-address': '<b>ලිපිනය:</b> ප්‍රධාන ලේකම් කාර්යාලය, උතුරු මැද පළාත, අනුරාධපුරය.',
            'footer-text': '&copy; 2025 අභ්‍යන්තර විගණන ඒකකය, උතුරු මැද පළාත. සියලුම හිමිකම් ඇවිරිණි.',
            'lang-toggle': 'Switch to English'
        }
    };

    function updateContent(lang) {
        document.documentElement.lang = lang;
        for (const id in translations[lang]) {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'functions-list') {
                    element.innerHTML = translations[lang][id].map(item => `<li>${item}</li>`).join('');
                } else if (id === 'team-table-body') {
                    element.innerHTML = translations[lang][id].map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
                } 
                else {
                    element.innerHTML = translations[lang][id];
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
