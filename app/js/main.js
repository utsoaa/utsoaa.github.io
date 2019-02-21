$(document).ready(() => {
  const pageId = $("section")
    .first()
    .attr("id");

  $("#link-" + pageId).addClass("active");
});
