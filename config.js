/* =====================================================================
   CONFIGURAÇÃO DA OFERTA — único lugar para link, pixel e imagens.
   Tudo marcado como PENDENTE precisa ser preenchido antes de publicar.
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

  // PENDENTE: capa final. Vazio = mostra a capa provisória tipográfica.
  coverImage: "",

  // PENDENTE: 2 ou 3 páginas reais do PDF FINAL (webp ~1000px de largura).
  // Vazio = a seção mostra "prévias em atualização", nunca uma simulação.
  previews: [
    // { src: "assets/previas/pagina-1.webp", alt: "Página do guia com ..." },
  ],

  // TIMER DA OFERTA: data e hora reais de término, iguais para todos os
  // visitantes. Não reinicia ao recarregar. Quando chega a zero, o timer some.
  // Ao terminar, a condição precisa mudar de verdade na Zuptos; para uma nova
  // campanha, troque a data aqui.
  offerEndsAt: "2026-10-05T14:00:00-03:00",

  // MODO DEMONSTRAÇÃO (só para apresentar): o timer recomeça em 24h a cada
  // carregamento e ignora offerEndsAt. ANTES DE PUBLICAR: mude para false e
  // ajuste offerEndsAt para a data real de término.
  timerDemo: true,
  timerDemoHours: 24,
  offerLabel: "A oferta por R$19,90 termina em",

  // Contagem de dias até 1º/01/2027 (desligada para não somar dois timers).
  showDaysTo2027: false,

  // Prova social: compradores reais da versão já vendida (confirmado pelo
  // proprietário). Vazio = não aparece.
  socialProof: "Mais de 400 pessoas já começaram o novo ciclo com o guia",
  // Trecho da frase acima que ganha destaque.
  socialProofHighlight: "Mais de 400 pessoas",

  // true enquanto revisa localmente: exibe as etiquetas de pendência.
  // Mude para false antes de publicar.
  showPendingBadges: true,
};
