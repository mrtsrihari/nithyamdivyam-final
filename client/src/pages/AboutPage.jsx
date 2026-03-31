const AboutPage = () => (
  <div className="min-h-screen bg-bg animate-fade-in">
    {/* Hero */}
    <div className="bg-gradient-to-br from-primary to-primary-dark py-24 text-white text-center px-4">
      <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-3">Our Story</p>
      <h1 className="font-heading text-5xl font-bold mb-4">About Nithyam Divyam</h1>
      <p className="text-white/70 max-w-xl mx-auto text-lg">A brand born from the belief that nature's finest spices deserve to reach every kitchen, unadulterated and pure.</p>
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Brand story */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <p className="section-subtitle mb-3">The Beginning</p>
          <h2 className="section-title mb-6">From Farm to Your Kitchen</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Nithyam Divyam Spices was founded with a simple, powerful vision — to make pure, 
            organic spices accessible to every household in India. Based in the lush hills of 
            <strong className="text-gray-700"> Kajanaparai</strong>, our brand is deeply rooted in 
            the rich agricultural heritage of Tamil Nadu.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            We source our Black Pepper and Cardamom directly from certified organic estates, 
            where farmers use traditional, chemical-free methods passed down through generations. 
            Every batch is hand-inspected, naturally processed, and packaged with zero preservatives.
          </p>
          <p className="text-gray-500 leading-relaxed">
            "Nithyam" means eternal, and "Divyam" means divine — together, they define 
            our commitment to delivering timeless, divine quality in every packet.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary rounded-2xl p-8 text-white text-center col-span-2">
            <div className="text-6xl mb-4">🌿</div>
            <p className="font-heading text-2xl font-bold mb-2">Our Mission</p>
            <p className="text-white/80 text-sm">To bring nature's purest spices from farm to kitchen, with zero compromise on quality.</p>
          </div>
          <div className="bg-accent/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🌱</div>
            <p className="font-bold text-gray-700">Organic</p>
            <p className="text-gray-400 text-xs">Certified farms</p>
          </div>
          <div className="bg-primary/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🏔️</div>
            <p className="font-bold text-gray-700">Kajanaparai</p>
            <p className="text-gray-400 text-xs">Our home</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-3">The Team</p>
          <h2 className="section-title">The People Behind the Purity</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Founder */}
          <div className="card p-8 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-primary/20 shadow-soft">
              <img
                src="/founder.jpg"
                alt="Ayyappan S S"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=Ayyappan+SS&background=2F6F4F&color=fff&size=128&font-size=0.4';
                }}
              />
            </div>
            <h3 className="font-heading text-2xl font-bold text-gray-800 mb-1">Ayyappan S S</h3>
            <p className="text-primary font-medium mb-3">Founder</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              With decades of experience in spice cultivation, Ayyappan founded Nithyam Divyam 
              Spices to share nature's finest offerings with families across India.
            </p>
          </div>
          {/* CEO */}
          <div className="card p-8 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-accent/20 shadow-soft">
              <img
                src="/ceo.jpg"
                alt="Yugesh Kumar S A"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://ui-avatars.com/api/?name=Yugesh+Kumar&background=D6A77A&color=fff&size=128&font-size=0.4';
                }}
              />
            </div>
            <h3 className="font-heading text-2xl font-bold text-gray-800 mb-1">Yugesh Kumar S A</h3>
            <p className="text-accent font-medium mb-3">Director & CEO</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Yugesh leads Nithyam Divyam with a vision to expand the brand nationally while 
              maintaining the core values of purity, transparency, and sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-primary rounded-3xl p-12 text-white text-center">
        <h2 className="font-heading text-3xl font-bold mb-10">Our Core Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🌱', title: 'Purity', desc: 'No shortcuts. No additives. Ever.' },
            { icon: '❤️', title: 'Care', desc: 'Every product made with heart.' },
            { icon: '🤝', title: 'Trust', desc: 'Transparent sourcing, always.' },
            { icon: '🌍', title: 'Sustainability', desc: 'Good for you, good for earth.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white/10 rounded-2xl p-5">
              <div className="text-4xl mb-3">{icon}</div>
              <p className="font-heading font-bold text-lg mb-1">{title}</p>
              <p className="text-white/70 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
