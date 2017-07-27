(function() {

  const ERROR_MSG = 'Somthing went wrong! Please make sure its a valid JSON object and that your keys are strings ;)';

  function redirectHome() {
    window.location.assign('index.html');
  }

  function isJSON(json) {
    try {
      if (!hasTextValue(json) || typeof JSON.parse(json.trim()) !== 'object') {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  function printResults(results) {
    const flowResults = document.getElementById('flowResults');
    const div = document.createElement('div');
    div.className = 'rule-item';
    flowResults.innerHTML = '<p>Results:</p>';

    results.forEach(function(rule, index) {
      div.innerHTML += '<p>Rule ' + rule.id + ': ' + rule.passed + '</p>';
      if (++index === results.length) {
        div.innerHTML += '<p> End</p>';
      }
    });

    flowResults.appendChild(div);
  }

  function execRules(obj) {
    const results = [];
    let currentRuleId = 1;
    let currentFunc = new Function();
    let hasPassed = false;
    let nextRuleId = 'null';

    try {
      do {
        currentFunc = new Function('return ' + data[currentRuleId].ruleBody + ';')();
        hasPassed = currentFunc(obj);
        results.push({
          passed: hasPassed ? 'passed' : 'failed',
          id: currentRuleId
        });

        nextRuleId = hasPassed ? data[currentRuleId].passed : data[currentRuleId].failed;
        currentRuleId = nextRuleId;
      } while (nextRuleId && nextRuleId !== 'null' && isNumber(nextRuleId));
    } catch (e) {
      console.log('%c Error: ' + e.message, 'background: #ccc; border: 1px solid #00f; color: #f00; font-size: 16px;');
    }

    printResults(results);
  }

  function executeFlow(event) {
    event.preventDefault();

    const ruleObject = document.getElementById('ruleObject');

    if (!isJSON(ruleObject.value)) {
      alert(ERROR_MSG);
      console.log('%c ' + ERROR_MSG, 'background: #ccc; border: 1px solid #00f; color: #f00; font-size: 16px;');
      return false;
    }

    execRules(JSON.parse(ruleObject.value.trim()));
  }

  const executeFlowButton = document.getElementById('executeFlow');
  const executeFlowForm = document.getElementById('form__executeFlow');
  executeFlowButton.addEventListener('click', executeFlow);
  executeFlowForm.addEventListener('submit', executeFlow);


  const dataKeys = Object.keys(data);
  if (!dataKeys || dataKeys.length < 1) {
    alert('You don\'t have any rules saved, please create some rules first :)');
    redirectHome();
  }
  if (!data[1]) {
    alert('You don\'t have a rule with id 1. please create a rule with id value of "1" so we have a place to start from :)');
    redirectHome();
  }
}());
