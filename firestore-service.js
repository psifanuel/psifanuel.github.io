// firestore-service.js

// Importa a instância do banco de dados e a função de usuário do nosso arquivo de configuração
import { db, getCurrentUser } from './firebase-config.js';
// Importa as funções do Firestore necessárias para salvar os dados
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Salva o resultado de um teste no Firestore, associando-o ao psicólogo logado.
 *
 * @param {string} testName - O nome do teste (ex: "ICA", "TAS-20").
 * @param {object} testData - O objeto de dados contendo os resultados do teste a serem salvos.
 * @returns {Promise<string>} - Retorna uma Promise que resolve com o ID do documento salvo.
 */
export async function saveTestResult(testName, testData) {
    if (!db) {
        console.error("O Firestore não está inicializado. O salvamento foi cancelado.");
        return Promise.reject("O serviço do Firebase não está disponível.");
    }

    try {
        const user = await getCurrentUser();

        // Se não houver usuário, o salvamento é interrompido.
        // A função protectPage() deve impedir que isso aconteça, mas é uma segurança adicional.
        if (!user) {
            throw new Error("Usuário não autenticado. Faça o login para salvar os resultados.");
        }

        const dataToSave = {
            ...testData,
            psychologistId: user.uid, // Associa o resultado ao ID do psicólogo logado
            createdAt: serverTimestamp()
        };

        // A coleção agora é estruturada por psicólogo para maior segurança e organização.
        // Ex: 'psychologists/{psychologistId}/testResults/{testName}/results'
        const collectionPath = `psychologists/${user.uid}/testResults/${testName}/results`;

        const docRef = await addDoc(collection(db, collectionPath), dataToSave);

        console.log("Resultado salvo com sucesso no Firestore com o ID: ", docRef.id);

        return docRef.id;

    } catch (error) {
        console.error("Erro ao salvar o resultado no Firestore:", error);
        throw new Error("Não foi possível salvar o resultado. Verifique sua conexão e as regras de segurança do Firestore.");
    }
}
