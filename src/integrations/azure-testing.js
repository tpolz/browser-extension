function createDevOpsObject(devOpsID, devOpsDescription) {
  var tempIdText, tempDescription, devOpsObject;
  tempIdText = "[DOT:" + devOpsID +"]";
  tempDescription = tempIdText + " - " + devOpsDescription;
  devOpsObject = {
    idText: tempIdText,
    fullDescription: tempDescription
  };
  return devOpsObject;
};

/*function removeClockifyButtons (earray, selector) {

    console.log("in removeClockifyButtons");
    var elements = document.getElementsByClassName('work-item-form-headerContent clockify');
    if (elements && elements.length > 0) {
        while (elements.length) {
            console.log("in remove class loop");
            elements[0].classList.remove('clockify');
        };
    };

    for (let i = 0; i < earray.length; i++) {
      console.log("in removal " + i);
      //console.log(earray[i]);
      earray[i].remove();
    };

    //addButtons();
};*/

addButtons();

function addButtons () {
  clockifyButton.render('.work-item-form-headerContent:not(.clockify):not(.flex-row)', {observe: true}, function (elem) {
    var itemId, description, devOpsObjectitemIdElem, descElem;
    itemIdElem = $('.work-item-form-id > span', elem);
    descElem = $('.work-item-form-title input', elem);
    itemId = itemIdElem.textContent;
    description = descElem.value;
    devOpsObject = createDevOpsObject(itemId, description);
    const link = clockifyButton.createButton({
      description: devOpsObject.fullDescription,
      projectName: devOpsObject.idText,
      projectPartialMatch: true
    });
    link.style.display = "inline";
    link.style.paddingTop = "0";
    link.style.paddingBottom = "0";
    link.style.marginBottom = "10px";
    link.style.marginLeft = "6px";
    link.style.cursor = 'pointer';

    inputForm = clockifyButton.createInput({
          description: devOpsObject.fullDescription,
          projectName: devOpsObject.idText,
          projectPartialMatch: true
    });
    inputForm.style.display = "inline";
    inputForm.style.marginLeft = '10px';

    elem.appendChild(link);
    elem.appendChild(inputForm);

    /*descElem.addEventListener("change", function () {
      console.log("desc listener working");
      removeClockifyButtons([link, inputForm], selector);
      console.log("after calling removeClockifyButtons");
    });
    itemIdElem.addEventListener("change", function () {
      console.log("item listener working");
      removeClockifyButtons([link, inputForm], selector);
    });*/
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
};

var edtElementSelector = '[aria-label="EDT Ticket No"]';
var edtParentSelector = '.control';
var edtElement, edtParent;

waitForElementToDisplay(addFreshdeskLink,1000,5000);

function waitForElementToDisplay(callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    edtElement = document.querySelector(edtElementSelector+':not(.clockify)');
    if (edtElement != null) {
      edtParent = edtElement.closest(edtParentSelector+':not(.clockify)');
      if (edtParent != null) {
        edtElement.classList.add('clockify');
        edtParent.classList.add('clockify');
        callback();
        return;
      } else {
        callTimeout();
      }
    }
    else {
      callTimeout();
    }
    function callTimeout() {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    };
  })();
};

function addFreshdeskLink() {
  edtElement = document.querySelector(edtElementSelector);
  edtParent = edtElement.closest(edtParentSelector);
  var edtTicketValue = edtElement.value;
  var a = document.createElement('a');
  var linkText = document.createTextNode("Link To Freshdesk");
  a.appendChild(linkText);
  a.title = "Link To Freshdesk";
  a.target = "_blank";
  edtParent.style.marginLeft = '5px';
  edtParent.style.marginBottom = '5px';
  edtParent.appendChild(a);
  updateEdtLink(a, edtTicketValue);
  edtElement.addEventListener("input",function () {
    edtElement = document.querySelector(edtElementSelector);
    if (edtElement && edtElement.value != null) {
      updateEdtLink(a,edtElement.value);
    };
  });
  edtElement.addEventListener("change",function () {
    edtElement = document.querySelector(edtElementSelector);
    if (edtElement && edtElement.value != null) {
      updateEdtLink(a,edtElement.value);
    };
  });
};

function updateEdtLink(a, edtTicketValue) {
  const regExNumberOnly = /^[0-9]+$/;
  if (regExNumberOnly.test(edtTicketValue)) {
    a.href = "https://kiewit.freshdesk.com/support/tickets/" + edtTicketValue;
    a.text = "Link to FD Ticket " + edtTicketValue;
  }else {
    a.removeAttribute("href");
    a.text = "None: Enter a Valid EDT Ticket No"
  };
};
