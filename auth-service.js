// auth-service.js

// Importa a instância de autenticação do nosso arquivo de configuração
import { auth } from './firebase-config.js';
// Importa as funções de autenticação necessárias do SDK do Firebase
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

/**
 * Registra um novo usuário com e-mail e senha.
 * @param {string} email - O e-mail do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<import("firebase/auth").UserCredential>} - Retorna as credenciais do usuário em caso de sucesso.
 */
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Autentica um usuário com e-mail e senha.
 * @param {string} email - O e-mail do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<import("firebase/auth").UserCredential>} - Retorna as credenciais do usuário em caso de sucesso.
 */
export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Desconecta o usuário atual.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando o logout é concluído.
 */
export function logOut() {
    return signOut(auth);
}

/**
 * Observa as mudanças no estado de autenticação do usuário.
 * @param {function} callback - A função a ser chamada quando o estado de autenticação muda.
 *                              Ela recebe o objeto de usuário (ou null) como argumento.
 * @returns {import("firebase/auth").Unsubscribe} - Retorna uma função para cancelar o observador.
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * Verifica se há um usuário logado e redireciona se necessário.
 * @param {string} [redirectUrl='login.html'] - A URL para redirecionar se o usuário NÃO estiver logado.
 */
export function protectPage(redirectUrl = 'login.html') {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("Usuário não autenticado. Redirecionando para o login...");
            // Garante que a página atual não seja a de login para evitar um loop infinito
            if (!window.location.pathname.endsWith(redirectUrl)) {
                window.location.href = redirectUrl;
            }
        }
    });
}
