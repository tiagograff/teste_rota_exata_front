const date = document.getElementById("birthday");
date.document.addEventListener("DOMContentLoaded", function () {
  M.Datepicker.init(date, {
    format: "yyyy-mm-dd", // Formato da data no campo
    yearRange: 100, // Intervalo de anos
    i18n: {
      cancel: "Cancelar",
      clear: "Limpar",
      done: "Ok",
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      weekdays: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    },
  });
});
