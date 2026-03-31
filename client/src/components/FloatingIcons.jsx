import { ChatBubbleOvalLeftEllipsisIcon, EnvelopeIcon, CameraIcon } from '@heroicons/react/24/outline';

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/nd._.spices/"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Instagram"
      >
        <CameraIcon className="w-6 h-6" />
      </a>
      
      {/* Email */}
      <a
        href="mailto:nithyamdivyam07@gmail.com"
        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Email"
      >
        <EnvelopeIcon className="w-6 h-6" />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917306807443?text=Hi%2C%20I%20came%20from%20your%20website%20and%20want%20to%20know%20more."
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-bounce mt-1"
        aria-label="WhatsApp"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
      </a>
    </div>
  );
};

export default FloatingIcons;
