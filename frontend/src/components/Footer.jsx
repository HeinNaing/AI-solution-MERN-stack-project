const footer = () => {
    return (
      <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#4052FF] rounded-lg"></div>
              <span className="font-bold ">AI Solution</span>
            </div>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
          <div>
            <h4 className="font-semibold  mb-4">Company information</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Customer Feedback
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold  mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Software Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                  Industries Solutions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold  mb-4">Contact us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                info@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7z" />
                </svg>
                +95 9778877624
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                Lorem ipsum dolor sit amet
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4052FF]">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>Copyright © 2024 AI Solution Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
    )
}
export default footer;