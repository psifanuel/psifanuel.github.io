// firestore-service.js

// Importa a instância do banco de dados e a função de usuário do nosso arquivo de configuração
import { db, getCurrentUser } from './firebase-config.js';
// Importa as funções do Firestore necessárias para salvar os dados
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Salva o resultado de um teste no Firestore.
 *
 * @param {string} testName - O nome do teste (ex: "ICA", "TAS-20"). Usado como parte do caminho da coleção.
 * @param {object} testData - O objeto de dados contendo os resultados do teste a serem salvos.
 * @returns {Promise<string>} - Retorna uma Promise que resolve com o ID do documento salvo.
 */
export async function saveTestResult(testName, testData) {
    // Verifica se o Firebase foi inicializado corretamente
    if (!db) {
        console.error("O Firestore não está inicializado. O salvamento foi cancelado.");
        // Rejeita a Promise com uma mensagem de erro clara
        return Promise.reject("O serviço do Firebase não está disponível.");
    }

    try {
        // Tenta obter o usuário autenticado (anonimamente, neste caso)
        const user = await getCurrentUser();

        // Monta o objeto de dados final que será salvo
        const dataToSave = {
            ...testData, // Inclui todos os dados do formulário
            userId: user ? user.uid : 'anonymous', // Adiciona o ID do usuário (ou 'anonymous' se não houver)
            createdAt: serverTimestamp() // Adiciona um timestamp do servidor para saber quando foi salvo
        };

        // Define o caminho da coleção no Firestore. Ex: 'testResults/ICA/results'
        const collectionPath = `testResults/${testName}/results`;

        // Adiciona um novo documento à coleção especificada
        const docRef = await addDoc(collection(db, collectionPath), dataToSave);

        console.log("Resultado salvo com sucesso no Firestore com o ID: ", docRef.id);

        // Retorna o ID do documento para confirmação
        return docRef.id;

    } catch (error) {
        console.error("Erro ao salvar o resultado no Firestore:", error);
        // Propaga o erro para que a interface do usuário possa lidar com ele (ex: mostrar uma mensagem de erro)
        throw new Error("Não foi possível salvar o resultado. Verifique sua conexão e as regras de segurança do Firestore.");
    }
}
