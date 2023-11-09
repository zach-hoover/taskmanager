// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var buttonEl= $('.saveBtn')
var textEl=$('.description')
var toDos=[]

function getToDos() {
  storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    toDos = JSON.parse(storedTodos);
  } else {
    toDos = [];
  }
  return toDos;
}

// Takes an array of projects and saves them in localStorage.
function saveToDos(toDos) {
  localStorage.setItem('todos', JSON.stringify(toDos));
}

$(function () {
  // Add a click event listener to all elements with the class "save-button"
      var buttonEl = $('.saveBtn')
      var textEl=$('.description')
      buttonEl.on('click', function () {
      // Find the corresponding time-block by traversing the DOM
      var timeBlock = $(this).closest('.time-block');
      var timeBlockId = timeBlock.attr('id'); // Get the ID of the time-block

      // Get the user input from the textarea within the time-block
      var userInput = timeBlock.find('.description').val();
      
      var newToDo = {
        text: userInput,
        time: timeBlockId
      }
      console.log(newToDo)
      // Save the user input in local storage using the time-block ID as the key
      toDos = getToDos();
      toDos.push(newToDo);
      saveToDos(toDos);
  });

  // Rest of your code...
});
$(function () {
  var timeblockEL = $('.time-block');
  var currentHour = parseInt(dayjs().format('H')); // Parse currentHour as an integer

  timeblockEL.each(function () {
    var timeBlockId = parseInt($(this).attr('id').split('-')[1]);

    if (timeBlockId < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockId === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
});

$(function () {
  setInterval(function () {
  var dateEl= $('#currentDay')
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  dateEl.text(rightNow);
  }, 1000)
});

$(function () {
  var timeblockEl = $('.time-block');
  toDos = getToDos() 
  console.log(toDos)
  timeblockEl.each(
    function () {
      var timeBlockId = $(this).attr('id')
      var textEl = $(this).find('.description')
      toDos.forEach(function (toDo) {
        if (toDo.time === timeBlockId) {
          textEl.val(toDo.text); 
        }
      });
    }
  )
})


