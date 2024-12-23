'use client'

import { useState, useEffect } from 'react'
import { Users, PlusCircle, Send } from 'lucide-react'
import axios from 'axios'

const API_URL = 'https://aiu-community.onrender.com/api/v1' // Adjust this to match your Django backend URL

interface Question {
  id: number
  name: string
  question_text: string
}

interface Answer {
  id: number
  answer_text: string
  question_id: number
}

type QA = {
  id: number
  name: string
  question_text: string
  answers: Answer[]
}

export function AIUCommunityQAPage() {
  const [qas, setQas] = useState<QA[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswers, setNewAnswers] = useState<{[key: number]: string}>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/questions/`)
      const questions = response.data
      const qasWithAnswers = await Promise.all(
        questions.map(async (question: Question) => {
          const answersResponse = await axios.get(`${API_URL}/questions/${question.id}/answers/`)
          return {
            ...question,
            answers: answersResponse.data
          }
        })
      )
      setQas(qasWithAnswers)
    } catch (err) {
      setError('Failed to load questions')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newQuestion.trim()) {
      try {
        const response = await axios.post(`${API_URL}/questions/`, {
          name: 'Anonymous', // You can modify this based on your user authentication
          question_text: newQuestion
        })
        setQas([...qas, { ...response.data, answers: [] }])
        setNewQuestion('')
      } catch (err) {
        setError('Failed to create question')
        console.error(err)
      }
    }
  }

  const handleAnswerSubmit = async (qaId: number) => {
    const answerText = newAnswers[qaId]
    if (answerText?.trim()) {
      try {
        const response = await axios.post(`${API_URL}/questions/${qaId}/answers/`, {
          answer_text: answerText
        })
        setQas(qas.map(qa => {
          if (qa.id === qaId && qa.answers.length < 5) {
            return {
              ...qa,
              answers: [...qa.answers, response.data]
            }
          }
          return qa
        }))
        setNewAnswers({...newAnswers, [qaId]: ''})
      } catch (err) {
        setError('Failed to create answer')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-purple-50">
        <div className="text-xl text-purple-800">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-purple-50">
      <header className="bg-gradient-to-r from-red-800 to-purple-800 text-white p-3">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">Q&A Community</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline text-sm">Главная</a></li>
              <li><a href="#" className="hover:underline text-sm">О нас</a></li>
              <li><a href="#" className="hover:underline text-sm">Контакты</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-purple-800 mb-4 text-center">
            Вопросы и Ответы
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md mb-6 p-4">
            <h2 className="text-xl font-semibold mb-2">Задать новый вопрос</h2>
            <form onSubmit={handleQuestionSubmit} className="space-y-2">
              <textarea
                placeholder="Введите ваш вопрос..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Добавить вопрос
              </button>
            </form>
          </div>

          <div className="h-[600px] overflow-y-auto rounded-md border border-purple-200 p-4">
            {qas.map((qa) => (
              <div key={qa.id} className="bg-white rounded-lg shadow-md mb-4 last:mb-0">
                <div className="bg-gradient-to-r from-red-100 to-purple-100 p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-purple-800">{qa.question_text}</h3>
                </div>
                <div className="p-4">
                  {qa.answers.length > 0 ? (
                    <div className="space-y-2">
                      {qa.answers.map((answer, index) => (
                        <div key={answer.id} className="bg-gray-50 p-2 rounded-lg shadow">
                          <p className="font-semibold text-red-800">Ответ {index + 1}:</p>
                          <p className="text-purple-900">{answer.answer_text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-purple-600 italic">Пока нет ответов на этот вопрос.</p>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200">
                  {qa.answers.length < 5 ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(qa.id); }} className="space-y-2">
                      <textarea
                        placeholder="Введите ваш ответ..."
                        value={newAnswers[qa.id] || ''}
                        onChange={(e) => setNewAnswers({...newAnswers, [qa.id]: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={2}
                      />
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
                      >
                        <Send className="mr-2 h-4 w-4" /> Ответить
                      </button>
                    </form>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      Достигнуто максимальное количество ответов (5) для этого вопроса.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-red-800 to-purple-800 text-white p-3">
        <div className="max-w-[1200px] mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Q&A Community. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}