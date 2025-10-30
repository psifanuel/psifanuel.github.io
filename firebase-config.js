// firebase-config.js

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// --- CONFIGURAÇÃO DO FIREBASE ---
// IMPORTANTE: Para que a aplicação funcione, é necessário substituir o '{}'
// pela configuração real do seu projeto Firebase.
// Você pode obter essa configuração no console do Firebase:
// Configurações do projeto > Geral > Seus aplicativos > Configuração do SDK > CDN.
//
// A aplicação tentará usar uma variável global `__firebase_config` se ela existir.
// Caso contrário, usará o objeto JSON fornecido aqui.
const firebaseConfig = JSON.parse(
    typeof __firebase_config !== 'undefined'
    ? __firebase_config
    : '{}' // SUBSTITUA PELO SEU OBJETO DE CONFIGURAÇÃO JSON
);


// --- INICIALIZAÇÃO DO FIREBASE ---
let app, db, auth;

try {
    // Inicializa o Firebase
    app = initializeApp(firebaseConfig);

    // Inicializa os serviços do Firebase
    db = getFirestore(app);
    auth = getAuth(app);

    console.log("Firebase inicializado com sucesso.");

    // Autentica o usuário anonimamente para permitir a escrita no banco de dados (se as regras permitirem)
    signInAnonymously(auth)
        .catch((error) => {
            console.error("Erro na autenticação anônima:", error);
        });

} catch (e) {
    console.error("Erro ao inicializar o Firebase. Verifique se o objeto 'firebaseConfig' está correto.", e);
    // Define as variáveis como nulas para que a aplicação saiba que o Firebase falhou
    app = null;
    db = null;
    auth = null;
}

/**
 * Obtém o usuário atualmente autenticado.
 * Como a autenticação é assíncrona, esta função retorna uma Promise
 * que resolve com o objeto do usuário assim que ele estiver disponível.
 * @returns {Promise<import("firebase/auth").User | null>}
 */
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

// Exporta as instâncias dos serviços para serem usadas em outros módulos
export { db, auth, getCurrentUser };
