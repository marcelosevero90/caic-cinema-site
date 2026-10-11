# 🎬 CAIC Cinema Streaming - Site Oficial de Divulgação & Downloads

Site oficial de divulgação e landing page da plataforma de streaming inteligente **CAIC Cinema**, com links diretos para acesso ao Web Player online e download do aplicativo nativo Android (Mobile e TV Box).

---

## 🌟 Links Oficiais

* 🌐 **Plataforma Web (Streaming Ao Vivo):** [https://caic-cinema.vercel.app/](https://caic-cinema.vercel.app/)
* 📲 **Site de Divulgação (Repositório):** [https://github.com/marcelosevero90/caic-cinema-site](https://github.com/marcelosevero90/caic-cinema-site)

---

## 🚀 Recursos em Destaque

1. **Curadoria Inteligente por IA:**
   * Integrado com o modelo **Google Gemini 3.8 Flash** via Tool / Function Calling.
   * Sugestão de filmes por humor, época, diretor ou contexto em tempo real com reprodução imediata.

2. **Feito para Smart TV Box & Android TV:**
   * Navegação otimizada para controle remoto (D-Pad) com setas e tecla OK.
   * Interface Leanback com foco luminoso de alto contraste visível do sofá.

3. **Versão Mobile & Multiplataforma:**
   * Funciona direto no navegador Web (PC, Mac, iPhone, iPad, Celular).
   * Suporte a instalação via pacote **APK** para Android Celular e Android TV Box.

4. **Design Moderno:**
   * Tema escuro cinematográfico (Dark Aesthetic) com Glassmorphism, brilhos neon e animações fluidas.
   * Totalmente responsivo para qualquer tamanho de tela (mobile até telas 4K).

---

## 📦 Estrutura do Projeto

```
caic-cinema-site/
├── assets/
│   ├── favicon.svg      # Ícone da marca
│   ├── logo.svg         # Logotipo em alta definição
│   ├── og-image.svg     # Card para redes sociais (WhatsApp/X/Facebook)
│   └── icons.svg        # Ícones do ecossistema
├── index.html           # Landing page completa e semântica
├── style.css            # Estilos personalizados, gradientes e animações
├── app.js               # Gerenciador de download do APK, modal nativo e FAQ
├── vercel.json          # Configuração de deploy no Vercel
├── package.json         # Scripts de execução e desenvolvimento local
└── README.md            # Documentação do projeto
```

---

## 🛠️ Como Executar Localmente

### Opção 1: Abrir diretamente no Navegador
Basta dar dois cliques no arquivo `index.html` ou abrir através de qualquer navegador web moderno.

### Opção 2: Usando um Servidor Local
```bash
# Com npx serve
npx serve .

# Ou com Python
python -m http.server 8000
```
Acesse em: `http://localhost:8000` (ou na porta indicada).

---

## 🌐 Publicação no GitHub Pages

Para publicar este site gratuitamente no **GitHub Pages**:
1. Acesse o repositório no GitHub: `https://github.com/marcelosevero90/caic-cinema-site`
2. Vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e pasta `/(root)`.
5. Clique em **Save**. O site estará disponível em `https://marcelosevero90.github.io/caic-cinema-site/`.

---

## 📲 Aplicativo Android (APK)

O aplicativo nativo em formato APK pode ser gerado a partir do código do app principal (`AppCineIA`) utilizando o Capacitor:
```bash
# No diretório do app
npm run build
npx cap add android
npx cap open android
```
No Android Studio, gere o arquivo `app-release.apk` e disponibilize-o para download direto aos usuários através desta landing page.

---

## 📄 Licença & Autoria

Desenvolvido por **Marcelo Severo** para o ecossistema **CAIC Cinema Streaming & IA**.  
Todos os direitos reservados © 2026.
