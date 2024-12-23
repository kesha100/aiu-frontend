import Image from 'next/image'
import { Users, GraduationCap, BookOpen, Network } from 'lucide-react'

export function AIUCommunityMissionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-purple-50">
      <header className="bg-gradient-to-r from-red-800 to-purple-800 text-white p-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">AIU Community</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/home-page" className="hover:underline text-sm">Home</a></li>
              <li><a href="#" className="hover:underline text-sm">About us</a></li>
              <li><a href="#" className="hover:underline text-sm">Contacts</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-purple-800 mb-6 text-center">Our Mission</h1>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-purple-200">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-6">
            <Image
              src="/college_logo.png"
              alt="AIU Community"
              width={200}
              height={200}
              sizes="(max-width: 768px) 160px, 192px"
              className="rounded-full border-4 border-purple-500 w-40 h-40 md:w-48 md:h-48 object-cover"
/>
              <div className="flex-1">
                <p className="text-base text-purple-900 leading-relaxed mb-4">
                  Миссия проекта «AIU Community» — создать комфортную и эффективную платформу для общения и нетворкинга студентов и выпускников университета Ала-Тоо. Мы стремимся объединить текущих студентов и выпускников в одно сообщество, где каждый может делиться опытом, полезными ресурсами, находить единомышленников и получать поддержку в профессиональном и личностном развитии.
                </p>
                <p className="text-base text-purple-900 leading-relaxed">
                  «AIU Community» — это пространство, где знания и возможности передаются от поколения к поколению, где каждый участник может развиваться, находить новых друзей и строить свою карьеру, опираясь на поддержку сообщества.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-100 to-purple-100 p-3 rounded-lg">
                <GraduationCap className="h-10 w-10 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-purple-800">Образование</h3>
                  <p className="text-sm text-red-700">Поддержка непрерывного обучения</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-100 to-purple-100 p-3 rounded-lg">
                <BookOpen className="h-10 w-10 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-red-800">Обмен знаниями</h3>
                  <p className="text-sm text-purple-700">Делимся опытом и ресурсами</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-100 to-purple-100 p-3 rounded-lg">
                <Network className="h-10 w-10 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-purple-800">Нетворкинг</h3>
                  <p className="text-sm text-red-700">Создаем прочные связи</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-red-100 to-purple-100 p-3 rounded-lg">
                <Users className="h-10 w-10 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-red-800">Сообщество</h3>
                  <p className="text-sm text-purple-700">Поддержка и развитие</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a href ="/signup" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105">
                Присоединиться к сообществу
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-red-800 to-purple-800 text-white p-3 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AIU Community. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}