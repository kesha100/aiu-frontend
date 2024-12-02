import Link from 'next/link'
import Image from 'next/image'

export function AIUCommunityHomePage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{
        backgroundImage: `url('https://s3-alpha-sig.figma.com/img/18d6/c34a/e9291369af84aeb18d4a8a0ed5f90490?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qIHgFljg-Sapobh-OiHq-aLlT9KLaBPLFuNTkyj2fOUlg-vwc6Cv54j4ug0yqaFG9v1Gx94l01QrjN79RWlT--dNZhKh6yMT9mAEbShxgPM3U~k6I1fuPUoAFqBPi8m9RjVd0B6avV4suf5zVPiCJXBl-dxlI0gD0mTAP-GdIWsAsLwHfigAhz~cn7eHAOVfxG-wBCRaJTQm~ZDi4wqNUKIcoMX3lP5UHfLuV6iVlNZZAI1l7Of3Qf1TMjXHhzZZA7Ue3DPPwSCXh72sL3-yraFresN195UjRc2wqsklMMQfVKRs6Y-3nqDFw-DDxr1wyATj1T2BBcp7MQyMp~Vanw__')`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <header className="relative z-10 bg-red-900">
        <nav className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="pl-8">
              <Image
                src="/logo-alatoo.png"
                alt="Ala-Too Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex">
              <div className="pl-8">
                <Link 
                  href="/feed-page"
                  className="bg-blue-950 text-white hover:bg-blue-900 px-8 py-6 flex items-center text-base font-medium"
                >
                  Feed
                </Link>
              </div>
              <Link 
                href="/qa-page"
                className="bg-blue-950 text-white hover:bg-blue-900 px-8 py-6 flex items-center text-base font-medium"
              >
                Q&A
              </Link>
              <Link 
                href="/mission-page"
                className="bg-blue-950 text-white hover:bg-blue-900 px-8 py-6 flex items-center text-base font-medium"
              >
                Mission
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to Ala-Too Community
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-4">
            powered by college students!
          </p>
          
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            The official campus community platform at Ala-Too International University
          </p>
          
          <Link
            href="/signup"
            className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            Sign up
          </Link>
        </div>
      </main>
    </div>
  )
}
