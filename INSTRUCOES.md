# Instruções para Adicionar Login e Salvamento em Nuvem aos Testes

Olá!

O sistema de backend e autenticação está pronto. Para integrar a segurança de login e a funcionalidade de salvar na nuvem aos seus outros arquivos de questionário (como `RAADS-R - Teste Interativo.html`, `Escala de Alexitimia de Toronto (TAS-20).html`, etc.), siga os passos abaixo.

## Passo a Passo para Cada Questionário

### 1. Renomeie o Arquivo (Temporariamente)

Para evitar problemas, comece renomeando o arquivo do teste para um nome simples, sem espaços ou acentos.

*   **Exemplo:** Mude `Escala de Alexitimia de Toronto (TAS-20).html` para `tas20.html`.

### 2. Adicione os Scripts de Autenticação e Banco de Dados

Abra o arquivo renomeado e, no início da sua tag `<script type="module">` (geralmente no final do arquivo), adicione as seguintes importações:

```javascript
import { saveTestResult } from './firestore-service.js';
import { protectPage, logOut } from './auth-service.js';
```

### 3. Proteja a Página

Logo após as importações, adicione a chamada para a função `protectPage()`. Isso garantirá que apenas usuários logados possam acessar o questionário.

```javascript
// Protege a página, redirecionando para 'login.html' se o usuário não estiver logado
protectPage();
```

### 4. Adicione o Botão de Logout

No cabeçalho do seu arquivo HTML (geralmente dentro da tag `<header>`), adicione o botão de "Sair". Você pode ajustar o estilo conforme necessário.

```html
<button id="logout-btn" class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
    Sair
</button>
```

### 5. Adicione a Lógica de Logout

Dentro do seu script principal (onde você adicionou as importações), insira o código abaixo para fazer o botão de logout funcionar.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', async () => {
        try {
            await logOut();
            alert('Você foi desconectado com sucesso.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            alert('Não foi possível sair. Tente novamente.');
        }
    });

    // ... (o restante do seu código do questionário continua aqui)
});
```

### 6. Adicione o Botão "Salvar na Nuvem"

Na seção de botões de ação (geralmente uma `div` com `id="action-buttons"`), adicione o botão para salvar os dados:

```html
<button id="save-cloud" type="button" class="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400">
    Salvar na Nuvem
</button>
```

### 7. Adicione a Lógica de Salvamento

No final do seu script principal, adicione a lógica para o botão "Salvar na Nuvem".

**Importante:**
*   Certifique-se de que a função `getFormDataAsObject()` exista no seu script. Se o nome for diferente, ajuste no código abaixo.
*   Altere o `'NOME_DO_TESTE'` para um identificador único para cada questionário (ex: `'TAS-20'`, `'RAADS-R'`).

```javascript
// --- Lógica para salvar na nuvem ---
const saveCloudBtn = document.getElementById('save-cloud');
saveCloudBtn.addEventListener('click', async () => {
    // Se o seu formulário tiver um campo de identificação (como nome), valide-o aqui.
    // Exemplo:
    // const nomePaciente = document.getElementById('nome_paciente').value;
    // if (!nomePaciente) {
    //     alert('Por favor, preencha o nome do paciente antes de salvar.');
    //     return;
    // }

    saveCloudBtn.disabled = true;
    saveCloudBtn.textContent = 'Salvando...';

    try {
        const data = getFormDataAsObject(); // Garanta que esta função exista
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

### 8. Renomeie o Arquivo de Volta

Após salvar as alterações, renomeie o arquivo de volta para o seu nome original.

*   **Exemplo:** Mude `tas20.html` de volta para `Escala de Alexitimia de Toronto (TAS-20).html`.

## Configuração Final do Firebase

Lembre-se de que o arquivo `firebase-config.js` precisa ter as suas credenciais do Firebase para que tudo funcione. Abra-o e preencha o objeto `firebaseConfig` com os dados do seu projeto.

Se tiver qualquer dúvida, pode me perguntar!
