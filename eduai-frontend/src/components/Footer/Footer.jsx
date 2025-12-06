import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white mt-10 overflow-hidden">

      {/* 🔥 Floating Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] 
          bg-[size:50px_50px] animate-[floatGrid_6s_ease-in-out_infinite]"
        ></div>
      </div>

      {/* Gradient Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-10 relative"></div>

      {/* GLASS CONTENT */}
      <div className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12">

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* LOGO */}
            <div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                EduAI
              </h2>

              <p className="text-gray-300 text-sm leading-6">
                AI-powered learning platform where teachers create courses & quizzes,
                and students learn smarter.
              </p>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition">AI Quiz Generator</li>
                <li className="hover:text-white transition">Course Creation</li>
                <li className="hover:text-white transition">Practice Quizzes</li>
                <li className="hover:text-white transition">Student Dashboard</li>
                <li className="hover:text-white transition">Teacher Dashboard</li>
                <li className="hover:text-white transition">Course Enrollment</li>
              </ul>
            </div>

            {/* SOCIAL + NEWSLETTER */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-4">Follow us on social media</p>

              {/* SOCIAL ICONS WITH GLOW BORDER */}
              <div className="flex items-center space-x-4 mb-6">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-white/10 border border-transparent 
                    hover:border-blue-500 hover:shadow-[0_0_15px_#3b82f6] transition duration-300"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>

              {/* NEWSLETTER BOX */}
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-white/10 shadow-lg">
                <p className="text-gray-300 text-sm mb-2">Subscribe for updates</p>

                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border border-white/20 rounded-l-lg px-3 py-2 
                    text-gray-200 placeholder-gray-400 focus:outline-none"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 mt-10 pt-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} EduAI. All Rights Reserved.
          </div>
        </div>
      </div>

    </footer>
  );
}
