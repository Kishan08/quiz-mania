// Quiz Data - Questions organized by categories
const QUIZ_DATA = {
  javascript: {
    name: "Javascript Basic",
    questions: [{
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
          "var myVariable = 5;",
          "variable myVariable = 5;",
          "declare myVariable = 5;",
          "int myVariable = 5;"
        ],
        correct: 0
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: [
          "append()",
          "push()",
          "add()",
          "insert()"
        ],
        correct: 1
      },
      {
        question: "What does '===' compare in JavaScript?",
        options: [
          "Only value",
          "Only type",
          "Both value and type",
          "Neither value nor type"
        ],
        correct: 2
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
          "string",
          "boolean",
          "float",
          "undefined"
        ],
        correct: 2
      },
      {
        question: "How do you create a function in JavaScript?",
        options: [
          "function = myFunction() {}",
          "create myFunction() {}",
          "function myFunction() {}",
          "def myFunction() {}"
        ],
        correct: 2
      },
      {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: [
          "4",
          "'22'",
          "Error",
          "NaN"
        ],
        correct: 1
      },
      {
        question: "Which method removes the last element from an array?",
        options: [
          "pop()",
          "remove()",
          "delete()",
          "shift()"
        ],
        correct: 0
      },
      {
        question: "What is the correct way to write a comment in JavaScript?",
        options: [
          "# This is a comment",
          "<!-- This is a comment -->",
          "// This is a comment",
          "* This is a comment *"
        ],
        correct: 2
      },
      {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: [
          "onchange",
          "onclick",
          "onmouseclick",
          "onmouseover"
        ],
        correct: 1
      },
      {
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "JavaScript Online Notation",
          "JavaScript Object Number",
          "Just Some Object Notation"
        ],
        correct: 0
      }
    ]
  },
  react: {
    name: "React.js Basic",
    questions: [{
        question: "What is JSX in React?",
        options: [
          "JavaScript XML",
          "JavaScript eXtension",
          "Java Syntax eXtension",
          "JavaScript eXecutable"
        ],
        correct: 0
      },
      {
        question: "Which method is used to create components in React?",
        options: [
          "React.createComponent()",
          "React.createElement()",
          "createComponent()",
          "component()"
        ],
        correct: 1
      },
      {
        question: "What are props in React?",
        options: [
          "Properties passed to components",
          "State variables",
          "Event handlers",
          "CSS styles"
        ],
        correct: 0
      },
      {
        question: "Which hook is used to manage state in functional components?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correct: 1
      },
      {
        question: "What is the virtual DOM?",
        options: [
          "A copy of the real DOM",
          "A JavaScript representation of the real DOM",
          "A server-side DOM",
          "A database DOM"
        ],
        correct: 1
      },
      {
        question: "How do you handle events in React?",
        options: [
          "onclick='function()'",
          "onClick={function}",
          "onEvent={function}",
          "handleClick='function()'"
        ],
        correct: 1
      },
      {
        question: "What is the purpose of useEffect hook?",
        options: [
          "To manage state",
          "To handle side effects",
          "To create components",
          "To pass props"
        ],
        correct: 1
      },
      {
        question: "What is the key prop used for in React lists?",
        options: [
          "Styling",
          "Event handling",
          "Unique identification",
          "Data binding"
        ],
        correct: 2
      },
      {
        question: "Which method is called when a component is first created?",
        options: [
          "componentDidMount()",
          "componentWillMount()",
          "constructor()",
          "render()"
        ],
        correct: 0
      },
      {
        question: "What does React.Fragment do?",
        options: [
          "Groups elements without extra DOM nodes",
          "Creates fragments of components",
          "Handles errors",
          "Manages state"
        ],
        correct: 0
      }
    ]
  }
};

// Category information for display
const CATEGORY_INFO = {
  javascript: {
    name: "Javascript Basic",
    description: "Test your JavaScript fundamentals",
    icon: "🔧"
  },
  react: {
    name: "React.js Basic",
    description: "Learn React concepts and components",
    icon: "⚛️"
  }
};