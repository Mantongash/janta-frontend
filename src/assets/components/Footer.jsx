function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#FE9C0A]">Jantah</h2>
            <p>A brief description of the company and its services.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FE9C0A]">
              Quick Links
            </h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FE9C0A]">
              Contact Us
            </h3>
            <p>Email: info@jantah.com</p>
            <p>Phone:+254 707167918</p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Jantah. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
