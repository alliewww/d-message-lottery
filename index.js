function filterData(inputData) {
  var filteredData = {};

  var inputElements = document.getElementById("hashtag");
  console.log(inputElements.value);

  inputData.forEach(function (item) {
    if (
      item.content &&
      item.content.includes(inputElements.value) &&
      item.department
    ) {
      // 將符合條件的資料加入 filteredData，使用 department 作為 key
      filteredData[item.department] = item;
    }
  });
  console.log(filteredData);
  var result = Object.values(filteredData);

  var checkboxElement = document.getElementById("managerCheck");
  var isChecked = checkboxElement.checked;

  if (isChecked) {
    var result = result.filter(
      (item) => item.department !== document.getElementById("managerId").value
    );
  }
  return result;
}

function getValue() {
  // 清空先前的值
  var inputValues = [];
  var inputElements = document.querySelectorAll(".myInput");
  inputElements.forEach(function (inputElement) {
    if (inputElement.value) {
      var jsonArray = JSON.parse(inputElement.value);
      inputValues = inputValues.concat(jsonArray);
    }
  });
  console.log(inputValues);
  return inputValues;
}

function calculateUniqueFloors() {
  var inputValues = getValue();

  var floorValues = inputValues.map((item) => item.floor);
  var uniqueFloors = Array.from(new Set(floorValues));
  var filteredCount = uniqueFloors.length;

  console.log("過濾完之後的資料總共有幾筆：", filteredCount);

  document.getElementById("checkinput").textContent =
    "接收資料總共樓層：" + filteredCount;

  var result = filterData(inputValues);
  console.log(result);

  var resultString = "";
  result.forEach(function (item, index) {
    resultString +=
      index + 1 + "." + item.department + "(" + item.school + ")\n";
  });

  document.getElementById("output").textContent =
    "符合抽獎資格的id共" + result.length + "位\n" + resultString;

  // 洗牌後的陣列
  var shuffledArray = shuffleArray([...result]);

  var numberElements = document.getElementById("numbers");
  console.log(numberElements.value);

  // 從洗牌後的陣列中取前五個選項
  var selectedOptions = shuffledArray.slice(0, Number(numberElements.value));

  console.log("抽選結果：", selectedOptions);

  var drawingString = "";

  selectedOptions.forEach(function (item, index) {
    console.log(item);
    drawingString +=
      index +
      1 +
      "." +
      item.department +
      "(" +
      item.school +
      ")" +
      "_B" +
      item.doorplate +
      "\n";
  });

  document.getElementById("drawing").textContent =
    "恭喜中獎者：\n" + drawingString;
}

// Fisher-Yates 洗牌算法
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
