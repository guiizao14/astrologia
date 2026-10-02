# Seu Mapa, Seu 2027 — landing de vendas

Página estática (HTML, CSS e JavaScript puros, sem build) para o guia digital
interativo **Seu Mapa, Seu 2027**, vendido por R$19,90.

## Arquivos

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Textos comerciais, seções, FAQ e rodapé |
| `termos.html`, `privacidade.html` | Termos de uso e Política de privacidade |
| `styles.css` | Visual, responsividade e animações |
| `app.js` | Checkout, Pixel, timer, prova social, galeria, FAQ, rodapé e revelação ao rolar |
| `legal.js` | Preenche vendedor e suporte nas páginas legais |
| `config.js` | **Tudo que muda sem mexer no código:** checkout, Pixel, timer, prova social, capa, prévias e dados do vendedor |
| `assets/previas/` | Capa e 3 páginas reais do PDF final (p. 1, 6, 8 e 12) |
| `favicon.svg` | Ícone da aba |

## Rodar localmente

Abra a pasta com qualquer servidor estático, por exemplo:

```
npx serve .
```

Adicione `?movimento` à URL para ver as animações num computador com
"efeitos de animação" desligados no sistema.

## Publicar grátis

Netlify, Vercel, Cloudflare Pages ou GitHub Pages: publique a raiz do
repositório, sem comando de build.

## Feito

- [x] Capa e prévias: páginas reais do `Seu-Mapa-Seu-2027-Guia-Interativo-PREMIUM.pdf` (37 páginas).
- [x] "O que você recebe" conferido com o PDF final (36 fichas, tabela clicável, campos preenchíveis, glossário).
- [x] Textos de Sol, Lua e Ascendente alinhados com as perguntas das lentes do PDF.
- [x] Aviso do mapa natal: o guia não calcula, mas indica onde gerar (como no PDF, p. 5).
- [x] FAQ completo, incluindo entrega por e-mail, uso no celular e reembolso em 7 dias (CDC, art. 49).
- [x] Rodapé com Termos de uso e Política de privacidade.
- [ ] Timer: está em modo demonstração (24h, reinicia a cada visita) durante a revisão. Antes do tráfego, mudar `timerDemo` para `false` e definir `offerEndsAt` com a data real.
- [x] Etiquetas de pendência escondidas (`showPendingBadges: false`).
- [x] Coerência com o anúncio em vídeo: Sol, Lua e Ascendente, 2027 e R$19,90 ("novo ciclo" trocado por "2027": "ciclo" sugere Revolução Solar).
- [x] Capa e prévias refeitas a partir do PDF corrigido em 02/10/2026.

## Falta (só você tem esses dados)

Em `config.js`:

- [ ] `checkoutUrl`: link real do checkout Zuptos. Sem ele, os botões só mostram um aviso.
- [ ] `metaPixelId`: ID do Meta Pixel. `Purchase` fica com o checkout, nunca com o clique.
- [ ] `operatorName`, `operatorDoc` e `supportEmail`: quem vende (nome e CPF/CNPJ) e o e-mail de suporte.
- [ ] `offerEndsAt`: confirmar a data de fim da oferta (hoje: 05/10/2026, 14h). O preço precisa mudar de verdade na Zuptos quando o timer acabar.

Depois de configurar:

- [ ] Conferir se a entrega da Zuptos é mesmo por e-mail (FAQ "Como recebo o guia?" e Termos).
- [ ] Testar os botões com o link real (com UTMs) e fazer uma compra de teste no celular.
- [ ] Se o PDF mudar, gerar de novo as imagens de `assets/previas/`.
