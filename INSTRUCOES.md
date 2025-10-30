# Instruções para Adicionar Salvamento em Nuvem a Outros Testes

Olá!

Devido a algumas limitações técnicas com os nomes dos arquivos, não consegui aplicar a funcionalidade de salvar na nuvem a todos os testes automaticamente. No entanto, o sistema de backend está pronto e você pode integrá-lo facilmente seguindo os passos abaixo para cada um dos seus arquivos de questionário (como `RAADS-R - Teste Interativo.html`, `Escala de Alexitimia de Toronto (TAS-20).html`, etc.).

## Passo a Passo

### 1. Renomeie o Arquivo (Temporariamente)

Para evitar problemas, a primeira coisa a fazer é renomear o arquivo do teste para um nome simples, sem espaços ou acentos.

* **Exemplo:** Mude `Escala de Alexitimia de Toronto (TAS-20).html` para `tas20.html`.

### 2. Adicione os Scripts do Firebase

Abra o arquivo renomeado e, dentro da tag `<script type="module">` no final do arquivo, adicione a seguinte linha no topo para importar a função de salvamento:

```javascript
import { saveTestResult } from './firestore-service.js';
```

### 3. Adicione o Botão "Salvar na Nuvem"

No corpo do arquivo HTML, encontre a seção de botões de ação (geralmente uma `div` com `id="action-buttons"`). Adicione o seguinte código para o novo botão, de preferência como a primeira opção:

```html
<button id="save-cloud" type="button" class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400">
    Salvar na Nuvem
</button>
```

### 4. Adicione a Lógica de Salvamento

Dentro da tag `<script type="module">`, no final do arquivo, adicione o seguinte bloco de código JavaScript. Ele irá capturar o clique no novo botão, coletar os dados e enviá-los para a nuvem.

**Importante:**
- Certifique-se de que a função `getFormDataAsObject()` já exista no seu script. Se o nome for diferente, ajuste no código abaixo.
- Altere o `'NOME_DO_TESTE'` para um identificador único para cada questionário (ex: `'TAS-20'`, `'RAADS-R'`).

```javascript
// --- Lógica para salvar na nuvem ---
const saveCloudBtn = document.getElementById('save-cloud');
saveCloudBtn.addEventListener('click', async () => {
    // Se o seu formulário tiver um campo de identificação (como nome), valide-o aqui
    // Exemplo:
    // const nomePaciente = document.getElementById('nome_paciente').value;
    // if (!nomePaciente) {
    //     alert('Por favor, preencha o nome do paciente antes de salvar.');
    //     return;
    // }

    saveCloudBtn.disabled = true;
    saveCloudBtn.textContent = 'Salvando...';

    try {
        const data = getFormDataAsObject(); // Garanta que esta função exista e retorne os dados do teste
        const docId = await saveTestResult('NOME_DO_TESTE', data); // Altere 'NOME_DO_TESTE'
        alert(`Resultado salvo com sucesso na nuvem! ID: ${docId}`);
        saveCloudBtn.textContent = 'Salvo com Sucesso!';
        saveCloudBtn.classList.replace('bg-purple-600', 'bg-green-600');
    } catch (error) {
        console.error("Falha ao salvar:", error);
        alert(error.message || 'Ocorreu um erro ao salvar os dados.');
        saveCloudBtn.disabled = false;
        saveCloudBtn.textContent = 'Salvar na Nuvem';
    }
});
```

### 5. Renomeie o Arquivo de Volta

Após salvar as alterações, renomeie o arquivo de volta para o seu nome original.

* **Exemplo:** Mude `tas20.html` de volta para `Escala de Alexitimia de Toronto (TAS-20).html`.

## Configuração Final do Firebase

Lembre-se de que o arquivo `firebase-config.js` precisa ter as suas credenciais do Firebase para que tudo funcione. Abra-o e preencha o objeto `firebaseConfig` com os dados do seu projeto.

Se tiver qualquer dúvida, pode me perguntar!
