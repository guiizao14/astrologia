# Seu Mapa, Seu 2027 — landing de vendas

Página estática (HTML, CSS e JavaScript puros, sem build) para o guia digital
interativo **Seu Mapa, Seu 2027**, vendido por R$19,90.

## Arquivos

| Arquivo | O que tem |
| --- | --- |
| `index.html` | Textos comerciais, seções, FAQ e rodapé |
| `styles.css` | Visual, responsividade e animações |
| `app.js` | Checkout, Pixel, timer, prova social, galeria, FAQ e revelação ao rolar |
| `config.js` | **Tudo que muda sem mexer no código:** link do checkout, Pixel, timer, prova social, capa e prévias |
| `assets/previas/` | Capa e páginas reais do PDF final |

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

## Antes de publicar ou liberar tráfego

Em `config.js`:

- [ ] `checkoutUrl`: link real do checkout Zuptos. Sem ele, os botões só mostram um aviso.
- [ ] `metaPixelId`: ID do Meta Pixel. `Purchase` fica com o checkout, nunca com o clique.
- [ ] `coverImage` e `previews`: capa e páginas reais do PDF final.
- [ ] `showPendingBadges: false` para esconder as etiquetas de pendência.

No conteúdo:

- [ ] Conferir a lista "O que você recebe" e as frases de Sol, Lua e Ascendente com o PDF final.
- [ ] Completar a última pergunta do FAQ com o fluxo real de entrega da Zuptos.
- [ ] Rodapé: identificação da operação, contato de suporte, Termos de uso e Política de privacidade.
- [ ] Revisão final de coerência entre landing, PDF, checkout e criativos.
- [ ] Testar todos os botões com o link real da Zuptos (incluindo UTMs) e o checkout no celular.
