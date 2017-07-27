(function() {

  const ERROR_MSG = 'Somthing went wrong! Please check your values again :) all fields are required';

  function appendRule(rule) {
    const div = document.createElement('div');
    div.className = 'rule-item';
    div.innerHTML += '<p>Rule title: ' + rule.title + '</p>';
    div.innerHTML += '<p>Rule id: ' + rule.ruleId + '</p>';
    div.innerHTML += '<p>Rule body: ' + rule.ruleBody + '</p>';
    div.innerHTML += '<p>If rule passed: ' + rule.passed + '</p>';
    div.innerHTML += '<p>If rule failed: ' + rule.failed + '</p>';
    document.getElementById('ruleList').appendChild(div);
  }

  function isValidNextRule(nextRule) {
    // either equal to null or a number
    return hasTextValue(nextRule) && (nextRule === 'null' || isNumber(nextRule));
  }

  function validateNewRule(values) {
    try {
      return (
        hasTextValue(values.title) // required title
        && isNumber(values.ruleId) // required id
        && !data[values.ruleId]    // unique id
        && isFunction(values.ruleBody) // body must have function
        && isValidNextRule(values.passed) // must have valid next rule or null
        && isValidNextRule(values.failed)
        && values.ruleId !== values.passed // should not be the same ruleId
        && values.ruleId !== values.failed // otherwise we'll have infinite loop
      );
    } catch (e) {
      return false;
    }
  }

  function submitRule(event) {
    event.preventDefault();

    const title = document.getElementById('title');
    const ruleId = document.getElementById('ruleId');
    const ruleBody = document.getElementById('ruleBody');
    const passed = document.getElementById('passed');
    const failed = document.getElementById('failed');

    const values = {
      title: title.value,
      ruleId: ruleId.value,
      ruleBody: ruleBody.value,
      passed: passed.value,
      failed: failed.value
    };

    if (!validateNewRule(values)) {
      alert(ERROR_MSG);
      console.log('%c ' + ERROR_MSG, 'background: #ccc; border: 1px solid #00f; color: #f00; font-size: 16px;');
      return false;
    }

    const newRule = {
      title: title.value.trim(),
      ruleId: ruleId.value,
      ruleBody: ruleBody.value.trim(),
      passed: passed.value.trim(),
      failed: failed.value.trim()
    };
    data[ruleId.value] = newRule;
    setStorage(data);
    appendRule(newRule);

    title.value = '';
    ruleId.value = '';
    ruleBody.value = 'function someRule(obj){ return !!obj; }';
    passed.value = '';
    failed.value = '';
  }

  const addRuleButton = document.getElementById('addRule');
  const addRuleForm = document.getElementById('form__addingRule');
  addRuleButton.addEventListener('click', submitRule);
  addRuleForm.addEventListener('submit', submitRule);

  const dataKeys = Object.keys(data);
  if (dataKeys && dataKeys.length) {
    for (var ruleKey in data) {
      appendRule(data[ruleKey]);
    }
  }
}());
