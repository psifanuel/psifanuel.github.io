<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questionário Psicológico / Neuropsicológico</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- jsPDF for PDF generation -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- FileSaver.js for saving files (like JSON) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        @media print {
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 p-4 sm:p-6 md:p-8">

    <div class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">

        <!-- Header Section -->
        <header class="border-b-2 border-gray-200 pb-6 mb-6 text-center">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">🧠 Teste Psicológico / Neuropsicológico</h1>
            <div class="text-sm sm:text-base text-gray-600">
                <p><span class="font-semibold">Psicólogo Responsável:</span> Fanuel Candido Glanzmann – CRP 05/63951</p>
                <p><span class="font-semibold">Abordagem:</span> Terapia Cognitivo-Comportamental (TCC)</p>
                <p><span class="font-semibold">Serviço:</span> Avaliação Psicológica / Teste Psicométrico</p>
                <p><span class="font-semibold">Site:</span> <a href="http://psifanuel.com.br" target="_blank" class="text-blue-600 hover:underline">psifanuel.com.br</a></p>
            </div>
        </header>

        <!-- Patient Information Section -->
        <section class="mb-8">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Informações do Avaliado</h2>
            <form id="patient-form" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div class="md:col-span-2">
                    <label for="nome" class="block text-sm font-medium text-gray-700">Nome do(a) Avaliado(a):</label>
                    <input type="text" id="nome" name="nome" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="nascimento" class="block text-sm font-medium text-gray-700">Data de Nascimento:</label>
                    <input type="date" id="nascimento" name="nascimento" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="idade" class="block text-sm font-medium text-gray-700">Idade:</label>
                    <input type="number" id="idade" name="idade" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="sexo" class="block text-sm font-medium text-gray-700">Sexo:</label>
                    <select id="sexo" name="sexo" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <div>
                    <label for="escolaridade" class="block text-sm font-medium text-gray-700">Escolaridade:</label>
                    <input type="text" id="escolaridade" name="escolaridade" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="md:col-span-2">
                    <label for="profissao" class="block text-sm font-medium text-gray-700">Profissão:</label>
                    <input type="text" id="profissao" name="profissao" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="data_aplicacao" class="block text-sm font-medium text-gray-700">Data da Aplicação:</label>
                    <input type="date" id="data_aplicacao" name="data_aplicacao" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="teste_aplicado" class="block text-sm font-medium text-gray-700">Teste Aplicado:</label>
                    <input type="text" id="teste_aplicado" name="teste_aplicado" value="Quociente de Perceção Sensorial (QPS)" class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" readonly>
                </div>
                <div class="md:col-span-2">
                    <label for="aplicador" class="block text-sm font-medium text-gray-700">Aplicador:</label>
                    <input type="text" id="aplicador" name="aplicador" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </form>
        </section>

        <!-- Questionnaire Section -->
        <main>
            <h2 class="text-xl font-semibold mb-2 border-b pb-2">Questionário: Quociente de Perceção Sensorial para Adultos (QPS)</h2>
            <p class="text-sm text-gray-600 mb-6">Leia cada uma cuidadosamente e assinale em que medida está ou não de acordo, selecionando a opção apropriada para cada afirmação.</p>
            <form id="questionnaire-form" class="space-y-6">
                <!-- Questions will be injected here by JS -->
            </form>
        </main>
        
        <!-- Action Buttons Section -->
        <section class="mt-8 pt-6 border-t no-print">
            <div class="flex flex-wrap justify-center gap-4">
                <button id="save-json" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">Salvar Respostas (JSON)</button>
                <button id="save-pdf" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">Gerar PDF</button>
                <button id="send-whatsapp" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">Enviar por WhatsApp</button>
                <button id="send-email" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">Enviar por E-mail</button>
            </div>
        </section>


        <!-- Footer Section -->
        <footer class="mt-8 pt-6 border-t-2 border-gray-200 text-center">
            <h3 class="text-lg font-semibold mb-2">📸 Direitos de Imagem e Confidencialidade</h3>
            <p class="text-xs sm:text-sm text-gray-600">
                As imagens, registros e dados coletados durante esta avaliação são de uso exclusivo do psicólogo responsável e destinam-se exclusivamente aos fins clínicos e científicos pertinentes à avaliação psicológica.
            </p>
            <p class="text-xs sm:text-sm text-gray-600 mt-2">
                É vedada a reprodução, divulgação ou compartilhamento parcial ou integral deste material sem autorização expressa do profissional e do avaliado, conforme o Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005).
            </p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const questions = [
                "Eu daria conta se alguém adicionasse 5 grãos de sal ao meu copo de água.",
                "Eu seria capaz de distinguir diferentes pessoas pelo seu cheiro.",
                "Eu não repararia se alguém adicionasse uma colher de açúcar ao meu chá.",
                "Eu não teria medo de me magoar caso caísse da minha bicicleta a alta velocidade.",
                "Eu não seria capaz de detetar o movimento das hélices de uma ventoinha em movimento, mesmo na velocidade mínima.",
                "O som de um piano e de um violino a tocar a mesma nota parecem-me muito semelhantes.",
                "Eu seria capaz de reparar se um morango está maduro apenas pelo seu cheiro.",
                "Eu seria capaz de distinguir chocolate de leite e chocolate negro apenas pelo seu sabor.",
                "Eu não consigo tolerar banhos quentes (acima dos 40º).",
                "Eu não necessitaria de anestesia para fazer um tratamento dentário, tal como o tratamento de uma cárie.",
                "Eu teria de esperar 10 minutos para que uma bebida quente arrefecesse antes de a ingerir, caso contrário estaria muito quente para mim.",
                "Eu seria capaz de detetar visualmente uma mudança de brilho numa luz, cada vez que a sua intensidade fosse alterada.",
                "Eu não seria capaz de visualizar objetos grandes com nitidez, como um carro estacionado numa noite escura.",
                "Eu daria conta se alguém acrescentasse 5 gotas de sumo de limão no meu copo de água.",
                "Eu seria a última pessoa a detetar se algo se estivesse a queimar.",
                "Eu não seria capaz de sentir as vibrações de uma musica alta se estivesse sentado ao lado das colunas (por exemplo, num concerto).",
                "Eu não seria capaz de sentir uma pequena variação no volume de uma música pela diferença da vibração na minha pele.",
                "Eu não consigo ouvir a televisão quando está muito baixa, mesmo quando as outras pessoas conseguem.",
                "Eu seria capaz de ouvir uma folha a mexer-se, se ela fosse levada pelo vento numa rua silenciosa.",
                "Eu não seria capaz de diferenciar o sabor de dois pedaços diferentes de chocolate negro.",
                "Eu seria capaz de sentir a diferença entre duas marcas de batatas fritas de pacote.",
                "Quando as pessoas estão a falar as palavras parecem misturar-se umas com as outras.",
                "Eu apenas consigo olhar para cores brilhantes por um curto período de tempo.",
                "Eu perderia facilmente o equilíbrio se estivesse de olhos fechados, apoiado num só pé.",
                "Eu não seria capaz de sentir o cheiro de churrasco a 20 metros de distância.",
                "Eu não consigo girar sobre mim mesmo sem cair.",
                "Eu não notaria uma diferença de 10 graus na temperatura ambiente.",
                "Eu sou capaz de beber chá ou café simples, sem necessidade de adicionar leite ou açúcar.",
                "Eu não consigo ouvir os baixos (tons graves) de uma música.",
                "Eu seria capaz de distinguir pelo cheiro relva recém-cortada de relva não-cortada.",
                "Eu não seria capaz de sentir as etiquetas da roupa mesmo que pensasse nisso.",
                "Eu consigo ouvir o ruído da eletricidade nas paredes.",
                "Eu consigo reparar na cintilação do ecrã de um computador mesmo quando está a funcionar corretamente.",
                "Eu não seria capaz de detetar se o leite está estragado apenas pelo cheiro.",
                "Eu seria capaz de identificar uma pequena diferença (por exemplo, 1 grau) na temperatura ambiente.",
                "Eu seria capaz de sentir um corte de um milímetro na minha pele.",
                "Eu seria capaz de ver individualmente as hélices de uma ventoinha, mesmo se estivessem na velocidade máxima de rotação.",
                "Eu conseguiria detetar a diferença de peso entre duas moedas de tamanhos diferentes colocadas na minha mão estando de olhos fechados.",
                "Eu não ficaria tonto num carrossel mesmo em alta velocidade.",
                "Eu não consigo ver palavras escritas numa página que outras pessoas conseguem ver.",
                "Eu seria capaz de distinguir duas laranjas diferentes apenas pelo sabor.",
                "Eu não seria capaz de distinguir uma pessoa conhecida de um estranho apenas pelo cheiro.",
                "Eu não consigo perceber se o pão é atrasado apenas pelo seu cheiro.",
                "Não consigo perceber se as minhas roupas estão limpas ou sujas apenas pelo cheiro.",
                "Eu conseguiria detetar o som de um aspirador a partir de qualquer divisão de um edifício de dois andares.",
                "Eu não distinguiria um piso liso de um piso irregular ao passar de carro estando sentado no banco de trás.",
                "Eu conseguiria beber um copo de água a ferver logo após sair da chaleira.",
                "Eu não conseguiria separar dois tipos de maçās verdes exclusivamente pela sua cor.",
                "Eu sou capaz de distinguir um livro antigo de um livro novo pelo seu cheiro.",
                "Eu conseguiria ler um sinal de trânsito a uma distância de 30 metros.",
                "Eu não consigo identificar se os carros que passam por mim numa rua vão a velocidades diferentes.",
                "Eu seria capaz de reparar se alguém adicionasse 5 grãos de açúcar no meu copo de água.",
                "Eu teria dificuldade em ver claramente uma única folha numa árvore mesmo que estivesse perto de mim.",
                "Eu não conseguiria sentir o sabor se alguém adicionasse uma colher de chá de sal no meu copo de água.",
                "Eu conseguiria sentir o elástico das minhas meias se eu parasse para pensar nisso.",
                "Eu não consigo diferenciar o sabor entre fruta madura e fruta verde.",
                "Eu conseguiria estar apoiado(a) apenas num pé durante 15 segundos sem me desequilibrar.",
                "Eu seria capaz de detetar a diferença de sabores entre dois doces aparentemente semelhantes.",
                "Eu reparo no peso e na pressão de um chapéu na minha cabeça.",
                "Eu sentiria se um fio de cabelo tocasse nas costas da minha mão.",
                "Se eu estivesse a caminhar seria capaz de sentir as vibrações de um camião que estivesse a passar mesmo que estivesse de olhos fechados.",
                "Eu seria capaz de identificar uma pequena fuga de gás a partir de qualquer divisão da casa.",
                "Eu não notaria pelo cheiro se alguém trocasse de perfume.",
                "Eu consigo perceber quando o elevador começa a movimentar-se.",
                "Eu consigo ouvir com muita facilidade os apitos para cães no parque.",
                "Eu não identificaria a diferença de sabor entre dois tipos diferentes de alface.",
                "Eu não sentiria o sabor de duas fatias limão colocadas no meu copo de água se estivesse a beber com os olhos fechados.",
                "Eu não consigo sair à rua quando está sol sem óculos de sol.",
                "Eu seria capaz de ler letras pequenas impressas, como o número de série de um DVD, a uma distância de 3 metros.",
                "Eu enjoo facilmente (por exemplo a andar de carro ou de barco).",
                "Eu seria capaz de sentir a diferença de temperatura de uma chávena de café após um minuto de repouso.",
                "Eu não consigo ouvir sons com frequências muito baixas como por exemplo sussurros.",
                "Eu seria o primeiro a ouvir uma mosca numa divisão.",
                "Se eu visse numa loja um monte de camisolas azuis feitas para serem idênticas seria capaz de identificar as diferenças entre elas.",
                "Eu não detetaria rapidamente um cheiro novo na minha casa antes de outras pessoas.",
                "Eu tenho um \"bom ouvido\": por exemplo, seria capaz de reproduzir um som musical sem qualquer pista ou ajuda.",
                "Eu conseguiria morder um limão sem qualquer problema.",
                "Eu não preciso de vestir um casaco no inverno, mesmo quando estão zero graus no exterior.",
                "Eu não seria capaz de combinar a cor de uma camisola que está na loja com a cor das minhas calças em casa.",
                "Eu não consigo ouvir todas as notas ao ouvir uma música.",
                "Eu consigo distinguir o cheiro entre a maioria dos homens e das mulheres.",
                "Eu prefiro vestir cores suaves.",
                "Eu ouço música com um volume mínimo.",
                "Eu conseguiria distinguir cada nota musical de um acorde mesmo que tivesse 10 notas.",
                "Eu fecho as cortinas para evitar a luz intensa.",
                "Eu não seria capaz de ouvir as diferenças no som se um mesmo instrumento tocasse a mesma nota em momentos diferentes.",
                "Eu seria capaz de distinguir duas marcas de café diferentes pelo cheiro mesmo com os meus olhos fechados.",
                "Eu consigo ver as partículas de poeira no ar na maioria dos ambientes.",
                "Eu não seria capaz de identificar a diferença de sabores entre duas marcas de molho de tomate com diferentes concentrações de sal.",
                "Eu seria capaz de sentir o cheiro de algo a queimar-se, mesmo que apenas um pouco, a partir de qualquer divisão da casa.",
                "Se o meu telemóvel estivesse a vibrar no meu bolso eu rapidamente o sentiria.",
                "Eu acho difícil ver cada estrela individualmente mesmo numa noite sem nebulosidade."
            ];
            
            const options = ["Concordo Totalmente", "Concordo", "Discordo", "Discordo Totalmente"];
            const form = document.getElementById('questionnaire-form');

            questions.forEach((q, index) => {
                const questionIndex = index + 1;
                const questionBlock = document.createElement('div');
                questionBlock.className = 'p-4 border rounded-lg bg-gray-50';

                const questionText = document.createElement('p');
                questionText.className = 'font-medium mb-3';
                questionText.textContent = `${questionIndex}. ${q}`;
                questionBlock.appendChild(questionText);

                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'flex flex-wrap gap-x-6 gap-y-2';
                
                options.forEach(opt => {
                    const label = document.createElement('label');
                    label.className = 'inline-flex items-center cursor-pointer';

                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = `q${questionIndex}`;
                    radio.value = opt;
                    radio.className = 'form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500';
                    
                    const span = document.createElement('span');
                    span.className = 'ml-2 text-sm text-gray-700';
                    span.textContent = opt;

                    label.appendChild(radio);
                    label.appendChild(span);
                    optionsContainer.appendChild(label);
                });

                questionBlock.appendChild(optionsContainer);
                form.appendChild(questionBlock);
            });

            // --- DATA GATHERING FUNCTION ---
            function getFormData() {
                const patientForm = new FormData(document.getElementById('patient-form'));
                const patientData = Object.fromEntries(patientForm.entries());

                const questionnaireForm = new FormData(document.getElementById('questionnaire-form'));
                const questionnaireData = Object.fromEntries(questionnaireForm.entries());
                
                if (Object.keys(patientData).some(k => !patientData[k])) {
                    alert('Por favor, preencha todos os campos de informações do avaliado.');
                    return null;
                }

                if (Object.keys(questionnaireData).length < questions.length) {
                    alert('Por favor, responda todas as perguntas do questionário.');
                    return null;
                }
                
                return {
                    informacoes_avaliado: patientData,
                    respostas_questionario: questionnaireData
                };
            }

            // --- ACTION BUTTONS ---
            // 1. Save as JSON
            document.getElementById('save-json').addEventListener('click', () => {
                const data = getFormData();
                if (!data) return;
                const jsonString = JSON.stringify(data, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                saveAs(blob, 'respostas_qps.json');
            });

            // 2. Save as PDF
            document.getElementById('save-pdf').addEventListener('click', () => {
                const data = getFormData();
                if (!data) return;

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                let y = 15;
                const margin = 15;
                const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
                
                const addText = (text, size, weight, space) => {
                    if (y > 280) {
                        doc.addPage();
                        y = 15;
                    }
                    doc.setFontSize(size).setFont('helvetica', weight);
                    const lines = doc.splitTextToSize(text, maxWidth);
                    doc.text(lines, margin, y);
                    y += (lines.length * (size / 2.5)) + space;
                };

                addText('Relatório de Respostas - Teste Psicológico', 18, 'bold', 10);
                
                addText('Informações do Avaliado', 14, 'bold', 6);
                const patient = data.informacoes_avaliado;
                for (const key in patient) {
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    addText(`${formattedKey}: ${patient[key]}`, 10, 'normal', 3);
                }
                y += 5;

                addText('Respostas do Questionário (QPS)', 14, 'bold', 6);
                const answers = data.respostas_questionario;
                for (const key in answers) {
                    const qIndex = parseInt(key.replace('q', '')) - 1;
                    addText(`${qIndex + 1}. ${questions[qIndex]}\n   Resposta: ${answers[key]}`, 9, 'normal', 5);
                }

                doc.save('respostas_qps.pdf');
            });

            // 3. Send via WhatsApp
            document.getElementById('send-whatsapp').addEventListener('click', () => {
                const data = getFormData();
                if (!data) return;
                
                let text = `*Respostas do Questionário Psicológico*\n\n`;
                text += `*Informações do Avaliado:*\n`;
                for (const key in data.informacoes_avaliado) {
                     const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    text += `_${formattedKey}_: ${data.informacoes_avaliado[key]}\n`;
                }
                text += `\n*Respostas do Questionário:*\n`;
                for (const key in data.respostas_questionario) {
                    text += `${key.replace('q', '')}. ${data.respostas_questionario[key]}\n`;
                }

                const encodedText = encodeURIComponent(text);
                window.open(`https://api.whatsapp.com/send?text=${encodedText}`);
            });
            
            // 4. Send via Email
            document.getElementById('send-email').addEventListener('click', () => {
                const data = getFormData();
                if (!data) return;

                let body = `Respostas do Questionário Psicológico\n\n`;
                body += `Informações do Avaliado:\n`;
                for (const key in data.informacoes_avaliado) {
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    body += `${formattedKey}: ${data.informacoes_avaliado[key]}\n`;
                }
                body += `\nRespostas do Questionário:\n`;
                for (const key in data.respostas_questionario) {
                     const qIndex = parseInt(key.replace('q', '')) - 1;
                    body += `${qIndex + 1}. ${questions[qIndex]}\n   - Resposta: ${data.respostas_questionario[key]}\n\n`;
                }
                
                const subject = 'Respostas do Questionário Psicológico';
                const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
            });

        });
    </script>
</body>
</html>
