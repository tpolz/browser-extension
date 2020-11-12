function createDevOpsObject(devOpsID, devOpsDescription) {
  var tempIdText, tempDescription, devOpsObject;
  tempIdText = "[DO:" + devOpsID +"]";
  tempDescription = tempIdText + " - " + devOpsDescription;
  devOpsObject = {
    idText: tempIdText,
    fullDescription: tempDescription
  };
  return devOpsObject;
};

clockifyButton.render('.work-item-form-headerContent:not(.clockify)', {observe: true}, function (elem) {
  var link, itemId, description, devOpsObject;
  itemId = $('.work-item-form-id > span', elem).textContent;
  description = $('.work-item-form-title input', elem).value;
  devOpsObject = createDevOpsObject(itemId, description);
  link = clockifyButton.createButton({
    description: devOpsObject.fullDescription,
    projectName: devOpsObject.idText,
    projectPartialMatch: true
  });
  link.style.display = "block";
  link.style.paddingTop = "0";
  link.style.paddingBottom = "0";
  link.style.marginBottom = "10px";
  link.style.cursor = 'pointer';
  elem.appendChild(link);
});

clockifyButton.render('.ms-List-cell:not(.clockify)', {observe: true}, function (elem) {
  var itemID, description, devOpsObject;
  itemID = $("[data-automation-key='System.Id'] > span", elem).textContent;
  description = $(".work-item-title-link", elem).textContent;
  devOpsObject = createDevOpsObject(itemID, description);
  link = clockifyButton.createButton({
    description: devOpsObject.fullDescription,
    projectName: devOpsObject.idText,
    projectPartialMatch: true,
    small: true
  });
  var elemChild;
  elemChild = $(".ms-FocusZone",elem);
  link.style.paddingTop = "0";
  link.style.paddingRight = "0";
  elemChild.insertBefore(link, elemChild.childNodes[0]);
});
