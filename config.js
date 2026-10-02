/* =====================================================================
   CONFIGURAÇÃO DA OFERTA — único lugar para link, pixel, imagens e dados
   da operação. Tudo marcado como PENDENTE precisa ser preenchido antes de
   liberar tráfego.
   ===================================================================== */
window.SEU_MAPA = {
  // PENDENTE: URL real do checkout Zuptos deste produto. Enquanto vazia,
  // nenhum botão leva a lugar nenhum e a página avisa que falta o link.
  checkoutUrl: "",

  // Repassa utm_*, fbclid etc. da página para o checkout, se a Zuptos aceitar.
  preserveUtms: true,

  // PENDENTE: ID do Meta Pixel. Vazio = nenhum script de rastreamento carrega.
  metaPixelId: "",

  // Evento do clique no botão. Se a Zuptos já dispara InitiateCheckout pelo
  // próprio pixel, mantenha o evento customizado para não duplicar.
  // Purchase NUNCA é disparado aqui: só o checkout confirma compra.
  clickEvent: { name: "CliqueCheckout", custom: true },
  price: { value: 19.9, currency: "BRL" },

  // Capa e páginas reais do PDF final (Seu-Mapa-Seu-2027-Guia-Interativo-PREMIUM.pdf).
  // Se o PDF mudar, gere as imagens de novo a partir da versão nova.
  coverImage: "assets/previas/capa.webp",
  previews: [
    { src: "assets/previas/pagina-fichas.webp", alt: "Página 12 do guia: fichas do Sol em Leão e em Virgem, com palavras-chave e perguntas para refletir" },
    { src: "assets/previas/pagina-tabela.webp", alt: "Página 8 do guia: tabela clicável com os 12 signos e a página de cada lente" },
    { src: "assets/previas/pagina-trio.webp", alt: "Página 6 do guia: campos preenchíveis para anotar seu Sol, sua Lua e seu Ascendente" },
  ],

  // TIMER DA OFERTA: data e hora reais de término, iguais para todos os
  // visitantes. Não reinicia ao recarregar. Quando chega a zero, o timer some.
  // Ao terminar, a condição precisa mudar de verdade na Zuptos; para uma nova
  // campanha, troque a data aqui. Vazio = sem timer.
  offerEndsAt: "2026-10-05T14:00:00-03:00",

  // MODO DEMONSTRAÇÃO (só para apresentar): o timer recomeça em 24h a cada
  // carregamento e ignora offerEndsAt. Nunca publique com true.
  timerDemo: false,
  timerDemoHours: 24,
  offerLabel: "A oferta por R$19,90 termina em",

  // Contagem de dias até 1º/01/2027 (desligada para não somar dois timers).
  showDaysTo2027: false,

  // Prova social: compradores reais da versão já vendida (confirmado pelo
  // proprietário). Vazio = não aparece.
  socialProof: "Mais de 400 pessoas já começaram o novo ciclo com o guia",
  // Trecho da frase acima que ganha destaque.
  socialProofHighlight: "Mais de 400 pessoas",

  // PENDENTE: identificação de quem vende (aparece no rodapé, nos Termos e na
  // Política de privacidade). O Decreto 7.962/2013 pede nome, CPF ou CNPJ e
  // um contato. Vazio = o rodapé mostra só os links legais.
  operatorName: "",   // ex.: "Nome Completo" ou "Razão Social Ltda."
  operatorDoc: "",    // ex.: "CNPJ 00.000.000/0001-00"
  supportEmail: "",   // ex.: "suporte@seudominio.com.br"

  // true enquanto revisa localmente: exibe as etiquetas de pendência.
  showPendingBadges: false,
};
