function createFDObject(freshdeskID, freshdeskDescription) {
  var tempIdText, tempDescription, freshdeskObject;
  tempIdText = "[FD:" + freshdeskID +"]";
  tempDescription = tempIdText + " - " + freshdeskDescription;
  freshdeskObject = {
    idText: tempIdText,
    fullDescription: tempDescription
  };
  return freshdeskObject;
};

clockifyButton.render('.page-actions__left:not(.clockify)', { observe: true }, function (elem) {
        var freshdeskObject;
        const desc = $(".ticket-subject-heading").innerText;
        const ticket = $(".breadcrumb__item.active").innerText;
        freshdeskObject = createFDObject(ticket, desc);
        const link = clockifyButton.createButton({
          description: freshdeskObject.fullDescription,
          projectName: freshdeskObject.idText,
          projectPartialMatch: true
        });
        link.style.marginLeft = "10px";
        link.style.display = "inline-flex";
        link.style.verticalAlign = "middle";

        var inputForm = clockifyButton.createInput({
          description: freshdeskObject.fullDescription,
          projectName: freshdeskObject.idText,
          projectPartialMatch: true
        });
        console.log("asdfg");
        console.log(inputForm);
        console.log(freshdeskObject.fullDescription);
        console.log(freshdeskObject.idText);
        inputForm.style.display = "inline";
        inputForm.style.marginLeft = '10px';
        elem.append(link);
        elem.append(inputForm);
});
