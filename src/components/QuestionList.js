import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => {
      setQuestions(questions);
    });
  }, []);
  
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json()
    .then(() => {
      const newQs = questions.filter((question) => question.id !== id);
      setQuestions(newQs)
    }));
  }

  const handleAnswerChange = ({id, correctIndex}) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
    .then((r) => r.json())
    .then((newQ) => {
      const newQs = questions.map((question) => {
        if (question.id === newQ.id) return newQ;
        return question;
      });
      setQuestions(newQs);
    })
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id} question={question} onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
