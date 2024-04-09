const element = {
    div: (x, y) => `<div ${y || ''} >${x}</div>`,
    questionText: (id, q, t) =>
      `<label class="question"> ${q} <br> <input type="text" id="${id}" ${
        t || ''
      }> </label>`,
    questionEmail: (id, q, t) =>
      `<label class="question"> ${q} <br> <input type="email" id="${id}" ${
        t || ''
      }> </label>`,
    questionDate: (id, q, t) =>
      `<label class="question"> ${q} <br> <input type="date" id="${id}" ${
        t || ''
      }> </label>`,
    msg: (id, q, t) => `<h2 class="msg" id="${id}" ${t || ''} >${q}</h2>`,
    result: (id, q, t) => `<h3 class="msg_result" id="${id}" ${t || ''} >${q}</h3>`,
    radioNode: (name, val, id, t) => `<p class="radio">
    <input type="radio" value="${val}" name="${name}" id="${id}" ${t || ''} >
    <span class="checkmark"></span>
    <label for="${id}">${val}</label>
    </p> `,
    resultNode: (name, val, id, t) => `
      <p class="radio">
        <p class="result">${val}</p>
      </p> `,
  },
  {
    result,
    msg,
    div,
    questionText,
    questionEmail,
    questionDate,
    radioNode,
    resultNode,
  } = element,
  progBar = document.querySelector('.app__controls__progress'),
  app = document.querySelector(`.app-v`),
  back = document.querySelector('.back'),
  next = document.querySelector('.next'),
  start = document.querySelector('.start'),
  logo = document.querySelector('.logo'),
  /////////////////////////////////////////////////////////////////////////////
  //Interact with code below
  page1 =
    msg(
      '1.食物自然放涼後，再放入冰箱冷藏，可減輕壓縮機運轉負擔。',
      '1.食物自然放涼後，再放入冰箱冷藏，可減輕壓縮機運轉負擔。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page2 =
    msg('2.冰箱定期除霜，以維持運轉效率。', '2.冰箱定期除霜，以維持運轉效率。') +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page3 =
    msg(
      '3.嘗試將冷氣設定溫度提高1度，可節省6~9%耗電。',
      '3.嘗試將冷氣設定溫度提高1度，可節省6~9%耗電。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page4 =
    msg(
      '4.半夜冷氣開啟舒眠與定時，可減少多餘耗電。',
      '4.半夜冷氣開啟舒眠與定時，可減少多餘耗電。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page5 =
    msg(
      '5.衣物少時用手洗，洗衣籃八分滿再用洗衣機，可減少洗衣機40%的使用率。',
      '5.衣物少時用手洗，洗衣籃八分滿再用洗衣機，可減少洗衣機40%的使用率。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page6 =
    msg(
      '6.定期清潔洗衣機，以維持運轉效率。',
      '6.定期清潔洗衣機，以維持運轉效率。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page7 =
    msg(
      '7.外出時完全關閉開飲機電源，回家後再開啟，省下不必要的浪費。',
      '7.外出時完全關閉開飲機電源，回家後再開啟，省下不必要的浪費。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page8 =
    msg(
      '8.善用除濕機的自動除溼功能，讓機器於濕度高於設定濕度時才會運轉，減少不必要的浪費。',
      '8.善用除濕機的自動除溼功能，讓機器於濕度高於設定濕度時才會運轉，減少不必要的浪費。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page9 =
    msg(
      '9.以筆記型電腦取代桌上型電腦，能省下約60%的電力。',
      '9.以筆記型電腦取代桌上型電腦，能省下約60%的電力。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3),
  page10 =
    msg(
      '10.離開房間或出門前，記得隨手關燈。',
      '10.離開房間或出門前，記得隨手關燈。'
    ) +
    radioNode('ic', '已執行', 1) +
    radioNode('ic', '未執行', 2) +
    radioNode('ic', '未持有該電器', 3);
// page2 = questionText('hometown', 'What is your hometown'),
// page3 = questionDate('event', 'When do you want to host your event'),
// page4 = questionText('live', 'where do you want to live'),
// page5 =
//   msg(
//     'Whats Your Favorite Ice Cream Flavor',
//     'Whats Your Favorite Ice Cream Flavor'
//   ) +
//   radioNode('ic', 'vanilla', 1) +
//   radioNode('ic', 'tim', 2) +
//   radioNode('ic', 's', 3) +
//   radioNode('ic', 'mint', 4);

(page = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
  page7,
  page8,
  page9,
  page10,
]),
  (radioFlag = [page10]);
//Interact with code above
/////////////////////////////////////////////////////////////////////////////
size = page.length - 1;

let current = 0,
  json = {},
  controler = (direction) => {
    recordData();
    if (direction === 'back') current === 0 ? current : current--;
    else current === size ? current : current++;
    displaycurrent(page[current]);
    checkForLast();
    updateProgress(current, size);
    fillData();
  },
  checkForLast = () => {
    if (current === size) {
      next.innerText = '送出';
      next.style.animation = 'pulsaitingBtn 2s infinite';
      next.removeEventListener('click', controler);
      next.addEventListener('click', submit);
    } else {
      next.style.animation = 'none';
      next.innerHTML = `下一步`;
      next.removeEventListener('click', submit);
      next.addEventListener('click', controler);
    }
  },
  recordData = () => {
    if (!checkFlag(page[current])) {
      const data = Array.from(document.querySelectorAll('input'));
      data.forEach(addData);
    } else {
    }
  },
  displaycurrent = (disp) => (app.innerHTML = disp),
  fillData = () => {
    const data = Array.from(document.querySelectorAll('input'));

    data.forEach(populate);
  },
  populate = (node) => (node.value = json[node.id] || ''),
  addData = (node) => (json = { ...json, [node.id]: node.value }),
  submit = () => {
    recordData();
    back.style.display = 'none';
    next.style.display = 'none';
    // logo.style.display = 'none';
    logo.innerHTML = `節電<span>秘招</span>`;
    document.body.classList.add('submit');
    json = JSON.stringify(json);
    displaycurrent(
      result('', '') +
        resultNode('ic', '1. 建議把 <strong>冷氣</strong> 風量設 <strong>自動調整</strong> 模式，較省電又能讓冷氣更有效率運作。', 1) +
        resultNode('ic', '2. 以 <strong>快煮壺取代</strong> 開飲機，每月可省下約100元電費。', 2)
    );
  },
  checkFlag = (page) => {
    radioFlag.includes(page);
  };
updateProgress = (cur, total) =>
  (progBar.style.backgroundImage = `linear-gradient(to right, var(--color-primary) ${
    (cur / total) * 100
  }%, var(--gray-body) ${(cur / total) * 100}%)`);

app.innerHTML = page[current];

back.addEventListener('click', function () {
  controler('back');
});

next.addEventListener('click', controler);

start.addEventListener('click', function () {
  let start = document.getElementById('start');
  let content = document.getElementById('content');
  start.style.display = 'none';
  content.style.display = 'flex';
});
