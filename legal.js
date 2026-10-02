// Termos e Privacidade: preenche quem vende e o contato a partir de config.js.
// Sem dados em config.js, fica o texto alternativo que já está no HTML.
(() => {
  const cfg = window.SEU_MAPA || {};
  const operator = [cfg.operatorName, cfg.operatorDoc].filter(Boolean).join(", ");
  if (operator) document.querySelectorAll("[data-operator]").forEach((el) => { el.textContent = operator; });
  if (cfg.supportEmail) {
    document.querySelectorAll("[data-support]").forEach((el) => {
      const a = document.createElement("a");
      a.href = `mailto:${cfg.supportEmail}`;
      a.textContent = cfg.supportEmail;
      el.replaceChildren(a);
    });
  }
})();
