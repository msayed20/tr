// script for translations

var translations = {
    "arabic": {
        "welcome": "أهلا بك",
        "edit": "تعديل الملف",
        "update": "تحديث الملف",
        "username": "اسم المستخدم",
        "picture": "صورة الملف",
        "save": "حفظ",
        "close": "إغلاق",
        "language": "اللغة",
        "author": "المؤلفون",
        "game": "اللعبة",
        "play": "العب:",
        "match": "مباراة",
        "tournament": "بطولة",
        "won": "فوز",
        "lost": "خسارة",
        "tourn": "بطولات فاز بها",
        "1v1": "العب مباراة 1 ضد 1:",
        "online": "عبر الانترنت",
        "users": "المستخدمون",
        "profile": "الملف الشخصي",
        "pending": "قيد الانتظار",
        "add": "إضافة صديق",
        "playpong": "بونغ",
        "account": "لا تملك حساباً بعد؟",
        "signin": "تسجيل الدخول",
        "here": "سجل هنا",
        "or": "أو",
        "42login": "الدخول مع",
        "signup": "إنشاء حساب",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "submit": "إرسال",
        "logout": "تسجيل الخروج",
        "localmatch": "مباراة محلية",
        "opponent": "اختر اسماً لخصمك",
        "start": "ابدأ",
        "onlinematch": "مباراة عبر الانترنت",
        "localtourn": "بطولة محلية",
        "onlinetourn": "بطولة عبر الانترنت"
    },
    "english": {
        "welcome": "Welcome",
        "edit": "Edit profile",
        "update": "Update profile",
        "username": "Username",
        "picture": "Profile picture",
        "save": "Save",
        "close": "Close",
        "language": "Language",
        "author": "Authors",
        "game": "Game",
        "play": "Play a:",
        "match": "Match",
        "tournament": "Tournament",
        "won": "Win(s)",
        "lost": "Defeat(s)",
        "tourn": "Tournament(s) won",
        "1v1": "Play a 1v1 match:",
        "online": "Online",
        "users": "Users",
        "profile": "profile",
        "pending": "pending",
        "add": "add friend",
        "playpong": "Pong",
        "account": "No account yet?",
        "signin": "Sign in",
        "here": "Sign up here",
        "or": "or",
        "42login": "Log in with",
        "signup": "Sign up",
        "email": "Email adress",
        "password": "Password",
        "submit": "Submit",
        "logout": "Log out",
        "localmatch": "Local match",
        "opponent": "Choose an alias for your opponent",
        "start": "Start",
        "onlinematch": "Online match",
        "localtourn": "Local tournament",
        "onlinetourn": "Online tournament",
    },
    "français": {
        "welcome": "Bienvenue",
        "edit": "Modifier profil",
        "update": "Mise à jour du profil",
        "username": "Nom d'utilisateur",
        "picture": "Photo de profil",
        "save": "Enregistrer",
        "close": "Fermer",
        "language": "Langue",
        "author": "Auteurs",
        "game": "Jeu",
        "play": "Démarrer un :",
        "match": "Match",
        "tournament": "Tournoi",
        "won": "Victoire(s)",
        "lost": "Défaite(s)",
        "tourn": "Tournoi(s) gagné(s)",
        "1v1": "Jouer un match 1v1 :",
        "online": "En ligne",
        "users": "Utilisateurs",
        "profile": "profil",
        "pending": "attente",
        "add": "ajouter",
        "playpong": "Pong",
        "account": "Pas de compte?",
        "signin": "Se connecter",
        "here": "Inscris-toi ici.",
        "or": "ou",
        "42login": "Se connecter avec",
        "signup": "S'enregistrer",
        "email": "Adresse email",
        "password": "Mot de passe",
        "submit": "Confirmer",
        "logout": "Se déconnecter",
        "localmatch": "Partie en local",
        "opponent": "Choisis un alias pour ton adversaire",
        "start": "Démarrer",
        "onlinematch": "Partie en ligne",
        "localtourn": "Tournoi en local",
        "onlinetourn": "Tournoi en ligne",
    },
    "español": {
        "welcome": "Bienvenido",
        "edit": "Editar perfil",
        "update": "Actualización del perfil",
        "username": "Nombre de usuario",
        "picture": "Foto de perfil",
        "save": "Guardar",
        "close": "Cerrar",
        "language": "Idioma",
        "author": "Autores",
        "game": "Juego",
        "play": "Iniciar un :",
        "match": "Partido",
        "tournament": "Torneo",
        "won": "Triumfo(s)",
        "lost": "Derrota(s)",
        "tourn": "Torneo(s) ganado(s)",
        "1v1": "Jugar un partido 1v1 :",
        "online": "En línea",
        "users": "Usuarios",
        "profile": "perfil",
        "pending": "pendiente",
        "add": "añadir",
        "playpong": "Pong",
        "account": "No cuenta?",
        "signin": "Iniciar sesión",
        "here": "Registrate acqui.",
        "or": "o",
        "42login": "Iniciar sesión con",
        "signup": "Registrarse",
        "email": "Correo electrónico",
        "password": "Contraseña",
        "submit": "Confirmar",
        "logout": "Cerrar sesión",
        "localmatch": "Partido en local",
        "opponent": "Elige un alias para tu oponente",
        "start": "Iniciar",
        "onlinematch": "Partido en línea",
        "localtourn": "Torneo en local",
        "onlinetourn": "Torneo en línea",
    }
};

function applyTranslation(language) {
    // Check and apply the right text direction for Arabic
    document.body.style.direction = (language === "arabic") ? "rtl" : "ltr";

    // Translate all elements with data-translate attribute
    var elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        var translation = translations[language][element.getAttribute('data-translate')];
        if (translation) {
            element.textContent = translation;
            if (element.placeholder) {
                element.placeholder = translation;
            }
            if (element.title) {
                element.title = translation;
            }
        }
    });

    // Update the active language class
    document.querySelectorAll('.chooseLanguage').forEach(lang => lang.classList.remove('active'));
    document.getElementById(language).classList.add('active');

    console.log("Translations applied for language:", language);
}

function setupLanguageSwitcher() {
    const languageButtons = document.querySelectorAll('.chooseLanguage');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            var language = this.id; // Using ID to match the language key
            applyTranslation(language);
            sendLanguageChange(language); // Send change to server if needed
        });
    });
}

function sendLanguageChange(language) {
    // Assuming WebSocket connection is established
    const message = JSON.stringify({ action: 'set_language', language: language });
    languageSocket.send(message);
}

// WebSocket logic for language settings
let languageSocket;
function runSocketLanguage() {
    const url = `wss://${window.location.host}/ws/language/`;
    languageSocket = new WebSocket(url);

    languageSocket.onopen = function() {
        languageSocket.send(JSON.stringify({ action: 'get_language' }));
    };

    languageSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.action === 'get_language') {
            applyTranslation(data.language);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    setupLanguageSwitcher();
    runSocketLanguage();
});